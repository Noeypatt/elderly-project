/** @type {import('tailwindcss').Config} */
module.exports = {
    important: '#__next',
    corePlugins: {
        preflight: false,
    },
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
