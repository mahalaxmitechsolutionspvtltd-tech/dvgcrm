
import React, { useState, type FormEvent } from "react";
import { cn } from "../lib/utils.ts"
import { Button } from "../components/ui/button.tsx"
import { Card, CardContent } from "../components/ui/card.tsx";

import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    // FieldSeparator,
} from "../components/ui/field.tsx"

import { Input } from "../components/ui/input.tsx"
import { Link, useNavigate } from "react-router-dom";
import { EyeClosed, EyeIcon, Loader } from "lucide-react";
import { useAuth } from "./AuthProvider.tsx";
import loginHandler from "./authHandlers/loginHandler.tsx";
import type { LoginData, LoginErrors } from "../lib/types.ts";




export function Login({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const { login, setLoding } = useAuth();
    const navigate = useNavigate();

    const [loader, setLoader] = useState<boolean>(false);
    const [loginform, setLoginForm] = useState<LoginData>({})
    const [errors, setErrors] = useState<LoginErrors>({
        email: "",
        password: "",
    });


    const [hidePassword, setHidePassword] = useState(true);

    const handelOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSumit = async (e: FormEvent) => {
        e.preventDefault();

        setLoader(true);
        const response = await loginHandler(loginform, setLoding, setErrors, login);
        console.log(response);
        if (response) {
            setLoader(false);
            navigate("/");
        } else {
            setLoader(false);

        }

    }
    console.log(errors);




    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">

            <div className="w-full max-w-sm md:max-w-4xl">
                <div className={cn("flex flex-col gap-6", className)} {...props}>
                    <Card className="overflow-hidden p-0 border border-gray-300">
                        <CardContent className="grid p-0 md:grid-cols-2">
                            <form className="p-6 md:p-8" onSubmit={(e) => handleSumit(e)}>
                                <FieldGroup>
                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <h1 className="text-2xl font-bold">Welcome again</h1>
                                        <p className="text-muted-foreground text-sm text-balance">
                                            Enter your email ,password to sign up  your account
                                        </p>
                                    </div>
                                    <Field>
                                        <FieldLabel htmlFor="fullname">Email</FieldLabel>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder={errors?.email ? errors.email : "enter email..."}
                                            className={`${errors?.email ? "border-2 border-red-600 placeholder:text-red-600" : ""}`}
                                            name="email"
                                            onChange={(e) => handelOnChange(e)}
                                        />
                                        <small className="text-red-600">{errors?.email}</small>

                                    </Field>

                                    <Field >
                                        <FieldLabel htmlFor="confirm-password">
                                            Create Password
                                        </FieldLabel>
                                        <div className="flex relative">
                                            <Input
                                                id="confirm-password"
                                                type={hidePassword ? "password" : "text"}
                                                className={`${errors?.password ? "border-2 border-red-600 placeholder:text-red-600" : ""}`}

                                                placeholder={errors?.password ? errors.password : "password.."}
                                                name="password"
                                                onChange={(e) => handelOnChange(e)}
                                            />
                                            {
                                                hidePassword ? <EyeClosed onClick={() => setHidePassword(!hidePassword)} width={18} height={18} className="transition-all  absolute top-[25%] right-2" />
                                                    :
                                                    <EyeIcon onClick={() => setHidePassword(!hidePassword)} width={18} height={18} className=" transition-all absolute top-[25%] right-2" />

                                            }

                                        </div>
              
                                        <small className="text-red-600">{errors ? errors.password : errors}</small>

                                    </Field>

                                    <Field>
                                        <Button type="submit">

                                            {
                                                loader ? <Loader className="w-18 h-18 animate-spin" /> : "Login"
                                            }

                                        </Button>
                                    </Field>
                                    {/* <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Or continue with
                            </FieldSeparator> */}

                                    <FieldDescription className="text-center">
                                        Already have an account? <Link to={"/signup"}>Sign up</Link>
                                    </FieldDescription>
                                </FieldGroup>
                            </form>
                            <div className="bg-muted relative hidden md:block">
                                <img
                                    src="./assets/images/bwink_bld_03_single_03.jpg"
                                    alt="Image"
                                    className="absolute inset-0 h-full w-full object-cover "
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <FieldDescription className="px-6 text-center">
                        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                        and <a href="#">Conditions</a>
                    </FieldDescription>

                </div>
            </div>

        </div >
    )
}





