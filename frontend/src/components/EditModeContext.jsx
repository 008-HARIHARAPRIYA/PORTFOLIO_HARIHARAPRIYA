import React, { createContext, useContext, useState } from 'react';

const EditModeContext = createContext();

export const useEditMode = () => useContext(EditModeContext);

export const EditModeProvider = ({ children }) => {
  const [editMode, setEditMode] = useState(false);

  // ✅ Calls backend to check key
  const enableEditMode = async (key) => {
    try {
      const response = await fetch('http://localhost:5000/api/secret/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
      });

      const data = await response.json();

      if (data.success) {
        setEditMode(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error validating key:', error);
      return false;
    }
  };

  const disableEditMode = () => setEditMode(false);

  return (
    <EditModeContext.Provider value={{ editMode, enableEditMode, disableEditMode }}>
      {children}
    </EditModeContext.Provider>
  );
};
