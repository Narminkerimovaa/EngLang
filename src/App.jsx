import { BrowserRouter, Routes, Route } from "react-router";
import Layout from './components/Layout.jsx'
import Home from './pages/Home/index.jsx'
import Login from './pages/Login/index.jsx'
import NoPage from './pages/NoPage/index.jsx'
import MainProvider from "./context/MainProvider.jsx";
import SignUp from "./pages/Sign Up/index.jsx";

function App() {
  return(
    <MainProvider>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </MainProvider>
  )
     
}

export default App;
