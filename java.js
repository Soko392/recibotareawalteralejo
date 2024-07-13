// java.js
const tarifasEmpleados = {
    "Oficial Especializado": 53.27,
    "Oficial": 45.39,
    "Medio Oficial": 41.85,
    "Ayudante": 38.42
};

// Valores fijos basados en las leyes argentinas
const porcentajeJubilacion = 11;
const porcentajeObraSocial = 3;
const porcentajeLey23032 = 3;
const asignacionFamiliarPorHijo = 2200; // Asignación Familiar fija por hijo

document.addEventListener('DOMContentLoaded', (event) => {
    actualizarValorHora();
    calcularSueldos();
});

function actualizarValorHora() {
    const categoria = document.getElementById('categoria').value;
    const tarifa = tarifasEmpleados[categoria];
    document.getElementById('valorHora').value = `$${tarifa.toFixed(2)}`;
    calcularSueldos();
}

function calcularSueldos() {
    const categoria = document.getElementById('categoria').value;
    const tarifa = tarifasEmpleados[categoria];

    const horasNormales = parseFloat(document.getElementById('horasNormales').value) || 0;
    const horasExtra50 = parseFloat(document.getElementById('horasExtra50').value) || 0;
    const horasExtra100 = parseFloat(document.getElementById('horasExtra100').value) || 0;

    const remuneracionNormal = horasNormales * tarifa;
    const remuneracionExtra50 = horasExtra50 * tarifa * 1.5;
    const remuneracionExtra100 = horasExtra100 * tarifa * 2;

    document.getElementById('remuneracionNormal').innerText = `$${remuneracionNormal.toFixed(2)}`;
    document.getElementById('remuneracionExtra50').innerText = `$${remuneracionExtra50.toFixed(2)}`;
    document.getElementById('remuneracionExtra100').innerText = `$${remuneracionExtra100.toFixed(2)}`;

    const totalRemunerativo = remuneracionNormal + remuneracionExtra50 + remuneracionExtra100;

    const deduccionJubilacion = totalRemunerativo * (porcentajeJubilacion / 100);
    const deduccionObraSocial = totalRemunerativo * (porcentajeObraSocial / 100);
    const deduccionLey23032 = totalRemunerativo * (porcentajeLey23032 / 100);

    document.getElementById('deduccionJubilacion').innerText = `$${deduccionJubilacion.toFixed(2)}`;
    document.getElementById('deduccionObraSocial').innerText = `$${deduccionObraSocial.toFixed(2)}`;
    document.getElementById('deduccionLey23032').innerText = `$${deduccionLey23032.toFixed(2)}`;

    const totalDescuento = deduccionJubilacion + deduccionObraSocial + deduccionLey23032;

    const numeroHijos = parseFloat(document.getElementById('numeroHijos').value) || 0;
    const asignacionFamiliar = asignacionFamiliarPorHijo * numeroHijos;

    document.getElementById('remuneracionAsignacionFamiliar').innerText = `$${asignacionFamiliar.toFixed(2)}`;

    const totalNoRemunerativo = asignacionFamiliar;

    const totalSueldo = totalRemunerativo - totalDescuento + totalNoRemunerativo;

    document.getElementById('totalRemunerativo').innerText = `$${totalRemunerativo.toFixed(2)}`;
    document.getElementById('totalDescuento').innerText = `$${totalDescuento.toFixed(2)}`;
    document.getElementById('totalNoRemunerativo').innerText = `$${totalNoRemunerativo.toFixed(2)}`;
    document.getElementById('totalSueldo').innerText = `$${totalSueldo.toFixed(2)}`;
}

function imprimirRecibo() {
    window.print();
}
