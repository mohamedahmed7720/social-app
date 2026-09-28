import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import CounterContextProvider from "./Context/CounterContext.tsx";
import AuthContextProvider from "./Context/AuthContext.tsx";
import UserContextProvider from "./Context/UserContext.tsx";

console.log(import.meta.env);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CounterContextProvider>
      <AuthContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </AuthContextProvider>
    </CounterContextProvider>
  </StrictMode>,
);
