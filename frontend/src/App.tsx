import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <></>,
    },
    {
      path: "/editor",
      element: <></>,
    },
    {
      path: "/viewer",
      element: <></>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
