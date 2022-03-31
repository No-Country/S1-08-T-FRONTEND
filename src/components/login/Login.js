import React from 'react';
import "./Login.css";

const Login = () => {
  return (
   <div>
        <form>
            <input type="text" placeholder="Usuario" name="user" minlength="4" maxlength="16" required />
            <input type="password" placeholder="Clave" name="password" minlength="4" required />
            <input type="password" placeholder="Confirmar clave" name="repassword" minlength="4" />
            <button type="submit">Entrar</button>
         </form>
    </div>
  );
}

export default Login;
