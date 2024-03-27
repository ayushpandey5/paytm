import {Heading} from "../components/Heading"
import {Button} from "../components/Button"
import {InputBox} from "../components/InputBox"
import {Subheading} from "../components/Subheading"
import {BottomWarning} from "../components/BottomWarning"
import { useForm, Controller } from "react-hook-form"
import axios from 'axios';
import { Dashboard } from "./Dashboard"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export function Signin() {
    const navigate = useNavigate()
    const [error, setError] = useState("");
    const { control, handleSubmit } = useForm({
        defaultValues: {
          email: "",
          password: ""
        },
      })

      const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
            email: data.email,
            password: data.password
        })
            window.localStorage.setItem("token", response.data.token)
            console.log(response.data.token)
            navigate('/dashboard');
        } catch (error) {
            console.error(error)
            setError("Error Loggin In.....")
        }
        }      

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
    <div className="rounded-lg bg-white w-80 text-center p-8">
       <Heading label="Sign In"/>
       <Subheading label="Enter your credentials to login to your account"/>

       <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        render={({ field }) => <InputBox {...field} label="Email" placeholder="user@gmail.com"/>}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => <InputBox {...field} label="Password" placeholder="******" />
        }
      />
    <Button label="Sign In" type="submit"/>
    </form>
       
        {error ? <span>{error}</span> : null}
        <BottomWarning label="Don't have an account?" to="/signup" buttonText="Sign up"/>
        </div>
    </div>
  )
}
