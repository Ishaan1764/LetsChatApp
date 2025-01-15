import React, { useCallback } from 'react';
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { useThemeStore } from "../store/useThemeStore"; // Assuming you have a theme store

const HomePageRightAnimation = () => {
    const { theme } = useThemeStore(); // Access the current theme
    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        console.log(container);
    }, []);

    // Define color map for different themes
    const themeColors = {
        light: ["#f3f4f6", "#e5e7eb", "#d1d5db"],
        dark: ["#1f2937", "#374151", "#4b5563"],
        cupcake: ["#ffedd5", "#fecaca", "#fbcfe8"],
        bumblebee: ["#fef3c7", "#fde68a", "#fbbf24"],
        emerald: ["#d1fae5", "#6ee7b7", "#10b981"],
        corporate: ["#cbd5e1", "#94a3b8", "#1e3a8a"],
        synthwave: ["#f472b6", "#c084fc", "#7c3aed"],
        retro: ["#fde68a", "#fbbf24", "#fb923c"],
        cyberpunk: ["#ff0075", "#ff5e00", "#faff00"],
        valentine: ["#f9a8d4", "#ec4899", "#9b1d20"],
        halloween: ["#ff8a00", "#f59e0b", "#d97706"],
        garden: ["#a7f3d0", "#6ee7b7", "#34d399"],
        forest: ["#a7f3d0", "#22c55e", "#065f46"],
        aqua: ["#a7f3d0", "#34d399", "#10b981"],
        lofi: ["#c084fc", "#7c3aed", "#9333ea"],
        pastel: ["#f3e8ff", "#e0e7ff", "#d8b4fe"],
        fantasy: ["#6b7280", "#374151", "#1f2937"],
        wireframe: ["#d1d5db", "#e5e7eb", "#f3f4f6"],
        black: ["#000000", "#111827", "#1f2937"],
        luxury: ["#ffd700", "#ffdf00", "#ffcc00"],
        dracula: ["#ff79c6", "#8be9fd", "#50fa7b"],
        cmyk: ["#00ffff", "#ff00ff", "#ffff00"],
        autumn: ["#fb923c", "#f97316", "#ea580c"],
        business: ["#facc15", "#fbbf24", "#f59e0b"],
        acid: ["#a7f3d0", "#10b981", "#16a34a"],
        lemonade: ["#fef08a", "#facc15", "#eab308"],
        night: ["#111827", "#1f2937", "#374151"],
        coffee: ["#3e3b3b", "#6b5243", "#d1b29e"],
        winter: ["#e0f2f1", "#80deea", "#4dd0e1"],
        dim: ["#6b7280", "#374151", "#1f2937"],
        nord: ["#81a1c1", "#5e81ac", "#4c566a"],
        sunset: ["#ff7f50", "#f77f00", "#e76f51"],
        default: ["#60a5fa", "#3b82f6", "#1d4ed8"],
    };

    const particleColors = themeColors[theme] || themeColors.default;

    return (
        <div className='z-auto'>
            <Particles
                id='tsParticles'
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onhover: {
                                enable: true,
                                mode: 'repulse',
                            },
                        },
                    },
                    modes: {
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                    particles: {
                        color: {
                            value: particleColors, // Dynamic color based on the theme
                        },
                        size: {
                            value: { min: 3, max: 5 },
                        },
                        number: {
                            value: 100,
                        },
                        move: {
                            direction: 'none',
                            enable: true,
                            outModes: {
                                default: 'bounce',
                            },
                            speed: 2,
                        },
                        opacity: {
                            value: 0.4,
                        },
                        zIndex: {
                            value: -10,
                        },
                        collisions: {
                            enable: true,
                        },
                    },
                }}
            />
        </div>
    );
};

export default HomePageRightAnimation;
