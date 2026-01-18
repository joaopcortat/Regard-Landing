import { motion } from 'framer-motion';

export function Authority() {
    return (
        <section className="py-20 px-6 border-y border-white/5 bg-white/[0.02]">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-2xl md:text-3xl font-light italic text-gray-300 leading-relaxed">
                        "Criado por <span className="text-white font-medium not-italic">Acadêmicos de Medicina</span> para Clínicos.
                        Entendemos que sua prioridade é o paciente;
                        <span className="text-cadran-blue font-medium not-italic"> a nossa é o seu patrimônio.</span>"
                    </h2>
                </motion.div>
            </div>
        </section>
    );
}
