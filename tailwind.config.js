/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#2563eb",
                background: "white",
                foreground: "#0f172a",
                border: "#e2e8f0",
            },
            borderRadius: {
                xl: "0.75rem",
                '2xl': "1rem",
            }
        },
    },
    plugins: [],
}
