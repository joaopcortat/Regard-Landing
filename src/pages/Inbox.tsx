import { useState, useRef, useEffect } from 'react';
import {
    Search, Phone, Video, MoreVertical, Paperclip, Mic, Send,
    Sparkles, Check, CheckCheck, Clock, FileText
} from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export function InboxPage() {
    const [selectedChat, setSelectedChat] = useState('1');
    const [messageInput, setMessageInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const conversations = [
        {
            id: '1',
            name: 'Fernanda Vasconcelos',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fernanda',
            lastMessage: 'Ok, confirmado para amanhã!',
            time: '14:30',
            status: 'confirmed', // confirmed, pending, waiting
            unread: 0
        },
        {
            id: '2',
            name: 'Ricardo Mendes',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
            lastMessage: 'Gostaria de saber o valor do Botox',
            time: 'Ontem',
            status: 'waiting',
            unread: 2
        },
        {
            id: '3',
            name: 'Mariana Costa',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana',
            lastMessage: 'Obrigada pelo atendimento!',
            time: 'Seg',
            status: 'read',
            unread: 0
        }
    ];

    const [messages, setMessages] = useState([
        { id: 1, sender: 'clinic', text: 'Bom dia, Fernanda! Tudo bem?', time: '09:00', status: 'read' },
        { id: 2, sender: 'clinic', text: 'Gostaria de confirmar seu agendamento para amanhã às 14:00.', time: '09:00', status: 'read' },
        { id: 3, sender: 'patient', text: 'Bom dia! Tudo ótimo.', time: '09:15', status: 'read' },
        { id: 4, sender: 'patient', text: 'Pode confirmar sim, estarei lá.', time: '09:15', status: 'read' },
        { id: 5, sender: 'clinic', text: 'Perfeito! Alguma dúvida sobre o preparo?', time: '09:20', status: 'read' },
        { id: 6, sender: 'patient', text: 'Não, tudo certo. Obrigada!', time: '09:25', status: 'read' },
        { id: 7, sender: 'clinic', text: 'Combinado. Até lá!', time: '09:30', status: 'sent' },
    ]);

    const activeConversation = conversations.find(c => c.id === selectedChat);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (text: string) => {
        if (!text.trim()) return;

        const newMessage = {
            id: messages.length + 1,
            sender: 'clinic',
            text: text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'sent'
        };

        setMessages([...messages, newMessage]);
        setMessageInput('');
        toast.success("Mensagem enviada");
    };

    const aiSuggestions = [
        "Enviar orientações pós-procedimento",
        "Confirmar horário de amanhã",
        "Solicitar feedback do atendimento"
    ];

    return (
        <Layout>
            <div className="flex h-[calc(100vh-8rem)] rounded-xl border border-[#27272a] bg-[#121214] overflow-hidden">
                {/* LEFT SIDEBAR: Conversations List */}
                <div className="w-80 border-r border-[#27272a] flex flex-col bg-[#09090b]">
                    {/* Header */}
                    <div className="p-4 border-b border-[#27272a]">
                        <h2 className="mb-4 text-sm font-medium text-white">Mensagens</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717a]" size={14} />
                            <input
                                type="text"
                                placeholder="Buscar conversa..."
                                className="w-full bg-[#18181b] border border-[#27272a] rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#3b82f6] transition-colors placeholder:text-[#52525b]"
                            />
                        </div>
                    </div>

                    {/* Chat List */}
                    <div className="flex-1 overflow-y-auto">
                        {conversations.map(chat => (
                            <div
                                key={chat.id}
                                onClick={() => setSelectedChat(chat.id)}
                                className={cn(
                                    "p-4 border-b border-[#27272a]/50 cursor-pointer transition-colors hover:bg-[#18181b]",
                                    selectedChat === chat.id ? "bg-[#18181b] border-l-2 border-l-[#3b82f6]" : "border-l-2 border-l-transparent"
                                )}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full bg-[#27272a]" />
                                            {chat.status === 'confirmed' && (
                                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#18181b]" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className={cn("text-sm font-medium", chat.unread > 0 ? "text-white" : "text-[#d4d4d8]")}>
                                                {chat.name}
                                            </h3>
                                            <p className={cn("text-xs line-clamp-1", chat.unread > 0 ? "text-[#a1a1aa] font-medium" : "text-[#71717a]")}>
                                                {chat.lastMessage}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-[10px] text-[#71717a]">{chat.time}</span>
                                        {chat.unread > 0 && (
                                            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#3b82f6] text-[10px] font-bold text-white">
                                                {chat.unread}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {chat.status === 'waiting' && <span className="inline-block mt-2 px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">Aguardando</span>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT AREA: Active Thread */}
                <div className="flex-1 flex flex-col bg-[#121214] relative">
                    {/* Chat Header */}
                    <div className="h-16 border-b border-[#27272a] flex items-center justify-between px-6 bg-[#121214]/50 backdrop-blur-sm z-10">
                        <div className="flex items-center gap-3">
                            <img src={activeConversation?.avatar} alt="" className="w-9 h-9 rounded-full bg-[#27272a]" />
                            <div>
                                <h3 className="text-sm font-medium text-white">{activeConversation?.name}</h3>
                                <p className="text-xs text-[#a1a1aa] flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    Online agora
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="text-xs font-medium text-[#3b82f6] hover:text-[#60a5fa] transition-colors flex items-center gap-1.5 bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20">
                                <FileText size={14} />
                                Ver Prontuário
                            </button>
                            <div className="h-4 w-[1px] bg-[#27272a]" />
                            <div className="flex gap-2 text-[#a1a1aa]">
                                <button className="p-2 hover:bg-[#27272a] rounded-lg transition-colors"><Phone size={18} /></button>
                                <button className="p-2 hover:bg-[#27272a] rounded-lg transition-colors"><Video size={18} /></button>
                                <button className="p-2 hover:bg-[#27272a] rounded-lg transition-colors"><MoreVertical size={18} /></button>
                            </div>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={cn(
                                    "flex w-full",
                                    msg.sender === 'clinic' ? "justify-end" : "justify-start"
                                )}
                            >
                                <div className={cn(
                                    "max-w-[60%] px-4 py-3 rounded-2xl text-sm relative group shadow-sm",
                                    msg.sender === 'clinic'
                                        ? "bg-[#3b82f6] text-white rounded-br-none"
                                        : "bg-[#27272a] text-[#f4f4f5] rounded-bl-none"
                                )}>
                                    <p>{msg.text}</p>
                                    <div className={cn(
                                        "flex items-center gap-1 mt-1 text-[10px]",
                                        msg.sender === 'clinic' ? "text-blue-200 justify-end" : "text-[#71717a] justify-start"
                                    )}>
                                        <Clock size={10} />
                                        <span>{msg.time}</span>
                                        {msg.sender === 'clinic' && (
                                            msg.status === 'read' ? <CheckCheck size={12} /> : <Check size={12} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-[#27272a] bg-[#121214]">

                        {/* AI Chips */}
                        <div className="flex gap-2 mb-3 overflow-x-auto pb-1 no-scrollbar">
                            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-400">
                                <Sparkles size={10} />
                                IA Suggestion
                            </div>
                            {aiSuggestions.map((suggestion, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSendMessage(suggestion)}
                                    className="px-3 py-1 rounded-full bg-[#18181b] border border-[#27272a] text-xs text-[#a1a1aa] hover:border-[#3b82f6] hover:text-[#3b82f6] transition-all whitespace-nowrap"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>

                        {/* Text Field */}
                        <div className="flex items-end gap-2 bg-[#18181b] p-2 rounded-xl border border-[#27272a] focus-within:border-[#3b82f6] transition-colors relative">
                            <button className="p-2 text-[#71717a] hover:text-[#f4f4f5] transition-colors">
                                <Paperclip size={20} />
                            </button>
                            <textarea
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage(messageInput);
                                    }
                                }}
                                placeholder="Digite sua mensagem..."
                                className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-[#f4f4f5] placeholder:text-[#52525b] resize-none max-h-32 py-2"
                                rows={1}
                            />
                            {messageInput.trim() ? (
                                <button
                                    onClick={() => handleSendMessage(messageInput)}
                                    className="p-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] transition-colors shadow-lg shadow-blue-900/20"
                                >
                                    <Send size={18} />
                                </button>
                            ) : (
                                <button className="p-2 text-[#71717a] hover:text-[#f4f4f5] transition-colors">
                                    <Mic size={20} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
