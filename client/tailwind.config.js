/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        jaune: {
          DEFAULT: '#FFC845', // Amarillo
        },
        bleu: {
          DEFAULT: '#007096', // Azul
        },
      },
    },
  },
  plugins: [],
}
