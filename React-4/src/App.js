import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/About";
import Error404 from './pages/erroe404';
 
import Profile from "./pages/Profile";
// LEVEL2
import { useContext } from "react";
import ThemeContext from "./context/ThemeContext";
import Signin from './pages/Singin';
import Signup from './pages/Signup';
import EditTask from './pages/Edit-Task/editTask';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error404 />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },


  {
    path: "/signup",
    element: <Signup />,
  },



  {
    path: "/about",
    element: <About />,
  },

 
  {
    path: "/profile",
    element: <Profile />,
  },

  {
    path: "/editTask/:Id",
    element: <EditTask />,
  },
]);

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${theme}`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
