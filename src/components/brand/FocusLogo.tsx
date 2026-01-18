import { motion } from 'framer-motion';

export function FocusLogo() {
    return (
        <div className="relative w-10 h-10 flex items-center justify-center cursor-pointer group">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-cadran-blue/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Container for the Logo and Aperture */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-full border border-white/10 bg-black/20 backdrop-blur-sm group-hover:border-cadran-blue/30 transition-colors duration-500">

                {/* The Logo itself */}
                <motion.img
                    src="/logo-icon.png"
                    alt="Cadran"
                    className="w-5 h-5 object-contain z-10 relative pointer-events-none mix-blend-screen"
                />

                {/* Aperture Blades (The "Focus" Mechanism) */}
                <Aperture />
            </div>
        </div>
    );
}

function Aperture() {
    // 6 Blades for the aperture
    const blades = [0, 60, 120, 180, 240, 300];

    return (
        <motion.div
            className="absolute inset-0 w-full h-full z-20 pointer-events-none"
            initial="open"
            whileHover="closed"
        >
            {blades.map((rotation, i) => (
                <ApertureBlade key={i} rotation={rotation} />
            ))}
        </motion.div>
    );
}

function ApertureBlade({ rotation }: { rotation: number }) {
    return (
        <motion.div
            className="absolute top-0 left-0 w-full h-full origin-center"
            style={{ rotate: rotation }}
        >
            <motion.div
                className="absolute top-0 left-1/2 w-[150%] h-[150%] bg-[#0A0A0A] border-l border-white/10 origin-bottom-left"
                style={{
                    x: "-50%",
                    y: "-50%",
                }}
                variants={{
                    open: {
                        rotate: -45, // Retracted position
                        opacity: 0
                    },
                    closed: {
                        rotate: [-45, 0, -45], // Close then open
                        opacity: [0, 0.9, 0], // Fade in as it closes
                        transition: { duration: 0.8, ease: "easeInOut" }
                    }
                }}
            />
        </motion.div>
    );
}
