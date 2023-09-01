import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AppProvider } from "./context/app/app-context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppProvider>
    <App />
  </AppProvider>
);
