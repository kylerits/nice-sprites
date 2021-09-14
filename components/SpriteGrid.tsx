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
    <div className="sprite-grid-wrap relative max-w-[400px] mx-auto">
      <div 
        className="sprite-grid relative grid max-w-full border border-dashed"
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
          className="absolute bottom-full right-0 my-2"
          onClick={() => { clearColors() }}
        >Clear All</button>
      ) : null}
    </div>
  );
}

export default SpriteGrid