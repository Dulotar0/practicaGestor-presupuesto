export function mostrarDatoEnId(idElemento, valor){
    let elemento = document.getElementById(idElemento)
    elemento.innerText = valor
}
export function mostrarGastoWeb(idElemento,gasto){
    let elemento = document.getElementById(idElemento);

    let divGasto = document.createElement('div');
    divGasto.className = 'gasto';
    elemento.append(divGasto);

    let divGastoDescripcion = document.createElement('div');
    divGastoDescripcion.className = 'gasto-descripcion';
    divGastoDescripcion.innerText = gasto.descripcion;
    divGasto.append(divGastoDescripcion);

    let divGastoFecha = document.createElement('div');
    divGastoFecha.className = 'gasto-fecha';
    divGastoFecha.innerText = gasto.fecha;
    divGasto.append(divGastoFecha);
    
    let divGastoValor = document.createElement('div');
    divGastoValor.className = 'gasto-valor';
    divGastoValor.innerText = gasto.valor;
    divGasto.append(divGastoValor);

    let divGastoEtiquetas = document.createElement('div');
    divGastoEtiquetas.classList.add('gasto-etiquetas');
    divGasto.append(divGastoEtiquetas);

    gasto.etiquetas.forEach(etiquetas => {
        let etiquetaSpan = document.createElement("span");
        etiquetaSpan.classList.add("gasto-etiquetas-etiqueta");
        etiquetaSpan.textContent = etiquetas;
        divGastoEtiquetas.appendChild(etiquetaSpan);
    })
    
}
export function mostrarGastosAgrupadosWeb(idElemento,agrup, periodo){
    let divAgrupacion = document.createElement('div');
    divAgrupacion.className = "agrupacion";

    let h1Agrupacion = document.createElement('h1');
    h1Agrupacion.innerText = 'Gastos agrupados por ' + periodo;
    divAgrupacion.append(h1Agrupacion);

    let valorAgrup = Object.entries(agrup)
    for(let agrupaciones of valorAgrup){
        let divAgrupacionDato = document.createElement('div');
        divAgrupacionDato.className = 'agrupacion-dato';
        
        let spanDatoClave = document.createElement('span');
        spanDatoClave.className = 'agrupacion-dato-clave';
        spanDatoClave.innerText = agrupaciones[0];
        divAgrupacionDato.append(spanDatoClave)
        
        let spanDatoValor = document.createElement('span');
        spanDatoValor.className = 'agrupacion-dato-valor';
        spanDatoValor.innerText = agrupaciones[1];
        divAgrupacionDato.append(spanDatoValor)

        divAgrupacion.append(divAgrupacionDato);
    }

    let elemento = document.getElementById(idElemento);
    elemento.append(divAgrupacion);

}