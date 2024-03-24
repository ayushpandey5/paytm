import {Heading} from "../components/Heading"
import {Button} from "../components/Button"
import {InputBox} from "../components/InputBox"
import {Subheading} from "../components/Subheading"
import {BottomWarning} from "../components/BottomWarning"
import { useForm, Controller } from "react-hook-form"

export function Signin() {
    const { control, handleSubmit } = useForm({
        defaultValues: {
          email: "",
          password: ""
        },
      })

      const onSubmit = (data) => console.log(data)

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
       
       
        <BottomWarning label="Don't have an account?" to="/signup" buttonText="Sign up"/>
        </div>
    </div>
  )
}
