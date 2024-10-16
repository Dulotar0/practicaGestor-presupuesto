var presupuesto = 0;

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

function CrearGasto(descripcion, valor) {
    if(valor < 0 || typeof valor != 'number'){
        this.valor = 0;
    }
    else{
        this.valor = valor;
    }
    this.descripcion = descripcion;
    this.mostrarGasto = function() {
        console.log(`Gasto correspondiente a ${descripcion} con valor ${valor} €`);
        return`Gasto correspondiente a ${descripcion} con valor ${valor} €`;
    }
    this.actualizarDescripcion = function(nuevaDescripcion){
        this.descripcion = nuevaDescripcion;
    }
    this.actualizarValor =function(nuevoValor){
        if(nuevoValor > 0 && typeof nuevoValor == 'number'){
            this.valor = nuevoValor;
        }
    }
}
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
