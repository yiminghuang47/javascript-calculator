import "./App.scss";
import React, { Components } from "react";

const BUTTONS = [
  {
    id: "clear",
    text: "AC",
  },
  {
    id: "divide",
    text: "/",
  },
  {
    id: "multiply",
    text: "*",
  },
  {
    id: "seven",
    text: "7",
  },
  {
    id: "eight",
    text: "8",
  },
  {
    id: "nine",
    text: "9",
  },
  {
    id: "subtract",
    text: "-",
  },
  {
    id: "four",
    text: "4",
  },
  {
    id: "five",
    text: "5",
  },
  {
    id: "six",
    text: "6",
  },
  {
    id: "add",
    text: "+",
  },
  {
    id: "one",
    text: "1",
  },
  {
    id: "two",
    text: "2",
  },
  {
    id: "three",
    text: "3",
  },

  {
    id: "equals",
    text: "=",
  },
  {
    id: "zero",
    text: "0",
  },
  {
    id: "decimal",
    text: ".",
  },
];
const SIGNS = ["add", "subtract", "multiply", "divide"];
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChar: "0",
      currentEquation: "",
      result: "",
      isResultShown: false,
      hasDecimal: false,
      prevChar: "",
      signCount: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(buttonText, buttonId) {
    return () => {
      if (this.state.isResultShown == false) {
        this.setState({
          result: "",
        });
        if (buttonId == "equals") {
          if (["+", "-", "*", "/"].includes(this.state.prevChar)) {
            return;
          }
          this.setState((state) => ({
            result: eval(state.currentEquation),
            isResultShown: true,

            currentChar: "",
            prevChar: "",
            signCount: 0,
            hasDecimal: false,
          }));
          this.setState((state) => ({
            currentEquation: state.currentEquation + "=" + state.result,
          }));
        } else if (buttonId == "clear") {
          this.setState((state) => ({
            result: "",
            isResultShown: false,
            currentEquation: "",
            currentChar: "0",
            prevChar: "",
            hasDecimal: false,
            signCount: 0,
          }));
        } else if (SIGNS.includes(buttonId)) {
          if (this.state.signCount >= 2) {
            return;
          } else if (
            this.state.signCount == 0 ||
            (this.state.signCount == 1 &&
              buttonId == "subtract" &&
              this.state.prevChar != "-")
          ) {
            this.setState((state) => ({
              isResultShown: false,
              currentChar: buttonText,
              currentEquation: state.currentEquation + buttonText,
              signCount: state.signCount + 1,

              hasDecimal: false,
            }));
            this.setState((state) => ({
              prevChar: state.currentChar,
            }));
          } 
        } else {
          //decimal point or number
          if (buttonId == "decimal") {
            if (this.state.hasDecimal == true) {
              return;
            }
          } else if (buttonId == "zero") {
            if (
              this.state.currentEquation.length == 1 &&
              this.state.prevChar == 0
            ) {
              return;
            }
          }
          if (buttonId == "decimal") {
            this.setState({
              hasDecimal: true,
            });
            if (this.state.prevChar != "0") {
              this.setState({
                currentChar: "0.",
              });
            } else {
              this.setState({
                currentChar: ".",
              });
            }
          } else {
            this.setState({
              currentChar: buttonText,
            });
          }
          this.setState((state) => ({
            isResultShown: false,
            currentEquation: state.currentEquation + state.currentChar,
            signCount: 0,
          }));
          this.setState((state) => ({
            prevChar: state.currentChar,
          }));
        }
      } else {
        //isResultShown==true
        if (buttonId == "equals") {
          return;
        } else if (buttonId == "clear") {
          this.setState((state) => ({
            result: "",
            isResultShown: false,
            currentEquation: "",
            currentChar: "0",
            prevChar: "",
            hasDecimal: false,
            signCount: 0,
          }));
        } else if (SIGNS.includes(buttonId)) {
          this.setState((state) => ({
            isResultShown: false,
            currentChar: buttonText,
            currentEquation: state.result + buttonText,
            signCount: state.signCount + 1,

            hasDecimal: false,
            result: "",
          }));
          this.setState((state) => ({
            prevChar: state.currentChar,
          }));
        } else {
          //decimal point or number

          this.setState((state) => ({
            isResultShown: false,
            currentChar: buttonText,
            currentEquation: buttonText,
            signCount: 0,
          }));
          this.setState((state) => ({
            prevChar: state.currentChar,
          }));
          if (buttonId == "decimal") {
            this.setState({
              hasDecimal: true,
              currentEquation: "0.",
              currentChar: "0.",
            });
          } else if (buttonId == "zero") {
            this.setState({
              currentEquation: "",
            });
          }
        }
      }
    };
  }
  render() {
    return (
      <div className="App">
        <div id="calculator">
          <div id="screen">
            <p id="equation">{this.state.currentEquation}</p>
            {this.state.isResultShown ? (
              <p id="display">{this.state.result}</p>
            ) : (
              <p id="display">{this.state.currentChar}</p>
            )}
          </div>
          <div id="buttons">
            {BUTTONS.map((b) => (
              <Button
                id={b.id}
                key={b.text}
                s
                text={b.text}
                handleClick={this.handleClick}
              />
            ))}
          </div>
        </div>
        <div id="author">
            <p>Created by Yiming Huang</p>
        </div>
      </div>
    );
  }
}

class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button
        id={this.props.id}
        onClick={this.props.handleClick(this.props.text, this.props.id)}
      >
        {this.props.text}
      </button>
    );
  }
}

export default App;
