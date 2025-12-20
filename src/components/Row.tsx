import Cell from "./Cell";
import type { Cell as CellType } from "../hooks/useWordle";

interface RowProps {
  cells?: CellType[];
  guess?: string;
  isCurrent?: boolean;
}

function Row({ cells, guess = "", isCurrent = false }: RowProps) {
  console.log("📝 Row render:", { 
    hasCells: !!cells, 
    guess, 
    isCurrent,
    cellsState: cells?.map(c => c.state).join(',')
  });
  
  // Si tenemos cells (intento ya evaluado)
  if (cells && cells.length > 0) {
    return (
      <div className={`row ${isCurrent ? "current" : ""}`}>
        {cells.map((cell, i) => (
          <Cell 
            key={`cell-filled-${i}-${cell.value}-${cell.state}`}
            value={cell.value} 
            state={cell.state} 
          />
        ))}
      </div>
    );
  }

  // Si es el intento actual (todavía escribiendo)
  const letters = guess.split("");
  const emptyCells = 5 - letters.length;

  return (
    <div className={`row ${isCurrent ? "current" : ""}`}>
      {letters.map((letter, i) => (
        <Cell 
          key={`cell-current-${i}-${letter}`}
          value={letter} 
          state="" 
        />
      ))}
      {Array.from({ length: emptyCells }).map((_, i) => (
        <Cell 
          key={`cell-empty-${letters.length + i}`}
          value="" 
          state="" 
        />
      ))}
    </div>
  );
}

export default Row;