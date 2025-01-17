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
    
    //BOTON BORRAR GASTOS API
    let botonBorrarGastosApi = document.createElement('button');
    botonBorrarGastosApi.className = 'borrar-gasto-api';
    botonBorrarGastosApi.textContent = 'Borrar (API)';
    let borrarApi = new BorrarApiHandle()
    borrarApi.gasto = gasto
    botonBorrarGastosApi.addEventListener('click',borrarApi)
    divGasto.append(botonBorrarGastosApi);

    //BOTON EDITAR GASTO FORM
    let botonEditarForm = document.createElement("button")
    botonEditarForm.className = "gasto-editar-formulario"
    botonEditarForm.textContent = "Editar con formulario"

    let editarForm = new EditarHandleformulario()
    editarForm.gasto = gasto;
    botonEditarForm.addEventListener('click',editarForm)
    divGasto.appendChild(botonEditarForm);


    
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
    mostrarDatoEnId("gastos-totales", parseInt(gesPres.calcularTotalGastos()));
    mostrarDatoEnId("balance-total", parseFloat(gesPres.calcularBalance()));
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

let btnAnyadirGasto=document.getElementById("anyadirgasto-formulario");
btnAnyadirGasto.addEventListener("click",nuevoGastoWebFormulario);

function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form");


    let btnAnyadir=document.getElementById("anyadirgasto-formulario")
    btnAnyadir.setAttribute("disabled","")

    formulario.addEventListener('submit',funcionManejarSubmit)
    function funcionManejarSubmit(event){
        event.preventDefault();
    
        let descripcion = event.currentTarget.descripcion.value;
        let valor = parseInt(event.currentTarget.valor.value);
        console.log(valor)
        let fecha = event.currentTarget.fecha.value;
        let etiquetas = event.currentTarget.etiquetas.value.split(','); 

        let nuevoGasto = new gesPres.CrearGasto(descripcion,valor,fecha,...etiquetas)
        gesPres.anyadirGasto(nuevoGasto)

        repintar();

        let btnAnyadir=document.getElementById("anyadirgasto-formulario")
        btnAnyadir.removeAttribute("disabled")
        formulario.remove();
    }

    let btnCancelar=formulario.querySelector("button.cancelar")
    let handleCancelar = new HandleCancelar;
    handleCancelar.formABorrar = formulario;
    handleCancelar.button = btnAnyadir;
    btnCancelar.addEventListener("click",handleCancelar);

    let bottonEnviarApi = formulario.querySelector('button.gasto-enviar-api');
    let handleEnviarApi = new HandleEnviarApi;
    
    bottonEnviarApi.addEventListener('click',handleEnviarApi)

    let div = document.getElementById('controlesprincipales')
    div.append(plantillaFormulario)
} 




function HandleCancelar(){
    this.handleEvent = function(evento){
        this.formABorrar.remove()
        console.log(this.button)
        this.button.removeAttribute("disabled","")
    }
}

function EditarHandleformulario(){
    this.handleEvent = function(event){
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = plantillaFormulario.querySelector("form");

        let editarGastoButton = event.currentTarget;
        editarGastoButton.setAttribute("disabled","")

        formulario.descripcion.value = this.gasto.descripcion
        formulario.valor.value = parseInt(this.gasto.valor)
        let fechaForm = new Date(this.gasto.fecha)
        formulario.fecha.value = fechaForm.toISOString().substring(0,10)
        formulario.etiquetas.value = this.gasto.etiquetas

        let editarEvent = new EditarHandleEvent()
        editarEvent.gasto = this.gasto;
        formulario.addEventListener('submit',editarEvent)

        let btnEditarApi = formulario.querySelector('button.gasto-enviar-api')
        let handleEnviarApi = new HandleEnviarFormApi()
        handleEnviarApi.gasto = this.gasto
        btnEditarApi.addEventListener('click',handleEnviarApi)


        let btnCancelar=formulario.querySelector("button.cancelar")

        let handleCancelar = new HandleCancelar();
        handleCancelar.formABorrar = formulario;
        handleCancelar.button = editarGastoButton;

        btnCancelar.addEventListener("click",handleCancelar);

        

        let div = event.currentTarget.parentElement
        div.appendChild(plantillaFormulario)
    }

    function EditarHandleEvent(){
        this.handleEvent = function(event){
            event.preventDefault()

            let descripcion = event.currentTarget.descripcion.value;
            let valor = parseFloat(event.currentTarget.valor.value);
            let fecha = event.currentTarget.fecha.value;
            let etiquetas = event.currentTarget.etiquetas.value.split(',');
    

            this.gasto.actualizarDescripcion(descripcion);
            this.gasto.valor = valor;
            this.gasto.actualizarFecha(fecha);
            this.gasto.borrarEtiquetas(this.gasto.etiquetas)
            this.gasto.anyadirEtiquetas(etiquetas)

            repintar();
        }
    }
}
let filtrado = document.getElementById("filtrar-gastos");
let formularioFiltro = filtrado.querySelector("form");
formularioFiltro.addEventListener('submit',filtrarGastosWeb)
function filtrarGastosWeb(event){
    event.preventDefault()

    let filtradoDescripcion = document.getElementById("formulario-filtrado-descripcion").value
    let filtradoValorMinimo = document.getElementById("formulario-filtrado-valor-minimo").value
    let filtradoValorMaximo = document.getElementById("formulario-filtrado-valor-maximo").value
    let filtradoFechaInicial = document.getElementById("formulario-filtrado-fecha-desde").value
    let filtradoFechaFinal = document.getElementById("formulario-filtrado-fecha-hasta").value
    let filtradoEtiquetas = document.getElementById("formulario-filtrado-etiquetas-tiene").value


    if(filtradoEtiquetas){
        filtradoEtiquetas = gesPres.transformarListadoEtiquetas(filtradoEtiquetas);
        
    }
    
    let filtro = {}
    if (typeof filtradoDescripcion !== "undefined" && filtradoDescripcion) {
        filtro.descripcionContiene = filtradoDescripcion;
    }
    if (typeof filtradoValorMinimo !== "undefined" && filtradoValorMinimo) {
        filtro.valorMinimo = filtradoValorMinimo;
    }
    if (typeof filtradoValorMaximo !== "undefined" && filtradoValorMaximo) {
        filtro.valorMaximo = filtradoValorMaximo;
    }
    if (typeof filtradoFechaInicial !== "undefined" && filtradoFechaInicial) {
        filtro.fechaDesde = filtradoFechaInicial;
    }
    if (typeof filtradoFechaFinal !== "undefined" && filtradoFechaFinal) {
        filtro.fechaHasta = filtradoFechaFinal;
    }
    if (typeof filtradoEtiquetas !== "undefined" && filtradoEtiquetas) {
        filtro.etiquetasTiene = filtradoEtiquetas;
    }

    console.log(filtro)

    document.getElementById("listado-gastos-completo").innerText = ""
    let gastosFiltrados = gesPres.filtrarGastos(filtro)
    console.log(gastosFiltrados)
    gastosFiltrados.forEach(element => {
        mostrarGastoWeb("listado-gastos-completo",element)
    });
}


let botonCargar = document.getElementById('cargar-gastos');
botonCargar.addEventListener('click',cargarGastosWeb);
let botonGuardar = document.getElementById('guardar-gastos');
botonGuardar.addEventListener('click',guardarGastosWeb);
function guardarGastosWeb(){
    
    localStorage.GestorGastosDWEC = JSON.stringify(gesPres.listarGastos())
    console.log(localStorage.GestorGastosDWEC)
}
function cargarGastosWeb(){
    let gastosAReidratar = localStorage.GestorGastosDWEC
    if(gastosAReidratar && gastosAReidratar !== 'undefined' && gastosAReidratar !== 'null'){
        gesPres.cargarGastos(JSON.parse(gastosAReidratar))
    }
    else{
        gesPres.cargarGastos([])
    }
    repintar()
}

let url = 'https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest';
    
let buttonCargarGastosApi = document.getElementById("cargar-gastos-api");
buttonCargarGastosApi.addEventListener('click',cargarGastosApi);

async function cargarGastosApi(){
    let user = document.getElementById('nombre_usuario').value;
    user = user.toLocaleLowerCase().replace(' ','')
    let nuevaUrl = url+'/'+user
    let promise = await fetch(nuevaUrl)
    if(promise.ok){
        let json = await promise.json();
        gesPres.cargarGastos(json);
    }
    else{
        console.log("Error: " + promise.status);
    }
    repintar()
}

function BorrarApiHandle(){
    this.handleEvent = async function(event){
        event.preventDefault()

        let user = document.getElementById('nombre_usuario').value;
        user = user.toLocaleLowerCase().replace(' ','')
        let nuevaUrl = url+'/'+user +'/'+ this.gasto.gastoId

        console.log(nuevaUrl)
        let borrar = await fetch(nuevaUrl,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if(borrar.ok){
            console.log('borrado')
        }
        else{
            console.log("Error: " + promise.status);
        }    
        
        cargarGastosApi()
    }
}

function HandleEnviarApi(){
    this.handleEvent = async function(event){
        event.preventDefault()
        let user = document.getElementById('nombre_usuario').value;
        user = user.toLocaleLowerCase().replace(' ','')
        let nuevaUrl = url+'/'+user
        
        let form = event.currentTarget.parentNode
        let descripcion = form.descripcion.value;
        let valor = parseFloat(form.valor.value);
        let fecha = form.fecha.value;
        let etiquetas = form.etiquetas.value.split(',');

        let nuevoGasto = new gesPres.CrearGasto(descripcion,valor,fecha,...etiquetas)

        await fetch(nuevaUrl,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(nuevoGasto)
        }).catch((error)=>{
            alert("Error: " + error);
        })
        cargarGastosApi()
    }
}

function HandleEnviarFormApi(){
    this.handleEvent = async function(event){
        event.preventDefault()

        let form = event.currentTarget.parentNode
        let descripcion = form.descripcion.value;
        let valor = parseFloat(form.valor.value);
        let fecha = form.fecha.value;
        let etiquetas = form.etiquetas.value.split(',');

        let nuevoGasto = new gesPres.CrearGasto(descripcion,valor,fecha,...etiquetas)
        console.log(nuevoGasto)

        let user = document.getElementById('nombre_usuario').value;
        user = user.toLocaleLowerCase().replace(' ','')
        let nuevaUrl = url+'/'+user+'/'+this.gasto.gastoId
        await fetch(nuevaUrl,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(nuevoGasto)
        }).catch((error)=>{
            alert("Error: " + error);
        })
        cargarGastosApi()
    }
}