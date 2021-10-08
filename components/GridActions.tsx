const GridActions = ({ currentPixels, bitCount }) => {
  const generateSvgString = (pixels) => {
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
    console.log(paths);
    const pathsString = paths.join('')
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewPort="0 0 ${width} ${height}">${pathsString}</svg>`
    return svgString;
  }

  const downloadSvg = () => {
    const svgString = generateSvgString(currentPixels)
    const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = "nice-sprite.svg";
    console.log(svgString);
    downloadLink.click()
  }

  return(
    <>
      {/* Grid Actions */}
      <div className="grid-actions-wrap py-4">
        <div>
          <button
            className="inline-flex items-center text-sm pl-2 pr-3 py-2 border-gray-100 border-2 rounded-md shadow-md text-gray-600 hover:bg-gray-50 duration-200"
            onClick={downloadSvg}
          ><span className="mr-1"><svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.75 14.75V16.25C4.75 17.9069 6.09315 19.25 7.75 19.25H16.25C17.9069 19.25 19.25 17.9069 19.25 16.25V14.75"></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14.25L12 4.75"></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.75 10.75L12 14.25L15.25 10.75"></path>
          </svg>
          </span><span>Download SVG</span></button>
        </div>
      </div>
    </>
  );
}

export default GridActions;