import * as gesPres from './gestionPresupuesto.js';

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

    
    
    if(gasto.etiquetas){
        gasto.etiquetas.forEach(etiqueta => {
            let etiquetaSpan = document.createElement("span");
            etiquetaSpan.classList.add("gasto-etiquetas-etiqueta");
            etiquetaSpan.textContent = etiqueta;
            
            //BORRAR ETIQUETA
            let borraEtiqueta = new BorrarEtiquetasHandle();
            borraEtiqueta.gasto = gasto;
            borraEtiqueta.etiqueta = etiqueta
            etiquetaSpan.addEventListener('click',borraEtiqueta)

            divGastoEtiquetas.appendChild(etiquetaSpan);
            divGastoEtiquetas.appendChild(document.createElement('br'))//anyadido para mejor legibilidad
         })
    }
    //BOTON EDITAR GASTO
    let botonEditar = document.createElement("button")
    botonEditar.className = "gasto-editar"
    botonEditar.textContent = "Editar Gasto"
    let editar = new EditarHandle()
    editar.gasto = gasto
    botonEditar.addEventListener('click',editar)
    divGasto.append(botonEditar)


    //BOTON BORRAR GASTO
    let botonBorrar = document.createElement("button")
    botonBorrar.className = "gasto-borrar"
    botonBorrar.textContent = "Borrar Gasto"
    let borrado = new BorrarHandle()
    borrado.gasto = gasto
    botonBorrar.addEventListener('click',borrado)
    divGasto.append(botonBorrar)
    
    

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

function repintar(){
    mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gesPres.calcularBalance());
    document.getElementById("listado-gastos-completo").innerText = ""
    for (let gasto of gesPres.listarGastos()) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
    mostrarGastosAgrupadosWeb("agrupacion-dia", gesPres.agruparGastos("dia"), "dia");
    mostrarGastosAgrupadosWeb("agrupacion-mes", gesPres.agruparGastos("mes"), "mes");
    mostrarGastosAgrupadosWeb("agrupacion-anyo", gesPres.agruparGastos("anyo"), "anyo");
    
}

const BUTTON_ACTUALIZAR_PRESUPUESTO = document.getElementById("actualizarpresupuesto");
BUTTON_ACTUALIZAR_PRESUPUESTO.addEventListener("click",actualizarPresupuestoWeb)

function actualizarPresupuestoWeb(){
    let valorPresupuesto = prompt("Escribe el coste del presupuesto",[0])
    valorPresupuesto = parseInt(valorPresupuesto)
    gesPres.actualizarPresupuesto(valorPresupuesto)
    
    repintar()
}


const BUTTON_ANYADIR_GASTO = document.getElementById("anyadirgasto");
BUTTON_ANYADIR_GASTO.addEventListener("click",nuevoGastoWeb)
function nuevoGastoWeb(){
    let descripcionGasto = prompt("Escribe un descripcion.")
    let valorGasto = prompt("Escribe el coste del presupuesto",[0])
    valorGasto = parseInt(valorGasto)
    let fechaGasto = prompt("Escribe la fecha, por favor en formato yyyy-mm-dd");
    let etiquetasGasto = prompt("Escribe las etiquetas, formato: etiqueta1,etiqueta2,etiqueta3...")
    let todasEtiquetas = etiquetasGasto.split(',')
    
    console.log(descripcionGasto, valorGasto, fechaGasto, todasEtiquetas)

    let nuevoGasto = new gesPres.CrearGasto(descripcionGasto, valorGasto, fechaGasto)
    nuevoGasto.anyadirEtiquetas(todasEtiquetas)
    gesPres.anyadirGasto(nuevoGasto)
    repintar()
}



function EditarHandle(){
    this.handleEvent = function(){
        let descripcionGasto = prompt("Escribe un descripcion.")
        this.gasto.descripcion = descripcionGasto;
        let valorGasto = prompt("Escribe el coste del presupuesto",[0])
        valorGasto = parseFloat(valorGasto)
        this.gasto.valor = valorGasto;
        let fechaGasto = prompt("Escribe la fecha, por favor en formato yyyy-mm-dd");
        this.gasto.fecha = fechaGasto;
        let etiquetasGasto = prompt("Escribe las etiquetas, formato: etiqueta1,etiqueta2,etiqueta3...")
        let todasEtiquetas = etiquetasGasto.split(',')
        this.gasto.etiquetas = todasEtiquetas;

        repintar()
    }
}
function BorrarHandle(){
    this.handleEvent = function(){
        gesPres.borrarGasto(this.gasto.id)

        repintar();
    }
}
function BorrarEtiquetasHandle(){
   this.handleEvent = function(){
        this.gasto.borrarEtiquetas(this.etiqueta)
        repintar();
    }
}