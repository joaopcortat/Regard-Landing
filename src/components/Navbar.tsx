import { motion } from 'framer-motion';
import { FocusLogo } from './brand/FocusLogo';
import { ArrowRight } from 'lucide-react';

export function Navbar() {
    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        >
            <div className="max-w-6xl mx-auto flex items-center justify-between p-2 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/5 shadow-2xl">
                {/* Logo Area */}
                <div className="flex items-center gap-3 pl-2">
                    <FocusLogo />
                    <span className="text-white font-bold tracking-tight text-sm">CADRAN</span>
                </div>

                {/* Links */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Ecossistema</a>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Quem Somos</a>
                </div>

                {/* CTA */}
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-cadran-blue/50 hover:bg-cadran-blue/10 transition-all group">
                    <span className="text-xs font-medium text-gray-300 group-hover:text-cadran-blue">Entrem na Lista de Espera</span>
                    <ArrowRight size={12} className="text-gray-500 group-hover:text-cadran-blue transition-colors" />
                </button>
            </div>
        </motion.nav>
    );
}
