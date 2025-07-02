import { useState } from 'react'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import app from '../firebase/firebase.config'

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

const Login = () => {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value
    const password = form.password.value

    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success('Login Successful!')
      navigate('/')
    } catch (err) {
      setError(err.message)
      toast.error('Login Failed!')
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider)
      toast.success('Google Login Successful!')
      navigate('/')
    } catch (err) {
      toast.error('Google Login Failed!')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input name="email" type="email" placeholder="Email" className="input" required />
        <input name="password" type="password" placeholder="Password" className="input" required />
        {error && <p className="text-red-600">{error}</p>}
        <br></br>
        <button className="btn">Login</button><br></br>
        <button type="button" onClick={handleGoogleLogin} className="btn bg-red-500 text-white">Login with Google</button>
        <p className="text-sm mt-2">New user? <Link to="/register" className="text-blue-600">Register</Link></p>
      </form>
    </div>
  )
}

export default Login
