import React, { useState } from 'react';
import { Plus, Check, Loader2, Sparkles, AlertCircle, BrainCircuit, Settings, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import useFlashcardStore from '../../stores/useFlashcardStore';
import useLLMConfig from '../../hooks/useLLMConfig';
import ApiKeySetup from '../ApiKeySetup';
import api from '../../services/api';
import DiscoveryAgent from './DiscoveryAgent';

/**
 * Unified Flashcard Creation Component.
 * 
 * Supports both manual creation and AI-assisted generation from document context.
 * Can be used as a standalone component or integrated into the Document Viewer.
 * Supports React 'ref' to expose submission logic to keyboard shortcuts.
 * 
 * @param {Object} props - Component properties.
 * @param {Object} [props.studyDoc] - The document record being studied.
 * @param {string} [props.selectedText] - Text currently selected in a viewer.
 * @param {Function} [props.onComplete] - Callback after successful creation.
 * @param {string} [props.externalFront] - Controlled value for the front text.
 * @param {string} [props.externalBack] - Controlled value for the back text.
 * @param {Function} [props.setExternalFront] - Setter for external front state.
 * @param {Function} [props.setExternalBack] - Setter for external back state.
 * @param {Array} [props.sections] - Optional document sections to use for AI generation.
 * @returns {JSX.Element} The rendered creator interface.
 */
const FlashcardCreator = React.forwardRef(({ studyDoc, selectedText, onComplete, externalFront, externalBack, setExternalFront, setExternalBack, sections: sectionsProp }, ref) => {
    // If external props are provided, use them. Otherwise default to internal state (backwards compatibility)
    const [internalFront, setInternalFront] = useState(selectedText || '');
    const [internalBack, setInternalBack] = useState('');

    // Derived state
    const front = externalFront !== undefined ? externalFront : internalFront;
    const back = externalBack !== undefined ? externalBack : internalBack;
    const setFront = setExternalFront || setInternalFront;
    const setBack = setExternalBack || setInternalBack;

    const [tags, setTags] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [success, setSuccess] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [progressStep, setProgressStep] = useState(0);
    const [progressValue, setProgressValue] = useState(0);
    const [progressTotal, setProgressTotal] = useState(0);
    const [progressLabel, setProgressLabel] = useState('');
    const [view, setView] = useState('manual'); // manual, ai
    const [failedGeneration, setFailedGeneration] = useState(null);
    const [cardCount, setCardCount] = useState(5);

    // AI Context State
    const [startPage, setStartPage] = useState(1);
    const [endPage, setEndPage] = useState(Math.min(5, studyDoc?.page_count || 5));
    const [retrievalMode, setRetrievalMode] = useState('manual_range'); // manual_range, rag, video_range
    const [startTime, setStartTime] = useState('00:00');
    const [endTime, setEndTime] = useState('05:00');
    const [requirements, setRequirements] = useState('');
    const [discoveryProfile, setDiscoveryProfile] = useState(null);
    const [rangeMode, setRangeMode] = useState('pages'); // pages, sections
    const [availableSections, setAvailableSections] = useState(sectionsProp || []);
    const [selectedSectionIds, setSelectedSectionIds] = useState([]);
    const [sectionsLoading, setSectionsLoading] = useState(false);

    // Track active selection locally - allows clearing even when prop persists
    const [activeSelection, setActiveSelection] = useState('');

    const documentId = studyDoc?.id;
    const pageCount = studyDoc?.page_count || 0;
    const isYoutube = studyDoc?.source_type === 'youtube';

    const createFlashcard = useFlashcardStore(state => state.createFlashcard);

    // LLM Config hook for API key validation
    const { isConfigured, isLoaded, getConfig, provider, refresh } = useLLMConfig();
    const [showingSetup, setShowingSetup] = useState(false);

    // Expose submit for keyboard shortcuts
    React.useImperativeHandle(ref, () => ({
        saveCard: () => handleSubmit(new Event('submit'))
    }));

    // Update start/end page if document changes or new upload
    React.useEffect(() => {
        if (pageCount > 0) {
            setEndPage(Math.min(5, pageCount));
        }
    }, [pageCount]);

    React.useEffect(() => {
        if (isYoutube) {
            setRetrievalMode('video_range');
        } else if (retrievalMode === 'video_range') {
            setRetrievalMode('manual_range');
        }
    }, [isYoutube]);

    React.useEffect(() => {
        setSelectedSectionIds([]);
        setRangeMode('pages');
    }, [documentId]);

    React.useEffect(() => {
        if (sectionsProp && Array.isArray(sectionsProp)) {
            setAvailableSections(sectionsProp);
        }
    }, [sectionsProp]);

    React.useEffect(() => {
        const loadSections = async () => {
            if (!documentId || (sectionsProp && sectionsProp.length > 0)) return;
            if (availableSections && availableSections.length > 0) return;
            if (sectionsLoading) return;
            setSectionsLoading(true);
            try {
                const res = await api.get(`/documents/${documentId}/sections`, { params: { include_all: true } });
                setAvailableSections(res || []);
            } catch (err) {
                console.error('Failed to load sections for flashcards', err);
            } finally {
                setSectionsLoading(false);
            }
        };
        if (view === 'ai') {
            loadSections();
        }
    }, [documentId, sectionsProp, availableSections, sectionsLoading, view]);

    // If selected text changes and we are not controlled, update front
    // If controlled, parent handles this via setExternalFront(selectedText)
    React.useEffect(() => {
        if (!setExternalFront && selectedText) {
            setInternalFront(selectedText);
        } else if (setExternalFront && selectedText && (!front || front.trim() === "")) {
            // Proactive fill for controlled inputs if currently empty
            setExternalFront(selectedText);
        }
    }, [selectedText, setExternalFront]);

    // Sync activeSelection with prop - but only when prop changes to a new non-empty value
    React.useEffect(() => {
        if (selectedText && selectedText.trim().length > 0) {
            setActiveSelection(selectedText);
        }
    }, [selectedText]);

    const clearSelection = () => {
        setActiveSelection('');
    };

    const handleGenerate = async (type) => { // type: 'flashcards' or 'questions'
        setGenerating(true);
        const totalSteps = cardCount + 2;
        setProgressTotal(totalSteps);
        setProgressValue(1);
        setProgressStep(1);
        setProgressLabel('Preparing context...');
        setFailedGeneration(null);
        try {
            const llm_config = getConfig();

            const endpoint = type === 'flashcards' ? '/ai/generate-flashcards' : '/ai/generate-questions';

            // Prepare payload with context
            const payload = {
                document_id: documentId,
                count: cardCount,
                llm_config: llm_config,
                retrieval_mode: retrievalMode,
                requirements: requirements || discoveryProfile
            };

            // Logic to prioritize active selection or page range
            if (activeSelection && activeSelection.trim().length > 0) {
                payload.text = activeSelection;
                payload.retrieval_mode = 'manual_range'; // Selection overrides RAG/Range
            } else if (retrievalMode === 'manual_range' && rangeMode === 'sections' && selectedSectionIds.length > 0) {
                payload.section_ids = selectedSectionIds;
            } else if (retrievalMode === 'manual_range' && pageCount > 0) {
                payload.start_page = parseInt(startPage);
                payload.end_page = parseInt(endPage);
            } else if (retrievalMode === 'video_range') {
                payload.start_time = startTime;
                payload.end_time = endTime;
            }

            setProgressStep(2);
            setProgressValue(2);
            setProgressLabel(`Generating ${cardCount} ${type === 'flashcards' ? 'cards' : 'questions'}...`);
            const results = await api.post(endpoint, payload);

            const createPayloads = type === 'flashcards'
                ? results.map(card => ({
                    document_id: documentId,
                    front: card.front,
                    back: card.back,
                    tags: Array.from(new Set(['ai-generated', ...(card.tags || [])])),
                    card_type: 'basic'
                }))
                : results.map(q => ({
                    document_id: documentId,
                    front: q.question + '\n\n' + q.options.join('\n'),
                    back: q.correct_answer + '\n\n' + q.explanation,
                    tags: ['ai-quiz'],
                    card_type: 'basic'
                }));

            setProgressStep(3);
            setProgressLabel(`Saving ${createPayloads.length} items...`);

            const failed = [];
            let succeeded = 0;
            for (let index = 0; index < createPayloads.length; index += 1) {
                try {
                    await createFlashcard(createPayloads[index]);
                    succeeded += 1;
                } catch (err) {
                    failed.push(createPayloads[index]);
                } finally {
                    const savedCount = index + 1;
                    setProgressValue(2 + savedCount);
                    setProgressLabel(`Saving ${savedCount}/${createPayloads.length}...`);
                }
            }

            if (failed.length > 0) {
                setFailedGeneration({ type, items: failed });
                toast.error('Some cards failed to save', {
                    description: `${succeeded} saved, ${failed.length} failed. You can retry the failed ones.`
                });
            } else {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 2000);
            }
        } catch (err) {
            console.error('AI Generation failed:', err);
            // Handle different error types given our API interceptor returns strings sometimes
            if (typeof err === 'string') {
                toast.error('AI Generation failed', { description: err });
            } else if (err.response) {
                toast.error('AI Generation failed', { description: err.response.data?.detail || err.response.statusText || 'Server error' });
            } else if (err.request) {
                toast.error('AI Generation failed', { description: 'Network error - please check your connection' });
            } else {
                toast.error('AI Generation failed', { description: err.message || 'Unknown error' });
            }
        } finally {
            setGenerating(false);
            setProgressStep(0);
            setProgressValue(0);
            setProgressTotal(0);
            setProgressLabel('');
        }
    };

    const handleRetryFailed = async () => {
        if (!failedGeneration?.items?.length) {
            return;
        }
        setGenerating(true);
        try {
            const retryItems = failedGeneration.items;
            setFailedGeneration(null);

            const outcomes = await Promise.allSettled(
                retryItems.map(payload => createFlashcard(payload))
            );
            const failed = retryItems.filter((_, index) => outcomes[index].status === 'rejected');
            const succeeded = outcomes.filter(outcome => outcome.status === 'fulfilled').length;

            if (failed.length > 0) {
                setFailedGeneration({ type: failedGeneration.type, items: failed });
                toast.error('Some cards still failed to save', {
                    description: `${succeeded} saved, ${failed.length} failed.`
                });
            } else {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 2000);
            }
        } catch (err) {
            console.error('Retry failed:', err);
            toast.error('Retry failed', { description: err.message || 'Unknown error' });
        } finally {
            setGenerating(false);
        }
    };

    const handleSubmit = async (e) => {
        if (e && e.preventDefault) e.preventDefault();

        // Validation for shortcuts
        if (!front || !back) {
            // Maybe show toast warning?
            return;
        }

        setIsCreating(true);
        try {
            await createFlashcard({
                document_id: documentId,
                front,
                back,
                tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
                card_type: 'basic'
            });

            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                setFront('');
                setBack('');
                if (onComplete) onComplete();
            }, 1500);
        } catch (err) {
            console.error('Failed to create card', err);
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="bg-dark-900/60 border border-white/10 rounded-2xl p-6 h-full flex flex-col shadow-xl shadow-black/30">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary-400" />
                    Create Flashcard
                </h3>
                {success && (
                    <div className="flex items-center gap-1 text-primary-300 text-sm font-bold animate-fade-in">
                        <Check className="w-4 h-4" /> SAVED
                    </div>
                )}
            </div>

            {/* Toggle Tabs */}
            <div className="flex bg-dark-800/60 p-1 rounded-xl mb-4 border border-white/10">
                <button
                    onClick={() => setView('manual')}
                    className={`flex-1 py-2 text-[11px] font-black uppercase tracking-wider rounded-lg transition-all ${view === 'manual' ? 'bg-primary-500 text-white shadow' : 'text-dark-400 hover:text-white'}`}
                >
                    Manual
                </button>
                {documentId && (
                    <button
                        onClick={() => setView('ai')}
                        className={`flex-1 py-2 text-[11px] font-black uppercase tracking-wider rounded-lg transition-all ${view === 'ai' ? 'bg-primary-500 text-white shadow' : 'text-dark-400 hover:text-white'}`}
                    >
                        AI Auto-Generate
                    </button>
                )}
            </div>

            {view === 'ai' ? (
                <AIGenerationPanel
                    isLoaded={isLoaded}
                    isConfigured={isConfigured}
                    refresh={refresh}
                    showingSetup={showingSetup}
                    setShowingSetup={setShowingSetup}
                    retrievalMode={retrievalMode}
                    setRetrievalMode={setRetrievalMode}
                    discoveryProfile={discoveryProfile}
                    setDiscoveryProfile={setDiscoveryProfile}
                    requirements={requirements}
                    setRequirements={setRequirements}
                    documentId={documentId}
                    provider={provider}
                    activeSelection={activeSelection}
                    clearSelection={clearSelection}
                    pageCount={pageCount}
                    startPage={startPage}
                    endPage={endPage}
                    setStartPage={setStartPage}
                    setEndPage={setEndPage}
                    isYoutube={isYoutube}
                    startTime={startTime}
                    endTime={endTime}
                    setStartTime={setStartTime}
                    setEndTime={setEndTime}
                    progressStep={progressStep}
                    progressValue={progressValue}
                    progressTotal={progressTotal}
                    progressLabel={progressLabel}
                    cardCount={cardCount}
                    setCardCount={setCardCount}
                    rangeMode={rangeMode}
                    setRangeMode={setRangeMode}
                    sections={availableSections}
                    selectedSectionIds={selectedSectionIds}
                    setSelectedSectionIds={setSelectedSectionIds}
                    sectionsLoading={sectionsLoading}
                    onGenerate={handleGenerate}
                    generating={generating}
                    failedGeneration={failedGeneration}
                    onRetryFailed={handleRetryFailed}
                />
            ) : (
                <ManualFlashcardForm
                    front={front}
                    setFront={setFront}
                    back={back}
                    setBack={setBack}
                    tags={tags}
                    setTags={setTags}
                    selectedText={selectedText}
                    success={success}
                    isCreating={isCreating}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    );
});


const AIGenerationPanel = ({
    isLoaded,
    isConfigured,
    refresh,
    showingSetup,
    setShowingSetup,
    retrievalMode,
    setRetrievalMode,
    discoveryProfile,
    setDiscoveryProfile,
    requirements,
    setRequirements,
    documentId,
    provider,
    activeSelection,
    clearSelection,
    pageCount,
    startPage,
    endPage,
    setStartPage,
    setEndPage,
    isYoutube,
    startTime,
    endTime,
    setStartTime,
    setEndTime,
    progressStep,
    progressValue,
    progressTotal,
    progressLabel,
    cardCount,
    setCardCount,
    rangeMode,
    setRangeMode,
    sections,
    selectedSectionIds,
    setSelectedSectionIds,
    sectionsLoading,
    onGenerate,
    generating,
    failedGeneration,
    onRetryFailed
}) => {
    const toggleSection = (id) => {
        setSelectedSectionIds((prev) => prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id]);
    };

    const selectIncluded = () => {
        const included = (sections || []).filter((s) => s.included).map((s) => s.id);
        setSelectedSectionIds(included);
        if (included.length > 0) {
            setRangeMode('sections');
        }
    };

    const clearSections = () => setSelectedSectionIds([]);

    const progressPercent = progressTotal > 0
        ? Math.min(100, (progressValue / progressTotal) * 100)
        : Math.min(100, (progressStep / 3) * 100);

    return (
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
            {/* Show API Key Setup if not configured */}
            {isLoaded && !isConfigured ? (
                <ApiKeySetup
                    compact
                    onConfigured={() => {
                        refresh();
                        setShowingSetup(false);
                    }}
                />
            ) : (
                <>
                    {/* Retrieval Mode Selection */}
                    <div className="flex bg-white/5 p-1 rounded-lg">
                        <button
                            onClick={() => setRetrievalMode('manual_range')}
                            className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${retrievalMode === 'manual_range' ? 'bg-white/10 text-white' : 'text-dark-400 hover:text-white'}`}
                        >
                            {isYoutube ? 'Main Segment' : 'Page Range'}
                        </button>
                        {isYoutube && (
                            <button
                                onClick={() => setRetrievalMode('video_range')}
                                className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${retrievalMode === 'video_range' ? 'bg-white/10 text-white' : 'text-dark-400 hover:text-white'}`}
                            >
                                Time Range
                            </button>
                        )}
                        <button
                            onClick={() => setRetrievalMode('rag')}
                            className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${retrievalMode === 'rag' ? 'bg-primary-500 text-white shadow' : 'text-dark-400 hover:text-white'}`}
                        >
                            AI Tutor (RAG)
                        </button>
                    </div>

                    {retrievalMode === 'rag' && !discoveryProfile ? (
                        <div className="p-4 bg-primary-500/5 border border-primary-500/10 rounded-xl flex-1">
                            <DiscoveryAgent
                                documentId={documentId}
                                onProfileGenerated={(profile) => {
                                    setDiscoveryProfile(profile);
                                    setRequirements(profile);
                                }}
                            />
                        </div>
                    ) : (
                        <>
                            <div className="p-4 bg-primary-500/10 border border-primary-500/20 rounded-2xl">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <BrainCircuit className="w-6 h-6 text-primary-400" />
                                        <div>
                                            <h4 className="font-bold text-white text-sm">
                                                {retrievalMode === 'rag' ? 'Multimodal RAG' : 'AI Assistant'}
                                            </h4>
                                            <p className="text-[10px] text-primary-200/70">Using {provider}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowingSetup(!showingSetup)}
                                        className="p-2 hover:bg-white/10 rounded-lg text-dark-400 hover:text-white transition-colors"
                                        title="Change AI Settings"
                                    >
                                        <Settings className="w-4 h-4" />
                                    </button>
                                </div>

                                {showingSetup && (
                                    <div className="mb-4">
                                        <ApiKeySetup
                                            compact
                                            onConfigured={() => {
                                                refresh();
                                                setShowingSetup(false);
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Requirements / Generation Profile */}
                                <div className="mb-4">
                                    <label className="block text-[10px] font-bold text-primary-300 uppercase tracking-wider mb-2">
                                        Generation Requirements
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={requirements}
                                        onChange={(e) => setRequirements(e.target.value)}
                                        className="w-full bg-dark-900/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-dark-500"
                                        placeholder="e.g. Focus on definitions, explain simply..."
                                    />
                                    {discoveryProfile && retrievalMode === 'rag' && (
                                        <p className="text-[10px] text-primary-300 mt-1 flex items-center gap-1">
                                            <CheckCircle2 className="w-3 h-3" /> Profile built by Discovery Agent
                                        </p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-[10px] font-bold text-primary-300 uppercase tracking-wider mb-2">
                                        Card Count
                                    </label>
                                    <div className="flex gap-2">
                                        {[5, 10, 15].map((count) => (
                                            <button
                                                key={count}
                                                type="button"
                                                onClick={() => setCardCount(count)}
                                                className={`flex-1 py-2 rounded-lg text-[11px] font-black uppercase tracking-wider border transition-all ${cardCount === count ? 'bg-primary-500 text-white border-primary-500/60 shadow' : 'bg-dark-900/60 text-dark-300 border-white/10 hover:text-white'}`}
                                            >
                                                {count}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Page/Section Range Controls (Only for manual_range) */}
                                {retrievalMode === 'manual_range' && !showingSetup && (
                                    <div className={`space-y-4 ${activeSelection ? 'opacity-50 pointer-events-none' : ''}`}>
                                        {sections && sections.length > 0 && (
                                            <div className="flex bg-white/5 p-1 rounded-lg">
                                                <button
                                                    type="button"
                                                    onClick={() => setRangeMode('pages')}
                                                    className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${rangeMode === 'pages' ? 'bg-white/10 text-white' : 'text-dark-400 hover:text-white'}`}
                                                >
                                                    Page Range
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setRangeMode('sections')}
                                                    className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${rangeMode === 'sections' ? 'bg-white/10 text-white' : 'text-dark-400 hover:text-white'}`}
                                                >
                                                    Sections
                                                </button>
                                            </div>
                                        )}

                                        {rangeMode === 'sections' && sections && sections.length > 0 ? (
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-dark-500">
                                                    <span>{selectedSectionIds.length} selected</span>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={selectIncluded}
                                                            className="text-primary-300 hover:text-white font-bold"
                                                        >
                                                            Use Included
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={clearSections}
                                                            className="text-dark-400 hover:text-white font-bold"
                                                        >
                                                            Clear
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="max-h-40 overflow-y-auto pr-2 custom-scrollbar space-y-2">
                                                    {sections.map((section) => (
                                                        <button
                                                            key={section.id}
                                                            type="button"
                                                            onClick={() => toggleSection(section.id)}
                                                            className={`w-full text-left p-3 rounded-xl border transition-all ${selectedSectionIds.includes(section.id) ? 'border-primary-500/60 bg-primary-500/10' : 'border-white/5 bg-dark-900/50 hover:border-white/20'}`}
                                                        >
                                                            <div className="flex items-center justify-between gap-2">
                                                                <p className="text-xs font-bold text-white truncate">
                                                                    {section.title || `Section ${section.section_index + 1}`}
                                                                </p>
                                                                <span className={`text-[9px] uppercase tracking-widest font-bold ${section.included ? 'text-primary-300' : 'text-dark-500'}`}>
                                                                    {section.included ? 'Included' : 'Optional'}
                                                                </span>
                                                            </div>
                                                            <p className="text-[10px] text-dark-400 line-clamp-2 mt-1">
                                                                {section.excerpt || section.content?.slice(0, 120)}
                                                            </p>
                                                        </button>
                                                    ))}
                                                </div>
                                                {sectionsLoading && (
                                                    <div className="text-[10px] text-dark-500 uppercase tracking-widest">Loading sections...</div>
                                                )}
                                            </div>
                                        ) : pageCount > 0 ? (
                                            <div className="flex gap-4">
                                                <div className="flex-1">
                                                    <label className="block text-[10px] font-bold text-primary-300 uppercase tracking-wider mb-1">
                                                        Start Page
                                                    </label>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        max={pageCount}
                                                        value={startPage}
                                                        onChange={(e) => setStartPage(Math.max(1, Math.min(parseInt(e.target.value) || 1, endPage)))}
                                                        className="w-full bg-dark-900/60 border border-white/10 rounded-lg px-2 py-1.5 text-sm text-center font-bold"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <label className="block text-[10px] font-bold text-primary-300 uppercase tracking-wider mb-1">
                                                        End Page
                                                    </label>
                                                    <input
                                                        type="number"
                                                        min={startPage}
                                                        max={pageCount}
                                                        value={endPage}
                                                        onChange={(e) => setEndPage(Math.max(startPage, parseInt(e.target.value) || startPage))}
                                                        className="w-full bg-dark-900/60 border border-white/10 rounded-lg px-2 py-1.5 text-sm text-center font-bold"
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-xs text-dark-400">
                                                Using the main extracted content for this source.
                                            </div>
                                        )}
                                    </div>
                                )}

                                {retrievalMode === 'video_range' && !showingSetup && (
                                    <div className={`space-y-4 ${activeSelection ? 'opacity-50 pointer-events-none' : ''}`}>
                                        <div className="flex gap-4">
                                            <div className="flex-1">
                                                <label className="block text-[10px] font-bold text-primary-300 uppercase tracking-wider mb-1">
                                                    Start Time (mm:ss)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={startTime}
                                                    onChange={(e) => setStartTime(e.target.value)}
                                                    className="w-full bg-dark-900/60 border border-white/10 rounded-lg px-2 py-1.5 text-sm text-center font-bold"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <label className="block text-[10px] font-bold text-primary-300 uppercase tracking-wider mb-1">
                                                    End Time (mm:ss)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={endTime}
                                                    onChange={(e) => setEndTime(e.target.value)}
                                                    className="w-full bg-dark-900/60 border border-white/10 rounded-lg px-2 py-1.5 text-sm text-center font-bold"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Selected Text Override */}
                                {activeSelection && (
                                    <div className="p-2 rounded bg-primary-500/10 border border-primary-500/20 text-primary-300 text-xs flex items-center justify-between gap-2 mt-3">
                                        <div className="flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                            <span>Using selected text</span>
                                        </div>
                                        <button
                                            onClick={clearSelection}
                                            className="text-primary-300 hover:text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-primary-500/20 hover:bg-primary-500/40 transition-colors"
                                        >
                                            Clear
                                        </button>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => onGenerate('flashcards')}
                                disabled={generating || !isConfigured}
                                className="btn-secondary w-full py-3.5 justify-center disabled:opacity-50"
                            >
                                {generating ? <Loader2 className="w-5 h-5 animate-spin" /> : `Generate ${cardCount} Flashcards`}
                            </button>

                            {generating && (
                                <div className="mt-2">
                                    <div className="text-[10px] uppercase tracking-widest text-dark-500 mb-1">
                                        {progressLabel || 'Working...'}
                                    </div>
                                    <div className="h-2 rounded-full bg-dark-800 overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-primary-500 to-primary-700 transition-all"
                                            style={{ width: `${progressPercent}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={() => onGenerate('questions')}
                                disabled={generating || !isConfigured}
                                className="btn-secondary w-full py-3.5 justify-center disabled:opacity-50"
                            >
                                {generating ? <Loader2 className="w-5 h-5 animate-spin" /> : `Generate ${cardCount} Quiz Questions`}
                            </button>

                            {failedGeneration?.items?.length > 0 && (
                                <div className="mt-3 p-3 rounded-lg bg-primary-500/10 border border-primary-500/20 text-xs text-primary-200/80 flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                        <span>{failedGeneration.items.length} items failed to save.</span>
                                    </div>
                                    <button
                                        onClick={onRetryFailed}
                                        className="text-primary-100 hover:text-white text-[10px] font-bold uppercase px-2 py-1 rounded bg-primary-500/20 hover:bg-primary-500/40 transition-colors"
                                    >
                                        Retry Failed
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

const ManualFlashcardForm = ({
    front,
    setFront,
    back,
    setBack,
    tags,
    setTags,
    selectedText,
    success,
    isCreating,
    onSubmit
}) => {
    return (
        <form onSubmit={onSubmit} className="space-y-4 flex-1 flex flex-col">
            <div>
                <label className="block text-xs font-semibold text-dark-400 uppercase tracking-wider mb-2">Front (Question)</label>
                <textarea
                    rows={4}
                    value={front}
                    onChange={(e) => setFront(e.target.value)}
                    className="w-full resize-none bg-dark-900/60 border border-white/10 rounded-xl px-3 py-2 text-sm"
                    placeholder="Enter the question or concept..."
                    required
                />
            </div>

            <div>
                <label className="block text-xs font-semibold text-dark-400 uppercase tracking-wider mb-2">Back (Answer)</label>
                <textarea
                    rows={4}
                    value={back}
                    onChange={(e) => setBack(e.target.value)}
                    className="w-full resize-none bg-dark-900/60 border border-white/10 rounded-xl px-3 py-2 text-sm"
                    placeholder="Enter the answer or explanation..."
                    required
                />
            </div>

            <div>
                <label className="block text-xs font-semibold text-dark-400 uppercase tracking-wider mb-2">Tags (Optional)</label>
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full bg-dark-900/60 border border-white/10 rounded-xl px-3 py-2 text-sm"
                    placeholder="e.g. math, principle, exam"
                />
                <p className="text-[10px] text-dark-500 mt-1 uppercase">Separate tags with commas</p>
            </div>

            {selectedText && !success && (
                <div className="p-3 rounded-lg bg-primary-500/10 border border-primary-500/20 text-xs text-primary-200/70 flex gap-2 animate-fade-in">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    Creating card from selected text
                </div>
            )}

            <div className="mt-auto pt-4 relative">
                <AnimatePresence>
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-primary-500 rounded-xl flex items-center justify-center gap-2 z-10 shadow-lg shadow-primary-500/20"
                        >
                            <CheckCircle2 className="w-6 h-6 text-white" />
                            <span className="text-white font-black uppercase tracking-widest text-sm">Successfully Added</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    type="submit"
                    disabled={isCreating || !front || !back || success}
                    className={`btn-primary w-full transition-all ${success ? 'opacity-0 scale-95' : ''}`}
                >
                    {isCreating ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            <Plus className="w-5 h-5" />
                            Add to Study Deck
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default FlashcardCreator;
