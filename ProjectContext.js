// ProjectContext.js

import React, { createContext, useState } from 'react';

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
  const [isProjectComplete, setIsProjectComplete] = useState(false);

  const toggleProjectCompletion = () => {
    setIsProjectComplete((prevStatus) => !prevStatus);
    // You can also make an API call here to update the completion status on the server
  };

  return (
    <ProjectContext.Provider value={{ isProjectComplete, toggleProjectCompletion }}>
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectContext, ProjectProvider };
