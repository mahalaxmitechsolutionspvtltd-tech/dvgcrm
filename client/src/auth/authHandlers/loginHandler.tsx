
import axios from 'axios';
import type { Dispatch, SetStateAction } from 'react';
import type { LoginData, LoginErrors, User } from "../../lib/types.ts";



export default async function loginHandler(loginform: LoginData, setLoding: Dispatch<SetStateAction<boolean>>, setErrors: Dispatch<SetStateAction<LoginErrors>>, login: (user: User) => Promise<void>) {

    const URI = import.meta.env.VITE_REACT_BACKEND_URI;
    try {

        const response = await axios.post(
            `${URI}/api/signin`,
            loginform,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',

                },
                withCredentials: true,
            }
        );
       
        console.log(response);
        
        if (response.data.success) {
            await login(response.data.data);       
                
        }

        return response.data?.success

    } catch (error: any) {
        if (error) {
            const errors = error.response.data.errors;
            setErrors(errors);
        }
         
        console.error(error.response.data.errors)
    } finally {
        setLoding(false);

    }

}
