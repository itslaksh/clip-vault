/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      fontFamily: {
        slab: ['Josefin Slab', 'serif'],
        snippet: ['Snippet', 'sans-serif'],
        pacifico: ['Pacifico', 'cursive'],
        magra: ['Magra', 'sans-serif'],
        MavenPro: ['Maven Pro', 'sans-serif'],
        DarkerGro: ['Darker Grotesque', 'serif'],
      },
      colors: {
        'light-Purple': '#613F96',
        'light-AlphaPurple': '#603f96a8',
        'white': '#ffffff',
        'light-BG': '#F1F4F4',
        'dark-BG': '#0E0B0B',
        'dark-Green': '#A9CF6F',
        'dark-AlphaGreen': '#aed27918',
        'dark-HoverGreen': '#69922b',
      },
      screens: {
        'xs': '300px',
        'sm': '500px',
        'md': '768px',
      },
      darkMode: "class"
    },
  },
  plugins: [],
};
