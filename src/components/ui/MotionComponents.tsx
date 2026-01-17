import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const MotionCard = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => {
    return (
        <motion.div
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            className={className}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
};

export const Card = ({ children, className, onClick, noHover }: { children: React.ReactNode, className?: string, onClick?: () => void, noHover?: boolean }) => {
    return (
        <motion.div
            whileHover={!noHover ? { y: -2, transition: { duration: 0.2 } } : undefined}
            className={cn(
                "relative rounded-xl border border-[#27272a] bg-[#121214] shadow-lg shadow-black/20 overflow-hidden",
                className
            )}
            onClick={onClick}
        >
            {/* Glass Edge Effect */}
            <div className="absolute inset-x-0 top-0 h-px bg-white/10 pointer-events-none z-10" />

            {children}
        </motion.div>
    );
};

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
};

export const StaggerContainer = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={{
                hidden: { opacity: 0 },
                show: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.1
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const StaggerItem = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
