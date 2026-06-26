// validators.js
export {validarEmail, esNum, patronesSQL}

//función para validar la estructura de un correo electronico
function validarEmail(email) {
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

// funcion para validar si es un número
function esNum (valorId){
    if (isNaN(valorId)) {
        return true;
    }
    return false;

}


// Detectar intentos básicos de SQL injection
function patronesSQL(valor){
    const patronesSQL = /(\bSELECT\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bDROP\b)/i;

    // Validamos si 'title' existe y tiene el patrón, O si 'content' existe y tiene el patrón
    if (patronesSQL.test(valor)) {
        return true;
    };
}




