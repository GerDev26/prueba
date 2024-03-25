export function getRamdomLetter() {
    const letras = 'abcdefghijklmnopqrstuvwxyz';
    const indiceAleatorio = Math.floor(Math.random() * letras.length);
    return letras.charAt(indiceAleatorio);
  }