import { motion } from "framer-motion";
import { Plus, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComposerProps {
    specialty: 'dermato' | 'ortho' | 'general';
    onAddItem: (item: any) => void;
}

export function ComposerArea({ specialty, onAddItem }: ComposerProps) {
    return (
        <div className="relative flex-1 h-full bg-[#09090b] overflow-hidden flex items-center justify-center p-8">
            {/* Dark Technical Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

            {specialty === 'dermato' && <FaceMap onAddItem={onAddItem} />}
            {specialty === 'ortho' && <BodyMap onAddItem={onAddItem} />}
            {specialty === 'general' && <ProtocolCanvas onAddItem={onAddItem} />}
        </div>
    );
}

// --- FACE MAP (High Fidelity Geometric) ---
export function FaceMap({ onAddItem }: { onAddItem: (i: any) => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            className="relative w-[400px] h-[550px]"
        >
            <h3 className="absolute -top-12 left-0 w-full text-center text-[#52525b] text-xs font-mono uppercase tracking-[0.2em]">Mapeamento Facial <br /><span className="text-[10px] opacity-50">Wireframe v2.0</span></h3>

            <svg viewBox="0 0 300 400" className="w-full h-full drop-shadow-2xl">
                <defs>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Base Head Outline (Geometric) */}
                <path d="M70,80 L100,40 L200,40 L230,80 L230,220 L190,300 L110,300 L70,220 Z"
                    fill="none" stroke="#27272a" strokeWidth="1" strokeDasharray="4 4" />

                {/* Central Axis Line */}
                <line x1="150" y1="20" x2="150" y2="350" stroke="#27272a" strokeWidth="0.5" />

                {/* ZONE: FOREHEAD (Testa) - Geometric Plates */}
                <Zone
                    d="M80,85 L105,50 L195,50 L220,85 L220,110 L150,120 L80,110 Z"
                    label="Frontal (Testa)"
                    onClick={() => onAddItem({ name: "Toxina Botulínica (Frontal)", price: 950 })}
                />

                {/* ZONE: GLABELLA (Between Eyes) - Diamond */}
                <Zone
                    d="M135,125 L165,125 L150,150 Z"
                    label="Glabela"
                    onClick={() => onAddItem({ name: "Toxina Botulínica (Glabela)", price: 600 })}
                />

                {/* ZONE: PERIOCULAR (Eyes) - Masks */}
                <Zone
                    d="M85,135 L125,135 L130,160 L120,170 L80,160 Z"
                    label="Orbicular (Olho E)"
                    onClick={() => onAddItem({ name: "Toxina (Pés de Galinha E)", price: 400 })}
                />
                <Zone
                    d="M175,135 L215,135 L220,160 L170,170 L165,160 Z"
                    label="Orbicular (Olho D)"
                    onClick={() => onAddItem({ name: "Toxina (Pés de Galinha D)", price: 400 })}
                />

                {/* ZONE: MIDFACE/CHEEKS (Malar) - Sculptural */}
                <Zone
                    d="M60,180 L120,180 L130,220 L80,240 Z"
                    label="Malar E"
                    onClick={() => onAddItem({ name: "Preenchimento Malar (E)", price: 1400 })}
                />
                <Zone
                    d="M180,180 L240,180 L220,240 L170,220 Z"
                    label="Malar D"
                    onClick={() => onAddItem({ name: "Preenchimento Malar (D)", price: 1400 })}
                />

                {/* ZONE: LIPS (Detailed) */}
                <Zone
                    d="M120,255 L150,250 L180,255 L170,275 L150,280 L130,275 Z"
                    label="Lábios"
                    onClick={() => onAddItem({ name: "Preenchimento Labial", price: 1200 })}
                    isSpecial
                />

                {/* ZONE: JAW (Mandíbula) */}
                <Zone
                    d="M75,250 L75,280 L110,310 L190,310 L225,280 L225,250 L200,280 L150,290 L100,280 Z"
                    label="Contorno Mandibular"
                    onClick={() => onAddItem({ name: "Preenchimento Mandíbula", price: 2800 })}
                />

            </svg>
        </motion.div>
    );
}

// --- BODY MAP (High Fidelity Ortho - Wireframe v2.0) ---
export function BodyMap({ onAddItem }: { onAddItem: (i: any) => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            className="relative w-[340px] h-[600px]"
        >
            <h3 className="absolute -top-12 left-0 w-full text-center text-[#52525b] text-xs font-mono uppercase tracking-[0.2em]">Scanner Corporal <br /><span className="text-[10px] opacity-50">Skeletal Analysis</span></h3>

            <svg viewBox="0 0 340 600" className="w-full h-full drop-shadow-2xl">
                <defs>
                    <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* --- SKELETAL STRUCTURE (Non-Interactive Background) --- */}

                {/* Central Spine Axis - Dashed */}
                <line x1="170" y1="60" x2="170" y2="350" stroke="#27272a" strokeWidth="1" strokeDasharray="4 4" />

                {/* Head Outline (Geometric) */}
                <path d="M145,20 L195,20 L200,60 L185,80 L155,80 L140,60 Z"
                    fill="none" stroke="#27272a" strokeWidth="1" />

                {/* Clavicles */}
                <line x1="170" y1="90" x2="110" y2="85" stroke="#27272a" strokeWidth="1" />
                <line x1="170" y1="90" x2="230" y2="85" stroke="#27272a" strokeWidth="1" />

                {/* Ribcage Hints (Stylized) */}
                <path d="M140,110 L200,110 L190,180 L150,180 Z"
                    fill="none" stroke="#27272a" strokeWidth="0.5" opacity="0.6" />

                {/* Pelvis Structure */}
                <path d="M130,260 L210,260 L195,300 L145,300 Z"
                    fill="none" stroke="#27272a" strokeWidth="1" />

                {/* Femurs */}
                <line x1="145" y1="300" x2="135" y2="420" stroke="#27272a" strokeWidth="1" />
                <line x1="195" y1="300" x2="205" y2="420" stroke="#27272a" strokeWidth="1" />


                {/* --- INTERACTIVE ZONES --- */}

                {/* ZONE: CERVICAL (Neck) - Segmented Stack */}
                <Zone
                    d="M155,80 L185,80 L185,100 L155,100 Z"
                    label="Cervical"
                    onClick={() => onAddItem({ name: "Infiltração Cervical", price: 850 })}
                />

                {/* ZONE: SHOULDERS (Ombros) - Articulated Joints */}
                <Zone
                    d="M90,80 L120,75 L125,105 L95,110 Z"
                    label="Ombro E"
                    onClick={() => onAddItem({ name: "Infiltração Ombro E", price: 750 })}
                />
                <Zone
                    d="M220,75 L250,80 L245,110 L215,105 Z"
                    label="Ombro D"
                    onClick={() => onAddItem({ name: "Infiltração Ombro D", price: 750 })}
                />

                {/* ZONE: LUMBAR (Lower Spine) - Vertebrae Block */}
                <Zone
                    d="M150,200 L190,200 L195,250 L145,250 Z"
                    label="Lombar"
                    onClick={() => onAddItem({ name: "Bloqueio Lombar Facetário", price: 1400 })}
                />

                {/* ZONE: HIPS (Quadril) - Socket Emphasis */}
                <Zone
                    d="M110,260 L140,260 L135,290 L105,290 Z"
                    label="Quadril E"
                    onClick={() => onAddItem({ name: "Infiltração Quadril E", price: 1600 })}
                />
                <Zone
                    d="M200,260 L230,260 L235,290 L205,290 Z"
                    label="Quadril D"
                    onClick={() => onAddItem({ name: "Infiltração Quadril D", price: 1600 })}
                />

                {/* ZONE: KNEES (Joelhos) - Diamond Joints */}
                <Zone
                    d="M120,420 L150,420 L145,460 L115,460 Z"
                    label="Joelho E"
                    onClick={() => onAddItem({ name: "Viscossuplementação Joelho E", price: 2100 })}
                    isSpecial
                />
                <Zone
                    d="M190,420 L220,420 L225,460 L195,460 Z"
                    label="Joelho D"
                    onClick={() => onAddItem({ name: "Viscossuplementação Joelho D", price: 2100 })}
                    isSpecial
                />

                {/* Decorative Data Lines (HUD Effect) */}
                <g className="opacity-30 stroke-emerald-900/50">
                    <line x1="50" y1="440" x2="110" y2="440" strokeWidth="0.5" />
                    <text x="45" y="442" className="fill-emerald-700 text-[8px] font-mono text-right">L. KNEE</text>
                    <line x1="290" y1="90" x2="250" y2="90" strokeWidth="0.5" />
                    <text x="295" y="92" className="fill-emerald-700 text-[8px] font-mono">R. SHLDR</text>
                </g>

            </svg>
        </motion.div>
    );
}

export function ProtocolCanvas({ onAddItem }: { onAddItem: (i: any) => void }) {
    const protocols = [
        { name: "Check-up Anual Completo", price: 2500, desc: "Bateria de exames + Retorno" },
        { name: "Terapia Cognitiva", price: 3500, desc: "Pacote de 10 Sessões" },
        { name: "Acompanhamento Nutricional", price: 1800, desc: "3 Meses + Bioimpedância" },
        { name: "Infusão de Vitaminas", price: 600, desc: "Protocolo Revitalize (IV)" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl grid grid-cols-2 gap-4"
        >
            {protocols.map((p, i) => (
                <button
                    key={i}
                    onClick={() => onAddItem({ name: p.name, price: p.price })}
                    className="flex flex-col text-left p-6 rounded-xl bg-[#18181b] border border-[#27272a] hover:border-[#3b82f6] hover:bg-[#18181b]/80 transition-all group relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <div className="w-16 h-16 rounded-full bg-blue-500 blur-xl" />
                    </div>
                    <div className="flex justify-between w-full mb-2 relative z-10">
                        <span className="p-2 rounded-lg bg-[#27272a] text-[#a1a1aa] group-hover:text-[#3b82f6] transition-colors">
                            <Plus size={18} />
                        </span>
                        <Info size={16} className="text-[#3f3f46] hover:text-[#a1a1aa]" />
                    </div>
                    <span className="font-medium text-white mb-1 relative z-10">{p.name}</span>
                    <span className="text-xs text-[#a1a1aa] relative z-10">{p.desc}</span>
                    <span className="mt-4 text-sm font-bold text-[#e4e4e7] relative z-10">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.price)}
                    </span>
                </button>
            ))}
        </motion.div>
    );
}

// Helper SVG Zone with Premium Hover Effects
function Zone({ d, label, onClick, isSpecial = false }: any) {
    return (
        <g
            onClick={onClick}
            className="cursor-pointer group"
        >
            {/* The Path with Interaction Styles */}
            <path
                d={d}
                className={cn(
                    "transition-all duration-300 stroke-[1px]",
                    "fill-[#121214] stroke-[#3f3f46]", // Default State
                    "group-hover:fill-[#3b82f6]/10 group-hover:stroke-[#3b82f6]", // Hover State
                    isSpecial && "stroke-[#3b82f6]/50" // Special items hint
                )}
                vectorEffect="non-scaling-stroke"
            />

            {/* Optional Glow Effect on Hover */}
            <path
                d={d}
                className="opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none stroke-[#3b82f6]"
                strokeWidth="3"
                filter="url(#glow)"
                fill="none"
            />

            {/* Label (Only visible on hover or if specialized) */}
            <text
                x="0"
                y="0"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 fill-white text-[10px] font-mono pointer-events-none"
                textAnchor="middle"
                dominantBaseline="middle"
            >
                {/* SVG Text positioning requires calculating centroid, skipping for strict visual fidelity. Tooltip handled by titles. */}
            </text>

            <title>{label}</title>
        </g>
    );
}
