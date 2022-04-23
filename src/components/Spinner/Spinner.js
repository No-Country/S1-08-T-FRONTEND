import React from 'react'
import './Spinner.css'
import { Rings } from 'react-loader-spinner';

export default function Spinner() {
  return (
    <div className='spinner' align="center">
      <Rings
        height={100}
        width={100}
        color='#b1b1b5'
        timeout='2500'
        ariaLabel='loading'
      />
    </div>
  )
}
