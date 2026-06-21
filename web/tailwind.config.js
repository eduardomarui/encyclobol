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
        // Papel jornal / almanaque
        paper: {
          DEFAULT: '#f2eee2',
          100: '#f7f4ea',
          200: '#ece6d6',
          300: '#ddd4bd',
        },
        // Tinta — preto quente de impressão
        ink: {
          900: '#16130d',
          800: '#262219',
          700: '#3a352b',
          600: '#544d3f',
          500: '#6b6456',
        },
        // Verde gramado vintage
        grass: {
          700: '#1c4d34',
          600: '#235e40',
          500: '#2c6e49',
          400: '#3e8c61',
        },
        // Vermelho de tinta / camisa — acento editorial
        ochre: {
          600: '#a83823',
          500: '#c8472b',
        },
        // Amarelo de marca-texto (feedback "letra existe")
        corn: {
          600: '#a8862a',
          500: '#c9a227',
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
