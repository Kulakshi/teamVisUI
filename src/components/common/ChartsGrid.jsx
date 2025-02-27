// Grid.js
import React from 'react';
import {useUser} from "../../context/UserContext";
import {useLocation, useNavigate} from "react-router-dom";
import Chart from "../../pages/component/Chart";

const ChartsGrid = ({ numRows, numCols, charts, csvContent }) => {
  return (
    <div className={`grid grid-cols-${numCols} gap-10 w-full`}>
      {Array.from({ length: numRows }, (_, rowIndex) => (
        <div key={rowIndex} className="flex gap-10 h-full w-full">
          {Array.from({ length: numCols }, (_, colIndex) => {
            const dataIndex = rowIndex * numCols + colIndex;
            const cellData = charts[dataIndex];

            return (
              cellData && <Chart key={colIndex} title={"Untitled"} data={csvContent}
                       chart={cellData}/>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ChartsGrid;
