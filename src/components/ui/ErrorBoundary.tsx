import { Component } from "react";
import type { ReactNode, ErrorInfo } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center p-6 text-center">
                    <div className="h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
                        <AlertTriangle size={32} className="text-red-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Algo deu errado</h1>
                    <p className="text-[#a1a1aa] max-w-md mb-8">
                        Encontramos um erro inesperado. Tente recarregar a página.
                    </p>

                    <div className="bg-[#18181b] p-4 rounded-lg border border-[#27272a] w-full max-w-lg mb-8 text-left overflow-auto max-h-40">
                        <span className="text-xs font-mono text-red-400">
                            {this.state.error?.toString()}
                        </span>
                    </div>

                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-2 px-6 py-3 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-xl font-medium transition-colors"
                    >
                        <RefreshCw size={18} />
                        Recarregar Aplicação
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
