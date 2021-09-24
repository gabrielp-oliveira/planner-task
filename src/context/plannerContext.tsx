import { createContext, useState } from "react";

export const PlannerContextProvider = createContext({});

export default function PlannerProvider({ children }: any) {
  const [plannerInfoContext, setPlannerInfoContext] = useState<any>();


  return (
    <PlannerContextProvider.Provider
      value={{
        plannerInfoContext,
        setPlannerInfoContext
      }}
    >
      {children}
    </PlannerContextProvider.Provider>
  );
}