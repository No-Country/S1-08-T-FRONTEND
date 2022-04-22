import { useContext } from "react";
import Post from "../Post/Post";
import { TabContext } from "./TabContext";
import { Follower } from "../Follower/Follower";
import { Save } from "../Save/Save";
import FollowersScreen from "../Follow/FollowersScreen";
import AboutMe from "../AboutMe/AboutMe";
export const TabContent = ({ display }) => {
  const context = useContext(TabContext);
  switch (context.activeTab) {
    case "POSTS":
      return <Post />;
    case "INFORMACION":
      return <AboutMe />;
    case "SEGUIDORES":
      return <FollowersScreen />;
    case "GUARDADOS":
      return display && <Save />;
    default:
      return <Post />;
  }
};
