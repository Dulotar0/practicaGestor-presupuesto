import * as gesPres from './gestionPresupuesto.js';
import * as gesPresWeb from './gestionPresupuestoWeb.js';

gesPres.actualizarPresupuesto(1500);
gesPresWeb.mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());



let g1 = new gesPres.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
gesPres.anyadirGasto(g1);
g1 = new gesPres.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
gesPres.anyadirGasto(g1);
g1 = new gesPres.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
gesPres.anyadirGasto(g1);
g1 = new gesPres.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
gesPres.anyadirGasto(g1);
g1 = new gesPres.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
gesPres.anyadirGasto(g1);
g1 = new gesPres.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
gesPres.anyadirGasto(g1);

gesPresWeb.mostrarDatoEnId('gastos-totales',gesPres.calcularTotalGastos());
gesPresWeb.mostrarDatoEnId('balance-total',gesPres.calcularBalance ());

let listarGastos = gesPres.listarGastos()
listarGastos.forEach((gasto) => {
    gesPresWeb.mostrarGastoWeb('listado-gastos-completo',gasto);
});

let filtradoGastos1 = gesPres.filtrarGastos({fechaDesde: "2021-09-1", fechaHasta: "2021-09-31"});
filtradoGastos1.forEach(element => {
    gesPresWeb.mostrarGastoWeb('listado-gastos-filtrado-1',element)
});

let filtradoGastos2 = gesPres.filtrarGastos({valorMinimo: 50});
filtradoGastos2.forEach(element => {
    gesPresWeb.mostrarGastoWeb('listado-gastos-filtrado-2',element)
});

let filtradoGastos3 = gesPres.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"] });
filtradoGastos3.forEach(element => {
    gesPresWeb.mostrarGastoWeb('listado-gastos-filtrado-3',element)
});

let filtradoGastos4 = gesPres.filtrarGastos({valorMaximo:50, etiquetasTiene: ["comida", "transporte"]});
filtradoGastos4.forEach(element => {
    gesPresWeb.mostrarGastoWeb('listado-gastos-filtrado-4',element)
});

let gastosAgrupados1 = gesPres.agruparGastos('dia')
gesPresWeb.mostrarGastosAgrupadosWeb('agrupacion-dia',gastosAgrupados1,'día')

let gastosAgrupados2 = gesPres.agruparGastos('mes')
gesPresWeb.mostrarGastosAgrupadosWeb('agrupacion-mes',gastosAgrupados2,'mes')

let gastosAgrupados3 = gesPres.agruparGastos('anyo')
gesPresWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo',gastosAgrupados3,'año')

