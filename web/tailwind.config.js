/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  // hover: só aplica em aparelhos com mouse — evita "hover grudado" no touch
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        // "Estádio à noite": superfícies (gramado escuro → elevadas)
        paper: {
          DEFAULT: '#0b241c',
          100: '#102d22',
          200: '#163a2c',
          300: '#1f4a39',
        },
        // Giz / texto claro (900 = mais claro → 500 = mais apagado)
        ink: {
          900: '#eef5f1',
          800: '#dbe7e0',
          700: '#bfd2c9',
          600: '#9bb6ab',
          500: '#84a094',
        },
        // Verde gramado (ações) — clareado pra brilhar no escuro
        grass: {
          700: '#1f5a3b',
          600: '#2c7d4f',
          500: '#389a5f',
          400: '#54b97b',
        },
        // Vermelho (erro/derrota) — menos alaranjado
        ochre: {
          600: '#b03a2a',
          500: '#d24a3a',
        },
        // Dourado da taça — acento de marca
        corn: {
          600: '#b8901f',
          500: '#d8a72e',
          400: '#e6b73e',
        },
      },
      fontFamily: {
        // Manchete pesada condensada
        display: ['Anton', 'Impact', 'sans-serif'],
        // Kickers, rótulos, navegação
        cond: ['Oswald', 'system-ui', 'sans-serif'],
        // Corpo editorial em serifa
        serif: ['Newsreader', 'Georgia', 'serif'],
      },
      fontWeight: {
        400: '400',
        500: '500',
        600: '600',
        700: '700',
      },
    },
  },
  plugins: [],
}
