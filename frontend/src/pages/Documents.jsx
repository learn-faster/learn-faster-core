import React, { useEffect, useState } from 'react';
import {
    Plus,
    Search,
    FileText,
    ImageIcon,
    Trash2,
    BookOpen,
    Folder,
    FolderPlus,
    ChevronRight,
    MoreVertical,
    Edit3,
    Grid3X3,
    List,
    X,
    Check,
    Link as LinkIcon,
    Globe,
    FileCode,
    Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import FileUpload from '../components/documents/FileUpload';
import { motion, AnimatePresence } from 'framer-motion';
import useDocumentStore from '../stores/useDocumentStore';

// Mesh gradients for cards based on file types
const TYPE_MESHES = {
    pdf: 'from-primary-600/30 via-indigo-500/10 to-transparent',
    link: 'from-emerald-500/30 via-teal-500/10 to-transparent',
    markdown: 'from-amber-500/30 via-orange-500/10 to-transparent',
    image: 'from-purple-500/30 via-pink-500/10 to-transparent',
    default: 'from-dark-600/30 via-dark-500/10 to-transparent'
};

// Color options for folders
const FOLDER_COLORS = [
    '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b',
    '#ef4444', '#ec4899', '#6366f1', '#84cc16'
];

const Documents = () => {
    const {
        documents,
        folders,
        selectedFolderId,
        isLoading,
        fetchDocuments,
        fetchFolders,
        deleteDocument,
        createFolder,
        deleteFolder,
        setSelectedFolder,
        moveToFolder
    } = useDocumentStore();

    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [showFolderModal, setShowFolderModal] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [newFolderColor, setNewFolderColor] = useState(FOLDER_COLORS[0]);
    const [contextMenu, setContextMenu] = useState(null);

    useEffect(() => {
        fetchDocuments();
        fetchFolders();
    }, [fetchDocuments, fetchFolders]);

    // Polling effect: Check for processing documents every 3 seconds
    useEffect(() => {
        const hasProcessingDocs = documents.some(d => d.status === 'processing' || d.status === 'pending');

        let interval;
        if (hasProcessingDocs) {
            interval = setInterval(() => {
                fetchDocuments();
            }, 3000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [documents, fetchDocuments]);

    // Filter documents by selected folder and search
    const filteredDocs = documents.filter(doc => {
        const matchesFolder = selectedFolderId === null || doc.folder_id === selectedFolderId;
        const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (doc.category && doc.category.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesFolder && matchesSearch;
    });

    // Count unfiled documents
    const unfiledCount = documents.filter(d => !d.folder_id).length;

    const handleCreateFolder = async () => {
        if (!newFolderName.trim()) return;
        try {
            await createFolder({ name: newFolderName, color: newFolderColor });
            setNewFolderName('');
            setNewFolderColor(FOLDER_COLORS[0]);
            setShowFolderModal(false);
        } catch (err) {
            console.error('Failed to create folder:', err);
            alert('Failed to create folder. Please try again.');
        }
    };

    const handleMoveToFolder = async (docId, folderId) => {
        await moveToFolder(docId, folderId);
        setContextMenu(null);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 h-full min-h-[calc(100vh-6rem)]">
            {/* Sidebar Folder Navigation */}
            <div className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
                <div className="glass-morphism rounded-[2.5rem] p-5 flex flex-col h-full lg:h-[calc(100vh-10rem)] sticky top-6 border border-white/5 shadow-2xl overflow-hidden">
                    {/* Interior glow effect */}
                    <div className="absolute top-0 left-0 w-full h-32 bg-primary-500/5 blur-[50px] -z-10" />

                    <div className="flex items-center justify-between mb-8 px-3 pt-4">
                        <div className="flex flex-col">
                            <h3 className="text-xs font-black text-primary-400 uppercase tracking-[0.3em]">Knowledge</h3>
                            <span className="text-[10px] text-dark-500 font-bold uppercase tracking-widest mt-0.5">Collections</span>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowFolderModal(true)}
                            className="p-3 bg-white/5 hover:bg-white/10 text-primary-400 rounded-2xl transition-all border border-white/10 group shadow-lg"
                            title="New Folder"
                        >
                            <FolderPlus className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        </motion.button>
                    </div>

                    <div className="space-y-2 px-1 pb-6 border-b border-white/5">
                        {/* All Documents */}
                        <button
                            onClick={() => setSelectedFolder(null)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-300 ${selectedFolderId === null
                                ? 'bg-gradient-to-r from-primary-600/30 to-primary-500/10 text-white border border-primary-500/30 shadow-lg shadow-primary-950/20'
                                : 'hover:bg-white/5 text-dark-300'
                                }`}
                        >
                            <div className={`p-2 rounded-xl ${selectedFolderId === null ? 'bg-primary-500/20' : 'bg-white/5'}`}>
                                <Folder className="w-4 h-4" />
                            </div>
                            <span className="flex-1 font-semibold text-sm">All Documents</span>
                            <span className="text-[10px] font-bold bg-white/10 px-2 py-0.5 rounded-lg opacity-60">{documents.length}</span>
                        </button>

                        {/* Unfiled */}
                        <button
                            onClick={() => setSelectedFolder('unfiled')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-300 ${selectedFolderId === 'unfiled'
                                ? 'bg-gradient-to-r from-primary-600/30 to-primary-500/10 text-white border border-primary-500/30 shadow-lg shadow-primary-950/20'
                                : 'hover:bg-white/5 text-dark-300'
                                }`}
                        >
                            <div className={`p-2 rounded-xl ${selectedFolderId === 'unfiled' ? 'bg-primary-500/20' : 'bg-white/5'}`}>
                                <FileText className="w-4 h-4" />
                            </div>
                            <span className="flex-1 font-semibold text-sm">Unfiled</span>
                            <span className="text-[10px] font-bold bg-white/10 px-2 py-0.5 rounded-lg opacity-60">{unfiledCount}</span>
                        </button>
                    </div>

                    {/* Scrollable Folder List */}
                    <div className="flex-1 overflow-y-auto mt-4 px-1 space-y-1.5 custom-scrollbar pr-2">
                        {folders.length > 0 ? (
                            folders.map((folder) => (
                                <button
                                    key={folder.id}
                                    onClick={() => setSelectedFolder(folder.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-300 group ${selectedFolderId === folder.id
                                        ? 'bg-gradient-to-r from-primary-600/20 to-primary-500/5 text-white border border-primary-500/30 shadow-lg shadow-primary-950/20'
                                        : 'hover:bg-white/5 text-dark-300'
                                        }`}
                                >
                                    <div
                                        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border border-white/5"
                                        style={{ backgroundColor: folder.color + '20' }}
                                    >
                                        <Folder className="w-3.5 h-3.5" style={{ color: folder.color }} />
                                    </div>
                                    <span className="flex-1 font-semibold text-sm truncate">{folder.name}</span>
                                    <span className="text-[10px] font-bold bg-white/5 px-2 py-0.5 rounded-lg opacity-40 group-hover:opacity-100 transition-opacity">
                                        {folder.document_count}
                                    </span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (window.confirm(`Are you sure you want to delete folder "${folder.name}"? Documents will be unfiled.`)) {
                                                deleteFolder(folder.id);
                                            }
                                        }}
                                        className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/20 rounded-lg text-red-500 transition-all active:scale-90"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </button>
                            ))
                        ) : (
                            <div className="py-10 text-center space-y-2 opacity-30">
                                <FolderPlus className="w-8 h-8 mx-auto text-dark-500" />
                                <p className="text-xs font-medium">No custom folders</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Library View */}
            <div className="flex-1 space-y-12">
                {/* Immersive Header */}
                <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 pt-4">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20">
                                <span className="text-[10px] font-black text-primary-400 uppercase tracking-[0.2em]">
                                    My Research
                                </span>
                            </div>
                            <span className="w-1 h-1 rounded-full bg-white/10" />
                            <span className="text-[10px] text-dark-500 font-bold uppercase tracking-widest">
                                {documents.length} Items Total
                            </span>
                        </div>
                        <h1 className="text-6xl font-black tracking-tighter text-white drop-shadow-2xl">
                            {selectedFolderId === null ? 'The Archive' :
                                selectedFolderId === 'unfiled' ? 'Drifting Files' :
                                    folders.find(f => f.id === selectedFolderId)?.name}
                        </h1>
                        <p className="text-dark-400 text-sm font-medium max-w-lg">
                            {selectedFolderId === null ? 'Your centralized knowledge base for documents, web links, and study materials.' :
                                `Organized focus on ${folders.find(f => f.id === selectedFolderId)?.name || 'this collection'}.`}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-primary-500 text-white shadow-xl' : 'text-dark-400 hover:text-white'}`}
                            >
                                <Grid3X3 className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-primary-500 text-white shadow-xl' : 'text-dark-400 hover:text-white'}`}
                            >
                                <List className="w-5 h-5" />
                            </button>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsUploadOpen(!isUploadOpen)}
                            className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all shadow-2xl
                                ${isUploadOpen
                                    ? 'bg-dark-800 text-white border border-white/10 shadow-black/50'
                                    : 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-primary-500/20'}`}
                        >
                            {isUploadOpen ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                            <span>{isUploadOpen ? 'Close' : 'Import Brain'}</span>
                        </motion.button>
                    </div>
                </div>

                {/* Upload Section */}
                {isUploadOpen && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                        <Card title="Upload New Document" className="border-primary-500/20 shadow-primary-500/10 shadow-3xl bg-primary-500/5 backdrop-blur-xl">
                            <FileUpload
                                onComplete={() => {
                                    setIsUploadOpen(false);
                                    fetchDocuments();
                                }}
                                selectedFolderId={selectedFolderId !== 'unfiled' ? selectedFolderId : null}
                            />
                        </Card>
                    </div>
                )}

                {/* Toolbar */}
                <div className="relative group max-w-2xl">
                    <div className="absolute inset-0 bg-primary-500/5 blur-2xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
                    <div className="relative glass-morphism rounded-2xl p-1 flex items-center border-white/10">
                        <div className="p-3 text-dark-500 group-focus-within:text-primary-400 transition-colors">
                            <Search className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search your library..."
                            className="bg-transparent border-none focus:ring-0 w-full text-lg font-medium placeholder:text-dark-600"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div className="hidden sm:flex gap-1 p-1">
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="p-2 hover:bg-white/5 rounded-xl text-dark-500 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Documents Content */}
                {isLoading ? (
                    <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className={`${viewMode === 'grid' ? 'aspect-[4/3]' : 'h-24'} rounded-3xl animate-pulse bg-white/5 border border-white/5`} />
                        ))}
                    </div>
                ) : filteredDocs.length > 0 ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
                                <AnimatePresence mode="popLayout">
                                    {filteredDocs.map((doc, idx) => (
                                        <motion.div
                                            key={doc.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="group relative glass-morphism rounded-[3rem] p-8 transition-all duration-500 border-white/5 hover:border-primary-500/30 overflow-hidden"
                                        >
                                            {/* Mesh Background */}
                                            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${TYPE_MESHES[doc.file_type] || TYPE_MESHES.default} blur-[80px] group-hover:opacity-100 opacity-60 transition-opacity -z-10`} />

                                            {/* Top Actions HUD */}
                                            <div className="flex items-start justify-between mb-10 translate-y-2 group-hover:translate-y-0 transition-transform">
                                                <div className="p-5 rounded-[2rem] bg-dark-900/50 backdrop-blur-md border border-white/10 shadow-2xl group-hover:border-primary-500/30 transition-colors">
                                                    {doc.file_type === 'pdf' ? (
                                                        <FileText className="w-10 h-10 text-primary-400 group-hover:scale-110 transition-transform" />
                                                    ) : doc.file_type === 'link' ? (
                                                        <Globe className="w-10 h-10 text-emerald-400 group-hover:scale-110 transition-transform" />
                                                    ) : (doc.file_type === 'markdown' || doc.file_type === 'text') ? (
                                                        <FileCode className="w-10 h-10 text-amber-400 group-hover:scale-110 transition-transform" />
                                                    ) : (
                                                        <ImageIcon className="w-10 h-10 text-purple-400 group-hover:scale-110 transition-transform" />
                                                    )}
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setContextMenu({ docId: doc.id, x: e.clientX, y: e.clientY });
                                                        }}
                                                        className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-dark-500 hover:text-white transition-all border border-white/10 active:scale-90"
                                                    >
                                                        <MoreVertical className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            if (window.confirm("Purge this unit from memory?")) deleteDocument(doc.id);
                                                        }}
                                                        className="p-3 bg-white/5 hover:bg-red-500/20 rounded-2xl text-dark-500 hover:text-red-400 transition-all border border-white/10 active:scale-90"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Content Body */}
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-black text-primary-500 uppercase tracking-[0.2em] leading-none">
                                                        {doc.file_type} Unit
                                                    </span>
                                                    {doc.status !== 'completed' && doc.status !== 'success' && (
                                                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-ping" />
                                                    )}
                                                </div>
                                                <h3 className="font-black text-2xl text-white leading-tight line-clamp-2 min-h-[4rem] tracking-tight group-hover:text-primary-300 transition-colors">
                                                    {doc.title}
                                                </h3>

                                                {/* AI Insight Preview Placeholder */}
                                                <div className="bg-white/5 rounded-2xl p-4 border border-white/5 mt-4 min-h-[4rem] group-hover:bg-white/[0.08] transition-colors overflow-hidden relative">
                                                    <div className="absolute top-0 right-0 p-2 opacity-20">
                                                        <Sparkles className="w-4 h-4 text-primary-400" />
                                                    </div>
                                                    <p className="text-[11px] text-dark-400 italic font-serif leading-relaxed line-clamp-2">
                                                        {doc.ai_summary || "Analyzing document structure to synthesize core learning concepts..."}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Progress Footer */}
                                            <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between gap-6">
                                                <div className="flex-1 space-y-3">
                                                    <div className="flex justify-between items-center px-1">
                                                        <span className="text-[9px] font-black text-dark-500 uppercase tracking-[0.15em]">Assimilation</span>
                                                        <span className="text-[10px] font-black text-primary-400">{Math.round((doc.reading_progress || 0) * 100)}%</span>
                                                    </div>
                                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5 relative shadow-inner">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${(doc.reading_progress || 0) * 100}%` }}
                                                            className="h-full bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.3)]"
                                                        />
                                                    </div>
                                                </div>

                                                <Link
                                                    to={doc.status === 'processing' || doc.status === 'pending' ? '#' : `/documents/${doc.id}`}
                                                    className={`aspect-square p-5 rounded-[2rem] flex items-center justify-center transition-all shadow-2xl
                                                        ${(doc.status === 'processing' || doc.status === 'pending' || doc.status === 'uploading')
                                                            ? 'bg-dark-800 text-dark-600 cursor-not-allowed grayscale'
                                                            : 'bg-primary-500 text-white hover:scale-110 hover:shadow-primary-500/40 active:scale-95'}`}
                                                >
                                                    <BookOpen className="w-6 h-6" />
                                                </Link>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <AnimatePresence mode="popLayout">
                                    {filteredDocs.map((doc, idx) => (
                                        <motion.div
                                            key={doc.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ delay: idx * 0.03 }}
                                            className="group flex items-center gap-8 p-6 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-primary-500/20 hover:bg-white/[0.08] transition-all duration-300 relative overflow-hidden"
                                        >
                                            {/* Subtle Glow */}
                                            <div className="absolute left-0 top-0 w-1 h-full bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                                            <div className="p-5 rounded-2xl bg-dark-900 border border-white/5 shrink-0 shadow-2xl group-hover:border-primary-500/30 transition-colors">
                                                {doc.file_type === 'pdf' ? (
                                                    <FileText className="w-8 h-8 text-primary-400" />
                                                ) : doc.file_type === 'link' ? (
                                                    <Globe className="w-8 h-8 text-emerald-400" />
                                                ) : (doc.file_type === 'markdown' || doc.file_type === 'text') ? (
                                                    <FileCode className="w-8 h-8 text-amber-400" />
                                                ) : (
                                                    <ImageIcon className="w-8 h-8 text-purple-400" />
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0 space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="font-black text-xl text-white truncate group-hover:text-primary-300 transition-colors tracking-tight">
                                                        {doc.title}
                                                    </h3>
                                                    {doc.ai_summary && <Sparkles className="w-4 h-4 text-primary-400 animate-pulse" />}
                                                </div>

                                                <div className="flex items-center gap-6">
                                                    <div className="flex items-center gap-3 w-48 shrink-0">
                                                        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                                                            <div
                                                                className="h-full bg-gradient-to-r from-primary-600 to-primary-400 shadow-[0_0_8px_rgba(244,63,94,0.4)]"
                                                                style={{ width: `${(doc.reading_progress || 0) * 100}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-[10px] font-black text-primary-400 tracking-tighter">
                                                            {Math.round((doc.reading_progress || 0) * 100)}%
                                                        </span>
                                                    </div>

                                                    {doc.folder_id && folders.find(f => f.id === doc.folder_id) && (
                                                        <div
                                                            className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/5 flex items-center gap-2"
                                                            style={{ backgroundColor: folders.find(f => f.id === doc.folder_id)?.color + '10', color: folders.find(f => f.id === doc.folder_id)?.color }}
                                                        >
                                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: folders.find(f => f.id === doc.folder_id)?.color }} />
                                                            {folders.find(f => f.id === doc.folder_id)?.name}
                                                        </div>
                                                    )}

                                                    <span className="text-[10px] text-dark-500 font-bold uppercase tracking-widest">
                                                        {doc.file_type} Unit
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 duration-300">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setContextMenu({ docId: doc.id, x: e.clientX, y: e.clientY });
                                                    }}
                                                    className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-dark-400 border border-white/5 hover:text-white"
                                                >
                                                    <MoreVertical className="w-5 h-5" />
                                                </button>
                                                <Link
                                                    to={doc.status === 'processing' || doc.status === 'pending' ? '#' : `/documents/${doc.id}`}
                                                    className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl
                                                        ${(doc.status === 'processing' || doc.status === 'pending' || doc.status === 'uploading')
                                                            ? 'bg-dark-800 text-dark-600 cursor-not-allowed'
                                                            : 'bg-primary-500 text-white hover:shadow-primary-500/30'}`}
                                                >
                                                    {doc.status === 'processing' ? 'Processing' : 'Read Unit'}
                                                </Link>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-24 glass-morphism rounded-[4rem] border border-white/5 relative overflow-hidden flex flex-col items-center justify-center min-h-[500px]"
                    >
                        {/* Background Decor */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 blur-[120px] rounded-full -z-10" />

                        <div className="relative mb-12">
                            <div className="w-40 h-40 rounded-full bg-dark-900 border border-white/10 flex items-center justify-center shadow-2xl relative">
                                <BookOpen className="w-20 h-20 text-primary-400" />
                                <div className="absolute -top-4 -right-4 p-4 rounded-3xl bg-primary-500 text-white shadow-2xl shadow-primary-500/40">
                                    <Sparkles className="w-8 h-8" />
                                </div>
                            </div>
                        </div>

                        <h3 className="text-5xl font-black text-white mb-6 tracking-tighter">
                            {selectedFolderId && selectedFolderId !== 'unfiled'
                                ? "This Collection is Untouched"
                                : "The Archive Awaits Your Brain"}
                        </h3>
                        <p className="text-dark-400 max-w-xl mx-auto text-xl font-medium mb-16 px-6 leading-relaxed">
                            {selectedFolderId && selectedFolderId !== 'unfiled'
                                ? "Initialize this segment by importing documents or research units into this collection."
                                : "Transform raw information into permanent knowledge. Start by importing PDFs, research papers, or web-based knowledge units."}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 items-center">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsUploadOpen(true)}
                                className="px-12 py-5 rounded-[2rem] bg-primary-500 text-white font-black text-xl uppercase tracking-widest shadow-2xl shadow-primary-500/30 flex items-center gap-4 group"
                            >
                                <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform" />
                                Initialize Memory
                            </motion.button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mt-24">
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm">
                                <div className="text-3xl font-black text-white/20 mb-2">01</div>
                                <h4 className="text-sm font-bold text-white mb-1">Import Units</h4>
                                <p className="text-xs text-dark-500">PDFs, Articles, Text Files</p>
                            </div>
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm">
                                <div className="text-3xl font-black text-white/20 mb-2">02</div>
                                <h4 className="text-sm font-bold text-white mb-1">Synthesize</h4>
                                <p className="text-xs text-dark-500">AI-Driven Insights & Extraction</p>
                            </div>
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm">
                                <div className="text-3xl font-black text-white/20 mb-2">03</div>
                                <h4 className="text-sm font-bold text-white mb-1">Ascend</h4>
                                <p className="text-xs text-dark-500">Master Concepts with Flashcards</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Context Menu */}
            {
                contextMenu && (
                    <>
                        <div className="fixed inset-0 z-[60] cursor-default" onClick={() => setContextMenu(null)} />
                        <div
                            className="fixed z-[70] glass-morphism bg-dark-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 rounded-2xl py-3 min-w-[220px] animate-in fade-in zoom-in-95 duration-200"
                            style={{ left: Math.min(contextMenu.x, window.innerWidth - 240), top: contextMenu.y }}
                        >
                            <p className="px-5 py-2 text-[10px] font-black text-primary-400 uppercase tracking-[0.2em] mb-1">Organize</p>
                            <button
                                onClick={() => handleMoveToFolder(contextMenu.docId, null)}
                                className={`w-full px-5 py-3 text-left text-sm font-semibold hover:bg-white/5 flex items-center gap-3 transition-colors ${!documents.find(d => d.id === contextMenu.docId)?.folder_id ? 'text-primary-400' : 'text-dark-300'}`}
                            >
                                <FileText className="w-4 h-4 opacity-70" />
                                Move to Unfiled
                            </button>
                            <div className="my-2 border-t border-white/5" />
                            <div className="max-h-[250px] overflow-y-auto custom-scrollbar">
                                {folders.map((folder) => (
                                    <button
                                        key={folder.id}
                                        onClick={() => handleMoveToFolder(contextMenu.docId, folder.id)}
                                        className={`w-full px-5 py-3 text-left text-sm font-semibold hover:bg-white/5 flex items-center gap-3 transition-colors ${documents.find(d => d.id === contextMenu.docId)?.folder_id === folder.id ? 'text-primary-400' : 'text-dark-300'}`}
                                    >
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: folder.color }} />
                                        {folder.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                )
            }

            {/* New Folder Modal */}
            {
                showFolderModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowFolderModal(false)}>
                        <div className="glass-morphism bg-dark-900 border border-white/10 rounded-[2.5rem] p-10 w-full max-w-lg shadow-[0_0_100px_rgba(0,0,0,0.7)] animate-in zoom-in-95 duration-500" onClick={e => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-10">
                                <div className="space-y-1">
                                    <h2 className="text-3xl font-black text-white">New Folder</h2>
                                    <p className="text-dark-500 text-sm font-medium">Categorize your study material</p>
                                </div>
                                <button onClick={() => setShowFolderModal(false)} className="p-3 hover:bg-white/5 rounded-2xl text-dark-500 transition-all active:rotate-90">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <label className="block text-xs font-black text-primary-400 uppercase tracking-widest ml-1">Name Your Collection</label>
                                    <input
                                        type="text"
                                        value={newFolderName}
                                        onChange={(e) => setNewFolderName(e.target.value)}
                                        placeholder="e.g., Organic Chemistry"
                                        className="w-full bg-white/5 border-white/10 text-xl font-bold py-4 px-6 rounded-2xl focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/10 placeholder:text-dark-700 transition-all"
                                        autoFocus
                                    />
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-xs font-black text-primary-400 uppercase tracking-widest ml-1">Visual Identity</label>
                                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                                        {FOLDER_COLORS.map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => setNewFolderColor(color)}
                                                className={`aspect-square rounded-2xl transition-all relative overflow-hidden group ${newFolderColor === color ? 'ring-4 ring-white/20' : 'hover:scale-110'}`}
                                                style={{ backgroundColor: color }}
                                            >
                                                <div className={`absolute inset-0 flex items-center justify-center bg-black/10 transition-opacity ${newFolderColor === color ? 'opacity-100' : 'opacity-0'}`}>
                                                    <Check className="w-6 h-6 text-white" />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-12">
                                <button onClick={() => setShowFolderModal(false)} className="btn-secondary flex-1 py-4 text-sm font-bold uppercase tracking-widest">
                                    Discard
                                </button>
                                <button
                                    onClick={handleCreateFolder}
                                    className="btn-primary flex-1 py-4 text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary-500/20"
                                    disabled={!newFolderName.trim()}
                                >
                                    Create Folder
                                </button>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default Documents;
