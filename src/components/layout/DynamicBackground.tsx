import { motion, useScroll, useTransform } from 'framer-motion';

export function DynamicBackground() {
    const { scrollY } = useScroll();

    // Create varying movement speeds for parallax effect
    const y1 = useTransform(scrollY, [0, 1000], [0, 400]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -300]);
    const y3 = useTransform(scrollY, [0, 1000], [0, 200]);
    const opacity = useTransform(scrollY, [0, 500, 1000], [0.8, 1, 0.8]);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Base Tone - Deep Royal Blue */}
            <div className="absolute inset-0 bg-[#020b1f]" />

            {/* Orb 1: Top Left - Royal/Electric Blue - Increased Opacity */}
            <motion.div
                style={{ y: y1, opacity }}
                className="absolute -top-[10%] -left-[10%] w-[900px] h-[900px] rounded-full bg-blue-600/40 blur-[100px] mix-blend-screen"
            />

            {/* Orb 3: Bottom Left - Cyan/Blue Accent - Increased Opacity */}
            <motion.div
                style={{ y: y3, opacity }}
                className="absolute bottom-[20%] left-[10%] w-[700px] h-[700px] rounded-full bg-sky-500/30 blur-[90px] mix-blend-screen"
            />

            {/* Scroll-based overlay to lighten/darken - Blue Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020b1f]/30 to-[#020b1f]/90" />
        </div>
    );
}
