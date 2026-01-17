import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/ui/MotionComponents";
import { Menu } from "lucide-react";


interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#09090b] font-sans text-[#f4f4f5]">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <div className="lg:ml-64 flex flex-col min-h-screen">
                {/* Mobile Header Overlay for Hamburger */}
                <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#09090b]/80 backdrop-blur-md border-b border-[#27272a] z-30 flex items-center px-4">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 -ml-2 text-[#a1a1aa] hover:text-white"
                    >
                        <Menu size={24} />
                    </button>
                    <span className="ml-2 font-medium text-white">Cadran</span>
                </div>

                {/* Desktop Header (Hidden on Mobile? No, usually distinct. For now let's keep Header but maybe hide it on mobile or adjust it) */}
                {/* Actually, the existing Header component might be desktop specific. Let's hide it on mobile for now or wrap it. */}
                <div className="hidden lg:block">
                    <Header />
                </div>

                {/* Main Content Area */}
                <main className="flex-1 min-w-0 bg-[#09090b] pt-16 lg:pt-16">
                    {/* Page Content */}
                    <div className="p-4 lg:p-8">
                        <PageTransition>
                            {children}
                        </PageTransition>
                    </div>
                </main>
            </div>
        </div>
    );
}
