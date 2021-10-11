import { FC } from "react";

interface Props {
  bitCount: number;
  setBitCount: (bitCount: number) => void;
}

const BitActions: FC<Props> = ({bitCount, setBitCount}) => {
  return (
    <>
      <div className="bit-actions">
        <button
          className={bitCount == 16 ? "inline-flex items-center text-sm px-3 py-2 border-blue-500 lg:border-blue-600 border-2 rounded-md shadow-md text-white bg-blue-500 hover:bg-blue-600 duration-200 mb-4" : "inline-flex items-center text-sm px-3 py-2 border-blue-200 border-2 rounded-md shadow-md text-blue-600 hover:bg-gray-50 duration-200 mb-4"}
          onClick={() => {setBitCount(16)}}
        >
          <span>16</span>
        </button>
        <button
          className={bitCount == 32 ? "inline-flex items-center text-sm px-3 py-2 border-blue-500 lg:border-blue-600 border-2 rounded-md shadow-md text-white bg-blue-500 hover:bg-blue-600 duration-200 mb-4" : "inline-flex items-center text-sm px-3 py-2 border-blue-200 border-2 rounded-md shadow-md text-blue-600 hover:bg-gray-50 duration-200 mb-4"}
          onClick={() => {setBitCount(32)}}
        >
          <span>32</span>
        </button>
      </div>
    </>
  );
}

export default BitActions;