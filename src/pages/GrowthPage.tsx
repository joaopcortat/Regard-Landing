import {
    Star, MapPin,
    Share2, Gift, Sparkles
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { GeoIntelMap } from '@/components/growth/GeoIntelMap';

export function GrowthPage() {
    return (
        <Layout>
            <div className="space-y-8 pb-12">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Inteligência de Reputação</h1>
                        <p className="text-sm text-[#a1a1aa]">Monitoramento de marca e qualidade de aquisição</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 rounded-lg border border-[#27272a] bg-[#18181b] px-4 py-2 text-sm font-medium text-[#f4f4f5] hover:bg-[#27272a] transition-colors">
                            <Share2 size={16} className="text-[#a1a1aa]" />
                            Solicitar Avaliação
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* SECTION 1: BRAND HEALTH (Reputation Radar) */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* The Score */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="rounded-xl border border-[#27272a] bg-[#121214] p-6 relative overflow-hidden"
                            >
                                <div className="absolute right-0 top-0 h-40 w-40 translate-x-10 translate-y-[-10px] rounded-full bg-amber-500/5 blur-3xl"></div>
                                <div className="relative z-10 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-[#a1a1aa] flex items-center gap-2">
                                            <Star size={16} className="text-amber-500 fill-amber-500" />
                                            Google Reviews
                                        </p>
                                        <h2 className="text-5xl font-bold text-white mt-2 tracking-tighter">4.9</h2>
                                        <p className="text-xs text-[#52525b] mt-1">Baseado em 120 avaliações</p>
                                    </div>
                                    <div className="space-y-2 w-1/2">
                                        <SentimentBar label="Positivo" percent={92} color="bg-emerald-500" />
                                        <SentimentBar label="Neutro" percent={6} color="bg-zinc-500" />
                                        <SentimentBar label="Negativo" percent={2} color="bg-rose-500" />
                                    </div>
                                </div>
                            </motion.div>

                            {/* ROI Summary */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="rounded-xl border border-[#27272a] bg-[#121214] p-6 relative overflow-hidden"
                            >
                                <div className="absolute right-0 top-0 h-40 w-40 translate-x-10 translate-y-[-10px] rounded-full bg-blue-500/5 blur-3xl"></div>
                                <div className="relative z-10">
                                    <p className="text-sm font-medium text-[#a1a1aa] mb-4">Melhor Canal de Aquisição</p>
                                    <div className="flex items-end gap-2">
                                        <h2 className="text-3xl font-bold text-white text-emerald-500">Indicação Médica</h2>
                                    </div>
                                    <p className="text-sm text-[#d4d4d8] mt-2">
                                        Gera <span className="text-white font-bold">R$ 85k</span> em receita.
                                    </p>
                                    <div className="mt-4 p-2 rounded-lg bg-[#18181b] border border-[#27272a] flex items-center gap-2">
                                        <Sparkles size={14} className="text-amber-500" />
                                        <p className="text-xs text-[#a1a1aa]">LTV de Indicação é <strong>3x maior</strong> que Instagram.</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Recent Reviews Stream */}
                        <div className="rounded-xl border border-[#27272a] bg-[#121214] overflow-hidden">
                            <div className="p-4 border-b border-[#27272a] flex items-center justify-between">
                                <h3 className="text-sm font-medium text-white">Últimas Avaliações</h3>
                                <button className="text-xs text-[#3b82f6] hover:text-[#2563eb]">Ver todas</button>
                            </div>
                            <div className="divide-y divide-[#27272a]">
                                <ReviewCard
                                    author="Mariana Costa"
                                    rating={5}
                                    time="Há 2 dias"
                                    text="Dr. Silva é incrível! O resultado do botox ficou super natural. A clínica é linda."
                                />
                                <ReviewCard
                                    author="Ricardo Mendes"
                                    rating={5}
                                    time="Há 5 dias"
                                    text="Atendimento impecável desde a recepção. Recomendo muito a harmonização."
                                />
                            </div>
                        </div>

                        {/* SECTION 2: PATIENT ORIGIN (ROI Chart Simulation) */}
                        <div className="rounded-xl border border-[#27272a] bg-[#121214] p-6">
                            <h3 className="text-sm font-medium text-white mb-6">Faturamento por Origem</h3>
                            <div className="space-y-4">
                                <ChannelBar label="Indicação (Médicos/Pacientes)" value="R$ 85.000" percent={60} color="bg-emerald-500" />
                                <ChannelBar label="Instagram / Redes Sociais" value="R$ 40.000" percent={30} color="bg-purple-500" />
                                <ChannelBar label="Google Search" value="R$ 20.000" percent={10} color="bg-blue-500" />
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-8">

                        {/* SECTION 3: GEO-INTEL */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-white flex items-center gap-2">
                                <MapPin size={16} className="text-[#3b82f6]" />
                                Mapeamento Territorial
                            </h3>
                            <GeoIntelMap />
                            <p className="text-xs text-[#71717a]">
                                *Dados baseados nos endereços de cadastro dos últimos 6 meses.
                            </p>
                        </div>

                        {/* SECTION 4: REFERRAL TREE */}
                        <div className="rounded-xl border border-[#27272a] bg-[#121214] overflow-hidden">
                            <div className="p-6 border-b border-[#27272a]">
                                <h3 className="text-sm font-medium text-white mb-1">Top Indicadores</h3>
                                <p className="text-xs text-[#a1a1aa]">Quem traz mais valor para a clínica</p>
                            </div>
                            <div className="divide-y divide-[#27272a]">
                                <ReferralRow name="Dr. Roberto (Cirurgião)" count={5} value="R$ 50k" />
                                <ReferralRow name="Fernanda V. (Paciente)" count={3} value="R$ 12k" />
                                <ReferralRow name="Dra. Camila (Dermatologista)" count={2} value="R$ 8k" />
                            </div>
                            <button className="w-full py-3 text-xs font-medium text-[#a1a1aa] hover:bg-[#18181b] hover:text-white transition-colors">
                                Ver rede completa
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
}

// --- Subcomponents ---

function SentimentBar({ label, percent, color }: any) {
    return (
        <div className="flex items-center gap-2 text-xs">
            <span className="w-12 text-[#71717a] text-right">{label}</span>
            <div className="flex-1 h-1.5 bg-[#27272a] rounded-full overflow-hidden">
                <div className={cn("h-full rounded-full", color)} style={{ width: `${percent}%` }} />
            </div>
            <span className="w-8 text-[#e4e4e7] tabular-nums text-right">{percent}%</span>
        </div>
    );
}

function ReviewCard({ author, rating, time, text }: any) {
    return (
        <div className="p-4 hover:bg-[#18181b] transition-colors group">
            <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-[10px] font-bold text-white">
                        {author.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-[#e4e4e7]">{author}</span>
                </div>
                <span className="text-xs text-[#52525b]">{time}</span>
            </div>
            <div className="flex mb-2">
                {Array(5).fill(0).map((_, i) => (
                    <Star key={i} size={10} className={cn("fill-current", i < rating ? "text-amber-500" : "text-[#27272a]")} />
                ))}
            </div>
            <p className="text-xs text-[#a1a1aa] leading-relaxed mb-3">"{text}"</p>
            <button
                onClick={() => toast.success("Resposta gerada por IA!")}
                className="text-[10px] font-medium text-[#3b82f6] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <Sparkles size={10} /> Responder com IA
            </button>
        </div>
    );
}

function ChannelBar({ label, value, percent, color }: any) {
    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-[#e4e4e7]">{label}</span>
                <span className="text-sm font-bold text-white tabular-nums">{value}</span>
            </div>
            <div className="h-2 w-full bg-[#18181b] rounded-full overflow-hidden">
                <div className={cn("h-full rounded-full transition-all duration-1000", color)} style={{ width: `${percent}%` }} />
            </div>
        </div>
    );
}

function ReferralRow({ name, count, value }: any) {
    return (
        <div className="p-4 flex items-center justify-between hover:bg-[#18181b] transition-colors group">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#27272a] flex items-center justify-center text-xs font-bold text-[#a1a1aa] border border-[#3f3f46]">
                    {name.charAt(0)}
                </div>
                <div>
                    <p className="text-sm font-medium text-[#e4e4e7]">{name}</p>
                    <p className="text-xs text-[#a1a1aa]">{count} indicações</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-sm font-bold text-emerald-500 tabular-nums">{value}</p>
                <button
                    onClick={() => toast.success(`Presente enviado para ${name}!`)}
                    className="mt-1 text-[10px] text-[#3b82f6] flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <Gift size={10} /> Enviar mimo
                </button>
            </div>
        </div>
    );
}
