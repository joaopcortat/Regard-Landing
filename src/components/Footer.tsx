export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black py-12 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-cadran-blue/20 flex items-center justify-center border border-cadran-blue/50">
                        <div className="w-2 h-2 rounded-full bg-cadran-blue" />
                    </div>
                    <span className="font-bold text-lg tracking-tight">CADRAN</span>
                </div>

                <div className="flex items-center gap-8 text-sm text-gray-500">
                    <a href="#" className="hover:text-white transition-colors">Waitlist</a>
                    <a href="#" className="hover:text-white transition-colors">Login</a>
                </div>

                <div className="text-xs text-gray-600">
                    © 2026 Built in Public.
                </div>
            </div>
        </footer>
    );
}
