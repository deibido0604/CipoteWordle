import { useState, useEffect, useCallback } from "react";
import { WORDS } from "../data/words";

export const WORD_LENGTH = 5;
export const MAX_ATTEMPTS = 6;

export type CellState = "correct" | "present" | "absent" | "";

export interface Cell {
  value: string;
  state: CellState;
}

export function useWordle() {
  const [solution, setSolution] = useState(
    () => WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase()
  );
  
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState<Cell[][]>([]);
  const [attempt, setAttempt] = useState(1);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");
  const [message, setMessage] = useState("");
  const [letterStates, setLetterStates] = useState<Record<string, CellState>>({});

  // Función para reiniciar el juego
  const resetGame = useCallback(() => {
    // Generar nueva solución
    const newSolution = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
    setSolution(newSolution);
    
    // Resetear todos los estados
    setCurrentGuess("");
    setGuesses([]);
    setAttempt(1);
    setGameStatus("playing");
    setMessage("");
    setLetterStates({});
    
    console.log("🔄 Juego reiniciado. Nueva solución:", newSolution);
  }, []);

  // Función para evaluar el guess
  const evaluateGuess = useCallback((guess: string): Cell[] => {
    const guessUpper = guess.toUpperCase();
    const result: Cell[] = [];
    const solutionChars = solution.split('');
    const guessChars = guessUpper.split('');

    for (let i = 0; i < WORD_LENGTH; i++) {
      if (guessChars[i] === solutionChars[i]) {
        result[i] = { value: guessChars[i], state: "correct" };
        solutionChars[i] = "*";
      }
    }

    for (let i = 0; i < WORD_LENGTH; i++) {
      if (!result[i]) {
        const index = solutionChars.indexOf(guessChars[i]);
        if (index !== -1) {
          result[i] = { value: guessChars[i], state: "present" };
          solutionChars[index] = "*";
        } else {
          result[i] = { value: guessChars[i], state: "absent" };
        }
      }
    }

    return result;
  }, [solution]);

  const updateLetterStates = useCallback((guess: Cell[]) => {
    setLetterStates(prev => {
      const newStates = { ...prev };
      
      guess.forEach(cell => {
        const letter = cell.value;
        const currentState = newStates[letter];
        const newState = cell.state;
        
        if (!currentState || 
            (newState === "correct") ||
            (newState === "present" && currentState !== "correct") ||
            (newState === "absent" && !["correct", "present"].includes(currentState))) {
          newStates[letter] = newState;
        }
      });
      
      return newStates;
    });
  }, []);

  const handleKey = useCallback((key: string) => {
    if (gameStatus !== "playing") return;

    if (key === "Backspace") {
      setCurrentGuess(prev => prev.slice(0, -1));
      setMessage("");
      return;
    }

    if (key === "Enter") {
      if (currentGuess.length !== WORD_LENGTH) {
        setMessage("La palabra debe tener 5 letras");
        setTimeout(() => setMessage(""), 1500);
        return;
      }

      const evaluated = evaluateGuess(currentGuess);
      
      setGuesses(prev => [...prev, evaluated]);
      updateLetterStates(evaluated);
      
      if (currentGuess.toUpperCase() === solution) {
        setGameStatus("won");
        setMessage(`¡Ganaste en el intento ${attempt}! 🎉`);
      } else if (attempt >= MAX_ATTEMPTS) {
        setGameStatus("lost");
        setMessage(`¡Perdiste! La palabra era ${solution}`);
      } else {
        setAttempt(prev => prev + 1);
      }
      
      setCurrentGuess("");
      return;
    }

    if (/^[a-zA-ZñÑ]$/.test(key) && currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(prev => prev + key.toUpperCase());
    }
  }, [currentGuess, gameStatus, solution, attempt, evaluateGuess, updateLetterStates]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handleKey(e.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKey]);

  return {
    guesses,
    currentGuess,
    gameStatus,
    message,
    solution,
    letterStates,
    handleKey,
    resetGame, // Exportar función de reinicio
  };
}