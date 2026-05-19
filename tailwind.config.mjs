/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        nero: '#111111',
        bianco: '#F5F1EA',
        terracotta: '#A65A3A',
        sabbia: '#D8C7B8',
        marrone: '#5C4033',
        grigio: '#A9A29A',
        verde: '#2D5A27',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'h1': ['52px', { lineHeight: '1.08', letterSpacing: '-0.015em' }],
        'h2': ['32px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h3': ['22px', { lineHeight: '1.3' }],
        'lead': ['20px', { lineHeight: '1.55' }],
        'body': ['16px', { lineHeight: '1.75' }],
        'pullquote': ['26px', { lineHeight: '1.4' }],
        'occhiello': ['11px', { lineHeight: '1.4', letterSpacing: '0.16em' }],
        'didascalia': ['12px', { lineHeight: '1.55' }],
      },
      maxWidth: {
        'editorial': '680px',
        'content': '1200px',
      },
      borderWidth: {
        '0.5': '0.5px',
      },
    },
  },
  plugins: [],
};
