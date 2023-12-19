// Grid.js
import React from 'react';
import {useUser} from "../../UserContext";
import {useNavigate} from "react-router-dom";

const ProjectsGrid = ({ numRows, numCols, projects }) => {
  const {user} = useUser();
  const nav = useNavigate()
  return (
    <div className={`grid grid-cols-${numCols} gap-10`}>
      {Array.from({ length: numRows }, (_, rowIndex) => (
        <div key={rowIndex} className="flex gap-10">
          {Array.from({ length: numCols }, (_, colIndex) => {
            const dataIndex = rowIndex * numCols + colIndex;
            const cellData = projects[dataIndex];

            return (
              cellData && <div
                key={colIndex}
                className="flex flex-col items-center justify-center h-28 w-1/3 bg-gray-300 border border-white"
                onClick={()=>{
                                    nav('/app/dashboard', { state: cellData });
                                }}
              >
                <p className="text-lg font-bold">{cellData.projectName || cellData.fileName}</p>
                <p>{cellData.ownerId === user ? "Owner" : "Collaborator"}</p>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ProjectsGrid;
