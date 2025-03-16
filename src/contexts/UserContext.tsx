
import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
  userSkills: string[];
  setUserSkills: (skills: string[]) => void;
  isProcessed: boolean;
  setIsProcessed: (processed: boolean) => void;
  clearUserData: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage if available
  const [userSkills, setUserSkills] = useState<string[]>(() => {
    const saved = localStorage.getItem('userSkills');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isProcessed, setIsProcessed] = useState<boolean>(() => {
    const saved = localStorage.getItem('isProcessed');
    return saved ? JSON.parse(saved) === true : false;
  });

  // Persist state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('userSkills', JSON.stringify(userSkills));
  }, [userSkills]);

  useEffect(() => {
    localStorage.setItem('isProcessed', JSON.stringify(isProcessed));
  }, [isProcessed]);

  const clearUserData = () => {
    setUserSkills([]);
    setIsProcessed(false);
    localStorage.removeItem('userSkills');
    localStorage.removeItem('isProcessed');
  };

  return (
    <UserContext.Provider 
      value={{ 
        userSkills, 
        setUserSkills, 
        isProcessed, 
        setIsProcessed,
        clearUserData
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
