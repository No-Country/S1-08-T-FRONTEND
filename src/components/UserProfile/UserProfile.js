import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../../app/services/users";
import "./UserProfile.css";
import TabHeader from "../Tab/TabHeader";
import { TabContent } from "../Tab/TabContent";
import TabContainer from "../Tab/TabContext";
import TabPanel from "../Tab/TabPanel";
export const UserProfile = () => {
  let navigate = useNavigate();
  let ListTabs = [
    {
      id: 1,
      title: "POSTS",
    },
    {
      id: 2,
      title: "SOBRE MI",
    },
    {
      id: 3,
      title: "SEGUIDORES",
    },
    {
      id: 4,
      title: "GUARDADOS",
    },
  ];
  const { token, user } = useSelector((state) => state.authUsers);
  let { data } = useGetUserQuery(user?.id);
  useEffect(() => {
    if (!token) {
      navigate("/");
      return null;
    }
  }, [navigate, token]);

  return (
    <div className="containerProfile">
      <div className="backgroundImage">
        <img
          src="https://farm4.staticflickr.com/3867/14941333932_d2af5b6731.jpg"
          alt="portrait"
          className="imagePortrait"
        />
      </div>
      <div className="mainContainer">
        <div className="banner">
          <img
            src="https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425__340.png"
            alt="profile photo"
            className="profileImg"
          />
          <div className="userInfo">
            <h1>
              {data?.username} {data?.nickname}
            </h1>
            <a href="#">1.6K seguidores</a>
            <div className="userOptions">
              <button className="buttonOption">Editar Perfil</button>
            </div>
          </div>
        </div>
        <div className="mainSectionProfile">
          <TabContainer tab={ListTabs[0].title}>
            <ul className="menuProfile">
              {ListTabs.map(({ id, title }) => (
                <TabHeader title={title} key={id}>
                  {title}
                </TabHeader>
              ))}
            </ul>
            {ListTabs?.map(({ id, title }) => (
              <TabPanel whenActive={title} key={id}>
                <TabContent />
              </TabPanel>
            ))}
          </TabContainer>
        </div>
      </div>
    </div>
  );
};
