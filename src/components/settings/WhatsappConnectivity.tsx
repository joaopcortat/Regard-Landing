import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, RefreshCw, Send, ShieldCheck, Battery, QrCode } from 'lucide-react';
import { toast } from 'sonner';

type ConnectionState = 'disconnected' | 'connecting' | 'connected';

export function WhatsappConnectivity() {
    const [status, setStatus] = useState<ConnectionState>('disconnected');
    const [loadingStep, setLoadingStep] = useState(0);
    const [testNumber, setTestNumber] = useState('');

    const handleConnect = () => {
        setStatus('connecting');
        setLoadingStep(0);

        // Simulation Steps
        const steps = ["Autenticando sessão segura...", "Baixando contatos...", "Sincronizando agenda..."];

        let step = 0;
        const interval = setInterval(() => {
            step++;
            setLoadingStep(step);
            if (step >= steps.length) {
                clearInterval(interval);
                setStatus('connected');
                toast.success("Dispositivo Conectado!", {
                    description: "iPhone 14 Pro - Sincronização concluída."
                });
            }
        }, 1500);
    };

    const handleDisconnect = () => {
        toast("Desconectando...", { duration: 1000 });
        setTimeout(() => {
            setStatus('disconnected');
        }, 1000);
    };

    const handleSendTest = () => {
        if (!testNumber) {
            toast.error("Digite um número válido.");
            return;
        }
        toast.success("Mensagem de teste enviada!", {
            description: `Enviado para ${testNumber}: "Olá! Teste de conexão Cadran."`,
            icon: <Send size={16} className="text-emerald-500" />
        });
        setTestNumber('');
    };

    return (
        <div className="flex flex-col h-full">
            <div className="p-8 border-b border-[#27272a] flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-medium text-white flex items-center gap-2">
                        Integração WhatsApp
                        {status === 'connected' && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-wider">Online</span>
                        )}
                    </h3>
                    <p className="text-sm text-[#a1a1aa] mt-1">Conecte o número da clínica para notificações automáticas via IA.</p>
                </div>
            </div>

            <div className="flex-1 p-8 flex flex-col items-center justify-center relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px]" />
                </div>

                <AnimatePresence mode="wait">
                    {status === 'disconnected' && (
                        <motion.div
                            key="disconnected"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                            className="flex flex-col items-center z-10"
                        >
                            {/* PHONE MOCKUP */}
                            <div className="relative w-[280px] h-[500px] bg-[#000] rounded-[40px] border-4 border-[#27272a] shadow-2xl p-4 flex flex-col mb-8">
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#27272a] rounded-b-xl z-20" />

                                {/* Screen Content */}
                                <div className="flex-1 bg-white rounded-[32px] overflow-hidden flex flex-col items-center justify-center relative">
                                    <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-6 space-y-4">
                                        <div className="w-48 h-48 bg-zinc-900 rounded-xl flex items-center justify-center relative group cursor-pointer transition-all hover:scale-105" onClick={handleConnect}>
                                            <QrCode size={120} className="text-white opacity-90" />
                                            {/* Hover CTA */}
                                            <div className="absolute inset-0 flex items-center justify-center bg-emerald-500/90 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-white font-bold text-sm">Simular Scan</span>
                                            </div>
                                        </div>
                                        <p className="text-center text-xs text-zinc-500 mt-4 leading-relaxed">
                                            Abra o WhatsApp no seu celular e escaneie este código para conectar.
                                        </p>
                                    </div>

                                    {/* Encrypted Badge */}
                                    <div className="absolute bottom-6 flex items-center gap-1.5 text-[10px] text-zinc-400 font-medium">
                                        <ShieldCheck size={12} className="text-emerald-500" />
                                        End-to-End Encrypted
                                    </div>
                                </div>
                            </div>

                            <div className="text-center space-y-2 max-w-sm">
                                <h4 className="text-white font-medium">Como conectar?</h4>
                                <ol className="text-sm text-[#a1a1aa] text-left list-decimal list-inside space-y-1">
                                    <li>Abra o WhatsApp no seu celular</li>
                                    <li>Toque em <strong>Configurações</strong> ➝ <strong>Aparelhos Conectados</strong></li>
                                    <li>Toque em <strong>Conectar Aparelho</strong> e aponte a câmera</li>
                                </ol>
                            </div>
                        </motion.div>
                    )}

                    {status === 'connecting' && (
                        <motion.div
                            key="connecting"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center z-10"
                        >
                            <div className="relative w-24 h-24 mb-6">
                                <div className="absolute inset-0 border-4 border-[#27272a] rounded-full" />
                                <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin" />
                            </div>
                            <h4 className="text-lg font-medium text-white mb-2">Conectando...</h4>
                            <p className="text-sm text-[#a1a1aa] animate-pulse">
                                {["Iniciando handshake seguro...", "Autenticando sessão...", "Baixando chaves de criptografia...", "Sincronizando contatos..."][loadingStep] || "Finalizando..."}
                            </p>
                        </motion.div>
                    )}

                    {status === 'connected' && (
                        <motion.div
                            key="connected"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full max-w-2xl grid md:grid-cols-2 gap-8 z-10"
                        >
                            {/* Device Health Card */}
                            <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 relative overflow-hidden">
                                <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500" />

                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-[#27272a] flex items-center justify-center">
                                            <Smartphone size={24} className="text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium">iPhone 14 Pro</h4>
                                            <p className="text-xs text-[#a1a1aa]">Cadran Clinic • (11) 99999-9999</p>
                                        </div>
                                    </div>
                                    <div className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-medium flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        Ativo
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="p-3 rounded-lg bg-[#121214] border border-[#27272a]">
                                        <div className="text-xs text-[#71717a] mb-1 flex items-center gap-1.5">
                                            <Battery size={12} /> Bateria
                                        </div>
                                        <div className="text-sm font-medium text-white">84%</div>
                                    </div>
                                    <div className="p-3 rounded-lg bg-[#121214] border border-[#27272a]">
                                        <div className="text-xs text-[#71717a] mb-1 flex items-center gap-1.5">
                                            <RefreshCw size={12} /> Sync
                                        </div>
                                        <div className="text-sm font-medium text-white">Agora mesmo</div>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={handleDisconnect}
                                        className="flex-1 py-2 text-xs font-medium text-rose-500 border border-rose-500/20 hover:bg-rose-500/10 rounded-lg transition-colors"
                                    >
                                        Desconectar
                                    </button>
                                    <button className="flex-1 py-2 text-xs font-medium text-[#a1a1aa] hover:text-white border border-[#27272a] hover:bg-[#27272a] rounded-lg transition-colors">
                                        Reiniciar
                                    </button>
                                </div>
                            </div>

                            {/* Test Drive */}
                            <div className="flex flex-col justify-center space-y-6">
                                <div>
                                    <h4 className="text-lg font-medium text-white mb-2">Testar Integração</h4>
                                    <p className="text-sm text-[#a1a1aa]">
                                        Envie uma mensagem de teste para garantir que o canal de comunicação está operante.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-medium text-[#a1a1aa]">Número de Destino</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="(11) 99999-9999"
                                            value={testNumber}
                                            onChange={(e) => setTestNumber(e.target.value)}
                                            className="flex-1 bg-[#18181b] border border-[#27272a] rounded-lg px-4 py-2 text-sm text-white focus:border-emerald-500 outline-none transition-colors"
                                        />
                                        <button
                                            onClick={handleSendTest}
                                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
                                        >
                                            <Send size={18} />
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-[#52525b]">
                                        Isso enviará um "Relatório de Status" padrão.
                                    </p>
                                </div>

                                <div className="pt-6 border-t border-[#27272a]">
                                    <div className="flex items-start gap-3">
                                        <ShieldCheck className="text-emerald-500 flex-shrink-0" size={18} />
                                        <div>
                                            <p className="text-sm font-medium text-zinc-300">Conexão Segura</p>
                                            <p className="text-xs text-[#71717a] mt-1">
                                                Suas mensagens são processadas com criptografia de ponta a ponta. A Cadran não tem acesso ao conteúdo das conversas.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
