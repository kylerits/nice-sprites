import { useEffect, useState } from "react";

const Pallet = ({currentColor, setCurrentColor, currentPixels, setCurrentPixels}) => {
  const [colorArr, setColorArr] = useState([]);

  const addColors = () => {
    const currentColorArr = [...colorArr];
    const uniqueColors = [...new Set(currentPixels.map(pixel => pixel.color))];
    uniqueColors.forEach(color =>{
      if (!currentColorArr.includes(color) && color.length > 0) {
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
    <div className="pallet relative max-h-full overflow-scroll bg-gray-50 rounded-lg py-2 px-3 min-w-[100px]">
      <div className="max-h-full">
        {/* Title and Actions */}
        {colorArr.length > 0 ? (
          <div className="relative pb-1 mb-3 border-b border-red-100 text-center">
            <div className="block">
              {/* <h3 className="text-xs uppercase italic font-semibold text-gray-500 tracking-widest mr-6">Pallet</h3> */}
              <button
              className="text-red-500 text-xs uppercase tracking-widest font-semibold italic duration-200 opacity-50 hover:opacity-100"
              onClick={() => { clearPallet() }}
            >Clear</button>
            </div>
          </div>
        ) : null }
        {/* Colors Array */}
        {colorArr.map(color => (
          <div 
            key={color} 
            className="relative mb-3 flex items-center"
          >
            <button
              className="inline-flex items-center p-1 border-2 border-gray-100 hover:border-blue-100 shadow-md rounded-md uppercase text-gray-500 font-semibold tracking-wider text-sm hover:bg-gray-100 duration-200"
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