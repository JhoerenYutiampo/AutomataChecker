import React, { useState } from "react";
import "./App.css";

function AutomataGame() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [showWord, setShowWord] = useState(false);
  const [transitions, setTransitions] = useState([]);

  const fsmTransition = (state, char) => {
    let nextState = state;

    switch (state) {
      case 0:
        if (char === "a") {
          nextState = 1;
        } else if (char === "b") {
          nextState = 2;
        }
        break;
      case 1:
        if (char === "a") {
          nextState = 0;
        } else if (char === "b") {
          nextState = 3;
        }
        break;
      case 2:
        if (char === "a") {
          nextState = 3;
        } else if (char === "b") {
          nextState = 0;
        }
        break;
      case 3:
        if (char === "a") {
          nextState = 2;
        } else if (char === "b") {
          nextState = 1;
        }
        break;
      default:
        nextState = -1;
    }

    return nextState;
  };

  const checkOddEven = (str) => {
    const trimmedStr = str.trim().toLowerCase();
    const length = trimmedStr.length;

    if (length === 0) return "Input cannot be empty";

    let currentState = 0;
    let transitionTable = [];
    let accepted = false;

    for (let i = 0; i < length; i++) {
      const char = trimmedStr[i];
      const prevState = currentState;
      currentState = fsmTransition(currentState, char);

      transitionTable.push({
        state: `q${prevState}`,
        input: `${char}`,
        nextState: `q${currentState}`,
        status: i === length - 1 && currentState === 1 ? "Accepted" : "Processing...",
      });
    }

    accepted = currentState === 1;

    setTransitions(transitionTable);
    return accepted ? "Accepted (Odd a's and Even b's)" : "Rejected (Does not satisfy conditions)";
  };

  const handleCheckString = () => {
    const checkResult = checkOddEven(input);
    setResult(checkResult);
    setShowWord(true);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    setResult("");
    setShowWord(false);
    setTransitions([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCheckString();
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#4CAF50" }}>Odd A's and Even B's Checker Game (FSM)</h1>
      <p>Enter a string (should have odd a's and even b's to be accepted):</p>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder="Enter string"
        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", width: "300px" }}
      />
      <br />
      <button
        onClick={handleCheckString}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#4CAF50",
          color: "white",
          cursor: "pointer",
        }}
      >
        Check String
      </button>

      <h2 style={{ marginTop: "20px", color: result.includes("Accepted") ? "green" : "red" }}>
        Result: {result}
      </h2>

      {showWord && (
        <div style={{ marginTop: "20px" }}>
          {input.split("").map((char, index) => (
            <div
              key={index}
              className="ripple"
              style={{
                display: "inline-block",
                margin: "5px",
                padding: "10px",
                borderRadius: "15px",
                backgroundColor: result.includes("Accepted") ? "lightgreen" : "lightcoral",
                color: "black",
                fontWeight: "bold",
                transition: "transform 0.3s ease",
              }}
            >
              {char}
            </div>
          ))}
        </div>
      )}

      {transitions.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h3>State Transitions (FSM)</h3>
          <table
            border="1"
            style={{
              margin: "0 auto",
              borderCollapse: "collapse",
              backgroundColor: "#f9f9f9",
              color: "#333",
              width: "80%",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <thead>
              <tr>
                <th style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white", fontSize: "18px", fontWeight: "bold", borderBottom: "2px solid #333" }}>
                  Current State
                </th>
                <th style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white", fontSize: "18px", fontWeight: "bold", borderBottom: "2px solid #333" }}>
                  Input
                </th>
                <th style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white", fontSize: "18px", fontWeight: "bold", borderBottom: "2px solid #333" }}>
                  Next State
                </th>
                <th style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white", fontSize: "18px", fontWeight: "bold", borderBottom: "2px solid #333" }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {transitions.map((transition, index) => (
                <tr key={index} style={{ textAlign: "center" }}>
                  <td style={{ padding: "8px", borderBottom: "1px solid #333", backgroundColor: "#f1f1f1" }}>
                    {transition.state}
                  </td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #333", backgroundColor: "#f1f1f1" }}>
                    {transition.input}
                  </td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #333", backgroundColor: "#f1f1f1" }}>
                    {transition.nextState}
                  </td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #333", backgroundColor: "#f1f1f1" }}>
                    {transition.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AutomataGame;
