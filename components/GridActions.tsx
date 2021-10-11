import { FC } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'
import {uniqueNamesGenerator, Config, adjectives, colors, animals} from 'unique-names-generator'

interface Props {
  currentPixels: any[];
  bitCount: number;
  clearColors: () => void;
}

const customConfig: Config = {
  dictionaries: [adjectives, colors, animals],
  separator: '-',
  length: 2,
}

const GridActions: FC<Props> = ({ currentPixels, bitCount, clearColors }) => {
  const generateSvgString = () => {
    const multiplyer = 10
    const width = bitCount * multiplyer
    const height = bitCount * multiplyer
    const paths: any[] = currentPixels.map((pixel, index) => {
      const x = pixel.x * multiplyer
      const y = pixel.y * multiplyer
      const pWidth = multiplyer
      const pHeight = multiplyer
      return `<rect key="${index}" x="${x}" y="${y}" width="${pWidth}" height="${pHeight}" fill="${pixel.color ? pixel.color : '#000'}"></rect>`
    });
    // console.log(paths);
    const pathsString = paths.join('')
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewPort="0 0 ${width} ${height}">${pathsString}</svg>`
    return svgString;
  }

  const downloadSvg = () => {
    const svgString = generateSvgString()
    const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');
    const shortName: string = uniqueNamesGenerator(customConfig);
    downloadLink.href = svgUrl;
    downloadLink.download = `${shortName}.svg`;
    // console.log(svgString);
    downloadLink.click()
    toast.success('SVG downloaded!');
  }

  const copySvg = () => {
    const svgString = generateSvgString()
    const textArea = document.createElement('textarea');
    textArea.value = svgString;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    toast.success('SVG copied!');
  }

  return(
    <>
      {/* Grid Actions */}
      <div className="grid-actions-wrap py-4 lg:py-8">
        <div className="flex flex-wrap">
          <button
            className="inline-flex items-center text-sm pl-2 pr-3 py-2 border-blue-100 border-2 rounded-md shadow-md text-gray-600 hover:bg-gray-50 duration-200 mr-2"
            onClick={downloadSvg}
          >
            <span className="mr-1">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.75 14.75V16.25C4.75 17.9069 6.09315 19.25 7.75 19.25H16.25C17.9069 19.25 19.25 17.9069 19.25 16.25V14.75"></path>
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14.25L12 4.75"></path>
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.75 10.75L12 14.25L15.25 10.75"></path>
              </svg>
            </span>
            <span>Download SVG</span>
          </button>
          <button
            className="inline-flex items-center text-sm pl-2 pr-3 py-2 border-blue-100 border-2 rounded-md shadow-md text-gray-600 hover:bg-gray-50 duration-200 mr-2"
            onClick={copySvg}
          >
            <span className="mr-1">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.5 15.25V15.25C5.5335 15.25 4.75 14.4665 4.75 13.5V6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H13.5C14.4665 4.75 15.25 5.5335 15.25 6.5V6.5"></path>
                <rect width="10.5" height="10.5" x="8.75" y="8.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" rx="2"></rect>
              </svg>
            </span>
            <span>Copy SVG</span>
          </button>
          <button
            className="inline-flex items-center text-sm px-3 py-2 border-red-200 border-2 rounded-md shadow-md text-red-600 hover:bg-gray-50 duration-200 mr-2"
            onClick={() => {clearColors()}}
          >
            <span className="mr-1">
              
            </span>
            <span className="text-xs uppercase tracking-wider">Clear</span>
          </button>
        </div>
      </div>
      <ToastContainer position="bottom-center" role="alert" />
    </>
  );
}

export default GridActions;