import { FC, Dispatch, SetStateAction } from 'react';
import {motion} from 'framer-motion';
import { useRef } from "react";
import Pixel from "./Pixel";
import GridActions from './GridActions';

interface Props {
  bitCount: number;
  currentColor: string;
  currentPixels: any[];
  setCurrentPixels: Dispatch<SetStateAction<any[]>>;
}

const SpriteGrid: FC<Props> = ({bitCount, currentColor, currentPixels, setCurrentPixels}) => {
  // const [currentPixels, setCurrentPixels] = useState([]);
  const pixels = useRef(new Map<string, any>());

  
  const addPixel = (x: number, y: number) => {
    const key = `${x}-${y}`;
    // Painting with the eraser removes the pixel instead of recording an empty color
    if (currentColor === '') {
      removePixel(x, y);
      return;
    }
    // Replace any existing entry so repainting a pixel doesn't duplicate it
    setCurrentPixels(prevPixels => [
      ...prevPixels.filter((pixel: any) => pixel.key !== key),
      { key, color: currentColor, x, y },
    ]);
  }

  const removePixel = (x: number, y: number) => {
    const key = `${x}-${y}`;
    setCurrentPixels(prevPixels => prevPixels.filter((pixel: any) => pixel.key !== key));
  }

  const clearColors = () => {
    // console.log(`Clearing all colors`);
    pixels.current.forEach(pixel => pixel.handleClear());
    setCurrentPixels([]);
  }

  // useEffect(() => {
  //   console.log('Current Pixels: ', currentPixels)
  // }, [currentPixels])
  
  return (
    <>
      <div className="sprite-grid-wrap relative">
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
                  //@ts-ignore
                  ref={(element: any) => {
                    // Keyed by position so re-renders replace entries instead of appending
                    pixels.current.set(`${row}-${col}`, element);
                    return () => { pixels.current.delete(`${row}-${col}`); };
                  }}
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
      </div>
      {/* Grid Actions Component */}
      {currentPixels.length > 0 ? (
        <motion.div
          style={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <div className="absolute top-full left-0">
            <GridActions currentPixels={currentPixels} bitCount={bitCount} clearColors={clearColors} />
          </div>
        </motion.div>
      ) : null}
    </>
  );
}

export default SpriteGrid