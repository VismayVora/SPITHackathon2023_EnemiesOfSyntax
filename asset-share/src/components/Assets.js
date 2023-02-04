import React, { useContext } from "react";
import { FileAppContext } from "../context/FileContext";

const Assets = () => {
  const { balance } = useContext(FileAppContext);

  return (
    <div className="flex  justify-center h-[90vh] bg-[#10141A]">
      <div className="p-4 shadow shadow-white h-fit mt-16 w-fit bg-white">
        <h1 className="font-bold text-2xl">
          Your balance: {balance.slice(0, 4)}.{balance.slice(5, 10)} GO
        </h1>
      </div>
    </div>
  );
};

export default Assets;
