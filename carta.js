class Carta {
  /**
   * @param {string} code
   * @param {string} value
   * @param {string} suit
   * @param {string} imagen
   */

  constructor(code, value, suit, imagen) {
    this.code = code;
    this.value = value;
    this.suit = suit;
    this.imagen = imagen;
  }

  toJsonString() {
    return JSON.stringify({
      code: this.code,
      value: this.value,
      suit: this.suit,
      imagen: this.imagen,
    });
  }

  // static porque es un método de clase
  static createFromJsonString(jsonString) {
    // podría agregar validaciones
    const {
      code = "",
      value = "",
      suit = "",
      imagen = "",
    } = JSON.parse(jsonString);
    return new Carta(code, value, suit, imagen);
  }

  guardarCarta(carta) {
    const cartaExistente = localStorage.getItem(carta.code);
    if (cartaExistente) {
      window.alert(`La carta ${carta.value} ${carta.suit} ya existe`);
    } else {
      localStorage.setItem(carta.code, JSON.stringify(carta));
      window.alert(`La carta ${carta.value} ${carta.suit} fue guardada con éxito`);
    }
  }

  createHtmlElement() {
    const cardContainer = document.createElement("div");
    cardContainer.id = "cartas_div";
    cardContainer.classList.add("cardContainer");

    const cardInfo = document.createElement("div");
    cardInfo.classList.add("cardInfo");

    const codeContent = document.createElement("p");
    codeContent.classList.add("cartaCode");
    codeContent.textContent = this.code;

    const valueContent = document.createElement("p");
    valueContent.classList.add("cartaValue");
    valueContent.textContent = this.value;

    const suitContent = document.createElement("p");
    suitContent.classList.add("cartaContent");
    suitContent.textContent = this.suit;

    const imageContent = document.createElement("img");
    imageContent.src = this.imagen;
    imageContent.alt = `${this.value} of ${this.suit}`;
    imageContent.onclick = function () {
      window.open(imageContent.src, "_blank");
    };

    cardInfo.append(codeContent, valueContent, suitContent);

    const guardarButton = document.createElement("button");
    guardarButton.textContent = "Guardar";
    guardarButton.classList.add("guardarButton");
    guardarButton.onclick = () => this.guardarCarta(this);

    cardContainer.append(cardInfo, imageContent, guardarButton);
    return cardContainer;
  }

  /*

iii. createHtmlElement().
 De instancia. Devuelve un elemento HTML que permita mostrar del  documento los datos: code, imagen(recuperar del url), suit, value. 

  */
}
