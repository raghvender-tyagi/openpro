"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
    BarChart3,
    TrendingUp,
    Target,
    Cpu,
    Globe,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';

const MetricCard = ({ label, value, subtext, trend, isPositive }) => (
    <div className="glass-card p-6 space-y-4">
        <div className="flex justify-between items-start">
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">{label}</div>
            <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded ${isPositive ? 'bg-emerald/10 text-emerald border border-emerald/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                {isPositive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {trend}
            </div>
        </div>
        <div className="space-y-1">
            <div className="text-3xl font-black">{value}</div>
            <div className="text-xs text-gray-500 font-medium">{subtext}</div>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: isPositive ? '70%' : '30%' }}
                className={`h-full ${isPositive ? 'bg-emerald' : 'bg-red-500'}`}
            />
        </div>
    </div>
);

export default function Analytics() {
    return (
        <div className="p-8 space-y-12">
            <header className="space-y-1">
                <h2 className="text-4xl font-black tracking-tight">System <span className="text-gradient">Analytics</span></h2>
                <p className="text-gray-500 font-medium">Deep meta-data extraction and performance metrics.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard label="Compute Load" value="42.8%" subtext="Average across clusters" trend="+4.2%" isPositive={false} />
                <MetricCard label="Data Velocity" value="1.2 GB/s" subtext="Real-time throughput" trend="+18.4%" isPositive={true} />
                <MetricCard label="Error Rate" value="0.002%" subtext="Across all endpoints" trend="-0.1%" isPositive={true} />
                <MetricCard label="Uptime" value="99.99%" subtext="Last 30 days" trend="Stable" isPositive={true} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Performance Graph Placeholder */}
                <div className="glass-card p-8 min-h-[400px] flex flex-col gap-8">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-electric/10 text-electric">
                                <BarChart3 size={20} />
                            </div>
                            <h3 className="text-lg font-bold">Latency Spectrum</h3>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">D</button>
                            <button className="px-3 py-1 bg-electric/20 rounded-lg text-[10px] font-bold uppercase tracking-widest text-electric border border-electric/20">W</button>
                            <button className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">M</button>
                        </div>
                    </div>

                    <div className="flex-1 flex items-end gap-2 pb-4">
                        {[45, 67, 43, 89, 56, 34, 78, 92, 54, 32, 65, 87, 45, 67, 43, 89, 56, 34].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: i * 0.05 }}
                                className="flex-1 bg-gradient-to-t from-electric/20 via-electric/50 to-electric rounded-t-sm"
                            />
                        ))}
                    </div>

                    <div className="grid grid-cols-3 border-t border-white/5 pt-6">
                        <div className="text-center">
                            <div className="text-[10px] font-bold uppercase text-gray-500 mb-1">Peak</div>
                            <div className="text-lg font-black text-electric">92ms</div>
                        </div>
                        <div className="text-center border-x border-white/5">
                            <div className="text-[10px] font-bold uppercase text-gray-500 mb-1">Median</div>
                            <div className="text-lg font-black text-emerald">44ms</div>
                        </div>
                        <div className="text-center">
                            <div className="text-[10px] font-bold uppercase text-gray-500 mb-1">P99</div>
                            <div className="text-lg font-black text-purple">128ms</div>
                        </div>
                    </div>
                </div>

                {/* Intelligence Report */}
                <div className="space-y-6">
                    <div className="glass-card p-8 space-y-8 h-full bg-gradient-to-br from-purple/5 to-transparent border-purple/10">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-purple/10 text-purple">
                                <Target size={20} />
                            </div>
                            <h3 className="text-lg font-bold">Optimization Targets</h3>
                        </div>

                        <div className="space-y-6">
                            {[
                                { label: 'Edge Caching', score: 88, status: 'Healthy', icon: Globe },
                                { label: 'DB Query Logic', score: 42, status: 'Needs Optimization', icon: Cpu },
                                { label: 'Asset Delivery', score: 95, status: 'Excellent', icon: TrendingUp }
                            ].map((target, i) => (
                                <div key={i} className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <target.icon size={16} className="text-gray-500" />
                                            <span className="text-sm font-bold">{target.label}</span>
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase tracking-widest ${target.score < 50 ? 'text-red-500' : 'text-emerald'}`}>
                                            {target.status}
                                        </span>
                                    </div>
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-[1px]">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${target.score}%` }}
                                            className={`h-full rounded-full ${target.score < 50 ? 'bg-red-500' : 'bg-emerald'}`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-4 py-4 text-[10px] font-bold tracking-[0.2em] uppercase text-purple bg-purple/10 hover:bg-purple/20 transition-all border border-purple/20 rounded-xl">
                            Initiate Full System Audit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
