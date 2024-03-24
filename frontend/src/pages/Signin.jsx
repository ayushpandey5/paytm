import {Heading} from "../components/Heading"
import {Button} from "../components/Button"
import {InputBox} from "../components/InputBox"
import {Subheading} from "../components/Subheading"
import {BottomWarning} from "../components/BottomWarning"

export function Signin() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
    <div className="rounded-lg bg-white w-80 text-center p-8">
       <Heading label="Sign In"/>
       <Subheading label="Enter your credentials to login to your account"/>
       <InputBox placeholder="John" label="Username"/>
       <InputBox placeholder="user@gmail.com" label="Email"/>
       <InputBox placeholder="******" label="Password"/>
        <Button label="Sign In"/>
        <BottomWarning label="Don't have an account?" to="/signup" buttonText="Sign up"/>
        </div>
    </div>
  )
}
