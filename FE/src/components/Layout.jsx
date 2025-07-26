import { Outlet } from "react-router"
import Header from './Header/index.jsx'
// import Footer from './Footer/index.jsx'

function Layout() {
  return (
    <>
    <Header/>
    <Outlet/>
    {/* <Footer/> */}
    </>
  )
}

export default Layout