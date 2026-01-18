import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CadranLogo } from '../brand/CadranLogo';

export function WaitlistCard({ name, email, memberId, onDownload }: { name: string, email: string, memberId: string, onDownload?: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="relative w-full max-w-sm mx-auto aspect-[1.586] rounded-2xl overflow-hidden shadow-2xl group perspective-1000"
        >
            {/* Card Background / Texture */}
            <div className="absolute inset-0 bg-[#0A0F1E] border border-white/10 rounded-2xl z-0">
                {/* Gradient Sheen */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-50"></div>
                {/* Noise Texture (simulated with pattern) */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 filter contrast-150"></div>
            </div>

            {/* Glowing Orbs */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/30 blur-[60px] rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/30 blur-[60px] rounded-full"></div>

            {/* Content Container */}
            <div className="relative z-10 w-full h-full p-6 flex flex-col justify-between">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                        <CadranLogo className="w-6 h-6 text-white" />
                        <span className="text-white font-semibold tracking-wide text-sm">CADRAN</span>
                    </div>
                    <div className="text-[10px] font-mono text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full bg-indigo-500/10">
                        EARLY ACCESS
                    </div>
                </div>

                {/* Chip / Hologram Simulation */}
                <div className="w-10 h-8 bg-gradient-to-br from-yellow-200/20 to-yellow-500/20 rounded-md border border-yellow-400/30 backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                        <div className="w-[120%] h-[1px] bg-white rotate-45"></div>
                        <div className="w-[120%] h-[1px] bg-white -rotate-45"></div>
                    </div>
                </div>

                {/* User Details */}
                <div className="space-y-1">
                    <div className="text-[10px] uppercase text-slate-400 tracking-wider font-medium">MEMBER</div>
                    <div className="text-lg text-white font-medium tracking-tight font-mono uppercase truncate">{name || "Membro Cadran"}</div>
                    <div className="text-xs text-slate-400 font-mono">{email}</div>
                </div>

                {/* Footer / ID */}
                <div className="flex justify-between items-end border-t border-white/10 pt-4 mt-2">
                    <div>
                        <div className="text-[8px] text-slate-500 uppercase tracking-widest mb-0.5">MEMBER ID</div>
                        <div className="font-mono text-sm text-indigo-300 tracking-wider">{memberId}</div>
                    </div>
                    <div className="text-[8px] text-slate-600">VALID THRU 12/26</div>
                </div>
            </div>

            {/* Shine Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
        </motion.div>
    );
}
