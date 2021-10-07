import { useState, useRef, useEffect } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'

// Components
import ClickAwayListener from 'react-click-away-listener';
import {SketchPicker} from 'react-color'
import SpriteGrid from '../components/SpriteGrid'
import Pallet from '../components/Pallet'

const Home: NextPage = () => {
  const [currentColor, setCurrentColor] = useState('#000000');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [currentPixels, setCurrentPixels] = useState([]);
  const [bitCount, setBitCount] = useState(16);
  const [buttonWrapHeight, setButtonWrapHeight] = useState(0);

  const buttonWrapRef = useRef(null);

  useEffect(() => {
    setButtonWrapHeight(buttonWrapRef.current.clientHeight);
  }, []);

  return (
    <>
      <Head>
        <title>Nice Sprites</title>
      </Head>
      {/* Layout */}
      <section className="relative w-screen min-h-screen flex items-center justify-center">
        <div className="w-full max-w-5xl">

          {/* Sprite Grid */}
          <div className="relative w-full max-w-[350px] lg:max-w-[500px] mx-auto">

            {/* Grid Component */}
            <SpriteGrid
              currentColor={currentColor}
              bitCount={bitCount}
              currentPixels={currentPixels}
              setCurrentPixels={setCurrentPixels}
            />

            {/* Color Actions Column */}
            <div className="absolute top-0 left-full px-8 h-full flex flex-col">
              <ClickAwayListener onClickAway={() => setShowColorPicker(false)}>
                <div ref={buttonWrapRef} className="button-wrap relative block pb-4">

                    {/* Toggle Color Picker Button */}
                    <button 
                      id="colorButton"
                      className={currentColor.length > 0 ? "inline-flex w-[100px] text-center items-center flex-wrap p-2 border-2 border-green-100 shadow-md rounded-md uppercase text-gray-500 font-semibold tracking-wider text-sm hover:bg-gray-100 duration-200" : "inline-flex w-[100px] text-center items-center flex-wrap p-2 border-2 border-gray-100 shadow-md rounded-md uppercase text-gray-500 font-semibold tracking-wider text-sm hover:bg-gray-100 duration-200"}
                      onClick={() => setShowColorPicker(!showColorPicker)}
                      aria-label="Current Color"
                      title="Current Color"
                    ><span className="inline-block w-full h-8 rounded-md border border-white" style={{ backgroundColor: currentColor }}></span><br/><span className="inline-block w-full pt-1 text-xs uppercase ">{currentColor.length > 0 ? currentColor : 'eraser'}</span></button>

                    <button
                      id="eraserButton"
                      className={currentColor.length == 0 ? "inline-block text-xs w-[100px] text-center items-center flex-wrap p-2 border-2 border-green-100 shadow-md rounded-md uppercase text-gray-500 font-semibold tracking-wider text-sm hover:bg-gray-100 duration-200 mt-3" : "inline-block text-xs w-[100px] text-center items-center flex-wrap p-2 border-2 border-gray-100 shadow-md rounded-md uppercase text-gray-500 font-semibold tracking-wider text-sm hover:bg-gray-100 duration-200 mt-3"}
                      onClick={() => setCurrentColor('')}
                    >Eraser</button>

                    {/* Color Picker */}
                    { showColorPicker ? (
                      <SketchPicker 
                        className="absolute top-0 right-full z-10 mx-4"
                        disableAlpha={true}
                        color={currentColor}
                        onChangeComplete={(color) => setCurrentColor(color.hex)}
                      />
                    ) : null}

                </div>
              </ClickAwayListener>
              <div className="relative max-h-full"
                style={{ 
                  "--color-button-height": buttonWrapHeight + "px",
                  height: "calc(100% - var(--color-button-height))",
                }}
              >
                <Pallet 
                  currentColor={currentColor}
                  setCurrentColor={setCurrentColor}
                  currentPixels={currentPixels}
                  setCurrentPixels={setCurrentPixels}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
