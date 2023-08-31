import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import HomePages from "./Pages/HomePages/HomePages";
import Main from "./Layouts/Main";
import AboutUs from "./Pages/AboutUs/AboutUs";
import ServicesPage from "./Pages/ServicesPage/ServicesPage";
import ContactUs from "./Pages/ContactUs/ContactUs";
import ErrorPages from "./Pages/ErrorPages/ErrorPages";
import { createContext } from "react";
import useFetch from "./Hooks/useFetch";
export const servcontext = createContext();
function App() {
  const { data } = useFetch(`${process.env.REACT_APP_URL}/services`);
  const projectss = useFetch(`${process.env.REACT_APP_URL}/projects`);
  const blogss = useFetch(`${process.env.REACT_APP_URL}/blogs`);
  const blogs = blogss?.data;
  const projects = projectss?.data;
  const alldata = { data, projects, blogs };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          element: <HomePages></HomePages>,
        },
        {
          path: "/home",
          element: <HomePages></HomePages>,
        },
        {
          path: "/aboutus",
          element: <AboutUs></AboutUs>,
        },
        {
          path: "/services",
          element: <ServicesPage></ServicesPage>,
        },
        {
          path: "/contactus",
          element: <ContactUs></ContactUs>,
        },
        {
          path: "*",
          element: <ErrorPages></ErrorPages>,
        },
      ],
    },
  ]);

  return (
    <servcontext.Provider value={alldata}>
      <div className="App-container">
        <RouterProvider router={router} />
      </div>
    </servcontext.Provider>
  );
}

export default App;
