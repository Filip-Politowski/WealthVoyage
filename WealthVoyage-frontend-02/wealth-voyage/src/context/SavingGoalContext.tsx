import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface SavingGoalContextProps {
  deleting: boolean;
  setDeleting: Dispatch<SetStateAction<boolean>>;
}

const SavingGoalContext = createContext<SavingGoalContextProps>({
  deleting: false,
  setDeleting: () => {},
});

export const useSavingGoalContext = (): SavingGoalContextProps =>
  useContext(SavingGoalContext);

export const SavingGoalContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <SavingGoalContext.Provider value={{ deleting: open, setDeleting: setOpen }}>
      {children}
    </SavingGoalContext.Provider>
  );
};
