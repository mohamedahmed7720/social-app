import React, { createContext, useContext, useEffect, useState } from "react";
import type { IUserData } from "../types/profileData";
import { getMyProfile } from "../services/profile.services";
import { AuthContext } from "./AuthContext";

type UserContextType = {
  userData: IUserData | null;
};

export const userContext = createContext<UserContextType | null>(null);

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userData, setUserData] = useState<IUserData | null>(null);
  const { token } = useContext(AuthContext)!;

  useEffect(() => {
    async function getUserProfile() {
      try {
        const { data } = await getMyProfile();
        const user: IUserData = data.data.user;
        setUserData(user);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    if (token) {
      getUserProfile();
    }
  }, [token]);

  return (
    <>
      <userContext.Provider value={{ userData }}>
        {children}
      </userContext.Provider>
    </>
  );
}
