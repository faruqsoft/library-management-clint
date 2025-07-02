import { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile, getAuth } from 'firebase/auth'
import app from '../firebase/firebase.config'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const auth = getAuth(app)

const Register = () => {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const email = form.email.value
    const photo = form.photo.value
    const password = form.password.value

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/
    if (!passwordRegex.test(password)) {
      return setError('Password must include uppercase, lowercase, and be 6+ characters.')
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photo
      })
      toast.success('Registration Successful!')
      navigate('/')
    } catch (err) {
      setError(err.message)
      toast.error('Registration Failed!')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input name="name" type="text" placeholder="Full Name" className="input" required />
        <input name="email" type="email" placeholder="Email" className="input" required />
        <input name="photo" type="text" placeholder="Photo URL" className="input" required />
        <input name="password" type="password" placeholder="Password" className="input" required />
        {error && <p className="text-red-600">{error}</p>}
        <button className="btn">Register</button>
        <p className="text-sm mt-2">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
      </form>
    </div>
  )
}

export default Register
