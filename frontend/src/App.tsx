import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Editor } from "./editor";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Editor />,
    },
    {
      path: "/viewer",
      element: <></>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
