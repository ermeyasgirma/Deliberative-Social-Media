import React, { useReducer } from "react";
import { initialState, AuthReducer } from './reducer';

export const AuthStateContext = React.createContext('');
export const AuthDispatchContext = React.createContext('');


export const AuthProvider = ({ children }) => {
    const [user, dispatch] = useReducer(AuthReducer, initialState);
   
    return (
      <AuthStateContext.Provider value={user}>
        <AuthDispatchContext.Provider value={dispatch}>
          {children}
        </AuthDispatchContext.Provider>
      </AuthStateContext.Provider>
    );
};