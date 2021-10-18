import { createContext, useState, useEffect } from "react";
import plannerModel from '../models/PlannerModel'

import auth from '../utils/auth'
export const UserContext = createContext({});

export default function UserProvider({ children }: any) {
  const [userInfoContext, setUserInfoContext] = useState<plannerModel>();

  useEffect(() => {
    auth
    .then((data) => {
      if(!data.data.error){
        setUserInfoContext(data.data)
      }else{
      }
    })
    .then(() => {
    })
  }, [])

  return (
    <UserContext.Provider
      value={{
        userInfoContext,
        setUserInfoContext
      }}
    >
      {children}
    </UserContext.Provider>
  );
}