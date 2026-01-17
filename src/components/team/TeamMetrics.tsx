import { TrendingUp, Users, Clock, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TeamMetrics() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <MetricCard
                label="NPS da Clínica"
                value="92"
                suffix="/100"
                trend="+4 vs mês anterior"
                trendColor="text-emerald-500"
                icon={Award}
                color="text-amber-500 bg-amber-500/10"
            />
            <MetricCard
                label="Taxa de Retorno"
                value="68%"
                subtext="Fidelização excelente"
                icon={Users}
                color="text-blue-500 bg-blue-500/10"
            />
            <MetricCard
                label="Produtividade/Hora"
                value="R$ 1.250"
                trend="+15% meta batida"
                trendColor="text-emerald-500"
                icon={TrendingUp}
                color="text-emerald-500 bg-emerald-500/10"
            />
            <MetricCard
                label="Tempo Médio Espera"
                value="4 min"
                subtext="Dentro do padrão VIP"
                icon={Clock}
                color="text-purple-500 bg-purple-500/10"
            />
        </div>
    );
}

function MetricCard({ label, value, suffix, subtext, trend, trendColor, icon: Icon, color }: any) {
    return (
        <div className="rounded-xl border border-[#27272a] bg-[#121214] p-6 relative overflow-hidden group transition-all hover:border-[#3f3f46]">
            <div className="flex items-start justify-between mb-4">
                <p className="text-sm font-medium text-[#a1a1aa]">{label}</p>
                <div className={cn("p-2 rounded-lg", color)}>
                    <Icon size={18} />
                </div>
            </div>

            <div>
                <div className="flex items-baseline gap-1">
                    <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
                    {suffix && <span className="text-sm text-[#71717a] font-medium">{suffix}</span>}
                </div>

                {trend ? (
                    <p className={cn("text-xs font-medium mt-1 flex items-center gap-1", trendColor)}>
                        {trend}
                    </p>
                ) : (
                    <p className="text-xs text-[#52525b] mt-1">{subtext}</p>
                )}
            </div>
        </div>
    );
}
