import * as gesPres from '/js/gestionPresupuesto.js';
import * as gesPresWeb from '/js/gestionPresupuestoWeb.js';

gesPres.actualizarPresupuesto(1500);
gesPresWeb.mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());
console.log('patata');
let gasto = new gesPres.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida")
console.log(Object.isExtensible(gasto));
gesPres.anyadirGasto(gasto);
gasto = new gesPres.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida")
gesPres.anyadirGasto(gasto);
gasto = new gesPres.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte")
gesPres.anyadirGasto(gasto);
gasto = new gesPres.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina")
gesPres.anyadirGasto(gasto);
gasto = new gesPres.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros")
gesPres.anyadirGasto(gasto);
gasto = new gesPres.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros")

gesPresWeb.mostrarDatoEnId('gastos-totales',gesPres.calcularTotalGastos())
gesPresWeb.mostrarDatoEnId('balance-total',gesPres.calcularBalance ())
