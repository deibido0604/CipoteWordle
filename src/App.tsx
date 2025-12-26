import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { useWordle } from "./hooks/useWordle";
import "./App.css";

function App() {
  const {
    guesses,
    currentGuess,
    gameStatus,
    message,
    solution,
    letterStates,
    handleKey,
    resetGame
  } = useWordle();

  const handleVirtualKey = (key: string) => {
    handleKey(key);
  };

  return (
    <main className="app" translate="no">
      <div className="header-container">
        <h1 className="title" translate="no">CIPOTEWORDLE</h1>
      </div>

      {message && (
        <div className={`message ${gameStatus === "won" ? "win" : gameStatus === "lost" ? "lose" : ""}`}>
          {message}
        </div>
      )}

      <Board
        guesses={guesses}
        currentGuess={currentGuess}
      />

      {gameStatus === "playing" && (
        <Keyboard
          onKeyPress={handleVirtualKey}
          letterStates={letterStates}
        />
      )}

      {(gameStatus === "won" || gameStatus === "lost") && (
        <div className="game-end-info">
          <p>La palabra era: <span className="solution-word">{solution}</span></p>
          <button 
            className="play-again-button"
            onClick={resetGame}
          >
            Jugar de nuevo
          </button>
        </div>
      )}

      {gameStatus === "playing" && (
        <div className="keyboard-note">
          <small>También puedes usar tu teclado físico</small>
        </div>
      )}
    </main>
  );
}

export default App;