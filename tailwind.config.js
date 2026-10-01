/** @type {import('tailwindcss').Config} */
const green = { 50:'#F0FAF3',100:'#DDF3E4',200:'#BDE8CB',300:'#94D9AC',400:'#6CC78F',500:'#4CB57A',600:'#35985F',700:'#2A784D',800:'#235F3F',900:'#1D4E35' };
const orange = { 50:'#FFF5EC',100:'#FFE8D2',200:'#FFD1A6',300:'#FFB877',400:'#FFA04F',500:'#F98A2E',600:'#DB7016',700:'#B45A12',800:'#8F4813',900:'#753C13' };
const yellow = { 50:'#FFFBE8',100:'#FFF4C2',200:'#FFEA94',300:'#FFDE66',400:'#FFD140',500:'#F5BC1C',600:'#D19A0C',700:'#A87A0C',800:'#85610F',900:'#6B4E10' };

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Bảng màu pastel: vàng - cam - xanh lá (ghi đè các tên màu cũ để toàn site đổi màu đồng bộ)
      colors: {
        teal: green, emerald: green, sky: green,
        cyan: orange, rose: orange, orange,
        amber: yellow, blue: yellow, yellow,
        stone: { ...{ 50:'#FFFBF0' }, 100:'#FFF4DC', 200:'#F3E7CC', 300:'#E6D5AE', 400:'#C9B88F', 500:'#A0906B', 600:'#7A6C4E', 700:'#5B503A', 800:'#3E3628', 900:'#28231A' },
      },
    },
  },
  plugins: [],
};
