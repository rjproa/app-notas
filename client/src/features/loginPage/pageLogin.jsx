import { useState } from 'react'
import SignIn from './components/formSignIn'
import SignUp from './components/formSignUp'

export default function PageLogin() {
  const [isRegister, setIsRegister] = useState(false)

  return (
    <>
      {isRegister
        ? <SignUp onRegister={() => setIsRegister(false)} />
        : <SignIn onRegister={() => setIsRegister(true)} />
      }

    </>
  )
}