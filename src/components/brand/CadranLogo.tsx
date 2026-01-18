export function CadranLogo({ className = "w-6 h-6" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className={className.includes("text-") ? className : `${className} text-white`}
        >
            {/* Circular Outer Bounds (Implicit in blades usually, but let's ensure full shape) */}

            {/* 6-Blade Aperture Design - White Segments on Dark */}
            <path d="M14.07,2.28L12.9,9.22l6.83,1.86c0.69-1.92,0.86-4.04,0.36-6.13C18.67,3.61,16.51,2.5,14.07,2.28z" />
            <path d="M8.28,3.69L11.55,9.8l-5.61,4.28c-1.3-1.57-1.89-3.66-1.5-5.75C5.07,6.3,6.45,4.61,8.28,3.69z" />
            <path d="M3.69,14.07l6.94-1.17l-1.86,6.83c-1.92,0.69-4.04,0.86-6.13,0.36C1.29,18.67,2.4,16.51,3.69,14.07z" />
            <path d="M9.93,21.72l3.27-6.11l5.61-4.28c1.3,1.57,1.89,3.66,1.5,5.75C19.68,19.12,18.27,20.76,9.93,21.72z" />
            <path d="M21.72,9.93l-6.94,1.17l1.86-6.83c1.92-0.69,4.04-0.86,6.13-0.36C22.71,5.33,21.6,7.49,21.72,9.93z" />
            <path d="M15.72,2.28c-0.56-0.05-1.11-0.08-1.65,0L14.07,2.28z" />
            {/* 
                Actually, the cleanest "Shutter" is the one used by common camera icons.
                Let's use a simpler, geometric 6-blade path.
             */}

            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2c1.65 0 3.2.46 4.54 1.26l-5.3 5.3-5.3-5.3C7.24 4.46 9.51 4 12 4zm-8 8c0-1.65.46-3.2 1.26-4.54l5.3 5.3-5.3 5.3C4.46 16.76 4 14.49 4 12zm8 8c-1.65 0-3.2-.46-4.54-1.26l5.3-5.3 5.3 5.3C16.76 19.54 14.49 20 12 20zm8-8c0 1.65-.46 3.2-1.26 4.54l-5.3-5.3 5.3-5.3C19.54 7.24 20 9.51 20 12z" />
        </svg>
    );
}

{/* 
   Above is a 4-section shutter. The user image has 6 or 8.
   Let's use the one from the scratchpad which looked like a 6-blade construction.
   Actually, the user's image is a DIAPHRAGM.
   A standard diaphragm SVG:
*/}
export function CadranLogoFinal({ className = "w-6 h-6" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className={className.includes("text-") ? className : `${className} text-white`}
        >
            {/* The 6-blade Aperture (Shutter) */}
            <path d="M12,0C5.373,0,0,5.373,0,12s5.373,12,12,12s12-5.373,12-12S18.627,0,12,0z M12,2c4.27,0,7.91,2.78,9.31,6.63
	l-8.69,2.68l-3.21-9C10.08,2.09,11.02,2,12,2z M8.13,3.2l2.94,8.23L4.29,14.6C2.86,12.98,2,10.87,2,8.56
	C2,6.46,2.77,4.52,4.06,3.02L8.13,3.2z M2.69,17.37l8.69-2.68l3.21,9c-0.65,0.21-1.34,0.32-2.05,0.32c-4.27,0-7.91-2.78-9.31-6.63
	H2.69z M15.87,20.8l-2.94-8.23l6.78-3.17c1.43,1.61,2.29,3.73,2.29,6.04c0,2.1-0.77,4.04-2.06,5.54L15.87,20.8z"/>
        </svg>
    );
}
