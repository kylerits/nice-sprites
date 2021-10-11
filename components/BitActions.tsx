import { FC } from "react";

interface Props {
  bitCount: number;
  setBitCount: (bitCount: number) => void;
}

const BitActions: FC<Props> = ({bitCount, setBitCount}) => {
  return (
    <>
      <div className="bit-actions">
        <span className="inline-flex flex-col rounded-md shadow-md border-2 border-blue-500">
          <button
            className={bitCount == 16 ? "inline-flex items-center text-sm px-3 py-2 text-white bg-blue-500 hover:bg-blue-600 duration-200" : "inline-flex items-center text-sm px-3 py-2 text-blue-400 hover:text-blue-600 duration-200"}
            onClick={() => {setBitCount(16)}}
          >
            <span>16</span>
          </button>
          <button
            className={bitCount == 32 ? "inline-flex items-center text-sm px-3 py-2 text-white bg-blue-500 hover:bg-blue-600 duration-200" : "inline-flex items-center text-sm px-3 py-2 text-blue-400 hover:text-blue-600 duration-200"}
            onClick={() => {setBitCount(32)}}
          >
            <span>32</span>
          </button>
        </span>
      </div>
    </>
  );
}

export default BitActions;