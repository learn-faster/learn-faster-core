import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileText, ImageIcon, Loader2, Link as LinkIcon, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useDocumentStore from '../../stores/useDocumentStore';

const FileUpload = ({ onComplete, selectedFolderId: initialFolderId }) => {
    const [activeTab, setActiveTab] = useState('upload'); // 'upload' or 'link'
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [category, setCategory] = useState('');
    const [folderId, setFolderId] = useState(initialFolderId || '');
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);

    const { uploadDocument, addLinkDocument, folders } = useDocumentStore();

    const onDrop = useCallback((acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        setFile(selectedFile);
        if (selectedFile) {
            setTitle(selectedFile.name.replace(/\.[^/.]+$/, ""));
            setError(null);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'image/*': ['.jpg', '.jpeg', '.png'],
            'text/markdown': ['.md'],
            'text/plain': ['.txt']
        },
        multiple: false
    });

    const handleUpload = async () => {
        setError(null);
        if (activeTab === 'upload') {
            if (!file || !title) return;

            setIsUploading(true);
            const formData = new FormData();
            formData.append('file', file);
            formData.append('title', title);
            formData.append('category', category);
            if (folderId && folderId !== 'unfiled') {
                formData.append('folder_id', folderId);
            }

            try {
                await uploadDocument(formData);
                resetForm();
                if (onComplete) onComplete();
            } catch (err) {
                setError(err.message || 'Neural uplink failed. Verify connection.');
            } finally {
                setIsUploading(false);
            }
        } else {
            if (!url || !title) return;

            setIsUploading(true);
            try {
                await addLinkDocument({
                    url,
                    title,
                    category,
                    folder_id: (folderId && folderId !== 'unfiled') ? folderId : null,
                    tags: category ? category.split(',').map(t => t.trim()) : []
                });
                resetForm();
                if (onComplete) onComplete();
            } catch (err) {
                setError(err.message || 'External resource synthesis failed.');
            } finally {
                setIsUploading(false);
            }
        }
    };

    const resetForm = () => {
        setFile(null);
        setTitle('');
        setUrl('');
        setCategory('');
        setFolderId(initialFolderId || '');
        setError(null);
    };

    return (
        <div className="space-y-10">
            {/* Tab Switcher */}
            {!file && (
                <div className="flex p-1.5 bg-dark-950/50 rounded-2xl w-fit mx-auto border border-white/5 shadow-inner backdrop-blur-sm">
                    <button
                        onClick={() => setActiveTab('upload')}
                        className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 ${activeTab === 'upload' ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' : 'text-dark-500 hover:text-dark-300'}`}
                    >
                        <Upload className="w-4 h-4" />
                        Uplink File
                    </button>
                    <button
                        onClick={() => setActiveTab('link')}
                        className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 ${activeTab === 'link' ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' : 'text-dark-500 hover:text-dark-300'}`}
                    >
                        <LinkIcon className="w-4 h-4" />
                        External URL
                    </button>
                </div>
            )}

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-widest text-center"
                >
                    {error}
                </motion.div>
            )}

            {activeTab === 'upload' ? (
                !file ? (
                    <div
                        {...getRootProps()}
                        className={`
                            border-2 border-dashed rounded-[2rem] p-16 text-center transition-all cursor-pointer group relative overflow-hidden
                            ${isDragActive ? 'border-primary-500 bg-primary-500/5 scale-[1.01]' : 'border-white/5 hover:border-white/10 hover:bg-white/[0.02]'}
                        `}
                    >
                        <input {...getInputProps()} />
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative z-10">
                            <div className="mx-auto w-20 h-20 rounded-2xl bg-dark-950 border border-white/5 flex items-center justify-center mb-6 shadow-xl group-hover:scale-105 transition-transform">
                                <Upload className="w-8 h-8 text-primary-400" />
                            </div>
                            <h3 className="text-xl font-black text-white mb-2 tracking-tight">Initialize Ingestion</h3>
                            <p className="text-dark-500 font-bold uppercase tracking-[0.2em] text-[9px] leading-relaxed">
                                PDF • IMAGE • MARKDOWN • TEXT<br />
                                <span className="opacity-40">MAX PAYLOAD: 50MB</span>
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-dark-900/60 border border-white/5 rounded-[2rem] p-8 relative overflow-hidden shadow-xl backdrop-blur-sm">
                        <div className="absolute top-0 right-0 p-6">
                            <button
                                onClick={() => setFile(null)}
                                className="p-3 bg-white/5 hover:bg-rose-500/10 rounded-xl text-dark-500 hover:text-rose-400 transition-all border border-white/5"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex items-center gap-6 mb-10">
                            <div className="p-6 rounded-2xl bg-dark-950 border border-white/5 shadow-xl">
                                {file.type === 'application/pdf' ? (
                                    <FileText className="w-10 h-10 text-primary-400" />
                                ) : (
                                    <ImageIcon className="w-10 h-10 text-primary-400" />
                                )}
                            </div>
                            <div className="flex-1 overflow-hidden space-y-2">
                                <p className="text-2xl font-black truncate text-white tracking-tight">{file.name}</p>
                                <div className="flex items-center gap-4">
                                    <span className="text-[10px] font-black text-primary-500 uppercase tracking-widest bg-primary-500/10 px-3 py-1 rounded-lg">
                                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                                    </span>
                                    <span className="text-[10px] font-black text-dark-500 uppercase tracking-[0.2em]">Ready for synthesis</span>
                                </div>
                            </div>
                        </div>

                        <FormInputs
                            title={title}
                            setTitle={setTitle}
                            category={category}
                            setCategory={setCategory}
                            folderId={folderId}
                            setFolderId={setFolderId}
                            folders={folders}
                            handleUpload={handleUpload}
                            isUploading={isUploading}
                            buttonText="Begin Neural Uplink"
                        />
                    </div>
                )
            ) : (
                <div className="bg-dark-900/60 border border-white/5 rounded-[2rem] p-8 space-y-8 shadow-xl relative overflow-hidden backdrop-blur-sm">
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary-500 opacity-40" />

                    <div className="flex items-center gap-5 mb-2">
                        <div className="p-4 rounded-xl bg-dark-950 border border-white/5 shadow-xl">
                            <Globe className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div className="space-y-0.5">
                            <h4 className="text-lg font-black text-white uppercase tracking-wider">External Synapse</h4>
                            <p className="text-[9px] text-dark-500 font-black uppercase tracking-[0.2em] opacity-40">ArXiv • Research • Open Knowledge</p>
                        </div>
                    </div>

                    <div className="space-y-10">
                        <div className="space-y-4">
                            <label className="block text-[10px] font-black text-primary-400 uppercase tracking-[0.3em] ml-2">Remote Resource Address</label>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-primary-500/5 rounded-[1.5rem] blur-xl group-focus-within:bg-primary-500/10 transition-all" />
                                <Globe className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-dark-600 group-focus-within:text-cyan-400 transition-colors z-10" />
                                <input
                                    type="url"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="https://research-gateway.org/protocol/..."
                                    className="relative w-full bg-dark-900/80 border-white/10 text-white pl-16 h-20 rounded-[1.5rem] text-lg font-bold focus:ring-[12px] focus:ring-primary-500/10 focus:border-cyan-500/40 transition-all z-10 shadow-2xl"
                                />
                            </div>
                        </div>

                        <FormInputs
                            title={title}
                            setTitle={setTitle}
                            category={category}
                            setCategory={setCategory}
                            folderId={folderId}
                            setFolderId={setFolderId}
                            folders={folders}
                            handleUpload={handleUpload}
                            isUploading={isUploading}
                            buttonText="Synthesize Resource"
                            isLink={true}
                            url={url}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

const FormInputs = ({ title, setTitle, category, setCategory, folderId, setFolderId, folders, handleUpload, isUploading, buttonText, isLink, url }) => (
    <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
                <label className="block text-[10px] font-black text-dark-500 uppercase tracking-[0.3em] ml-1">Label</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Document title"
                    className="w-full bg-dark-950 border border-white/5 text-white h-14 px-6 rounded-xl font-medium focus:border-primary-500/50 transition-all placeholder:text-dark-600 shadow-inner"
                />
            </div>
            <div className="space-y-3">
                <label className="block text-[10px] font-black text-dark-500 uppercase tracking-[0.3em] ml-1">Destination</label>
                <select
                    value={folderId}
                    onChange={(e) => setFolderId(e.target.value)}
                    className="w-full bg-dark-950 border border-white/5 text-white h-14 px-6 rounded-xl font-medium focus:outline-none focus:border-primary-500/50 transition-all appearance-none cursor-pointer shadow-inner"
                >
                    <option value="">UNCATEGORIZED</option>
                    {folders.map(f => (
                        <option key={f.id} value={f.id}>{f.name.toUpperCase()}</option>
                    ))}
                </select>
            </div>
        </div>

        <div className="space-y-3">
            <label className="block text-[10px] font-black text-dark-500 uppercase tracking-[0.3em] ml-1">Category (Optional)</label>
            <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Physics, Cognitive Science"
                className="w-full bg-dark-950 border border-white/5 text-white h-14 px-6 rounded-xl font-medium focus:border-primary-500/50 transition-all placeholder:text-dark-600 shadow-inner"
            />
        </div>

        <motion.button
            whileHover={{ scale: 1.01, y: -1 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleUpload}
            disabled={isUploading || !title || (isLink && !url)}
            className="w-full mt-8 h-14 rounded-xl bg-primary-500 hover:bg-primary-600 text-white flex items-center justify-center gap-3 shadow-lg shadow-primary-500/20 text-[11px] font-black uppercase tracking-[0.3em] transition-all disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed"
        >
            {isUploading ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Ingesting...
                </>
            ) : (
                <>
                    {isLink ? <Globe className="w-5 h-5" /> : <Upload className="w-5 h-5" />}
                    {buttonText}
                </>
            )}
        </motion.button>
    </div>
);

export default FileUpload;
