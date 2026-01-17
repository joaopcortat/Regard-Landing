import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Seg', value: 4000 },
    { name: 'Ter', value: 3000 },
    { name: 'Qua', value: 5000 },
    { name: 'Qui', value: 2780 },
    { name: 'Sex', value: 1890 },
    { name: 'Sab', value: 2390 },
    { name: 'Dom', value: 3490 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#18181b]/90 backdrop-blur-md border border-[#27272a] p-3 rounded-lg shadow-xl">
                <p className="text-xs font-medium text-[#a1a1aa] mb-1">{label}</p>
                <p className="text-sm font-bold text-white">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payload[0].value)}
                </p>
            </div>
        );
    }
    return null;
};

export function PremiumChart() {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                    <XAxis
                        dataKey="name"
                        stroke="#71717a"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        dy={10}
                    />
                    <YAxis
                        stroke="#71717a"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `R$${value / 1000}k`}
                        dx={-10}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3f3f46', strokeWidth: 1 }} />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                        activeDot={{ r: 6, strokeWidth: 0, fill: '#60a5fa', className: 'animate-pulse' }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
