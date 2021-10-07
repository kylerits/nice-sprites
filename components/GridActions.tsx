const GridActions = ({ currentPixels }) => {
  const downloadSvg = () => {
    console.log(currentPixels)
  }

  return(
    <>
      {/* Grid Actions */}
      <div className="grid-actions-wrap py-4">
        <div>
          <button
            className="inline-block text-sm px-3 py-2 border-gray-100 border-2 rounded-md shadow-md"
            onClick={downloadSvg}
          >Download SVG</button>
        </div>
      </div>
    </>
  );
}

export default GridActions;