import { createContext, useState } from "react";

export const TabContext = createContext();

const TabContainer = ({ tab = "", children }) => {
  const [activeTab, setTab] = useState(tab);
  const initialTab = {
    activeTab,
    setTab,
  };
  return (
    <TabContext.Provider value={initialTab}>{children}</TabContext.Provider>
  );
};
export default TabContainer;
