"use client";
import React from 'react';
import SyncFeed from './components/SyncFeed';
import ConfigPanel from './components/ConfigPanel';
import {
  Terminal,
  Settings,
  Github,
  Zap,
  Activity,
  Cpu
} from 'lucide-react';

export default function Home() {
  return (
    <div className="flex bg-[#020617] min-h-screen text-white font-sans selection:bg-blue-500 selection:text-white">
      {/* SOLID SIDEBAR */}
      <aside className="fixed left-0 top-0 bottom-0 w-20 bg-[#020617] border-r border-[#1e293b] z-50 flex flex-col items-center py-8 gap-12">
        <div className="w-12 h-12 bg-blue-600 flex items-center justify-center text-white font-black text-xl border-2 border-blue-400">
          OP
        </div>

        <nav className="flex-1 space-y-8">
          <div className="p-3 text-blue-500 border-l-2 border-blue-500 bg-blue-500/5">
            <Terminal size={24} />
          </div>
          <div className="p-3 text-slate-600 hover:text-white transition-colors cursor-pointer">
            <Activity size={24} />
          </div>
          <div className="p-3 text-slate-600 hover:text-white transition-colors cursor-pointer">
            <Github size={24} />
          </div>
          <div className="p-3 text-slate-600 hover:text-white transition-colors cursor-pointer">
            <Settings size={24} />
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 ml-20">
        {/* TOP STATUS BAR */}
        <div className="h-16 border-b border-[#1e293b] bg-[#020617] sticky top-0 z-40 px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="status-dot status-dot-active" />
              <span className="text-cyber-header text-[10px]">SYSTEM: ONLINE</span>
            </div>
          </div>
          <div className="text-cyber-header text-[10px] text-slate-500">
            AUTO_SYNC_DAEMON_V1
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
            {/* LOG FEED */}
            <div className="xl:col-span-8 space-y-12">
              <header className="space-y-4">
                <h1 className="text-6xl font-black tracking-tighter uppercase italic text-white leading-none">
                  Webhook <span className="text-blue-500">Automation</span>
                </h1>
                <p className="text-slate-500 font-bold uppercase text-xs tracking-[0.2em]">
                  Real-time synchronization engine between Git and OpenProject.
                </p>
              </header>

              <SyncFeed />
            </div>

            {/* SIDE PANELS */}
            <div className="xl:col-span-4 space-y-10">
              <ConfigPanel />

              <div className="p-6 border border-blue-500/30 bg-[#0f172a] space-y-4">
                <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
                  <Cpu size={14} /> Diagnostic Terminal
                </h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase leading-relaxed">
                  Run a heartbeat check across all active hooks and project endpoints.
                </p>
                <button className="w-full bg-blue-600 text-white font-black py-4 text-[10px] uppercase tracking-widest border-b-4 border-blue-800 active:translate-y-1">
                  Run Diagnostic
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
