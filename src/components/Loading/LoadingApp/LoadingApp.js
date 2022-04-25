import React from "react";
import './LoadingApp.css';
import Logo from '../../../Assets/images/logo2.png';

  export default function LoadingApp () {
      return (
          <div className="loadingApp" > 
            <img alt="" className="logoApp" src={Logo} />
          </div>
      )
  }
