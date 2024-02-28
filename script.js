const campoTexto = document.querySelector("#textoEncriptado");
const campoMensaje = document.querySelector("#campoMensaje");

const matrizCode = [
    ['e', "enter"],  // índice 0
    ["i", 'imes'],   // índice 1
    ["a", "ai"],     // índice 2
    ['o', "ober"],   // índice 3
    ["u", "ufat"],   // índice 4
];

function btnEncriptar() {
    const texto = campoTexto.value;
    const contieneMayusculas = /[A-Z]/.test(texto);
    const contieneSimbolos = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(texto);
    const contieneCaracteresEspeciales = contieneSimbolos || /\s/.test(texto);

    if (contieneCaracteresEspeciales) {
        campoMensaje.value = "El texto no debe contener símbolos ni caracteres especiales.";
        campoTexto.focus();
    } else if (contieneMayusculas) {
        campoMensaje.value = "El texto no debe contener letras mayúsculas.";
        campoTexto.focus();
    } else {
        const textoEncriptado = encriptar(texto);
        campoMensaje.value = textoEncriptado;
    }
}

function encriptar(fraseEncriptada) {
    for (let i = 0; i < matrizCode.length; i++) {
        if (fraseEncriptada.includes(matrizCode[i][0])) {
            fraseEncriptada = fraseEncriptada.replaceAll(
                matrizCode[i][0],
                matrizCode[i][1]
            )
        }
    }
    return fraseEncriptada;
};

function btnLimpiar() {
    campoTexto.value = "";
    campoMensaje.value = "";
    campoTexto.focus();
}

function btnDesencriptar() {
    const texto = campoTexto.value;
    const contieneMayusculas = /[A-Z]/.test(texto);
    const contieneSimbolos = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(texto);
    const contieneCaracteresEspeciales = contieneSimbolos || /\s/.test(texto);

    if (contieneCaracteresEspeciales) {
        campoMensaje.value = "El texto no debe contener símbolos ni caracteres especiales.";
        campoTexto.focus();
    } else if (contieneMayusculas) {
        campoMensaje.value = "El texto no debe contener letras mayúsculas.";
        campoTexto.focus();
    } else {
        const textoDesencriptado = desencriptar(texto);
        campoMensaje.value = textoDesencriptado;
    }
}

function desencriptar(fraseDesencriptada) {
    for (let i = 0; i < matrizCode.length; i++) {
        if (fraseDesencriptada.includes(matrizCode[i][0])) {
            fraseDesencriptada = fraseDesencriptada.replaceAll(
                matrizCode[i][1],
                matrizCode[i][0]
            )
        }
    }
    return fraseDesencriptada;
}

async function btnCopiar() {
    const campoMensaje = document.getElementById("campoMensaje");
    const texto = campoMensaje.value;

    try {
        await navigator.clipboard.writeText(texto);
        console.log("Texto copiado al portapapeles!");
    } catch (error) {
        console.error("Error al copiar el texto al portapapeles.", error);
    }
}