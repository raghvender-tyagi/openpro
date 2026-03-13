"use client";
import React, { useState, useEffect } from 'react';
import {
    GitBranch,
    CheckCircle2,
    XCircle,
    Clock,
    Hash,
    Activity,
    AlertCircle,
    ArrowRight
} from 'lucide-react';

export default function SyncFeed() {
    const [logs, setLogs] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchLogs = async () => {
        setIsRefreshing(true);
        try {
            const res = await fetch('/api/webhook');
            const data = await res.json();
            if (Array.isArray(data)) {
                setLogs(data);
            }
        } catch (e) {
            console.error('Failed to fetch logs');
        } finally {
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        fetchLogs();
        const interval = setInterval(fetchLogs, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-8">
            {logs.length === 0 ? (
                <div className="bg-[#020617] border-2 border-dashed border-[#1e293b] p-20 text-center">
                    <Clock size={48} className="mx-auto mb-4 text-[#1e293b]" />
                    <h3 className="text-xl font-black text-slate-500 uppercase tracking-tighter italic">No Stream Activity</h3>
                    <p className="text-[10px] text-slate-600 mt-2 font-black uppercase tracking-widest">Connect Git provider or run simulation</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {logs.map((log) => (
                        <div key={log.id} className="activity-card group">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 bg-[#0f172a] border border-[#1e293b] flex items-center justify-center text-blue-500 group-hover:border-blue-500/50 transition-colors">
                                        <GitBranch size={28} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{log.provider}</span>
                                            <span className="w-1 h-1 bg-slate-700 rounded-full" />
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                {new Date(log.timestamp).toLocaleTimeString()}
                                            </span>
                                        </div>
                                        <h4 className="text-2xl font-black text-white uppercase tracking-tight italic">
                                            {log.repo}
                                        </h4>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 self-end md:self-auto">
                                    <div className="text-right">
                                        <span className="text-[10px] font-black text-slate-500 block uppercase">Payload Weight</span>
                                        <span className="text-lg font-black text-white">{log.commitsCount} COMMITS</span>
                                    </div>
                                    <div className="h-10 w-px bg-[#1e293b]" />
                                    <div className="w-12 h-12 flex items-center justify-center text-slate-700 group-hover:text-blue-500 transition-colors">
                                        <ArrowRight size={24} />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3 mt-6">
                                {log.results.map((result, i) => (
                                    <div key={i} className="flex items-center justify-between bg-[#0f172a]/50 p-4 border border-[#1e293b] hover:border-blue-500/30 transition-colors">
                                        <div className="flex items-center gap-4">
                                            {result.status === 'success' ? (
                                                <CheckCircle2 size={16} className="text-emerald-500" />
                                            ) : (
                                                <XCircle size={16} className="text-red-500" />
                                            )}
                                            <div className="flex flex-col">
                                                <span className="text-[11px] font-mono text-slate-400">HASH: {result.id.slice(0, 10)}</span>
                                                {result.wpId && (
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 border border-blue-500/20">
                                                            TASK #{result.wpId}
                                                        </span>
                                                        <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest truncate max-w-[200px]">
                                                            OPENPROJECT SYNCED
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="hidden sm:flex flex-col text-right mr-4">
                                                <span className="text-[9px] text-slate-500 font-black uppercase">Operation</span>
                                                <span className="text-[10px] text-white font-black uppercase italic">API_POST_COMMENT</span>
                                            </div>
                                            <div className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest border ${result.status === 'success'
                                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                                    : 'bg-red-500/10 text-red-500 border-red-500/30'
                                                }`}>
                                                {result.status === 'success' ? 'STATUS: SUCCESS' : 'STATUS: FAILED'}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
