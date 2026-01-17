import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';
import { Users, DollarSign, Activity, UserMinus, Plus, ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

export default function SimulatorPage() {
    const navigate = useNavigate();
    // --- STATE: The Levers ---
    const [priceImpact, setPriceImpact] = useState(0); // -10% to +30%
    const [volumeImpact, setVolumeImpact] = useState(0); // -20% to +50%
    const [hireDoctor, setHireDoctor] = useState(false);
    const [cutInsurance, setCutInsurance] = useState(false);

    // --- LOGIC: The Engine ---
    const { scenarioData, delta, verdict } = useMemo(() => {
        // BASELINE
        const baseMonthlyRevenue = 150000;
        const baseMonthlyCost = 90000; // 60k Profit
        const baseProfit = baseMonthlyRevenue - baseMonthlyCost;

        // SCENARIO CALCULATIONS
        let scenarioRevenue = baseMonthlyRevenue;
        let scenarioCost = baseMonthlyCost;

        // 1. Cut Insurance (Volume -20%, but Price +5% mix shift efficiency)
        if (cutInsurance) {
            scenarioRevenue = scenarioRevenue * 0.9; // Net revenue drop initially due to volume loss
            // But assume costs drop significantly (less operational headache + lower tax bracket maybe?)
            scenarioCost = scenarioCost * 0.85;
        }

        // 2. Volume Impact (Marketing)
        // Variable cost increases with volume (supplies, tax)
        // Assume 40% of cost is variable
        const variableCostRatio = 0.4;
        const fixedCost = scenarioCost * (1 - variableCostRatio);
        const variableCost = scenarioCost * variableCostRatio;

        const volumeMultiplier = 1 + (volumeImpact / 100);
        scenarioRevenue = scenarioRevenue * volumeMultiplier;
        const newVariableCost = variableCost * volumeMultiplier;
        scenarioCost = fixedCost + newVariableCost;

        // 3. Price Impact (Pure Margin)
        // Price increase goes straight to bottom line (mostly)
        const priceMultiplier = 1 + (priceImpact / 100);
        scenarioRevenue = scenarioRevenue * priceMultiplier;

        // 4. Hire Doctor
        if (hireDoctor) {
            // New doc brings revenue but costs money (split)
            const newDocRev = 40000;
            const newDocCost = 28000; // 70% split/cost
            scenarioRevenue += newDocRev;
            scenarioCost += newDocCost;
        }

        const scenarioProfit = scenarioRevenue - scenarioCost;
        const delta = scenarioProfit - baseProfit;

        // GENERATE CHART DATA
        // Mocking a year projection
        const data = Array.from({ length: 12 }, (_, i) => {
            const month = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"][i];

            // Add some seasonality/noise
            const noise = Math.random() * 5000 - 2500;
            const growth = i * 1000; // Natural growth

            return {
                name: month,
                Atual: Math.round(baseProfit + growth + noise),
                Simulado: Math.round(scenarioProfit + (growth * 1.2) + noise + (delta * (i / 12))) // Delta ramps up
            };
        });

        // VERDICT GENERATION
        let verdictText = "Explora os controles para ver o impacto.";
        if (delta > 5000) {
            verdictText = "🚀 A combinação é potente. O aumento na margem supera a perda de volume inicial.";
        } else if (delta < -2000) {
            verdictText = "⚠️ Cuidado. A estrutura de custos atual não suporta essa queda de volume.";
        } else {
            verdictText = "💡 Cenário equilibrado. Considere focar em branding para sustentar o novo preço.";
        }

        return {
            currentData: data.map(d => ({ ...d, value: d.Atual })),
            scenarioData: data,
            delta,
            verdict: verdictText
        };

    }, [priceImpact, volumeImpact, hireDoctor, cutInsurance]);

    // Format currency
    const fmt = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);

    return (
        <div className="h-screen bg-[#09090b] text-zinc-100 flex overflow-hidden font-sans">

            {/* LEFT PANEL: CONTROLS (Cockpit) */}
            <div className="w-[400px] flex-shrink-0 border-r border-[#27272a] bg-[#0c0c0e] p-8 flex flex-col overflow-y-auto">

                <button
                    onClick={() => navigate('/')}
                    className="mb-8 flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-white transition-colors uppercase tracking-wider group"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Voltar
                </button>

                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-white tracking-tight mb-2">Simulador de Negócios</h1>
                    <p className="text-sm text-zinc-400">Modele o futuro da sua clínica. Ajuste as variáveis e veja o impacto no lucro líquido.</p>
                </div>

                {/* SCENARIO PRESETS */}
                <div className="grid grid-cols-2 gap-3 mb-10">
                    <button
                        onClick={() => { setCutInsurance(true); setPriceImpact(15); setVolumeImpact(-10); toast("Cenário carregado: Sair dos Convênios"); }}
                        className="p-3 rounded-xl bg-[#18181b] border border-[#27272a] hover:border-zinc-600 transition-colors text-left"
                    >
                        <div className="text-xs text-zinc-500 mb-1">Cenário A</div>
                        <div className="text-xs font-semibold">Sair dos Convênios</div>
                    </button>
                    <button
                        onClick={() => { setHireDoctor(true); setVolumeImpact(20); toast("Cenário carregado: Expansão"); }}
                        className="p-3 rounded-xl bg-[#18181b] border border-[#27272a] hover:border-zinc-600 transition-colors text-left"
                    >
                        <div className="text-xs text-zinc-500 mb-1">Cenário B</div>
                        <div className="text-xs font-semibold">Contratar Dermato</div>
                    </button>
                </div>

                <div className="space-y-8 flex-1">

                    {/* SLIDER A: PREÇO */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                <DollarSign size={14} className="text-emerald-500" />
                                Preço Médio
                            </label>
                            <span className={cn("text-xs font-mono font-bold px-2 py-1 rounded", priceImpact > 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-800 text-zinc-400")}>
                                {priceImpact > 0 ? '+' : ''}{priceImpact}%
                            </span>
                        </div>
                        <input
                            type="range"
                            min="-10"
                            max="30"
                            step="5"
                            value={priceImpact}
                            onChange={(e) => setPriceImpact(Number(e.target.value))}
                            className="w-full h-1.5 bg-zinc-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white hover:[&::-webkit-slider-thumb]:scale-110 transition-all"
                        />
                        <p className="text-[10px] text-zinc-500">
                            Impacto direto na margem. Aumentar preços pode reduzir volume.
                        </p>
                    </div>

                    {/* SLIDER B: VOLUME */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                <Users size={14} className="text-blue-500" />
                                Volume de Pacientes
                            </label>
                            <span className={cn("text-xs font-mono font-bold px-2 py-1 rounded", volumeImpact > 0 ? "bg-blue-500/10 text-blue-400" : "bg-zinc-800 text-zinc-400")}>
                                {volumeImpact > 0 ? '+' : ''}{volumeImpact}%
                            </span>
                        </div>
                        <input
                            type="range"
                            min="-20"
                            max="50"
                            step="5"
                            value={volumeImpact}
                            onChange={(e) => setVolumeImpact(Number(e.target.value))}
                            className="w-full h-1.5 bg-zinc-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white hover:[&::-webkit-slider-thumb]:scale-110 transition-all"
                        />
                        <p className="text-[10px] text-zinc-500">
                            Simula campanhas de marketing ou sazonalidade.
                        </p>
                    </div>

                    <div className="h-px bg-[#27272a] my-6" />

                    {/* TOGGLES */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-xl bg-[#121214] border border-[#27272a]">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                                    <Plus size={16} />
                                </div>
                                <div>
                                    <div className="text-sm font-medium">Contratar Médico</div>
                                    <div className="text-[10px] text-zinc-500">+ Custo Fixo / + Receita</div>
                                </div>
                            </div>
                            <button
                                onClick={() => setHireDoctor(!hireDoctor)}
                                className={cn("w-10 h-5 rounded-full relative transition-colors", hireDoctor ? "bg-purple-600" : "bg-zinc-700")}
                            >
                                <div className={cn("absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform", hireDoctor && "translate-x-5")} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-xl bg-[#121214] border border-[#27272a]">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
                                    <UserMinus size={16} />
                                </div>
                                <div>
                                    <div className="text-sm font-medium">Cortar Convênios</div>
                                    <div className="text-[10px] text-zinc-500">- Volume / + Ticket Médio</div>
                                </div>
                            </div>
                            <button
                                onClick={() => setCutInsurance(!cutInsurance)}
                                className={cn("w-10 h-5 rounded-full relative transition-colors", cutInsurance ? "bg-rose-600" : "bg-zinc-700")}
                            >
                                <div className={cn("absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform", cutInsurance && "translate-x-5")} />
                            </button>
                        </div>
                    </div>

                </div>

                <div className="mt-8 pt-6 border-t border-[#27272a]">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-zinc-500 uppercase tracking-widest">Lucro Atual (Mês)</span>
                        <span className="text-sm font-mono text-zinc-400">R$ 60.000</span>
                    </div>
                </div>

            </div>

            {/* RIGHT PANEL: PROJECTION (The Future) */}
            <div className="flex-1 bg-[#09090b] flex flex-col relative overflow-hidden">

                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#121214_1px,transparent_1px),linear-gradient(to_bottom,#121214_1px,transparent_1px)] bg-[size:40px_40px] opacity-50 pointer-events-none" />

                {/* Header Overlay */}
                <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-start z-10">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-1">Projeção Financeira</h2>
                        <div className="flex items-center gap-2 text-zinc-400 text-sm">
                            <Activity size={14} />
                            <span>Impacto acumulado em 12 meses</span>
                        </div>
                    </div>

                    {/* THE DELTA BADGE */}
                    <div className={cn("px-6 py-4 rounded-2xl border backdrop-blur-xl transition-colors",
                        delta >= 0
                            ? "bg-emerald-900/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
                            : "bg-rose-900/10 border-rose-500/30 text-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.1)]"
                    )}>
                        <div className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-1">Diferença Projetada</div>
                        <div className="text-3xl font-mono font-bold tracking-tight">
                            {delta > 0 ? '+' : ''}{fmt(delta)} <span className="text-lg opacity-60">/ mês</span>
                        </div>
                    </div>
                </div>

                {/* CHART AREA */}
                <div className="flex-1 px-8 pt-32 pb-8">
                    <div className="w-full h-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={scenarioData}>
                                <defs>
                                    <linearGradient id="colorSim" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorBase" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#52525b" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#52525b" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="#52525b"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    dy={10}
                                />
                                <YAxis
                                    stroke="#52525b"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(val) => `R$${val / 1000}k`}
                                    dx={-10}
                                />
                                <Tooltip
                                    content={({ active, payload, label }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="bg-[#18181b] border border-[#27272a] p-4 rounded-xl shadow-2xl">
                                                    <p className="text-zinc-400 text-xs mb-2">{label}</p>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2 text-sm font-medium text-blue-400">
                                                            <div className="w-2 h-2 rounded-full bg-blue-400" />
                                                            Simulado: {fmt(payload[1]?.value as number)}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                                                            <div className="w-2 h-2 rounded-full bg-zinc-600" />
                                                            Atual: {fmt(payload[0]?.value as number)}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="Atual"
                                    stroke="#52525b"
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    fill="url(#colorBase)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="Simulado"
                                    stroke="#3b82f6"
                                    strokeWidth={4}
                                    fill="url(#colorSim)"
                                // Add glow filter effect in SVG if possible, or reliance on CSS shadow
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* AI VERDICT BAR */}
                <div className="h-24 bg-[#0c0c0e] border-t border-[#27272a] p-6 flex items-center justify-center">
                    <p className="text-zinc-400 text-sm max-w-2xl text-center leading-relaxed">
                        <span className="text-blue-400 font-semibold mr-2">Cadran AI:</span>
                        {verdict}
                    </p>
                </div>

            </div>
        </div>
    );
}
