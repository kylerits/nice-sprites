import { FC } from "react";
import { useState, forwardRef, useImperativeHandle } from "react";

interface Refs {
  x: number;
  y: number;
  currentColor: string;
  addPixel: (x: number, y: number) => void;
  removePixel: (x: number, y: number) => void;
  curref: any;
}

const Pixel: FC<Refs> = forwardRef(({ x, y, currentColor, addPixel, removePixel, curref }, ref) => {
  const [color, setColor] = useState('');

  const handleClick = () => {
    if(color === '') {
      setColor(currentColor);
      addPixel(x, y);
    } else {
      setColor('');
      removePixel(x, y);
    }
  };

  const handleDrag = (e: any) => {
    if(e.buttons > 0 && color !== currentColor) {
      setColor(currentColor);
      addPixel(x, y);
    }
  }

  useImperativeHandle(ref, () => ({
    handleClear() {
      setColor('');
    }
  }));

  return (
    <div
      ref={curref}
      className="pixel w-full h-0 pt-[100%] col-span-1"
      style={{ backgroundColor: color && color.length > 0 ? color : 'transparent' }}
      onClick={handleClick}
      onPointerEnter={(e) => {handleDrag(e)}}
    />
  );
});

Pixel.displayName = 'Pixel';

export default Pixel;