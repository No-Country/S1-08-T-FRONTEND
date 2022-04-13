import React from 'react'
import './LoginGoogleButton.css'
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from 'react-google-login';
import { useGoogleLoginMutation } from "../../app/services/users";
import { client_secret_google } from './client_secret_google';
import { useState } from 'react';

console.log(client_secret_google.client_id)

export const LoginGoogleButton = () => {
    const [loading, setLoading] = useState(false);

    const [googleLogin] = useGoogleLoginMutation();


    const responseSuccessGoogle = async (response) => {


        console.log(response);
        const { tokenId } = response

        const loginToast = toast.loading("Iniciando sesión...");
        setLoading(true);

        const res = await googleLogin({
            tokenId
        });

        console.log(res);

        setLoading(false);
        toast.dismiss(loginToast);
        if (res.error) {
            toast.error(res.error.data.msg);
        } else {
            toast.success(`Bienvenido ${res.data.username}`);
        }
    }

    const responseErrorGoogle = (response) => {
        console.log(response);

    }

    return (
        <GoogleLogin
            clientId={client_secret_google.client_id}
            onSuccess={responseSuccessGoogle}
            onFailure={responseErrorGoogle}
            cookiePolicy={'single_host_origin'}

            render={(renderProps ) => (
                <button
                onClick={renderProps.onClick}
                className="googleLogin-button"
                 disabled={loading}>
                    <FcGoogle
                        className="google-icon google-icon-wrapper"
                        style={{ backgroundColor: "inherit"}}
                    />
                    &nbsp; Google
                </button>
            )}
        >
        </GoogleLogin>
    )
}

