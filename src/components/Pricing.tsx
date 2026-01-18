import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
    {
        name: "R0 Basic",
        price: "129",
        description: "Para consultórios individuais buscando organização.",
        features: ["Conciliação bancária simples", "Dashboard básico", "Suporte por email"],
        highlight: false
    },
    {
        name: "R1 Gold",
        price: "299",
        description: "O Padrão Ouro para clínicas em crescimento.",
        features: ["Auditoria de Glosas (IA)", "Conciliação avançada", "Suporte prioritário", "Relatórios preditivos"],
        highlight: true
    },
    {
        name: "R+ Advanced",
        price: "499",
        description: "Gestão completa para grandes policlínicas.",
        features: ["Split de pagamentos", "API de Interoperabilidade", "BI Customizado", "Gerente de conta dedicado"],
        highlight: false
    }
];

export function Pricing() {
    return (
        <section className="py-32 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Investimento Estratégico</h2>
                    <p className="text-gray-400">Escolha o nível de blindagem que sua operação exige.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative rounded-2xl p-8 flex flex-col ${plan.highlight
                                    ? 'bg-white/10 border border-cadran-blue/50 shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]'
                                    : 'bg-white/5 border border-white/5 opacity-80 hover:opacity-100 transition-opacity'
                                }`}
                        >
                            {plan.highlight && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-cadran-blue text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                                    Recomendado
                                </div>
                            )}
                            <div className="mb-6">
                                <h3 className={`text-lg font-bold mb-2 ${plan.highlight ? 'text-white' : 'text-gray-300'}`}>{plan.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-xs text-gray-500">R$</span>
                                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                                    <span className="text-xs text-gray-500">/mês</span>
                                </div>
                                <p className="text-sm text-gray-400 mt-4 leading-relaxed">{plan.description}</p>
                            </div>

                            <div className="flex-1 space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <Check size={16} className={plan.highlight ? 'text-cadran-blue' : 'text-gray-500'} />
                                        <span className="text-sm text-gray-300">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <button className={`w-full py-3 rounded-lg text-sm font-medium transition-all ${plan.highlight
                                    ? 'bg-cadran-blue hover:bg-cadran-blue/90 text-white shadow-lg'
                                    : 'bg-white/5 hover:bg-white/10 text-white'
                                }`}>
                                Selecionar Plano
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
