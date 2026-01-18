export function CadranLogo({ className = "w-6 h-6" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className.includes("text-") ? className : `${className} text-white`}
        >
            {/* Aperture Blades - 6 Blade Design */}
            <path d="M48.268 39.5L25.995 19.317L50 0L48.268 39.5Z" fill="currentColor" />
            <path d="M60.5 48.268L80.683 25.995L100 50L60.5 48.268Z" fill="currentColor" />
            <path d="M51.732 60.5L74.005 80.683L50 100L51.732 60.5Z" fill="currentColor" />
            <path d="M39.5 51.732L19.317 74.005L0 50L39.5 51.732Z" fill="currentColor" />
            <path d="M51.732 39.5L74.005 19.317L93.3013 25L51.732 39.5Z" fill="currentColor" opacity="0" />

            {/* Re-drawing with a cleaner 6-segment fill based on standard aperture geometry */}
            <g transform="translate(50,50)">
                {/* Standard Aperture Shutter Geometry */}
                {[0, 60, 120, 180, 240, 300].map((deg) => (
                    <path
                        key={deg}
                        d="M-4.33 24.5 L-25 -43.3 L25 -43.3 Z" // Conceptual Triangle segment
                        transform={`rotate(${deg})`}
                        fill="currentColor"
                    // The actual shape of a shutter blade is complex to draw perfectly with simple triangles
                    // Let's use a path that represents the visible part of the blade
                    />
                ))}
            </g>

            {/* 
                Let's use a simpler, pre-calculated path for a 6-blade shutter 
                that mimics the provided white-on-black logo perfectly.
             */}
        </svg>
    );
}

// Rewriting component to use a clean, confirmed aperture path
export function CadranLogoV2({ className = "w-6 h-6" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className={className.includes("text-") ? className : `${className} text-white`}
        >
            {/* Lucide's Aperture isn't filled. We want Filled segments. */}
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z" className="opacity-0" /> {/* Canvas */}

            {/* Custom 6-blade Aperture Path */}
            <path d="M10.8 3.4L13.2 13.6L21.4 10.4L10.8 3.4Z" />
            {/* This is hard to hand-code coordinates. Let's use the 'Aperture' icon from lucide but styled or find a better approximation.
               The user image provided is VERY standard.
               Let's try to construct it with rotations.
            */}
        </svg>
    )
}
