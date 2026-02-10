import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, CheckCircle2, RefreshCw, FileText, Layers, Sparkles, Target, Download, Lock, Play } from 'lucide-react';
import ForceGraph2D from 'react-force-graph-2d';

import curriculumService from '../services/curriculum';
import api from '../services/api';
import InlineErrorBanner from '../components/common/InlineErrorBanner';
import usePracticeStore from '../stores/usePracticeStore';

const CurriculumView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [curriculum, setCurriculum] = useState(null);
    const [timeline, setTimeline] = useState([]);
    const [metrics, setMetrics] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [replanning, setReplanning] = useState(false);
    const [exportingWeek, setExportingWeek] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [viewMode, setViewMode] = useState('list');
    const [graphRemote, setGraphRemote] = useState(null);
    const startPracticeSession = usePracticeStore((state) => state.startSession);

    useEffect(() => {
        fetchAll();
    }, [id]);

    useEffect(() => {
        const fetchGraph = async () => {
            try {
                const data = await api.get(`/curriculum/${id}/graph`);
                setGraphRemote(data);
            } catch (error) {
                setGraphRemote(null);
            }
        };
        if (id) {
            fetchGraph();
        }
    }, [id]);

    const fetchAll = async () => {
        setLoading(true);
        setErrorMessage('');
        try {
            const [curr, timelineRes, metricsRes, docsRes] = await Promise.all([
                curriculumService.getCurriculum(id),
                curriculumService.getTimeline(id),
                curriculumService.getMetrics(id),
                api.get('/documents/')
            ]);
            setCurriculum(curr);
            setTimeline(timelineRes.weeks || []);
            setMetrics(metricsRes);
            const docs = Array.isArray(docsRes) ? docsRes : (docsRes.items || []);
            setDocuments(docs);
        } catch (error) {
            setErrorMessage(error?.userMessage || error?.message || 'Failed to load curriculum data.');
        } finally {
            setLoading(false);
        }
    };

    const docMap = useMemo(() => {
        const map = {};
        documents.forEach(doc => { map[doc.id] = doc; });
        return map;
    }, [documents]);

    const conceptPath = useMemo(() => {
        const items = [];
        timeline.forEach((week) => {
            (week.focus_concepts || []).forEach((concept) => {
                items.push({ week: week.week_index, concept });
            });
        });
        return items;
    }, [timeline]);

    const graphData = useMemo(() => {
        if (graphRemote?.nodes?.length) {
            return {
                nodes: graphRemote.nodes.map((n) => ({
                    id: n.id,
                    label: n.label || n.id,
                    group: n.doc_id || 0
                })),
                links: graphRemote.links || []
            };
        }
        const nodeMap = new Map();
        const links = [];
        let prevWeekConcepts = [];

        timeline.forEach((week) => {
            const weekConcepts = (week.focus_concepts || []).filter(Boolean);
            weekConcepts.forEach((concept) => {
                if (!nodeMap.has(concept)) {
                    nodeMap.set(concept, {
                        id: concept,
                        label: concept,
                        group: week.week_index
                    });
                }
            });

            if (prevWeekConcepts.length && weekConcepts.length) {
                prevWeekConcepts.forEach((source) => {
                    weekConcepts.forEach((target) => {
                        if (source !== target) {
                            links.push({ source, target });
                        }
                    });
                });
            }
            prevWeekConcepts = weekConcepts;
        });

        return {
            nodes: Array.from(nodeMap.values()),
            links
        };
    }, [timeline, graphRemote]);

    const handleCompleteCheckpoint = async (checkpointId) => {
        try {
            await curriculumService.completeCheckpoint(checkpointId);
            fetchAll();
        } catch (error) {
            setErrorMessage(error?.userMessage || error?.message || 'Failed to complete checkpoint.');
        }
    };

    const handleReplan = async () => {
        setReplanning(true);
        try {
            await curriculumService.replanCurriculum(id);
            fetchAll();
        } catch (error) {
            setErrorMessage(error?.userMessage || error?.message || 'Failed to replan curriculum.');
        } finally {
            setReplanning(false);
        }
    };

    const handleToggleTask = async (taskId) => {
        try {
            await curriculumService.toggleTask(taskId);
            fetchAll();
        } catch (error) {
            setErrorMessage(error?.userMessage || error?.message || 'Failed to update task.');
        }
    };

    const handleStartPracticeTask = async (task) => {
        try {
            const concepts = task?.action_metadata?.concepts || [];
            await startPracticeSession({
                mode: 'focus',
                curriculum_id: id,
                concept_filters: concepts
            });
            navigate('/practice');
        } catch (error) {
            setErrorMessage(error?.userMessage || error?.message || 'Failed to start practice session.');
        }
    };

    const handleDownloadReport = async (weekId) => {
        setExportingWeek(weekId);
        try {
            const report = await curriculumService.getWeekReport(weekId);
            const blob = new Blob([report.markdown || ""], { type: 'text/markdown;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `curriculum-week-${report.week_index}.md`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            setErrorMessage(error?.userMessage || error?.message || 'Failed to download report.');
        } finally {
            setExportingWeek(null);
        }
    };

    const handleStartRecall = async (checkpointId) => {
        try {
            const session = await curriculumService.startCheckpointRecall(checkpointId);
            const docId = session.document_id;
            navigate(`/documents/${docId}?tab=recall&sessionId=${session.id}`);
        } catch (error) {
            setErrorMessage(error?.userMessage || error?.message || 'Failed to start recall.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-dark-950 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-400">Loading Plan...</p>
                </div>
            </div>
        );
    }

    if (!curriculum) {
        return (
            <div className="min-h-screen bg-dark-950 flex items-center justify-center text-white">
                Curriculum not found
            </div>
        );
    }

    const progress = Math.round(metrics?.progress_percent || 0);

    return (
        <div className="min-h-screen bg-dark-950 text-slate-200 relative overflow-hidden">
            <div className="universe-stars">
                <div className="star-layer-1" />
                <div className="star-layer-2" />
            </div>
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary-950/30 to-transparent pointer-events-none" />
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
                <InlineErrorBanner message={errorMessage} className="mb-6" />
                <header className="flex flex-col gap-8 mb-10">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => navigate('/curriculum')}
                            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Curriculums
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="flex p-1 bg-dark-950/60 rounded-2xl border border-white/10">
                                {['list', 'graph'].map((mode) => (
                                    <button
                                        key={mode}
                                        onClick={() => setViewMode(mode)}
                                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all ${viewMode === mode ? 'bg-primary-500 text-white' : 'text-dark-500 hover:text-dark-300'}`}
                                    >
                                        {mode}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={handleReplan}
                                disabled={replanning}
                                className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-all flex items-center gap-2 text-xs font-black uppercase tracking-widest"
                            >
                                <RefreshCw className={`w-4 h-4 ${replanning ? 'animate-spin' : ''}`} />
                                {replanning ? 'Replanning' : 'Replan Weeks'}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-dark-900/50 border border-white/10 rounded-3xl p-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-[10px] font-black uppercase tracking-[0.3em]">
                                <Sparkles className="w-3 h-3" /> Goal-to-Plan
                            </div>
                            <h1 className="text-4xl font-black text-white mt-4">{curriculum.title}</h1>
                            <p className="text-slate-400 mt-3 max-w-2xl">{curriculum.description || "A weekly plan grounded in your documents and the knowledge graph."}</p>
                            <div className="flex flex-wrap gap-4 mt-6 text-xs font-bold uppercase tracking-widest text-slate-500">
                                <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary-400" /> {curriculum.duration_weeks} Weeks</span>
                                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary-400" /> {curriculum.time_budget_hours_per_week} Hours/Week</span>
                                <span className="flex items-center gap-2"><Target className="w-4 h-4 text-primary-400" /> LLM Enhance: {curriculum.llm_enhance ? 'On' : 'Off'}</span>
                                <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-primary-400" /> Order: {curriculum.gating_mode === 'strict' ? 'Locked' : 'Recommended'}</span>
                            </div>
                        </div>
                        <div className="bg-dark-900/60 border border-white/10 rounded-3xl p-6 flex flex-col justify-between">
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black">Progress</p>
                                <p className="text-5xl font-black text-white mt-3">{progress}%</p>
                            </div>
                            <div className="mt-6">
                                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                                    <span>Weeks Complete</span>
                                    <span className="text-white">{metrics?.weeks_completed || 0}/{metrics?.weeks_total || 0}</span>
                                </div>
                                <div className="h-2 rounded-full bg-dark-800 overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-primary-500 to-primary-700" style={{ width: `${progress}%` }} />
                                </div>
                                {metrics?.next_checkpoint_title && (
                                    <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-1">Next Checkpoint</p>
                                        <p className="text-sm text-white font-bold">{metrics.next_checkpoint_title}</p>
                                        {metrics.next_checkpoint_due && (
                                            <p className="text-[11px] text-slate-500 mt-1">Due {new Date(metrics.next_checkpoint_due).toLocaleDateString()}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                <section className="space-y-6">
                    {viewMode === 'graph' && (
                        <div className="bg-dark-900/50 border border-white/10 rounded-3xl p-6">
                            <div className="flex items-center gap-2 text-slate-400 text-xs font-black uppercase tracking-widest mb-4">
                                <Target className="w-4 h-4" /> Curriculum Graph
                            </div>
                            <div className="h-[520px] rounded-2xl overflow-hidden border border-white/10 bg-dark-950/60">
                                <ForceGraph2D
                                    graphData={graphData}
                                    nodeId="id"
                                    nodeLabel="label"
                                    linkDirectionalArrowLength={6}
                                    linkDirectionalArrowRelPos={1}
                                    linkColor={() => 'rgba(181,176,196,0.5)'}
                                    nodeCanvasObject={(node, ctx, globalScale) => {
                                        const label = node.label;
                                        const fontSize = 12 / globalScale;
                                        ctx.font = `${fontSize}px "Bruno Ace", sans-serif`;
                                        ctx.fillStyle = '#e8e5f2';
                                        ctx.fillText(label, node.x + 6, node.y + 4);
                                    }}
                                    nodeColor={(node) => {
                                        const palette = ['#c2efb3', '#dcd6f7', '#2ec4b6', '#7fe3d2', '#49d6c2'];
                                        return palette[(node.group || 0) % palette.length];
                                    }}
                                />
                            </div>
                        </div>
                    )}
                    {conceptPath.length > 0 && (
                        <div className="bg-dark-900/40 border border-white/10 rounded-3xl p-6">
                            <div className="flex items-center gap-2 text-slate-400 text-xs font-black uppercase tracking-widest mb-4">
                                <Target className="w-4 h-4" /> Concept Path
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {conceptPath.map((item, idx) => (
                                    <span key={`${item.week}-${item.concept}-${idx}`} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-200">
                                        W{item.week}: {item.concept}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                    {viewMode === 'list' && (
                        <AnimatePresence>
                        {timeline.map((week) => (
                            <motion.div
                                key={week.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="bg-dark-900/50 border border-white/10 rounded-3xl p-8"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-400">Week {week.week_index}</p>
                                        <h2 className="text-2xl font-black text-white mt-2">{week.goal || "Weekly focus"}</h2>
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {(week.focus_concepts || []).map((concept) => (
                                                <span key={concept} className="px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-200 text-xs font-bold">
                                                    {concept}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest">
                                        {week.estimated_hours || 0} hrs
                                    </span>
                                </div>

                                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="bg-dark-950/70 border border-white/5 rounded-2xl p-6">
                                        <div className="flex items-center gap-2 text-slate-400 text-xs font-black uppercase tracking-widest mb-4">
                                            <Layers className="w-4 h-4" /> Tasks
                                        </div>
                                        <div className="space-y-3">
                                            {(week.tasks || []).map((task) => (
                                                <div key={task.id} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div>
                                                            <p className="text-sm font-bold text-white">{task.title}</p>
                                                            <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-2">
                                                                <span className="uppercase tracking-widest">{task.task_type}</span>
                                                                <span>~{task.estimate_minutes || 30} mins</span>
                                                                {typeof task.mastery_score === 'number' && (
                                                                    <span className="text-primary-300">Mastery {Math.round(task.mastery_score * 100)}%</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => handleToggleTask(task.id)}
                                                            disabled={task.gated && curriculum.gating_mode === 'strict' && task.status !== 'done'}
                                                            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${task.status === 'done' ? 'bg-primary-500/20 text-primary-300' : task.gated && curriculum.gating_mode === 'strict' ? 'bg-rose-500/20 text-rose-300 cursor-not-allowed' : 'bg-white/5 text-slate-300'}`}
                                                        >
                                                            {task.status === 'done' ? 'Done' : task.gated && curriculum.gating_mode === 'strict' ? 'Locked' : 'Mark Done'}
                                                        </button>
                                                    </div>
                                                    {task.notes && (
                                                        <p className="text-xs text-slate-400 mt-2">{task.notes}</p>
                                                    )}
                                                    {task.gated && task.gate_reason && (
                                                        <p className="text-xs text-rose-300 mt-2">{task.gate_reason}</p>
                                                    )}
                                                    {task.linked_doc_id && docMap[task.linked_doc_id] && (
                                                        <button
                                                            onClick={() => {
                                                                const sectionId = task.action_metadata?.section_id;
                                                                const pageRange = task.action_metadata?.page_range;
                                                                const params = new URLSearchParams();
                                                                if (sectionId) params.set('sectionId', sectionId);
                                                                if (pageRange) params.set('pageRange', pageRange);
                                                                const suffix = params.toString() ? `?${params.toString()}` : '';
                                                                navigate(`/documents/${task.linked_doc_id}${suffix}`);
                                                            }}
                                                            className="mt-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary-300 hover:text-primary-200"
                                                        >
                                                            <FileText className="w-4 h-4" /> Open Document
                                                        </button>
                                                    )}
                                                    {['practice', 'quiz', 'review'].includes(task.task_type) && (
                                                        <button
                                                            onClick={() => handleStartPracticeTask(task)}
                                                            className="mt-3 ml-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary-300 hover:text-primary-200"
                                                        >
                                                            <Play className="w-4 h-4" /> Start Practice
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-dark-950/70 border border-white/5 rounded-2xl p-6">
                                        <div className="flex items-center gap-2 text-slate-400 text-xs font-black uppercase tracking-widest mb-4">
                                            <CheckCircle2 className="w-4 h-4" /> Checkpoints
                                        </div>
                                        <div className="space-y-3">
                                            {(week.checkpoints || []).map((cp) => (
                                                <div key={cp.id} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div>
                                                            <p className="text-sm font-bold text-white">{cp.title}</p>
                                                            <p className="text-xs text-slate-400 mt-2">{cp.success_criteria}</p>
                                                        </div>
                                                        <div className="flex flex-col items-end gap-2">
                                                            <button
                                                                onClick={() => handleStartRecall(cp.id)}
                                                                className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/5 text-slate-300"
                                                            >
                                                                Start Recall
                                                            </button>
                                                            <button
                                                                onClick={() => handleCompleteCheckpoint(cp.id)}
                                                                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${cp.status === 'completed' ? 'bg-primary-500/20 text-primary-300' : 'bg-primary-500/20 text-primary-200'}`}
                                                            >
                                                                {cp.status === 'completed' ? 'Completed' : 'Mark Done'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2 mt-3 text-[10px] uppercase tracking-widest text-slate-500">
                                                        <span>{cp.assessment_type}</span>
                                                        {cp.due_date && (
                                                            <span>Due {new Date(cp.due_date).toLocaleDateString()}</span>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-wrap gap-2 mt-3">
                                                        {(cp.linked_doc_ids || []).map((docId) => (
                                                            <button
                                                                key={docId}
                                                                onClick={() => navigate(`/documents/${docId}`)}
                                                                className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-300"
                                                            >
                                                                {docMap[docId]?.title || `Doc ${docId}`}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end mt-6">
                                    <button
                                        onClick={() => handleDownloadReport(week.id)}
                                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-slate-300 hover:bg-white/10 flex items-center gap-2"
                                    >
                                        <Download className="w-3.5 h-3.5" />
                                        {exportingWeek === week.id ? 'Exporting...' : 'Download Weekly Report'}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                        </AnimatePresence>
                    )}
                </section>
            </div>
        </div>
    );
};

export default CurriculumView;
