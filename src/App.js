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
import ServicesDetails from "./Pages/ServicesDetails/ServicesDetails";
import ProjectDetails from "./Pages/ProjectDetails/ProjectDetails";
import ProjectPages from "./Pages/ProjectsPages/ProjectPages";
import BlogPages from "./Pages/BlogPages/BlogPages";
import ShopPages from "./Pages/ShopPages/ShopPages";
import SignupPages from "./Pages/SignupPages/SignupPages";
import LoginPages from "./Pages/LoginPages/LoginPages";
export const servcontext = createContext();
function App() {
  const { data } = useFetch(`${process.env.REACT_APP_URL}/services`);
  const projectss = useFetch(`${process.env.REACT_APP_URL}/projects`);
  const blogss = useFetch(`${process.env.REACT_APP_URL}/blogs`);
  const memberss = useFetch(`${process.env.REACT_APP_URL}/members`);
  const blogs = blogss?.data;
  const projects = projectss?.data;
  const member = memberss?.data;
  const alldata = { data, projects, blogs, member };
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
          path: `/serviceDetails/:id`,
          loader: async ({ params }) => {
            return fetch(
              `${process.env.REACT_APP_URL}/serviceDetails/${params.id}`
            );
          },
          element: <ServicesDetails></ServicesDetails>,
        },
        {
          path: "/projects",
          element: <ProjectPages></ProjectPages>,
        },
        {
          path: `/projectDetails/:id`,
          loader: async ({ params }) => {
            return fetch(
              `${process.env.REACT_APP_URL}/projectDetails/${params.id}`
            );
          },
          element: <ProjectDetails></ProjectDetails>,
        },
        {
          path: "/shop",
          element: <ShopPages></ShopPages>,
        },
        {
          path: "/blog",
          element: <BlogPages></BlogPages>,
        },

        {
          path: "/contactus",
          element: <ContactUs></ContactUs>,
        },
        {
          path: "/SignUp",
          element: <SignupPages></SignupPages>,
        },
        {
          path: "/Login",
          element: <LoginPages></LoginPages>,
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
