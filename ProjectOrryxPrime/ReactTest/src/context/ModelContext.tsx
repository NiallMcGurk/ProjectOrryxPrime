import React, { ReactNode, useState } from "react";
import { useContext } from "react";

interface ModelContextType {
  model: ModelDetails | null;
  setModel: (model: ModelDetails | null) => void;
}
interface ModelDetails {
  Id: number;
  Name: string;
  FactionType: string;
  FactionRuleId: number;
  StatsId: number;
}

interface ModelProviderProps {
  children: ReactNode;
}

const ModelContext = React.createContext<ModelContextType | null>(null);

export function getModel(): ModelContextType {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error("getModel appears to not exist");
  }
  return context;
}

export function ModelProvider({ children }: ModelProviderProps) {
  const [model, setModel] = useState<ModelDetails | null>(null);

  const value: ModelContextType = {
    model,
    setModel: setModel,
  };

  return (
    <ModelContext.Provider value={value}>{children}</ModelContext.Provider>
  );
}
