import React, { useState } from "react";
import "./App.css"; // Import your CSS file

function AutomataGame() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [showWord, setShowWord] = useState(false);
  const [transitions, setTransitions] = useState([]);

  // FSM transition function to check for odd a's and even b's
  const fsmTransition = (state, char) => {
    let nextState = state;

    switch (state) {
      case 0: // q0 (even a's, even b's)
        if (char === "a") {
          nextState = 1; // Move to q1 on 'a' (odd a's)
        } else if (char === "b") {
          nextState = 2; // Move to q2 on 'b' (even a's, odd b's)
        }
        break;
      case 1: // q1 (odd a's, even b's)
        if (char === "a") {
          nextState = 0; // Move to q0 (even a's)
        } else if (char === "b") {
          nextState = 3; // Move to q3 (odd a's, odd b's)
        }
        break;
      case 2: // q2 (even a's, odd b's)
        if (char === "a") {
          nextState = 1; // Move to q1 (odd a's)
        } else if (char === "b") {
          nextState = 0; // Move to q0 (even a's, even b's)
        }
        break;
      case 3: // q3 (odd a's, odd b's)
        if (char === "a") {
          nextState = 2; // Move to q2 (even a's, odd b's)
        } else if (char === "b") {
          nextState = 1; // Move to q1 (odd a's, even b's)
        }
        break;
      default:
        nextState = -1; // Error state
    }

    return nextState;
  };

  // Function to check if the input string has odd a's and even b's
  const checkOddEven = (str) => {
    const trimmedStr = str.trim().toLowerCase();
    const length = trimmedStr.length;

    // Edge case for empty string
    if (length === 0) return "Input cannot be empty";

    let currentState = 0; // Start from state q0
    let transitionTable = [];
    let accepted = false;

    for (let i = 0; i < length; i++) {
      const char = trimmedStr[i];
      const prevState = currentState;
      currentState = fsmTransition(currentState, char);

      // Log the transition for each step
      transitionTable.push({
        state: `q${prevState}`,
        input: `${char}`,
        nextState: `q${currentState}`,
        // Only mark as "Accepted" for the last character
        status: i === length - 1 && currentState === 1 ? "Accepted" : "Processing...",
      });
    }

    // Check if the final state is accepted
    accepted = currentState === 1;

    setTransitions(transitionTable);
    return accepted ? "Accepted (Odd a's and Even b's)" : "Rejected (Does not satisfy conditions)";
  };

  // Function to handle checking the string
  const handleCheckString = () => {
    const checkResult = checkOddEven(input);
    setResult(checkResult);
    setShowWord(true);
  };

  // Handle input change
  const handleChange = (e) => {
    setInput(e.target.value);
    setResult("");
    setShowWord(false);
    setTransitions([]);
  };

  // Function to handle "Enter" key press
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
      <button onClick={handleCheckString} style={{ marginTop: "10px", padding: "10px 20px", borderRadius: "5px", border: "none", backgroundColor: "#4CAF50", color: "white", cursor: "pointer" }}>
        Check String
      </button>

      <h2 style={{ marginTop: "20px", color: result.includes("Accepted") ? "green" : "red" }}>Result: {result}</h2>

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

      {/* Display the transition table */}
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
