import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function ProfitChart() {
    // Data points for the chart
    const data = [15, 25, 22, 35, 45, 60, 85];
    const maxVal = Math.max(...data);

    // SVG Path calculation
    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * 300;
        const y = 150 - (val / maxVal) * 120; // Leave some headroom
        return `${x},${y}`;
    }).join(' ');

    const areaPath = `M0,150 ${points} L300,150 Z`;
    const linePathOnly = `M${points.split(' ').join(' L')}`;

    return (
        <div className="flex w-full h-full bg-[#09090b] rounded-xl overflow-hidden">
            {/* Mock Sidebar */}
            <div className="hidden md:flex w-48 bg-[#0c0c0e] border-r border-white/5 p-4 flex-col gap-2">
                <div className="h-8 mb-6 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-blue-600/20 flex items-center justify-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-sm" />
                    </div>
                    <div className="h-2 w-20 bg-zinc-800 rounded-full" />
                </div>

                {/* Menu Items */}
                {['Visão Geral', 'Agenda', 'Pacientes'].map((item) => (
                    <div key={item} className="h-8 w-full flex items-center px-2 rounded-lg text-zinc-600 text-[10px] font-medium gap-2">
                        <div className="w-3 h-3 rounded-sm bg-zinc-800" />
                        {item}
                    </div>
                ))}
                {/* Active Tab */}
                <div className="h-8 w-full flex items-center px-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-medium gap-2">
                    <div className="w-3 h-3 rounded-sm bg-blue-500" />
                    Lucro Líquido
                </div>
                {['Configurações', 'Sair'].map((item) => (
                    <div key={item} className="h-8 w-full flex items-center px-2 rounded-lg text-zinc-600 text-[10px] font-medium gap-2">
                        <div className="w-3 h-3 rounded-sm bg-zinc-800" />
                        {item}
                    </div>
                ))}
            </div>

            {/* Main Content (The Chart) */}
            <div className="flex-1 p-6 relative overflow-hidden flex flex-col">
                {/* Header / Legend */}
                <div className="flex items-center justify-between mb-8 z-10">
                    <div>
                        <h3 className="text-sm text-gray-400 font-medium uppercase tracking-wider">Evolução de Lucro Líquido</h3>
                        <div className="text-3xl font-bold text-white mt-1 flex items-baseline gap-2">
                            <Counter value={124} suffix="%" />
                            <span className="text-sm font-normal text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                                +R$ 45.2k
                            </span>
                        </div>
                    </div>
                    {/* Timeframe pill */}
                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">
                        Últimos 6 Meses
                    </div>
                </div>

                {/* Chart Area */}
                <div className="flex-1 w-full relative z-10">
                    <svg viewBox="0 0 300 150" className="w-full h-full overflow-visible" preserveAspectRatio="none">

                        {/* Grid Lines */}
                        {[0, 1, 2, 3].map(i => (
                            <motion.line
                                key={i}
                                x1="0"
                                x2="300"
                                y1={150 - (i * 40)}
                                y2={150 - (i * 40)}
                                stroke="currentColor"
                                className="text-white/5"
                                strokeWidth="1"
                            />
                        ))}

                        {/* Gradient Defs */}
                        <defs>
                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4" /> {/* Stronger Blue */}
                                <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                            </linearGradient>
                        </defs>

                        {/* Area Fill */}
                        <motion.path
                            d={areaPath}
                            fill="url(#chartGradient)"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />

                        {/* Line Stroke */}
                        <motion.path
                            d={linePathOnly}
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />

                        {/* Points - Staggered */}
                        {data.map((val, i) => {
                            const x = (i / (data.length - 1)) * 300;
                            const y = 150 - (val / maxVal) * 120;
                            return (
                                <motion.circle
                                    key={i}
                                    cx={x}
                                    cy={y}
                                    r="4"
                                    className="fill-[#09090b] stroke-blue-500 stroke-[2px]"
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 * i + 1.2, duration: 0.4 }}
                                />
                            )
                        })}
                    </svg>
                </div>

                {/* X-Axis Labels */}
                <div className="flex justify-between w-full mt-2 text-[10px] text-gray-500 font-medium uppercase tracking-widest z-10">
                    <span>JAN</span>
                    <span>FEV</span>
                    <span>MAR</span>
                    <span>ABR</span>
                    <span>MAI</span>
                    <span>JUN</span>
                    <span className="text-blue-400 font-bold">JUL</span>
                </div>

                {/* Background Glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-blue-600/10 blur-3xl rounded-full -z-0" />
            </div>
        </div>
    );
}

// Simple counter for effect
function Counter({ value, suffix = "" }: { value: number, suffix?: string }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Very basic linear interpolation for demo
        let start = 0;
        const end = value;
        const duration = 2000;
        const incrementTime = 50;
        const step = end / (duration / incrementTime);

        const timer = setInterval(() => {
            start += step;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, incrementTime);

        return () => clearInterval(timer);
    }, [value]);

    return <span>{count}{suffix}</span>;
}
