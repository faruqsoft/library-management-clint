import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MainLayout = () => {
  const location = useLocation()
  const is404 = location.pathname === '/404'

  return (
    <>
      {!is404 && <Navbar />}
      <main className="min-h-screen">
        <Outlet />
      </main>
      {!is404 && <Footer />}
      {/* <div className="text-center mt-10">Loading...</div> */}
    </>
  )
}

export default MainLayout
