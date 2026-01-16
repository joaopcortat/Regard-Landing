import { motion, useScroll, useTransform } from 'framer-motion';

export function HeroMockup() {
    const { scrollY } = useScroll();
    const rotateX = useTransform(scrollY, [0, 800], [20, 0]);
    const scale = useTransform(scrollY, [0, 800], [0.9, 1]);
    const opacity = useTransform(scrollY, [0, 800], [0.8, 1]);

    return (
        <div className="relative w-full max-w-5xl mx-auto px-6 perspective-1000 mt-20">
            <motion.div
                style={{ rotateX, scale, opacity }}
                className="relative rounded-xl border border-white/10 bg-[#0A0A0A] shadow-2xl overflow-hidden"
            >
                {/* Glass Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none z-10" />

                {/* Mockup Header */}
                <div className="h-10 border-b border-white/10 bg-black/50 flex items-center px-4 gap-2">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                    </div>
                </div>

                {/* Mockup Content (Abstract Dashboard) */}
                <div className="grid grid-cols-12 gap-4 p-6 h-[500px] bg-[#09090b]">
                    {/* Sidebar */}
                    <div className="col-span-2 h-full rounded-lg border border-white/5 bg-white/[0.02]" />

                    {/* Main Content */}
                    <div className="col-span-10 grid grid-cols-3 gap-4 grid-rows-3">
                        {/* Top Stats */}
                        <div className="h-32 rounded-lg border border-white/5 bg-white/[0.02] p-4 flex flex-col justify-between">
                            <div className="w-8 h-8 rounded bg-blue-500/20" />
                            <div className="w-20 h-2 rounded bg-zinc-800" />
                        </div>
                        <div className="h-32 rounded-lg border border-white/5 bg-white/[0.02] p-4 flex flex-col justify-between">
                            <div className="w-8 h-8 rounded bg-green-500/20" />
                            <div className="w-20 h-2 rounded bg-zinc-800" />
                        </div>
                        <div className="h-32 rounded-lg border border-white/5 bg-white/[0.02] p-4 flex flex-col justify-between">
                            <div className="w-8 h-8 rounded bg-purple-500/20" />
                            <div className="w-20 h-2 rounded bg-zinc-800" />
                        </div>

                        {/* Chart Area */}
                        <div className="col-span-3 row-span-2 rounded-lg border border-white/5 bg-white/[0.02] relative overflow-hidden flex items-end">
                            {/* Abstract Chart Lines */}
                            <svg className="w-full h-3/4 absolute bottom-0 left-0" preserveAspectRatio="none">
                                <path d="M0,100 Q100,50 200,80 T400,20" fill="none" stroke="rgba(59,130,246,0.5)" strokeWidth="2" />
                            </svg>
                            <div className="w-full h-full bg-gradient-to-t from-blue-500/10 to-transparent" />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Glow under mockup */}
            <div className="absolute -inset-4 bg-blue-500/20 blur-[100px] -z-10 rounded-full opacity-50" />
        </div>
    );
}
