import { useContext } from "react";
import Post from "../Post/Post";
import { TabContext } from "./TabContext";
import { Follower } from "../Follower/Follower";
import { Save } from "../Save/Save";

import AboutMe from "../AboutMe/AboutMe";
export const TabContent = () => {
  const context = useContext(TabContext);
  switch (context.activeTab) {
    case "POSTS":
      return <Post />;
    case "SOBRE MI":
      return <AboutMe />;
    case "SEGUIDORES":
      return <Follower />;
    case "GUARDADOS":
      return <Save />;
    default:
      return <Post />;
  }
};
