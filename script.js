const calculator = {
  currentInput: "0",
  operator: "",
  previousOperator: "",
  accumulator: null,
  resetOnNextInput: false,

  display: {
    _upperEl: document.querySelector(".upper-display"),
    _lowerEl: document.querySelector(".lower-display"),
    secondaryDisplay: "",

    refresh() {
      render = () => {
        this._upperEl.textContent = this.secondaryDisplay;
        this._lowerEl.textContent = calculator.currentInput;
      };

      if (isNaN(calculator.currentInput)) {
        this._lowerEl.textContent = "NaN";
        return;
      }
      if (calculator.accumulator) {
        this.secondaryDisplay = `${Number(parseFloat(calculator.accumulator).toFixed(5))} ${calculator.operator}`;
      }
      render();
    },

    showFinalResult() {
      if (calculator.accumulator === "🤦") {
        this.secondaryDisplay = "";
        calculator.currentInput = calculator.accumulator;
        render();
        return;
      }

      this.secondaryDisplay = "";
      calculator.currentInput = Number(parseFloat(calculator.accumulator).toFixed(5));
      render();
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
    this.display.refresh();
  },

  handleDecimal() {
    if (!this.currentInput.includes(".")) this.currentInput += ".";
    this.resetOnNextInput = false;
    this.display.refresh();
  },

  reset() {
    this.currentInput = "0";
    this.operator = "";
    this.previousOperator = "";
    this.accumulator = 0;
    this.resetOnNextInput = false;
    this.display.secondaryDisplay = "";
    this.display.refresh();
  },

  delete() {
    if (this.resetOnNextInput) {
      this.currentInput = "0";
      this.display.refresh();
    }
    this.currentInput = this.currentInput.slice(0, -1) || "0";
    this.display.refresh();
  },

  operations: {
    "+": (a, b) => +a + +b,
    "-": (a, b) => +a - +b,
    x: (a, b) => +a * +b,
    "/": (a, b) => (b == 0 ? "🤦" : +a / +b),
  },

  setOperator(op) {
    if (this.currentInput === "0") return;
    if (this.resetOnNextInput && !this.accumulator) {
      this.accumulator = this.currentInput;
      this.operator = op;
      this.previousOperator = op;
      this.resetOnNextInput = true;
      this.display.refresh();
    } else if (this.resetOnNextInput) {
      this.operator = op;
      this.previousOperator = op;
      this.display.refresh();
    } else if (!this.accumulator) {
      this.accumulator = this.currentInput;
      this.operator = op;
      this.previousOperator = op;
      this.resetOnNextInput = true;
      this.display.refresh();
    } else if (this.previousOperator !== "") {
      this.operator = op;
      this.accumulator = this.operations[this.previousOperator](this.accumulator, this.currentInput);
      this.previousOperator = op;
      this.display.refresh();
      this.resetOnNextInput = true;
    }
  },

  computeResult() {
    if (this.accumulator === 0) return;

    if (this.resetOnNextInput) {
      this.currentInput = this.accumulator;
      this.display.showFinalResult();
      this.accumulator = 0;
      this.operator = "";
      this.previousOperator = "";
      return;
    }

    this.accumulator = this.operations[this.operator](this.accumulator, this.currentInput);
    this.display.showFinalResult();
    this.accumulator = 0;
    this.operator = "";
    this.previousOperator = "";
    this.resetOnNextInput = true;
  },

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
          this.setOperator("+");
          console.log("clicked " + operator);
          break;
        case "subtraction":
          this.setOperator("-");
          console.log("clicked " + operator);
          break;
        case "multiplication":
          this.setOperator("x");
          console.log("clicked " + operator);
          break;
        case "division":
          this.setOperator("/");
          console.log("clicked " + operator);
          break;
        case "equal":
          this.computeResult();
          break;
        default:
          break;
      }
    });
  },
};

calculator.init();
