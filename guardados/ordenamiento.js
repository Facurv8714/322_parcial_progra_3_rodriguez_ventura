const parentContainer = document.getElementById("cartas");

for (let i = 0; i < localStorage.length; i++) {
  const clave = localStorage.key(i);
  const valor = localStorage.getItem(clave);
  const carta = Carta.createFromJsonString(valor);
  parentContainer.appendChild(carta.createHtmlElement());
}

const elementoPrincipal = document.getElementById("principal");

const botonOrdenamientoPalo = document.createElement("button");
botonOrdenamientoPalo.textContent = "Ordenar por palo";
botonOrdenamientoPalo.onclick = () => this.guardarCarta(this);
