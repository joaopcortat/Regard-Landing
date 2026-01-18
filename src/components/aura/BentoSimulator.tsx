import { useState } from 'react';
import { Calculator, Zap } from 'lucide-react';

export function BentoSimulator() {
    const [price, setPrice] = useState(450);
    const [patients, setPatients] = useState(12);

    // Formula: Price * Patients * 22 days
    const total = price * patients * 22;

    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Simulator */}
                <div id="simulator" className="md:col-span-2 glass-panel rounded-xl p-8 flex flex-col md:flex-row items-center gap-8 border-slate-800 bg-[#0B1121]/60">
                    <div className="flex-1 space-y-4">
                        <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-slate-800 text-slate-300 text-[10px] font-medium border border-slate-700">
                            <Calculator className="w-3 h-3" /> ROI Calculator
                        </div>
                        <h3 className="text-2xl font-semibold text-slate-100">Quanto sua clínica deixa na mesa?</h3>
                        <p className="text-sm text-slate-400">Simule o impacto financeiro de reduzir o no-show e otimizar a agenda.</p>
                    </div>

                    <div className="flex-1 w-full bg-slate-950/50 rounded-xl p-6 border border-slate-800 shadow-inner">
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-xs text-slate-400 mb-2">
                                    <span>Valor da Consulta</span>
                                    <span className="text-white font-mono">R$ {price}</span>
                                </div>
                                <input
                                    type="range"
                                    min="200"
                                    max="1000"
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                    className="h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 w-full"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between text-xs text-slate-400 mb-2">
                                    <span>Atendimentos/Dia</span>
                                    <span className="text-white font-mono">{patients}</span>
                                </div>
                                <input
                                    type="range"
                                    min="5"
                                    max="30"
                                    value={patients}
                                    onChange={(e) => setPatients(Number(e.target.value))}
                                    className="h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 w-full"
                                />
                            </div>

                            <div className="pt-4 border-t border-slate-800 mt-4">
                                <div className="flex justify-between items-end">
                                    <span className="text-xs text-slate-500">Potencial Mensal</span>
                                    <span className="text-2xl font-semibold text-emerald-400 tracking-tight">
                                        {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Insight Card */}
                <div className="glass-panel rounded-xl p-8 flex flex-col justify-between group hover:border-slate-600 transition-colors bg-[#0B1121]/60">
                    <div>
                        <div className="w-10 h-10 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-4">
                            <Zap className="w-5 h-5 text-pink-400" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-100 mb-2">Setup em 24h</h3>
                        <p className="text-sm text-slate-400">
                            Integração completa com seu software atual sem parar a operação.
                        </p>
                    </div>
                    <div className="mt-8 flex -space-x-2">
                        <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700"></div>
                        <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-600"></div>
                        <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-500 flex items-center justify-center text-[10px] text-white font-medium">+50</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
