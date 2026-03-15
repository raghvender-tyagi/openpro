"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    Activity,
    Zap,
    Github,
    ArrowUpRight,
    MoreVertical,
    Search,
    Bell
} from 'lucide-react';

const StatCard = ({ label, value, trend, icon: Icon, color }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="glass-card p-6 flex flex-col gap-4 relative overflow-hidden group"
    >
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Icon size={120} />
        </div>

        <div className="flex justify-between items-start relative z-10">
            <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
                <Icon size={24} className={color.replace('bg-', 'text-')} />
            </div>
            {trend && (
                <div className="flex items-center gap-1 text-emerald font-bold text-xs bg-emerald/10 px-2 py-1 rounded-lg border border-emerald/20">
                    <TrendingUp size={12} />
                    {trend}
                </div>
            )}
        </div>

        <div className="space-y-1 relative z-10">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em]">{label}</p>
            <p className="text-3xl font-black">{value}</p>
        </div>
    </motion.div>
);

const ProjectRow = ({ name, status, health, type }) => (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-navy-light border border-white/5 flex items-center justify-center text-gray-500">
                <Github size={20} />
            </div>
            <div>
                <h4 className="font-bold text-sm tracking-tight">{name}</h4>
                <p className="text-[10px] uppercase font-mono text-gray-500 tracking-widest">{type}</p>
            </div>
        </div>
        <div className="flex items-center gap-8">
            <div className="hidden md:block">
                <div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Health</div>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className={`w-1.5 h-3 rounded-full ${i <= health ? 'bg-emerald' : 'bg-white/10'}`} />
                    ))}
                </div>
            </div>
            <div className="text-right">
                <div className="text-xs font-bold tracking-tighter bg-white/5 px-3 py-1 rounded-lg border border-white/10 text-gray-400 group-hover:text-white transition-colors uppercase">
                    {status}
                </div>
            </div>
            <button className="p-1 text-gray-600 hover:text-white transition-colors">
                <MoreVertical size={18} />
            </button>
        </div>
    </div>
);

export default function Dashboard() {
    return (
        <div className="p-8 space-y-12">
            {/* Dashboard Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-1">
                    <h2 className="text-4xl font-black tracking-tight">Intelligence <span className="text-gradient">Hub</span></h2>
                    <p className="text-gray-500 font-medium">Monitor your open-source ecosystem in real-time.</p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-initial">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="System search..."
                            className="bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-2.5 outline-none focus:border-electric/50 transition-colors w-full md:w-64 text-sm"
                        />
                    </div>
                    <button className="p-2.5 glass border-white/10 text-gray-400 hover:text-white relative">
                        <Bell size={20} />
                        <div className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-navy-dark" />
                    </button>
                    <button className="btn-premium flex items-center gap-2">
                        <Zap size={18} />
                        <span>Deploy</span>
                    </button>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label="Total Nodes" value="1,284" trend="+12.5%" icon={Activity} color="bg-electric" />
                <StatCard label="Active Projects" value="48" trend="+3.2%" icon={Zap} color="bg-emerald" />
                <StatCard label="Security Alerts" value="0" trend="Optimal" icon={TrendingUp} color="bg-purple" />
                <StatCard label="Avg. Response" value="0.4s" icon={Github} color="bg-cyan" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Feed / Projects */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold flex items-center gap-3">
                            Recent Projects
                            <span className="text-[10px] bg-electric/10 text-electric px-2 py-0.5 rounded border border-electric/20 uppercase tracking-widest font-mono">Real-time</span>
                        </h3>
                        <button className="text-xs font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-1">
                            View All <ArrowUpRight size={14} />
                        </button>
                    </div>
                    <div className="space-y-3">
                        <ProjectRow name="facebook/react" status="Active" health={5} type="Frontend Library" />
                        <ProjectRow name="vercel/next.js" status="Idle" health={4} type="Application Framework" />
                        <ProjectRow name="tailwindlabs/tailwindcss" status="Active" health={5} type="Utility CSS" />
                        <ProjectRow name="shadcn/ui" status="Deploying" health={3} type="Component System" />
                        <ProjectRow name="microsoft/typescript" status="Active" health={5} type="Programming Language" />
                    </div>
                </div>

                {/* Sidebar Intelligence */}
                <div className="space-y-8">
                    <div className="glass-card p-6 border-electric/20 bg-electric/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Zap size={64} className="text-electric" />
                        </div>
                        <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Zap size={20} className="text-electric" />
                            Pro Insight
                        </h4>
                        <p className="text-sm text-gray-400 leading-relaxed italic">
                            "System performance has increased by 14% since the last deployment. Network latency is at an all-time low."
                        </p>
                        <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Confidence Score</div>
                            <div className="text-sm font-black text-electric">98.4%</div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold text-xs uppercase tracking-[0.3em] text-gray-500 px-2">System Activity</h4>
                        <div className="space-y-4 px-2">
                            {[
                                { time: '12m ago', msg: 'Deployed node #4812', tag: 'Success' },
                                { time: '1h ago', msg: 'Security backup completed', tag: 'Backup' },
                                { time: '3h ago', msg: 'Database migration initiated', tag: 'System' }
                            ].map((act, i) => (
                                <div key={i} className="flex gap-4 items-start relative pb-6 border-l border-white/5 last:pb-0">
                                    <div className="absolute left-[-4.5px] top-1.5 w-2 h-2 rounded-full bg-electric/50" />
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold leading-none">{act.msg}</p>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">{act.time}</span>
                                            <span className="text-[8px] bg-white/5 text-gray-500 px-1.5 py-0.5 rounded border border-white/5 uppercase font-bold">{act.tag}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
//esfsef