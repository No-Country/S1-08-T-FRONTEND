import React from "react";
import { MutatingDots } from  'react-loader-spinner';
import './Loading.css';

  export default function Loading () {
      return (
          <div className="loading"> 
            <MutatingDots
                height="40vh"
                width="150"
                color='#EC5853'
                timeout= '2500'
                ariaLabel='loading'
            />
          </div>
      )
  }
