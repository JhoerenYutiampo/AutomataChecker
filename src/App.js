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
      case 0: // q0
        if (char === 'a') {
          nextState = 0; // Stay in q0
        }else if (char === 'b') {
          nextState = 1; // Move to q1
        }
        break;
      case 1: // q1
        if (char === 'a') {
          nextState = 2; // Move to q2
        } else if (char === 'b') {
          nextState = 1; // Stay in q1
        }
        break;
      case 2: // q2
        if (char === 'a') {
          nextState = 0; // Move to q0
        } else if (char === 'b'){
          nextState = 3; // Move to q3 (Accepting State)
        }
        break;
      case 3: // q3 (Accepting State)
        if (char === 'a') {
          nextState = 3; // Stay in q3
        } else if (char === 'b') {
          nextState = 3; // Stay in q3
        }
        break;
      default:
        nextState = -1; // Invalid state
    }

    return nextState;
  };

  const checkString = (str) => {
    const trimmedStr = str.trim();
    if (trimmedStr.length === 0) return "Input cannot be empty";

    let currentState = 0; // Start at q0
    let transitionTable = [];
    let accepted = false;

    for (let i = 0; i < trimmedStr.length; i++) {
      const char = trimmedStr[i];
      const prevState = currentState;
      currentState = fsmTransition(currentState, char);

      transitionTable.push({
        state: `q${prevState}`,
        input: `${char}`,
        nextState: `q${currentState}`,
        status: i === trimmedStr.length - 1 && currentState === 3 ? "Accepted" : "Processing...",
      });
    }

    accepted = currentState === 3; // Check if in accepting state
    setTransitions(transitionTable);
    return accepted ? "Accepted (Contains 'bab')" : "Rejected (Does not contain 'bab')";
  };

  const handleCheckString = () => {
    const checkResult = checkString(input);
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
      <h1 style={{ color: "#4CAF50" }}>String Checker Game (FSM for 'contains bab')</h1>
      <p>Enter a string (should contain 'bab' to be accepted):</p>
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
                <th style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white" }}>Current State</th>
                <th style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white" }}>Input</th>
                <th style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white" }}>Next State</th>
                <th style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white" }}>Status</th>
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
