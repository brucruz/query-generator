"use client"; // This is a client component 👈🏽
import { createContext, useContext, useEffect, useState } from "react";

interface SchemaContextType {
  schema: string | null;
  saveSchema: (input: string) => void;
}

export interface SchemaProviderProps {
  children: React.ReactNode;
}

const SchemaContext = createContext<SchemaContextType>({} as SchemaContextType);

export function SchemaProvider({ children }: SchemaProviderProps) {
  const [schema, setSchema] = useState<string | null>(null);

  useEffect(() => {
    const storedSchema = localStorage.getItem("schema");

    if (storedSchema) {
      setSchema(storedSchema);
    }
  }, []);

  const saveSchema = (input: string) => {
    setSchema(input);
    // save schema to local storage
    localStorage.setItem("schema", input);
  };

  return (
    <SchemaContext.Provider value={{ schema, saveSchema }}>
      {children}
    </SchemaContext.Provider>
  );
}

export function useSchema(): SchemaContextType {
  const context = useContext(SchemaContext);

  if (!context) {
    throw new Error("useSchema must be used within SchemaProvider");
  }

  return context;
}
