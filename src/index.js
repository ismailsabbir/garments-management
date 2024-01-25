import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import UserContext from "./Context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
const queryclient = new QueryClient();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryclient}>
      <UserContext>
        {" "}
        <App />
      </UserContext>
    </QueryClientProvider>
  </React.StrictMode>
);
reportWebVitals();
