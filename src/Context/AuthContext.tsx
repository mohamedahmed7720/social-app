import React, { createContext, useState, type SetStateAction } from 'react'


type AuthContextType = {
    token: string | null
    setToken: React.Dispatch<SetStateAction<string | null>>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export default function AuthContextProvider({children} : {children: React.ReactNode}) {

      const [token, setToken] = useState<string | null>(
    localStorage.getItem("Usertoken"),
  );
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}
