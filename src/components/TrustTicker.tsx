import { motion } from 'framer-motion';

const CLINICS = [
    "CLÍNICA ALBERT EINSTEIN", "SÍRIO-LIBANÊS", "FLEURY", "ALTA DIAGNÓSTICOS", "ONCOCLÍNICA", "REDE D'OR", "MATER DEI", "HOSPITAL MOINHOS DE VENTO"
];

export function TrustTicker() {
    return (
        <section className="py-12 border-y border-white/5 bg-black/40 backdrop-blur-sm overflow-hidden flex relative z-20">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />

            <motion.div
                className="flex gap-16 whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            >
                {[...CLINICS, ...CLINICS, ...CLINICS].map((clinic, i) => (
                    <span key={i} className="text-lg font-medium text-white/30 uppercase tracking-widest flex items-center gap-16">
                        {clinic}
                        <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                    </span>
                ))}
            </motion.div>
        </section>
    );
}
