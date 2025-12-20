import type { CellState } from "../hooks/useWordle";

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  letterStates: Record<string, CellState>;
}

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"]
];

function Keyboard({ onKeyPress, letterStates }: KeyboardProps) {
  const handleClick = (key: string) => {
    onKeyPress(key);
  };

  const getKeyClass = (key: string) => {
    const state = letterStates[key] || "";
    return `keyboard-key ${state} ${key === "ENTER" || key === "⌫" ? "special-key" : ""}`;
  };

  return (
    <div className="keyboard-container">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => (
            <button
              key={key}
              className={getKeyClass(key)}
              onClick={() => handleClick(key === "⌫" ? "Backspace" : key)}
              type="button"
            >
              {key === "Backspace" ? "⌫" : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;