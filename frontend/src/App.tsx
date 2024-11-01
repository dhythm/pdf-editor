import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Editor } from "./editor";
import { FormAndViewer } from "./form-and-viewer";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Editor />,
    },
    {
      path: "/form-and-viewer",
      element: <FormAndViewer />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
