import type { CellState } from "../hooks/useWordle";


interface CellProps {
  value: string;
  state: CellState;
}

function Cell({ value, state }: CellProps) {
  console.log("🎨 Cell render:", { value, state });
  
  // Estilos en línea como FALBACK si CSS no funciona
  const getInlineStyle = () => {
    switch(state) {
      case 'correct': return { backgroundColor: '#538d4e', borderColor: '#538d4e', color: 'white' };
      case 'present': return { backgroundColor: '#b59f3b', borderColor: '#b59f3b', color: 'white' };
      case 'absent': return { backgroundColor: '#3a3a3c', borderColor: '#3a3a3c', color: 'white' };
      default: return {};
    }
  };

  return (
    <div 
      className={`cell ${state}`}
      style={getInlineStyle()}
    >
      {value}
    </div>
  );
}

export default Cell;