// validators.js
export function validarEmail(email) {
    if (!email) {
    return 'El email es requerido';
    }
    //formato regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
    return 'El formato del email es inválido';
    }
    return null;
}


export function esNum (valorId){
    if (isNaN(valorId)) {
      return true;
    }
    return false;

}