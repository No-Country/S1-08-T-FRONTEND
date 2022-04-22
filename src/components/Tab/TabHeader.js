import { useContext } from "react";
import { TabContext } from "./TabContext";
import "../UserProfile/UserProfile.css";
const TabHeader = ({ title, children }) => {
  const context = useContext(TabContext);
  console.log(context);
  const isActive = title === context?.activeTab;
  const handleActive = () => {
    context?.setTab(title);
    console.log(context);
  };

  return (
    <li className="menuProfile" onClick={handleActive}>
      {children}
    </li>
  );
};
export default TabHeader;
