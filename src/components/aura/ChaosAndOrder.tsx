import { XCircle, Minus, CheckCircle2, Check } from 'lucide-react';

export function ChaosAndOrder() {
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-50 tracking-tight mb-4">A evolução da sua clínica</h2>
                <p className="text-slate-400">Deixe o operacional repetitivo para os robôs. Foque na estratégia.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <div className="rounded-xl border border-slate-800/50 bg-slate-900/20 p-8 relative overflow-hidden grayscale opacity-70 hover:opacity-100 transition-opacity">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-6 text-slate-500">
                            <XCircle className="w-5 h-5" />
                            <span className="font-medium">Gestão Tradicional</span>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm text-slate-400">
                                <Minus className="w-4 h-4 mt-0.5 text-slate-600" />
                                Múltiplas planilhas desconectadas
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-400">
                                <Minus className="w-4 h-4 mt-0.5 text-slate-600" />
                                Secretária sobrecarregada no WhatsApp
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-400">
                                <Minus className="w-4 h-4 mt-0.5 text-slate-600" />
                                Glosas percebidas apenas no fechamento
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-400">
                                <Minus className="w-4 h-4 mt-0.5 text-slate-600" />
                                No-show de 30% sem recuperação
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="rounded-xl border border-indigo-500/30 bg-gradient-to-b from-indigo-900/10 to-slate-900/40 p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 bg-indigo-500/10 blur-3xl rounded-full"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-6 text-indigo-300">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="font-medium">Com Cadran</span>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm text-slate-200">
                                <Check className="w-4 h-4 mt-0.5 text-indigo-400" />
                                Dashboard único em tempo real
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-200">
                                <Check className="w-4 h-4 mt-0.5 text-indigo-400" />
                                IA responde e agenda 24h/7
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-200">
                                <Check className="w-4 h-4 mt-0.5 text-indigo-400" />
                                Alerta preditivo de faturamento
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-200">
                                <Check className="w-4 h-4 mt-0.5 text-indigo-400" />
                                Confirmação automática reduz no-show
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
