import { motion } from 'framer-motion';
import { Logo } from '../brand/Logo';

export function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#09090b]">
            <motion.div
                initial={{ opacity: 0.5, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
                className="flex flex-col items-center gap-4"
            >
                <div className="scale-150">
                    <Logo />
                </div>
                {/* Optional subtle bar */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 100 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="h-0.5 bg-[#3b82f6] rounded-full mt-4"
                />
            </motion.div>
        </div>
    );
}
