import { useState, forwardRef, useImperativeHandle } from "react";

const Pixel = forwardRef(({ x, y, currentColor, addPixel, removePixel }, ref) => {
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

  const handleDrag = (e) => {
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
      className="pixel w-full h-0 pt-[100%] col-span-1"
      style={{ backgroundColor: color && color.length > 0 ? color : 'transparent' }}
      onClick={handleClick}
      onPointerEnter={(e) => {handleDrag(e)}}
    />
  );
});

Pixel.displayName = 'Pixel';

export default Pixel;