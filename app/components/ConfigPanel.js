"use client";
import React from 'react';
import {
    ShieldCheck,
    Zap,
    Cpu,
    Lock,
    Globe,
    ExternalLink
} from 'lucide-react';

const ConfigItem = ({ label, value, status }) => (
    <div className="flex flex-col gap-2 p-4 bg-[#020617] border border-[#1e293b] hover:border-blue-500/30 transition-colors">
        <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
            <span className={`status-dot ${status === 'Active' ? 'status-dot-active' : 'status-dot-error'}`} />
        </div>
        <div className="text-sm font-bold text-white font-mono truncate">{value}</div>
    </div>
);

export default function ConfigPanel() {
    return (
        <div className="space-y-8">
            {/* Terminal Style Config Header */}
            <div className="p-6 bg-[#0f172a] border-l-4 border-blue-500 shadow-xl space-y-6">
                <div className="flex items-center gap-3">
                    <Cpu size={18} className="text-blue-500" />
                    <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">Environment Vitals</h3>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    <ConfigItem
                        label="OpenProject Target"
                        value={process.env.NEXT_PUBLIC_OPENPROJECT_URL || 'UNDEFINED'}
                        status={process.env.NEXT_PUBLIC_OPENPROJECT_URL ? 'Active' : 'Missing'}
                    />
                    <ConfigItem label="Auth Layer" value="X-API-KEY" status="Active" />
                    <ConfigItem label="Sync Logic" value="v1.0.0-PROTOTYPE" status="Active" />
                </div>
            </div>

            {/* Instruction Panel */}
            <div className="p-6 border border-[#1e293b] bg-[#020617] space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-2">
                    <Lock size={14} /> Deployment Guide
                </h4>

                <div className="space-y-5">
                    <div className="flex gap-4 items-start">
                        <span className="text-xs font-black text-blue-500 mt-0.5">01</span>
                        <p className="text-[10px] text-slate-400 font-bold uppercase leading-relaxed tracking-wider">
                            Mount <code className="text-white">API_KEY</code> and <code className="text-white">PROJECT_URL</code> to environment variables.
                        </p>
                    </div>
                    <div className="flex gap-4 items-start border-t border-[#1e293b] pt-4">
                        <span className="text-xs font-black text-blue-500 mt-0.5">02</span>
                        <p className="text-[10px] text-slate-400 font-bold uppercase leading-relaxed tracking-wider">
                            Bind repository webhook to <code className="text-white">/api/webhook</code> endpoint.
                        </p>
                    </div>
                    <div className="flex gap-4 items-start border-t border-[#1e293b] pt-4">
                        <span className="text-xs font-black text-blue-500 mt-0.5">03</span>
                        <p className="text-[10px] text-slate-400 font-bold uppercase leading-relaxed tracking-wider">
                            Prefix commit strings with <code className="text-white">#WPID</code> to authorize synchronization.
                        </p>
                    </div>
                </div>
            </div>

            <button className="w-full bg-[#1e293b] hover:bg-blue-600 text-white font-black py-4 text-[10px] uppercase tracking-widest border-2 border-[#334155] hover:border-blue-400 transition-all flex items-center justify-center gap-3">
                <Globe size={16} />
                Validate OpenProject Bridge
                <ExternalLink size={14} />
            </button>
        </div>
    );
}
