import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from 'react-hot-toast';
import DynamicTitle from './components/DynamicTitle';

export  const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <DynamicTitle/>
      <AppRoutes/>
      <ToastContainer />
    </>
  )
}
