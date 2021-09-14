import { useRef, useState, useEffect } from "react";
import Pixel from "./Pixel";

const SpriteGrid = ({bitCount, currentColor}) => {
  const [currentPixels, setCurrentPixels] = useState([]);
  const pixels = useRef(new Array());

  
  const addPixel = (x, y) => {
    const newPixels = [...currentPixels]
    newPixels.push({
      key: `${x}-${y}`,
      color: currentColor,
      x: x,
      y: y
    });
    setCurrentPixels(newPixels);
  }

  const removePixel = (x, y) => {
    const newPixels = [...currentPixels];
    const index = newPixels.findIndex(pixel => pixel.key === `${x}-${y}`);
    newPixels.splice(index, 1);
    setCurrentPixels(newPixels);
  }

  const clearColors = () => {
    console.log(`Clearing all colors`);
    pixels.current.map(pixel => {
      if(pixel) {
        pixel.handleClear();
      }
    });
    setCurrentPixels([]);
  }

  useEffect(() => {
    console.log('Current Pixels: ', currentPixels)
  }, [currentPixels])
  
  return (
    <div className="sprite-grid-wrap relative w-full max-w-[350px] lg:max-w-[500px] mx-auto">
      {/* Pseudo Grid */}
      <div className="pseudo-grid absolute w-full h-full grid border-gray-300 border-b border-dashed">
        {Array.from(Array(bitCount).keys()).map(row => (
          <div key={row} className="grid-row border-gray-300 border-t border-dashed"
            style={{ 
              gridColumn: `span ${bitCount}`,
              gridRowStart: `${row + 1}`,
            }}
          ></div>
        ))}
      </div>
      <div className="pseudo-grid absolute w-full h-full grid border-gray-300 border-l border-dashed">
        {Array.from(Array(bitCount).keys()).map(col => (
          <div key={col} className="grid-col border-gray-300 border-r border-dashed"
            style={{ 
              gridRow: `span ${bitCount}`,
              gridColumnStart: `${col + 1}`,
            }}
          ></div>
        ))}
      </div>
      {/* Grid Proper */}
      <div 
        className="sprite-grid relative grid max-w-full"
        style={{
          gridTemplateColumns: `repeat(${bitCount}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${bitCount}, minmax(0, 1fr))`,
        }}
      >
        {Array.from(Array(bitCount).keys()).map(row => {
          return Array.from(Array(bitCount).keys()).map(col => {
            return (
              <Pixel
                ref={(element) => pixels.current.push(element)}
                key={`${row}-${col}`}
                currentColor={currentColor}
                x={col}
                y={row}
                addPixel={addPixel}
                removePixel={removePixel}
              />
            )
          })
        })}
      </div>
      {currentPixels.length > 0 ? (
        <button
          className="absolute bottom-full right-0 my-2 text-red-500 text-xs uppercase tracking-widest hover:text-red-800 font-semibold italic duration-200"
          onClick={() => { clearColors() }}
        >Clear</button>
      ) : null}
    </div>
  );
}

export default SpriteGrid