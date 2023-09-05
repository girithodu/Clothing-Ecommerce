import {createContext, useState } from 'react';

// value that will be accessed
export const UserContext = createContext();

// actual component
export const UserContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = {
    currentUser,
    setCurrentUser
  }
  return (
    <UserContext.Provider
      value = {value}
    >
      {children}
    </UserContext.Provider>
  )
}