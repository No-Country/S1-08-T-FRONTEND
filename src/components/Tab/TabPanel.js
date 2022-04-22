import { useContext } from "react";
import { TabContext } from "./TabContext";

const TabPanel = ({ children, whenActive }) => {
  const context = useContext(TabContext);
  const showPanel = whenActive === context?.activeTab ? children : null;

  return showPanel;
};

export default TabPanel;
