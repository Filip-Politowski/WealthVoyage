import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface SavingGoalContextProps {
  openTest: boolean;
  setOpenTest: Dispatch<SetStateAction<boolean>>;
}

const SavingGoalContext = createContext<SavingGoalContextProps>({
  openTest: false,
  setOpenTest: () => {},
});

export const useSavingGoalContext = (): SavingGoalContextProps =>
  useContext(SavingGoalContext);

export const SavingGoalContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <SavingGoalContext.Provider value={{ openTest: open, setOpenTest: setOpen }}>
      {children}
    </SavingGoalContext.Provider>
  );
};
