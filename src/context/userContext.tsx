import { createContext, useState, useEffect } from "react";
import userauth from '../models/UserAuthModel'
import api from '../api/api'

export const UserContext = createContext({});

export default function UserProvider({ children }: any) {
  const [userInfoContext, setUserInfoContext] = useState<userauth>();

  useEffect(() => {
    api.get('/auth', {
      params: {
        id: localStorage.getItem('UserId')
      }, headers: { authentication: `Bearer ${localStorage.getItem('token')}` }
    })
    .then((data) => {
      console.log(data.data)
      
      if(!data.data.error){
        setUserInfoContext(data.data)
      }else{
        console.log('.')
      }
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