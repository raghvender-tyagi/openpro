"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    Filter,
    Github,
    Star,
    GitFork,
    ExternalLink,
    Code2,
    Cpu,
    Globe
} from 'lucide-react';

const ProjectCard = ({ name, description, stars, forks, tags, type }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="glass-card p-6 flex flex-col gap-6 group"
    >
        <div className="flex justify-between items-start">
            <div className="p-3 rounded-xl bg-navy-light border border-white/5 flex items-center justify-center text-gray-500 group-hover:text-electric transition-colors">
                {type === 'frontend' ? <Globe size={24} /> : type === 'backend' ? <Cpu size={24} /> : <Code2 size={24} />}
            </div>
            <div className="flex gap-4">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500">
                    <Star size={12} className="text-yellow-500" />
                    {stars}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500">
                    <GitFork size={12} />
                    {forks}
                </div>
            </div>
        </div>

        <div className="space-y-2">
            <h3 className="text-xl font-bold tracking-tight flex items-center gap-2 group-hover:text-electric transition-colors">
                {name}
                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                {description}
            </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag, i) => (
                <span key={i} className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-white/5 border border-white/5 text-gray-400">
                    {tag}
                </span>
            ))}
        </div>

        <button className="w-full mt-2 py-3 text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 hover:text-white hover:bg-white/5 transition-all border border-dashed border-white/10 rounded-xl">
            View Deployment
        </button>
    </motion.div>
);

export default function Projects() {
    const projects = [
        { name: 'OpenPro Core', description: 'The central engine for open-source intelligence gathering and analysis.', stars: '12.4k', forks: '1.2k', tags: ['Next.js', 'Rust', 'GraphQL'], type: 'backend' },
        { name: 'Aurora UI', description: 'A high-performance design system for enterprise-grade analytics dashboards.', stars: '8.2k', forks: '450', tags: ['React', 'Framer Motion', 'Tailwind'], type: 'frontend' },
        { name: 'Sentinel Security', description: 'Real-time security auditing and vulnerability scanning for large repos.', stars: '5.1k', forks: '890', tags: ['Go', 'Docker', 'eBPF'], type: 'backend' },
        { name: 'Lumina Charts', description: 'Interactive visualization library for complex multi-dimensional data.', stars: '3.4k', forks: '210', tags: ['TypeScript', 'D3.js', 'Canvas'], type: 'frontend' },
        { name: 'NodeFlow', description: 'Distributed compute orchestrator for background intelligence tasks.', stars: '9.8k', forks: '1.5k', tags: ['Python', 'Kubernetes', 'Redis'], type: 'backend' },
        { name: 'Vortex API', description: 'High-throughput edge gateway for real-time telemetry ingestion.', stars: '4.7k', forks: '340', tags: ['Rust', 'Wasm', 'V8'], type: 'backend' },
    ];

    return (
        <div className="p-8 space-y-12">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-1">
                    <h2 className="text-4xl font-black tracking-tight">Project <span className="text-gradient">Marketplace</span></h2>
                    <p className="text-gray-500 font-medium">Explore and deploy certified intelligence modules.</p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-initial">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search marketplace..."
                            className="bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-2.5 outline-none focus:border-electric/50 transition-colors w-full md:w-64 text-sm"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 glass border-white/10 text-gray-400 hover:text-white transition-all text-sm font-bold">
                        <Filter size={18} />
                        <span>Filter</span>
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, i) => (
                    <ProjectCard key={i} {...project} />
                ))}
            </div>
        </div>
    );
}
