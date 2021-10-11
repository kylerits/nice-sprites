import { FC } from 'react';
import {motion} from 'framer-motion';
import { useRef, useState, useEffect } from "react";
import Pixel from "./Pixel";
import GridActions from './GridActions';

interface Props {
  bitCount: number;
  currentColor: string;
  currentPixels: string[];
  setCurrentPixels: (pixels: string[]) => void;
}

const SpriteGrid: FC<Props> = ({bitCount, currentColor, currentPixels, setCurrentPixels}) => {
  // const [currentPixels, setCurrentPixels] = useState([]);
  const pixels = useRef<any[]>(new Array());

  
  const addPixel = (x: number, y: number) => {
    const newPixels: any[] = [...currentPixels]
    newPixels.push({
      key: `${x}-${y}`,
      color: currentColor,
      x: x,
      y: y
    });
    setCurrentPixels(newPixels);
  }

  const removePixel = (x: number, y: number) => {
    const newPixels = [...currentPixels];
    const index = newPixels.findIndex((pixel: any) => pixel.key === `${x}-${y}`);
    newPixels.splice(index, 1);
    setCurrentPixels(newPixels);
  }

  const clearColors = () => {
    // console.log(`Clearing all colors`);
    pixels.current.map(pixel => {
      if(pixel) {
        pixel.handleClear();
      }
    });
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
                  ref={(element: any) => pixels.current.push(element)}
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