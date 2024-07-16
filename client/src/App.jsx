import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthProvider";

function App() {
  const user = useContext(AuthContext);
  console.log(user);

  return (
    <>
      <Navbar />
      <Outlet />
      <div className="h-screen bg-black"></div>
      <div className="h-screen"></div>
    </>
  )
}

export default App
