import Row from "./Row";
import type { Cell } from "../hooks/useWordle";

interface BoardProps {
  guesses: Cell[][];
  currentGuess: string;
}

const ROWS = 6;

function Board({ guesses, currentGuess }: BoardProps) {
  return (
    <div className="board">
      {Array.from({ length: ROWS }).map((_, i) => {
        // Fila con intento ya evaluado
        if (i < guesses.length) {
          return <Row key={`row-${i}`} cells={guesses[i]} />;
        }

        // Fila actual (solo hay una fila actual - la primera vacía después de guesses)
        if (i === guesses.length) {
          return <Row key={`row-${i}`} guess={currentGuess} isCurrent={true} />;
        }

        // Filas vacías futuras
        return <Row key={`row-${i}`} />;
      })}
    </div>
  );
}

export default Board;