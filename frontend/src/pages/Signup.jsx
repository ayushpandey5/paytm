import {Heading} from "../components/Heading"
import {Button} from "../components/Button"
import {InputBox} from "../components/InputBox"
import {Subheading} from "../components/Subheading"
import {BottomWarning} from "../components/BottomWarning"

export default function Signup() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
    <div className="rounded-lg bg-white w-80 text-center p-8">
       <Heading label="Sign Up"/>
       <Subheading label="Enter your credentials to signup for a account"/>
       <InputBox placeholder="John" label="Username"/>
       <InputBox placeholder="user@gmail.com" label="Email"/>
       <InputBox placeholder="******" label="Password"/>
        <Button label="Sign Up"/>
        <BottomWarning label="Already have an account?" to="/signin" buttonText="Sign in"/>
        </div>
    </div>
  )
}
