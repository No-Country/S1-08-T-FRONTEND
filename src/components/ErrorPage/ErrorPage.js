import React from "react";
import sushi from './sushi.jpg';
import './ErrorPage.css';
import problem from './problem.png';

export default function ErrorPage(){
   return(
   <div className="errorPage">
       <img className="errorPhoto" src={sushi}/>
        <div className="errorMessage">
            <h1 className="errorTitle">404</h1>
            <h2>Lo sentimos, alguien se comió esta página.</h2>
            <p>Por favor, prueba buscando algo diferente</p>
            <img className="problemImg" src={problem} />

        </div>
    </div>
   )
}