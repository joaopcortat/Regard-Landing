import { Lock, ArrowRight, CheckCircle2, Download, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { WaitlistCard } from './WaitlistCard';
import { motion } from 'framer-motion';
import { useWaitlist } from '../../hooks/useWaitlist';

export function RestrictedReport({ onRestart, answers }: { onRestart: () => void; answers?: Record<string, any> }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [memberId, setMemberId] = useState("");
    const { submitLead, isLoading } = useWaitlist();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Generate a random ID like "CDN-8X92" for display
        const randomId = `CDN-${Math.floor(1000 + Math.random() * 9000)}`;
        setMemberId(randomId);

        // Submit to Supabase
        const result = await submitLead({
            name,
            email,
            whatsapp: '', // Not collecting whatsapp in this form yet
            quizData: answers
        });

        if (result.success) {
            setSubmitted(true);
        } else {
            alert(result.error);
        }
    };
    // ... (rest of the file until the button)
    <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-lg transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] flex items-center justify-center gap-2 group"
    >
        {isLoading ? (
            <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processando...
            </>
        ) : (
            <>
                Liberar Relatório Gratuito
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
        )}
    </button>

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full max-w-lg mx-auto text-center px-6 py-12 flex flex-col items-center"
            >
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 border border-emerald-500/30 shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>

                <h2 className="text-3xl font-bold text-white mb-2">Bem-vindo à Cadran</h2>
                <p className="text-slate-400 mb-10 max-w-sm mx-auto">
                    Sua posição está garantida. Aqui está seu cartão de membro oficial.
                </p>

                <div className="w-full mb-10 transform hover:scale-105 transition-transform duration-500">
                    <WaitlistCard name={name} email={email} memberId={memberId} />
                </div>

                <div className="flex flex-col gap-4 w-full max-w-xs">
                    <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-indigo-500/25">
                        <Download className="w-4 h-4" />
                        Baixar Cartão
                    </button>
                    <button onClick={onRestart} className="text-sm text-slate-500 hover:text-white transition-colors">
                        Voltar para o início
                    </button>
                </div>
            </motion.div>
        )
    }

    return (
        <div className="w-full max-w-4xl mx-auto px-6 py-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">

                {/* Left: Teaser Report */}
                <div className="space-y-6">
                    <div>
                        <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-2 block">
                            Diagnóstico Preliminar
                        </span>
                        <h2 className="text-3xl font-bold text-white leading-tight">
                            Sua clínica opera sem <span className="text-emerald-400">Inteligência de Dados</span> centralizada.
                        </h2>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent"></div>

                        <div className="relative space-y-4">
                            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                                <span className="text-slate-400 text-sm">Nível de Maturidade Digital</span>
                                <span className="text-3xl font-bold text-white">Baixo<span className="text-lg text-slate-500">/Médio</span></span>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Blindagem Financeira</span>
                                    <span className="text-red-400 font-medium">Risco Detectado</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Retenção Automática</span>
                                    <span className="text-red-400 font-medium">Inexistente</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Previsibilidade de Receita</span>
                                    <span className="text-amber-400 font-medium">Limitada</span>
                                </div>
                            </div>
                        </div>

                        {/* Blurred Overlay */}
                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#020617] to-transparent flex items-end justify-center pb-4">
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <Lock className="w-3 h-3" /> Relatório Completo Bloqueado
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Waitlist Form */}
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl relative">
                    <div className="absolute -top-4 -right-4 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
                        Acesso Antecipado
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-2">Desbloquear Relatório Completo</h3>
                    <p className="text-sm text-slate-400 mb-6">
                        Junte-se a 2.000+ médicos gestores. Cadastre-se para receber seu diagnóstico detalhado e acesso à plataforma.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Nome Completo</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Seu nome"
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Email Profissional</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seu@email.com"
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-lg transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] flex items-center justify-center gap-2 group"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Processando...
                                </>
                            ) : (
                                <>
                                    Liberar Relatório Gratuito
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-[10px] text-slate-600 text-center mt-4">
                        Seus dados estão seguros. Sem spam, apenas insights.
                    </p>
                </div>
            </div>
        </div>
    );
}
