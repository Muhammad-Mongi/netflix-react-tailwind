import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import { AuthContextProvider } from "./context/AuthContext"
import Home from "./pages/Home"
import Account from './pages/Account';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </>
  )
}

export default App
