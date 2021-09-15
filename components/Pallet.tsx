import { useEffect, useState } from "react";

const Pallet = ({currentColor, setCurrentColor, currentPixels, setCurrentPixels}) => {
  const [colorArr, setColorArr] = useState([]);

  const addColors = () => {
    const currentColorArr = [...colorArr];
    const uniqueColors = [...new Set(currentPixels.map(pixel => pixel.color))];
    uniqueColors.forEach(color =>{
      if (!currentColorArr.includes(color)) {
        currentColorArr.push(color);
      }
    });
    setColorArr(currentColorArr);
  }

  const removeColor = (color) => {
    const currentColorArr = [...colorArr];
    currentColorArr.splice(currentColorArr.indexOf(color), 1);
    setColorArr(currentColorArr);
  }

  const clearPallet = () => {
    setColorArr([]);
  }

  useEffect(() => {
    addColors();
  }, [currentPixels]);

  return (
    <div className="relative">
      <div className="absolute bottom-full left-0 my-2">
        <div className="flex">
          <h3 className="text-xs uppercase italic font-semibold text-gray-500 tracking-widest mr-6">Pallet</h3>
          <button
          className="text-red-500 text-xs uppercase tracking-widest hover:text-red-800 font-semibold italic duration-200"
          onClick={() => { clearPallet() }}
        >Clear</button>
        </div>
      </div>
      <div className="pallet relative flex flex-col flex-wrap max-h-full">
        {colorArr.map(color => (
          <div 
            key={color} 
            className="relative mb-3 mr-5 flex items-center"
          >
            <button
              className="inline-flex items-center p-1 border-2 border-gray-100 shadow-md rounded-md uppercase text-gray-500 font-semibold tracking-wider text-sm hover:bg-gray-100 duration-200"
              onClick={() => setCurrentColor(color)}
              title={color}
            >
              <span className="inline-block w-8 h-6 rounded-md border border-white" style={{ backgroundColor: color }}></span>
            </button>
            <button
              className="mx-2"
              onClick={() => removeColor(color)}
            >
              <svg className="w-5 h-5 fill-current text-gray-300 hover:text-red-500 duration-200" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"></path>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Pallet