import React from 'react'
import './Spinner.css'
// import { Rings } from 'react-loader-spinner';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  margin: 0 auto;
`;
export default function Spinner({loading}) {
  return (
    <div className='spinner' align="center">
    <ClipLoader 
    color={"#b1b1b5"} 
    loading={loading} 
    css={override} 
    size={15} />
    </div>
  )
}
