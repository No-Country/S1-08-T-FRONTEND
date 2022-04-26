import React from "react";
import { Rings } from  'react-loader-spinner';
import './Loading.css';

  export default function Loading () {
      return (
          <div className="loading" align="center"> 
            <Rings
                height={100}
                width={100}
                color='#EC5853'
                timeout= '2500'
                ariaLabel='loading'
            />
          </div>
      )
  }
