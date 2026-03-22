const calculator = {
  currentInput: "0",
  operator: null,
  accumulator: null,
  resetOnNextInput: false,

  display: {
    _upperEl: document.querySelector(".upper-display"),
    _lowerEl: document.querySelector(".lower-display"),
    upperText: null,
    updateUpper() {
      this._upperEl.textContent = this.upperText;
    },

    updateLower() {
      this._lowerEl.textContent = calculator.currentInput;
    },
  },

  handleDigit(number) {
    if (this.resetOnNextInput) {
      this.currentInput = "0";
      this.resetOnNextInput = false;
    }
    if (this.currentInput.length === 9) return;
    if (this.currentInput === "0") {
      this.currentInput = number;
    } else {
      this.currentInput += number;
    }
    this.display.updateLower();
  },

  handelOperator(operator) {
    operatorSymbols = {
      addition: "+",
      subtract: "-",
      multiply: "x",
      divide: "÷",
    };

    if (this.operator === null || this.resetOnNextInput === true) {
      this.operator = operatorSymbols[operator];
      this.display.upperText += operatorSymbols[operator];
      this.display.updateUpper();
      console.log(this.operator);
    }
  },

  handelOperations: {
    addition() {
      calculator.accumulator += +calculator.currentInput;
    },
  },

  delete() {
    if (this.currentInput === "0") return;
    this.currentInput = this.currentInput.slice(0, -1) || "0";
    this.display.updateLower();
  },

  addition() {
    this.handelOperations.addition();
    this.display.upperText = this.accumulator;
    this.display.updateUpper();
    this.resetOnNextInput = true;
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
      } else if (operator === "delete") {
        this.delete();
        console.log("clicked " + operator);
      } else if (operator === "addition") {
        this.addition();
        this.handelOperator(operator);
        console.log("clicked " + operator);
      }
    });
  },
};

calculator.init();
