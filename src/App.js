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
import Customizedpages from "./Pages/Customizedpages/Customizedpages";
import CustomizedDetailsPage from "./Pages/CustomizedDetailsPage/CustomizedDetailsPage";
import OrderConfirmPages from "./Pages/OrderConfirmPages/OrderConfirmPages";
import PaymentPages from "./Pages/PaymentPages/PaymentPages";
import PrivetRoutes from "./Routes/PrivetRoutes";
import ShopProducts from "./Components/ShopComponents/ShopProducts/ShopProducts";
import ShopProductDetails from "./Components/ShopComponents/ShopProductDetails/ShopProductDetails";
import CheckOutPages from "./Components/ShopComponents/CheckOutPages/CheckOutPages";
import ShopPaymentPages from "./Components/ShopComponents/ShopPaymentPages/ShopPaymentPages";
import CartProductsPages from "./Pages/CartProductsPages/CartProductsPages";
import WishListProductPage from "./Pages/WishListProductPage/WishListProductPage";
import PaymentSucessPage from "./Pages/PaymentSucessPage/PaymentSucessPage";
export const servcontext = createContext();
function App() {
  const { data } = useFetch(`${process.env.REACT_APP_URL}/services`);
  const projectss = useFetch(`${process.env.REACT_APP_URL}/projects`);
  const blogss = useFetch(`${process.env.REACT_APP_URL}/blogs`);
  const memberss = useFetch(`${process.env.REACT_APP_URL}/members`);
  const categorys = useFetch(`${process.env.REACT_APP_URL}/project-category`);
  const shopcategorys = useFetch(`${process.env.REACT_APP_URL}/shopcategory`);
  const shopproducts = useFetch(`${process.env.REACT_APP_URL}/shopproduct`);

  const shopproduct = shopproducts?.data;
  const shopcategory = shopcategorys?.data;
  const blogs = blogss?.data;
  const projects = projectss?.data;
  const member = memberss?.data;
  const category = categorys.data;

  const alldata = {
    data,
    projects,
    blogs,
    member,
    category,
    shopcategory,
    shopproduct,
  };

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
          path: "/order-confirm",
          element: (
            <PrivetRoutes>
              <OrderConfirmPages></OrderConfirmPages>
            </PrivetRoutes>
          ),
        },
        {
          path: "/payment",
          element: (
            <PrivetRoutes>
              {" "}
              <PaymentPages></PaymentPages>
            </PrivetRoutes>
          ),
        },
        {
          path: "/payment/sucess",
          element: (
            <PrivetRoutes>
              <PaymentSucessPage></PaymentSucessPage>
            </PrivetRoutes>
          ),
        },
        {
          path: "/shop",
          element: <ShopPages></ShopPages>,
        },
        {
          path: "/shoppayment",
          element: (
            <PrivetRoutes>
              <ShopPaymentPages></ShopPaymentPages>
            </PrivetRoutes>
          ),
        },
        {
          path: `/cartproduct`,
          element: (
            <PrivetRoutes>
              <CartProductsPages></CartProductsPages>
            </PrivetRoutes>
          ),
        },
        {
          path: `/wishlistproduct`,
          element: (
            <PrivetRoutes>
              <WishListProductPage></WishListProductPage>
            </PrivetRoutes>
          ),
        },
        {
          path: `/shop-product/:id`,
          element: <ShopProducts></ShopProducts>,
        },
        {
          path: `/shop-details/:categoryid/:id`,
          element: <ShopProductDetails></ShopProductDetails>,
        },
        {
          path: `/checkout`,
          element: (
            <PrivetRoutes>
              <CheckOutPages></CheckOutPages>
            </PrivetRoutes>
          ),
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
          path: "/make-project",
          element: <Customizedpages></Customizedpages>,
        },
        {
          path: `/customized-details/:id`,
          loader: async ({ params }) => {
            return fetch(
              `${process.env.REACT_APP_URL}/customized-details/${params.id}`
            );
          },
          element: <CustomizedDetailsPage></CustomizedDetailsPage>,
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
