import { createContext, useState, useEffect } from "react";
import PlannerModel from '../models/plannerModel'
import api from '../api/api'
import auth from '../utils/auth'
export const plannerContext = createContext({});

export default function PlannerProvider({ children }: any) {
  const [plannerInfoContext, setPlannerInfoContext] = useState<PlannerModel>();

  useEffect(() => {
    auth
    .then((data) => {
      console.log(data.data)
      
      if(!data.data.error){
        setPlannerInfoContext(data.data)
      }else{
        console.log('.')
      }
    })
  }, [])

  return (
    <plannerContext.Provider
      value={{
        plannerInfoContext,
        setPlannerInfoContext
      }}
    >
      {children}
    </plannerContext.Provider>
  );
}