import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./core/i18n"; //import i18n file for translate the webapp

function App() {
  return <RouterProvider router={router} />;
}

export default App;
