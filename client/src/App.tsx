import { useRoutes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  const routes = useRoutes([
    {
      path: "/Register",
      element: <Register />,
    },
    {
      path: "/Login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Home />,
    },
  ]);
  return (
    <>
      <div>{routes}</div>
    </>
  );
}

export default App;
