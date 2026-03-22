const calculator = {
  currentInput: "0",
  operator: "",
  accumulator: 0,
  resetOnNextInput: false,

  display: {
    _upperEl: document.querySelector(".upper-display"),
    _lowerEl: document.querySelector(".lower-display"),
    secondaryDisplay: 0,

    updateSecondaryDisplay() {
      this._upperEl.textContent = this.secondaryDisplay;
    },
    updateMainDisplay() {
      this._lowerEl.textContent = calculator.currentInput;
    },

    update() {
      if (isNaN(calculator.currentInput)) {
        this._lowerEl.textContent = "NaN";
        return;
      }
      if (calculator.accumulator === 0) {
        this.updateSecondaryDisplay();
        this.updateMainDisplay();
      } else {
        console.log(calculator.accumulator);
        this.secondaryDisplay = +parseFloat(calculator.accumulator).toFixed(5) + calculator.operator;
        this.updateSecondaryDisplay();
        this.updateMainDisplay();
      }
    },
  },

  handleNumberInput(number) {
    if (this.resetOnNextInput) {
      this.currentInput = "0";
      this.resetOnNextInput = false;
    }
    if (this.currentInput.length === 10) return;
    if (this.currentInput == "0") {
      this.currentInput = number;
    } else {
      this.currentInput += number;
    }
    this.display.update();
  },

  handleDecimal() {
    if (!this.currentInput.includes(".")) this.currentInput += ".";
    this.display.update();
  },

  reset() {
    this.currentInput = "0";
    this.operator = "";
    this.accumulator = 0;
    this.resetOnNextInput = false;
    this.display.secondaryDisplay = "";
    this.display.update();
  },

  delete() {
    if (this.resetOnNextInput) {
      this.currentInput = "0";
      this.display.update();
    }
    this.currentInput = this.currentInput.slice(0, -1) || "0";
    this.display.update();
  },

  addition() {
    if (this.currentInput === "0") return;
    this.operator = "+";
    this.accumulator += +parseFloat(this.currentInput);
    this.display.update();
    this.resetOnNextInput = true;
  },

  // handleDigit(number) {
  //   if (this.resetOnNextInput) {
  //     this.currentInput = "0";
  //     this.resetOnNextInput = false;
  //   }
  //   if (this.currentInput.length === 9) return;
  //   if (this.currentInput === "0") {
  //     this.currentInput = number;
  //   } else {
  //     this.currentInput += number;
  //   }
  //   this.display.updateLower();
  // },

  // handleOperator(operator) {
  //   const operatorSymbols = {
  //     addition: "+",
  //     subtract: "-",
  //     multiply: "x",
  //     divide: "÷",
  //   };

  //   if (this.operator === null || this.resetOnNextInput === true) {
  //     this.operator = operatorSymbols[operator];
  //     this.display.upperText += operatorSymbols[operator];
  //     this.display.updateUpper();
  //   }
  // },

  // handleOperations: {
  //   addition() {
  //     calculator.accumulator += +calculator.currentInput;
  //   },
  //   subtract() {
  //     calculator.accumulator = calculator.accumulator - calculator.currentInput;
  //   },
  // },

  // delete() {
  //   if (this.resetOnNextInput) {
  //     this.currentInput = "0";
  //     this.display.updateLower();
  //   }
  //   if (this.currentInput === "0") return;
  //   this.currentInput = this.currentInput.slice(0, -1) || "0";
  //   this.display.updateLower();
  // },

  // addition() {
  //   if (this.currentInput === "0") return;
  //   this.handleOperations.addition();
  //   this.display.upperText = this.accumulator;
  //   this.display.updateUpper();
  //   this.handleOperator("addition");
  //   this.resetOnNextInput = true;
  // },

  // subtract() {
  //   if (this.currentInput === "0") return;
  //   if (this.display.upperText === null) {
  //     this.display.upperText += +this.currentInput;
  //     this.display.updateUpper();
  //     this.handleOperator("subtract");
  //     this.resetOnNextInput = true;
  //     this.accumulator = this.currentInput;
  //     return;
  //   }
  //   this.handleOperations.subtract();
  //   this.display.upperText += this.accumulator;
  //   this.display.updateUpper();
  //   this.handleOperator("subtract");
  //   this.resetOnNextInput = true;
  // },

  // reset() {
  //   this.currentInput = "0";
  //   this.operator = null;
  //   this.accumulator = null;
  //   this.resetOnNextInput = false;
  //   this.display.upperText = null;
  //   this.display.updateUpper();
  //   this.display.updateLower();
  // },

  // equals() {
  //   const operatorSymbols = {
  //     "+": "addition",
  //     "-": "subtract",
  //     x: "multiply",
  //     "÷": "divide",
  //   };

  //   const clear = () => {
  //     this.display.upperText = null;
  //     this.display.updateLower();
  //     this.display.updateUpper();
  //     this.accumulator = null;
  //     this.resetOnNextInput = true;
  //     this.operator = null;
  //   };

  //   if (this.resetOnNextInput) {
  //     clear();
  //     return;
  //   }
  //   this.handleOperations[operatorSymbols[this.operator]]();
  //   this.currentInput = this.accumulator;
  //   clear();
  // },

  init() {
    this.reset();
    const keypad = document.querySelector(".keypad");

    keypad.addEventListener("click", (e) => {
      const target = e.target;
      const number = target.dataset.btn;
      const operator = target.dataset.operator;

      if (!number && !operator) return;
      if (number) {
        this.handleNumberInput(number);
        console.log("clicked " + number);
        return;
      }
      switch (operator) {
        case "decimal":
          this.handleDecimal();
          console.log("clicked " + operator);
          break;
        case "reset":
          this.reset();
          console.log("clicked " + operator);
          break;
        case "delete":
          this.delete();
          console.log("clicked " + operator);
          break;
        case "addition":
          this.addition();
          console.log("clicked " + operator);
          break;
        default:
          break;
      }
    });
  },
};

calculator.init();
