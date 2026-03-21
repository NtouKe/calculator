const calculator = {
  currentInput: "0",

  display: {
    _upperEl: document.querySelector(".upper-display"),
    _lowerEl: document.querySelector(".lower-display"),
    updateLower() {
      this._lowerEl.textContent = calculator.currentInput;
    },
  },

  handleDigit(number) {
    if (this.currentInput === "0") {
      this.currentInput = number;
    } else {
      this.currentInput += number;
    }
    this.display.updateLower();
  },

  init() {
    this.display.updateLower();
    const keypad = document.querySelector(".keypad");

    keypad.addEventListener("click", (e) => {
      const target = e.target;
      const number = target.dataset.btn;
      const operator = target.dataset.operator;

      if (!number && !operator) return;
      if (number) {
        this.handleDigit(number);
        console.log("clicked " + number);
      }
    });
  },
};

calculator.init();
