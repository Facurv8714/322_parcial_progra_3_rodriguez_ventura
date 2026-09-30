/* 
Al momento de cargar la página, 
utilizar el método fetch para traer 6 cartas  
de la api: https://deckofcardsapi.com/api/deck/new/draw/?count=6
*/

let datosActuales = [];
let currentPage = 0;

const getCartas = async () => {
  document.getElementById("spinner-container").style.display = "flex";
  try {
    const response = await fetch(
      `https://deckofcardsapi.com/api/deck/new/draw/?count=6`,
      {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",

        headers: {
          "Content-Type": "application/json",
        },

        redirect: "follow",
        referrerPolicy: "no-referrer",
      },
    );

    const data = await response.json();
    document.getElementById("spinner-container").style.display = "none";
    return data;
  } catch (error) {
    window.alert(error);
    document.getElementById("spinner-container").style.display = "none";
    return [];
  }
};

const actualizarBotonAnterior = () => {
  document.getElementById("anterior").disabled = currentPage === 0;
};

const cargaInicial = async () => {
  const datos = await getCartas();
  cargarDatos(datos.cards);
  actualizarBotonAnterior();
};

const removerContenidoActual = () => {
  datosActuales = [];
  const parentContainer = document.getElementById("cartas");
  parentContainer.replaceChildren();
};

const paginaSiguiente = async () => {
  removerContenidoActual();
  const datos = await getCartas();
  cargarDatos(datos.cards);
  currentPage++;
  actualizarBotonAnterior();
};

const paginaAnterior = async () => {
  removerContenidoActual(true);
  const datos = await getCartas();
  cargarDatos(datos.cards);
  currentPage--;
  actualizarBotonAnterior();
};

const cargarDatos = async (datos) => {
  const cartas = datos.map(({ code, value, suit, image: imagen }) =>
    Carta.createFromJsonString(JSON.stringify({ code, value, suit, imagen })),
  );
  const parentContainer = document.getElementById("cartas");

  cartas.forEach((carta) => {
    parentContainer.appendChild(carta.createHtmlElement());
    datosActuales.push(carta.code);
  });
};

document.getElementById("anterior").addEventListener("click", paginaAnterior);
document.getElementById("siguiente").addEventListener("click", paginaSiguiente);

window.addEventListener("DOMContentLoaded", cargaInicial);
