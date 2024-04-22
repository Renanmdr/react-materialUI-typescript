import { createContext, useCallback, useContext, useState } from 'react';

interface IDrawerOption {
  path: string
  label: string
  icon: string
}

interface IDrawerContextData {
  isDrawerOpen: boolean
  drawerOptions: IDrawerOption[]
  toggleDrawerOpen: () => void
  setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void
}

const DrowerContext = createContext({} as IDrawerContextData);



export const useDrawerContext = () => {
  return useContext(DrowerContext);
};



interface IDrawerProviderProps {
  children: React.ReactNode
}

export const AppDrawerProvider: React.FC<IDrawerProviderProps> = ({ children }) => {
  const [isDrawerOpen, setisDrawerOpen] = useState(false);
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);

  const toggleDrawerOpen = useCallback(() => {
    setisDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  }, []);

  const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {
    setDrawerOptions(newDrawerOptions);
  }, []);


  return (
    <DrowerContext.Provider value={{ isDrawerOpen, drawerOptions , toggleDrawerOpen, setDrawerOptions: handleSetDrawerOptions }}>
      {children}
    </DrowerContext.Provider>
  );
};