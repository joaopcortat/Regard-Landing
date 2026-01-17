import { Search, Bell, ChevronRight } from 'lucide-react';

export function Header() {
    return (
        <header className="fixed right-0 top-0 z-30 flex h-16 w-[calc(100%-16rem)] items-center justify-between border-b border-dash-border bg-dash-bg/95 backdrop-blur-md px-8 transition-all duration-300">
            {/* Left: Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-dash-mute">
                <span className="hover:text-foreground cursor-pointer transition-colors">Visão Geral</span>
                <ChevronRight size={14} className="opacity-50" />
                <span className="text-foreground font-medium">Hoje</span>
            </div>

            {/* Center: Command Search */}
            <div className="flex-1 px-12 flex justify-center">
                <button className="flex w-96 items-center gap-3 rounded-xl border border-dash-border bg-dash-card px-4 py-2 text-sm text-dash-mute transition-all hover:border-dash-border/80 hover:text-foreground focus:outline-none focus:ring-1 focus:ring-dash-primary/30 group">
                    <Search size={16} strokeWidth={1.5} className="group-hover:text-dash-primary transition-colors" />
                    <span className="flex-1 text-left font-light">Buscar paciente ou comando...</span>
                    <kbd className="hidden rounded border border-dash-border bg-dash-bg px-1.5 py-0.5 text-[10px] font-mono text-dash-mute/70 sm:inline-block group-hover:border-dash-border/80">
                        ⌘K
                    </kbd>
                </button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
                <button className="relative rounded-lg p-2 text-dash-mute hover:bg-dash-card hover:text-foreground transition-all">
                    <Bell size={20} strokeWidth={1.5} />
                    <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-dash-primary ring-2 ring-dash-bg" />
                </button>

                <div className="pl-4 border-l border-dash-border">
                    <div className="h-9 w-9 overflow-hidden rounded-full bg-dash-card border border-dash-border p-0.5 cursor-pointer hover:border-dash-primary/50 transition-colors">
                        <div className="h-full w-full rounded-full bg-dash-bg flex items-center justify-center overflow-hidden">
                            <img
                                src="https://ui-avatars.com/api/?name=User&background=194848&color=fff"
                                alt="Profile"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
