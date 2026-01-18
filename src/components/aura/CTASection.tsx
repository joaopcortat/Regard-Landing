export function CTASection({ onStart, onWaitlist }: { onStart: () => void, onWaitlist: () => void }) {
    return (
        <section id="cta" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-indigo-950/20 z-[-1]"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>

            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-6">
                    Sua clínica no piloto automático.
                </h2>
                <p className="text-slate-400 text-lg mb-10 font-light max-w-2xl mx-auto">
                    Junte-se a gestores que aumentaram o faturamento em 30% nos primeiros 3 meses.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <button onClick={onStart} className="w-full md:w-auto bg-slate-50 text-slate-950 px-8 py-4 rounded-lg text-base font-semibold hover:bg-white transition-all hover:scale-[1.02] shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                        Iniciar Diagnóstico Gratuito
                    </button>
                    <button onClick={onWaitlist} className="w-full md:w-auto px-8 py-4 rounded-lg text-base font-medium text-slate-300 border border-slate-700 hover:border-slate-500 hover:text-white transition-colors cursor-pointer">
                        Entrar na Lista de Espera
                    </button>
                </div>
                <p className="text-xs text-slate-500 mt-6">Não requer cartão de crédito • Cancelamento a qualquer momento</p>
            </div>
        </section>
    );
}
