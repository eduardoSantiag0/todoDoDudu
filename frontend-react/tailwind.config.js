/** @type {import('tailwindcss').Config} */
export default {
content: ["./index.html", "./src/**/*.{ts,tsx}"],
theme: {
extend: {
colors: {
brand: {
50: '#f2f7ff', 100: '#e6f0ff', 200: '#cce0ff', 300: '#99c2ff',
400: '#66a3ff', 500: '#3385ff', 600: '#0066ff', 700: '#0052cc',
800: '#003d99', 900: '#002966'
}
}
}
},
plugins: [],
}
