import { Database, MessageCircle, Calendar } from 'lucide-react';

export function SocialProof() {
    return (
        <section className="border-y border-slate-800/50 bg-[#020617]/50 py-8">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase">Integrado com:</span>
                <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm tracking-tight"><Database className="w-4 h-4" /> DoctorCloud</div>
                <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm tracking-tight"><MessageCircle className="w-4 h-4" /> WhatsApp Business</div>
                <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm tracking-tight"><Calendar className="w-4 h-4" /> Google Calendar</div>
            </div>
        </section>
    );
}
