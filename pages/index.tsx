import { useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'

// Components
import {SketchPicker} from 'react-color'
import SpriteGrid from '../components/SpriteGrid'

const Home: NextPage = () => {
  const [currentColor, setCurrentColor] = useState('#000000');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [bitCount, setBitCount] = useState(16);

  return (
    <>
      <Head>
        <title>Nice Sprites</title>
      </Head>
      {/* Layout */}
      <section className="relative w-screen min-h-screen flex items-center justify-center">
        <div className="w-full max-w-5xl">

          {/* Sprite Grid */}
          <SpriteGrid
            currentColor={currentColor}
            bitCount={bitCount}
          />

          {/* Color Picker */}
          <div className="relative text-center py-4">
            <div className="button-wrap relative inline-block py-4">
              <button 
                className="inline-flex items-center p-2 border-2 border-gray-100 shadow-md rounded-md uppercase text-gray-500 font-semibold tracking-wider text-sm hover:bg-gray-100 duration-200"
                onClick={() => setShowColorPicker(!showColorPicker)}
                aria-label="Current Color"
                title="Current Color"
              ><span className="inline-block w-8 h-8 rounded-md" style={{ backgroundColor: currentColor }}></span></button>
              { showColorPicker ? (
                <SketchPicker 
                  className="absolute bottom-full right-[50%] z-10 transform translate-x-1/2"
                  disableAlpha={true}
                  color={currentColor}
                  onChangeComplete={(color) => setCurrentColor(color.hex)}
                />
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
