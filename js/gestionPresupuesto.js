var presupuesto = 0;
var gastos = new Array();
var idGasto = 0;

function actualizarPresupuesto(nuevoPresupuesto) {
    if(nuevoPresupuesto >= 0 && typeof nuevoPresupuesto == 'number'){
        presupuesto = nuevoPresupuesto;
        return presupuesto;
    }
    else{
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.etiquetas = [];
    this.descripcion = descripcion;
    if(valor < 0 || typeof valor != 'number'){
        this.valor = 0;
    }
    else{
        this.valor = valor;
    }

    if(fecha == ''|| typeof fecha !== 'string' || isNaN(Date.parse(fecha))){
        this.fecha = new Date();
    }
    else{
        this.fecha = Date.parse(fecha);  
    }


    this.actualizarFecha = function(nuevaFecha){
        if(nuevaFecha != ''&& typeof nuevaFecha === 'string' && !isNaN(Date.parse(nuevaFecha))){
            this.fecha = Date.parse(nuevaFecha)
        }
    }
    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`
    }
    this.mostrarGastoCompleto = function() {
        let stringEtiquetas ='';
        let fechaBien;
        
        etiquetas.forEach(element => {
            stringEtiquetas += `- ${element}\n`
        });
        return`Gasto correspondiente a ${descripcion} con valor ${valor} €.\nFecha: ${new Date(this.fecha).toLocaleString()}\nEtiquetas:\n${stringEtiquetas}`
                ;
    }
    this.actualizarDescripcion = function(nuevaDescripcion){
        this.descripcion = nuevaDescripcion;
    }
    this.actualizarValor =function(nuevoValor){
        if(nuevoValor > 0 && typeof nuevoValor == 'number'){
            this.valor = nuevoValor;
        }
    }
    this.anyadirEtiquetas = function(...nuevasEtiquetas){
        nuevasEtiquetas.forEach(element =>{
            if(!this.etiquetas.includes(element)){
                this.etiquetas.push(element);
            }
        });
    }
    this.borrarEtiquetas = function(...borrarEtiquetas){
        borrarEtiquetas.forEach(element => {
            let index = this.etiquetas.indexOf(element);
            if(index !== -1){
                this.etiquetas.splice(index,1)
            }
        });
    }
    this.anyadirEtiquetas(...etiquetas)
}

function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto)
}

function borrarGasto(gastoABorrar){
    if(!isNaN(gastoABorrar) && gastoABorrar >= 0){
        for (let i = 0; i < gastos.length; i++) {
            if (gastos[i].id == gastoABorrar) {
                gastos.splice(i, 1);
                break;
            }
        }
    }
}

function calcularTotalGastos(){
    let sumaGastos = 0;
    gastos.forEach(element => {
        sumaGastos += element.valor;
    });
    return sumaGastos;
}

function calcularBalance(){
    return presupuesto - calcularTotalGastos();
}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}