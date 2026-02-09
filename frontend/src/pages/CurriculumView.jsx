import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, CheckCircle2, RefreshCw, FileText, Layers, Sparkles, Target, Download } from 'lucide-react';

import curriculumService from '../services/curriculum';
import api from '../services/api';
import InlineErrorBanner from '../components/common/InlineErrorBanner';

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

    useEffect(() => {
        fetchAll();
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
                        <button
                            onClick={handleReplan}
                            disabled={replanning}
                            className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-all flex items-center gap-2 text-xs font-black uppercase tracking-widest"
                        >
                            <RefreshCw className={`w-4 h-4 ${replanning ? 'animate-spin' : ''}`} />
                            {replanning ? 'Replanning' : 'Replan Weeks'}
                        </button>
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
                                    <div className="h-full bg-gradient-to-r from-primary-500 to-indigo-500" style={{ width: `${progress}%` }} />
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
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => handleToggleTask(task.id)}
                                                            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${task.status === 'done' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/5 text-slate-300'}`}
                                                        >
                                                            {task.status === 'done' ? 'Done' : 'Mark Done'}
                                                        </button>
                                                    </div>
                                                    {task.notes && (
                                                        <p className="text-xs text-slate-400 mt-2">{task.notes}</p>
                                                    )}
                                                    {task.linked_doc_id && docMap[task.linked_doc_id] && (
                                                        <button
                                                            onClick={() => navigate(`/documents/${task.linked_doc_id}`)}
                                                            className="mt-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary-300 hover:text-primary-200"
                                                        >
                                                            <FileText className="w-4 h-4" /> Open Document
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
                                                                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${cp.status === 'completed' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-primary-500/20 text-primary-200'}`}
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
                </section>
            </div>
        </div>
    );
};

export default CurriculumView;
