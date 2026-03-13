"use client";
import React, { useState } from 'react';
import {
    LayoutDashboard,
    Layers,
    BarChart3,
    Users2,
    Settings,
    ChevronLeft,
    ChevronRight,
    Zap,
    Bell,
    Search,
    Github
} from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const NavItem = ({ icon: Icon, label, active, collapsed, onClick }) => (
    <button
        onClick={onClick}
        className={clsx(
            "nav-item w-full group relative",
            active && "active",
            collapsed && "justify-center px-0"
        )}
    >
        <Icon size={20} className={clsx("shrink-0", active ? "text-electric" : "group-hover:text-white")} />
        {!collapsed && (
            <span className="font-semibold text-sm tracking-tight">{label}</span>
        )}
        {collapsed && active && (
            <div className="absolute left-0 w-1 h-6 bg-electric rounded-r-full" />
        )}
    </button>
);

export default function Sidebar({ activeTab, setActiveTab }) {
    const [collapsed, setCollapsed] = useState(false);

    const menuItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'projects', icon: Layers, label: 'Projects' },
        { id: 'analytics', icon: BarChart3, label: 'Analytics' },
        { id: 'team', icon: Users2, label: 'Team' },
    ];

    return (
        <motion.aside
            animate={{ width: collapsed ? 80 : 280 }}
            className="fixed left-0 top-0 h-screen glass border-r border-white/5 z-50 flex flex-col transition-all duration-300"
        >
            {/* Sidebar Header */}
            <div className={clsx(
                "p-6 flex items-center justify-between",
                collapsed && "flex-col gap-4"
            )}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric to-purple flex items-center justify-center text-white font-black shadow-lg shadow-electric/20">
                        O
                    </div>
                    {!collapsed && (
                        <span className="text-xl font-black tracking-tighter">OpenPro</span>
                    )}
                </div>
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1.5 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-colors"
                >
                    {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2 mt-8">
                {menuItems.map((item) => (
                    <NavItem
                        key={item.id}
                        {...item}
                        active={activeTab === item.id}
                        collapsed={collapsed}
                        onClick={() => setActiveTab(item.id)}
                    />
                ))}
            </nav>

            {/* Footer / User Profile */}
            <div className="p-4 border-t border-white/5">
                <div className={clsx(
                    "p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer flex items-center gap-3",
                    collapsed && "justify-center"
                )}>
                    <div className="w-10 h-10 rounded-full bg-navy-light border border-white/10 flex items-center justify-center text-xs font-bold text-gray-400">
                        JD
                    </div>
                    {!collapsed && (
                        <div className="flex-1 truncate">
                            <p className="text-sm font-bold truncate">John Doe</p>
                            <p className="text-xs text-gray-500 truncate">Pro Account</p>
                        </div>
                    )}
                </div>
                <button className={clsx(
                    "mt-4 w-full nav-item !py-2",
                    collapsed && "justify-center px-0"
                )}>
                    <Settings size={18} />
                    {!collapsed && <span className="text-xs font-bold uppercase tracking-widest">Settings</span>}
                </button>
            </div>
        </motion.aside>
    );
}
