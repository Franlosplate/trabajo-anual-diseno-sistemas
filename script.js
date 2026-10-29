// ===== CONFIGURACIÓN DEL SISTEMA (según el documento) =====
const secciones = {
  "Cliente": {
    icono: "👤",
    entidades: {
      "Presupuesto Cliente": {
        campos: ["Nro", "Cliente", "Fecha", "Producto", "Cantidad", "Total"],
        datos: [
          ["P-001", "Juan Pérez", "2026-09-02", "Tanque 1000L", 2, "$450.000"],
          ["P-002", "Ana Gómez", "2026-09-10", "Tanque 500L", 1, "$210.000"]
        ]
      },
      "Orden de Compra Cliente": {
        campos: ["Nro", "Cliente", "Fecha", "Medio", "Estado"],
        datos: [
          ["OC-101", "Juan Pérez", "2026-09-05", "Web", "Aceptada"],
          ["OC-102", "Ana Gómez", "2026-09-12", "Presencial", "Pendiente"]
        ]
      }
    }
  },
  "Venta": {
    icono: "🧾",
    entidades: {
      "Comprobante de Venta": {
        campos: ["Nro", "Cliente", "Fecha", "Total"],
        datos: [["CV-0001", "Juan Pérez", "2026-09-06", "$450.000"]]
      },
      "Comprobante de Pago Cliente": {
        campos: ["Nro", "Cliente", "Fecha", "Medio de pago", "Monto"],
        datos: [["CP-0001", "Juan Pérez", "2026-09-06", "Transferencia", "$450.000"]]
      },
      "Remito Cliente": {
        campos: ["Nro", "Cliente", "Patente", "Empleado", "Fecha"],
        datos: [["RC-0001", "Juan Pérez", "AB123CD", "Carlos Ruiz", "2026-09-08"]]
      }
    }
  },
  "Compras": {
    icono: "🛒",
    entidades: {
      "Orden de Compra Proveedor": {
        campos: ["Nro", "Proveedor", "Fecha", "Estado"],
        datos: [["OCP-001", "Plásticos del Sur", "2026-09-01", "Emitida"]]
      },
      "Comprobante de Compra Proveedor": {
        campos: ["Nro", "Proveedor", "Fecha", "Total"],
        datos: [["CCP-001", "Plásticos del Sur", "2026-09-03", "$1.200.000"]]
      },
      "Comprobante de Pago Proveedor": {
        campos: ["Nro", "Proveedor", "Fecha", "Monto"],
        datos: [["PP-001", "Plásticos del Sur", "2026-09-04", "$1.200.000"]]
      },
      "Remito Proveedor": {
        campos: ["Nro", "Proveedor", "Fecha", "Materia prima", "Cantidad"],
        datos: [["RP-001", "Plásticos del Sur", "2026-09-03", "Polietileno", 300]]
      }
    }
  },
  "Producción": {
    icono: "🏭",
    entidades: {
      "Orden de Producción": {
        campos: ["Nro", "Producto", "Cantidad", "Responsable", "Estado"],
        datos: [["OP-010", "Tanque 1000L", 20, "Laura Díaz", "En proceso"]]
      },
      "Orden de Devolución Materia Prima": {
        campos: ["Nro", "Proveedor", "Motivo", "Fecha"],
        datos: [["ODM-001", "Plásticos del Sur", "Material defectuoso", "2026-09-07"]]
      }
    }
  },
  "Dominio y Clases": {
    icono: "🧩",
    entidades: {
      "Clases Deducidas del Dominio": {
        campos: ["Nro", "Clase", "Tipo"],
        datos: [
          ["1", "Cliente", "Válida"],
          ["2", "Producto", "Válida"],
          ["3", "Receta", "Válida"],
          ["4", "Empleado", "Válida"],
          ["5", "Proveedor", "Válida"],
          ["6", "Inventario", "Válida"],
          ["7", "MateriaPrima", "Válida"],
          ["8", "Vehículo", "Válida"],
          ["9", "Marca", "Válida"],
          ["10", "Modelo", "Válida"],
          ["11", "Provincia", "Válida"],
          ["12", "Localidad", "Válida"],
          ["13", "Calle", "Válida"],
          ["14", "MedioDePago", "Válida"],
          ["15", "PresupuestoCliente", "Válida"],
          ["16", "PedidoDeCompraCliente", "Válida"],
          ["17", "ComprobanteVentaCliente", "Válida"],
          ["18", "ComprobantePagoCliente", "Válida"],
          ["19", "RemitoCliente", "Válida"],
          ["20", "PresupuestoProveedor", "Válida"],
          ["21", "OrdenDeCompraProveedor", "Válida"],
          ["22", "ComprobanteCompraProveedor", "Válida"],
          ["23", "ComprobantePagoProveedor", "Válida"],
          ["24", "RemitoProveedor", "Válida"]
        ]
      },
      "Clases Agregadas": {
        campos: ["Nro", "Clase", "Tipo"],
        datos: [
          ["1", "DetalleComprobanteVentaCliente", "Agregada"],
          ["2", "DetalleComprobantePagoCliente", "Agregada"],
          ["3", "DetalleRemitoCliente", "Agregada"],
          ["4", "DetallePedidoDeCompraCliente", "Agregada"],
          ["5", "DetallePresupuestoCliente", "Agregada"],
          ["6", "DetalleComprobanteCompraProveedor", "Agregada"],
          ["7", "DetalleComprobantePagoProveedor", "Agregada"],
          ["8", "DetalleRemitoProveedor", "Agregada"],
          ["9", "DetallePresupuestoProveedor", "Agregada"],
          ["10", "DetalleOrdenDeCompraProveedor", "Agregada"],
          ["11", "ControlDeMateriaPrimaCliente", "Agregada"],
          ["12", "ControlDeMateriaPrimaProveedor", "Agregada"],
          ["13", "ControlDeProducción", "Agregada"],
          ["14", "PlanillaDeControl", "Agregada"],
          ["15", "OrdenDeProducción", "Agregada"],
          ["16", "ListaDeMateriaPrima", "Agregada"],
          ["17", "TipoDeProducto", "Agregada"]
        ]
      }
    }
  }
};

// ===== ESTADO =====
let seccionActual = "Cliente";
let entidadActual = Object.keys(secciones["Cliente"].entidades)[0];
let filaEditando = null;   // índice de la fila en edición (null = crear)
let filaEliminando = null;

const app = document.getElementById("app");
const menu = document.getElementById("menu");
const menuMovil = document.getElementById("menuMovilLista");
const modalForm = new bootstrap.Modal(document.getElementById("modalForm"));
const modalEliminar = new bootstrap.Modal(document.getElementById("modalEliminar"));

// ===== MENÚ =====
function dibujarMenu() {
  let html = "";
  for (const sec in secciones) {
    html += `<button class="list-group-item list-group-item-action ${sec === seccionActual ? "active" : ""}"
      onclick="irSeccion('${sec}')">${secciones[sec].icono} ${sec}</button>`;
  }
  menu.innerHTML = html;
  menuMovil.innerHTML = html;
}

function irSeccion(sec) {
  seccionActual = sec;
  entidadActual = Object.keys(secciones[sec].entidades)[0];
  bootstrap.Offcanvas.getInstance(document.getElementById("menuMovil"))?.hide();
  dibujarMenu();
  dibujarPantalla();
}

function irEntidad(ent) {
  entidadActual = ent;
  dibujarPantalla();
}

// ===== PANTALLA (Buscar + tabla + acciones) =====
function dibujarPantalla() {
  const sec = secciones[seccionActual];
  const ent = sec.entidades[entidadActual];

  // Pestañas de entidades de la sección
  const tabs = Object.keys(sec.entidades).map(e =>
    `<li class="nav-item"><button class="nav-link ${e === entidadActual ? "active" : ""}"
      onclick="irEntidad('${e}')">${e}</button></li>`).join("");

  // Encabezado de tabla
  const ths = ent.campos.map(c => `<th>${c}</th>`).join("");

  // Filas
  const filas = ent.datos.map((fila, i) => `
    <tr>
      ${fila.map(v => `<td>${v}</td>`).join("")}
      <td class="text-end table-actions">
        <button class="btn btn-outline-primary" onclick="abrirModificar(${i})">Modificar</button>
        <button class="btn btn-outline-danger" onclick="abrirEliminar(${i})">Eliminar</button>
      </td>
    </tr>`).join("");

  app.innerHTML = `
    <nav aria-label="breadcrumb"><ol class="breadcrumb small">
      <li class="breadcrumb-item">${seccionActual}</li>
      <li class="breadcrumb-item active">${entidadActual}</li>
    </ol></nav>

    <h4 class="mb-3">${seccionActual} · ${entidadActual}</h4>

    <ul class="nav nav-tabs mb-3">${tabs}</ul>

    <div class="card shadow-sm">
      <div class="card-body">
        <div class="row g-2 align-items-end mb-3">
          <div class="col-md-6">
            <label class="form-label small">Buscar</label>
            <input id="buscador" class="form-control" placeholder="Escriba para filtrar..." oninput="filtrar()">
          </div>
          <div class="col-md-6 text-md-end">
            <button class="btn btn-success" onclick="abrirCrear()">+ Crear ${entidadActual}</button>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table table-hover align-middle">
            <thead class="table-light"><tr>${ths}<th class="text-end">Acciones</th></tr></thead>
            <tbody id="cuerpoTabla">${filas}</tbody>
          </table>
        </div>
        <p class="small text-muted mb-0">${ent.datos.length} registro(s)</p>
      </div>
    </div>`;
}

// ===== FILTRO BUSCAR =====
function filtrar() {
  const texto = document.getElementById("buscador").value.toLowerCase();
  document.querySelectorAll("#cuerpoTabla tr").forEach(tr => {
    tr.style.display = tr.textContent.toLowerCase().includes(texto) ? "" : "none";
  });
}

// ===== CREAR / MODIFICAR =====
function construirFormulario(valores = []) {
  const ent = secciones[seccionActual].entidades[entidadActual];
  document.getElementById("formRegistro").innerHTML = ent.campos.map((c, i) => `
    <div class="col-md-6">
      <label class="form-label">${c}</label>
      <input class="form-control" value="${valores[i] ?? ""}">
    </div>`).join("");
}

function abrirCrear() {
  filaEditando = null;
  document.getElementById("modalTitulo").textContent = "Crear " + entidadActual;
  construirFormulario();
  modalForm.show();
}

function abrirModificar(i) {
  filaEditando = i;
  const fila = secciones[seccionActual].entidades[entidadActual].datos[i];
  document.getElementById("modalTitulo").textContent = "Modificar " + entidadActual;
  construirFormulario(fila);
  modalForm.show();
}

document.getElementById("btnGuardar").addEventListener("click", () => {
  const ent = secciones[seccionActual].entidades[entidadActual];
  const valores = [...document.querySelectorAll("#formRegistro input")].map(i => i.value);
  if (filaEditando === null) ent.datos.push(valores);
  else ent.datos[filaEditando] = valores;
  modalForm.hide();
  dibujarPantalla();
});

// ===== ELIMINAR =====
function abrirEliminar(i) {
  filaEliminando = i;
  const fila = secciones[seccionActual].entidades[entidadActual].datos[i];
  document.getElementById("textoEliminar").textContent =
    `¿Seguro que desea eliminar el registro ${fila[0]}?`;
  modalEliminar.show();
}

document.getElementById("btnConfirmarEliminar").addEventListener("click", () => {
  secciones[seccionActual].entidades[entidadActual].datos.splice(filaEliminando, 1);
  modalEliminar.hide();
  dibujarPantalla();
});

// ===== INICIO =====
dibujarMenu();
dibujarPantalla();
