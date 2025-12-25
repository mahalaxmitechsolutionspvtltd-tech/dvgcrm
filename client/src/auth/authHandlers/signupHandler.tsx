import axios from 'axios';
import type { Dispatch, SetStateAction } from 'react';
import type { FormErrors, FormData } from "../../lib/types.ts";



export default async function signupHandler(formdata: FormData, setLoding: Dispatch<SetStateAction<boolean>>, setErrors: Dispatch<SetStateAction<FormErrors>>) {



    const URI = import.meta.env.VITE_REACT_BACKEND_URI;
    try {

        const response = await axios.post(
            `${URI}/api/signup`,
            formdata,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                withCredentials: true
            }
        );

        console.log(response.data.success);
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
