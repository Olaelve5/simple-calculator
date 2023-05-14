import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

function App() {
  let [output, setOutput] = useState(getInitialOutput());
  let [operatorPressed, setOperatorPressed] = useState("");
  let [storedOperator, setStoredOperator] = useState("");
  let [storedNumber, setStoredNumber] = useState(0);

  useEffect(() => {
    localStorage.setItem("output", output);
  }, [output]);

  function getInitialOutput() {
    if (localStorage.getItem("output")) {
      return localStorage.getItem("output");
    }
    return "0";
  }

  function handleClickNumber(value) {
    if (!operatorPressed) {
      if (output === "0") {
        setOutput(value.toString());
      } else {
        if (output[output.length - 1] === "π") {
          setOutput(output);
        } else {
          setOutput(output + value.toString());
        }
      }
    } else {
      setOutput(value.toString());
      setOperatorPressed(false);
    }
  }

  function handleClickOperator(operator) {
    if (output[output.length - 1] === "π") {
      if (output.length === 1) {
        setStoredNumber(Math.PI);
      } else {
        setStoredNumber(parseFloat(output.slice(0, -1)) * Math.PI);
      }
    } else {
      setStoredNumber(parseFloat(output));
    }
    setOperatorPressed(true);
    setStoredOperator(operator);
  }

  function handleClickEquals() {
    let result = 0;
    let outputNumber = 0;

    if (output[output.length - 1] === "π") {
      if (output.length === 1) {
        outputNumber = Math.PI;
      } else {
        outputNumber = parseFloat(output) * Math.PI;
      }
    } else {
      outputNumber = parseFloat(output);
    }

    if (storedOperator === "+") {
      result = storedNumber + outputNumber;
    } else if (storedOperator === "-") {
      result = storedNumber - outputNumber;
    } else if (storedOperator === "x") {
      result = storedNumber * outputNumber;
    } else if (storedOperator === "÷") {
      result = storedNumber / outputNumber;
    } else {
      result = outputNumber;
    }

    if (result % 1 != 0) {
      setOutput(result.toFixed(2).toString());
    } else {
      setOutput(result.toString());
    }
  }

  function handleClickAC() {
    setOutput("0");
    setStoredNumber(0);
    setStoredOperator("");
    setOperatorPressed(false);
  }

  function handleClickPi() {
    if (output === "0") {
      setOutput("π");
    } else {
      if (output[output.length - 1] === "π") {
        setOutput(output);
      } else {
        setOutput(output + "π");
      }
    }
  }

  function handleClickDelete() {
    if (output.length === 1) {
      setOutput("0");
    } else {
      setOutput(output.slice(0, -1));
    }
  }

  return (
    <>
      <div id="container">
        <div id="calculator">
          <div id="output-container">
            <div id="output">{output}</div>
          </div>
          <div id="buttons">
            <button
              id="AC"
              className="notNumber"
              onClick={() => handleClickAC()}>
              AC
            </button>

            <button
              id="pi"
              className="notNumber"
              onClick={() => handleClickPi()}>
              π
            </button>

            <button
              id="7"
              className="notNumber"
              onClick={() => handleClickDelete()}>
              <FontAwesomeIcon icon={faDeleteLeft} />
            </button>
            <button
              id="divide"
              className="notNumber"
              onClick={() => handleClickOperator("÷")}>
              ÷
            </button>

            <button id="7" className="btn" onClick={() => handleClickNumber(7)}>
              7
            </button>
            <button id="8" className="btn" onClick={() => handleClickNumber(8)}>
              8
            </button>
            <button id="9" className="btn" onClick={() => handleClickNumber(9)}>
              9
            </button>
            <button
              id="multiply"
              className="notNumber"
              onClick={() => handleClickOperator("x")}>
              x
            </button>

            <button id="4" className="btn" onClick={() => handleClickNumber(4)}>
              4
            </button>
            <button id="5" className="btn" onClick={() => handleClickNumber(5)}>
              5
            </button>
            <button id="6" className="btn" onClick={() => handleClickNumber(6)}>
              6
            </button>
            <button
              id="minus"
              className="notNumber"
              onClick={() => handleClickOperator("-")}>
              -
            </button>

            <button id="1" className="btn" onClick={() => handleClickNumber(1)}>
              1
            </button>
            <button id="2" className="btn" onClick={() => handleClickNumber(2)}>
              2
            </button>
            <button id="3" className="btn" onClick={() => handleClickNumber(3)}>
              3
            </button>

            <button
              id="plus"
              className="notNumber"
              onClick={() => handleClickOperator("+")}>
              +
            </button>

            <button
              id="zero"
              className="btn"
              onClick={() => handleClickNumber(0)}>
              0
            </button>
            <button
              id="dot"
              className="btn"
              onClick={() => handleClickNumber(".")}>
              .
            </button>
            <button
              id="equal"
              className="notNumber"
              onClick={() => handleClickEquals()}>
              =
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
