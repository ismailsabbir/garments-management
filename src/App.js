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
import PaymentFailed from "./Pages/PaymentFailed/PaymentFailed";
import MyCustomizedOrders from "./Pages/MyCustomizedOrders/MyCustomizedOrders";
import AccountsLayouts from "./Layouts/AccountsLayouts";
import MyAccountsManage from "./Components/AccountComponents/MyAccountsManage/MyAccountsManage";
import ShopPaymentSucessPage from "./Components/ShopComponents/ShopPaymentSucessPage/ShopPaymentSucessPage";
import ShopBkashSucess from "./Components/ShopComponents/ShopBkashSucess/ShopBkashSucess";
import ShopBkashFailed from "./Components/ShopComponents/ShopBkashFailed/ShopBkashFailed";
import CartCheckoutPages from "./Pages/CartCheckoutPages/CartCheckoutPages";
import CartPaymentPages from "./Pages/CartPaymentPages/CartPaymentPages";
import CartPaymentSucessPage from "./Pages/CartPaymentSucessPage/CartPaymentSucessPage";
import CartPaymentFailed from "./Pages/CartPaymentFailed/CartPaymentFailed";
import PersonalInformationEdit from "./Components/AccountComponents/PersonalInformationEdit/PersonalInformationEdit";
import MyProfile from "./Components/AccountComponents/MyProfile/MyProfile";
import MyAddress from "./Components/AccountComponents/MyAddress/MyAddress";
import MyAddressEdit from "./Components/AccountComponents/MyAddressEdit/MyAddressEdit";
import MyordersComponents from "./Components/MyOrdersComponents/MyordersComponents";
import MyWishlistPages from "./Components/AccountComponents/MyWishlistPages/MyWishlistPages";
import MycartPages from "./Components/AccountComponents/MycartPages/MycartPages";
import MyReviewsPages from "./Components/AccountComponents/MyReviewsPages/MyReviewsPages";
import MyCancellOrderPage from "./Components/AccountComponents/MyCancellOrderPage/MyCancellOrderPage";
import AccountCheckoutPages from "./Components/AccountComponents/AccountCheckoutPages/AccountCheckoutPages";
import ScrollToTop from "./Hooks/ScrollToTop";
import ManageOrderPage from "./Components/AccountComponents/ManageOrderPage/ManageOrderPage";
import DashbordLayouts from "./Layouts/DashbordLayouts/DashbordLayouts";
import { Elements } from "@stripe/react-stripe-js";
import DashbordHome from "./Components/DashbordComponents/DashbordHome/DashbordHome";
import DashbordShopProducts from "./Components/DashbordComponents/DashbordShopProducts/DashbordShopProducts";
import DashbordShopCategory from "./Components/DashbordComponents/DashbordShopCategory/DashbordShopCategory";
import DashbordCustomizedProduct from "./Components/DashbordComponents/DashbordCustomizedProduct/DashbordCustomizedProduct";
import DashbordCustomizedCategory from "./Components/DashbordComponents/DashbordCustomizedCategory/DashbordCustomizedCategory";
import DashbordOrders from "./Components/DashbordComponents/DashbordOrders/DashbordOrders";
import DashbordCustomers from "./Components/DashbordComponents/DashbordCustomers/DashbordCustomers";
import DashbordStaffs from "./Components/DashbordComponents/DashbordStaffs/DashbordStaffs";
import DashbordSeeting from "./Components/DashbordComponents/DashbordSeeting/DashbordSeeting";
import DashbordCommingPage from "./Components/DashbordComponents/DashbordCommingPage/DashbordCommingPage";
import DashbordCustomizedOrders from "./Components/DashbordComponents/DashbordCustomizedOrders/DashbordCustomizedOrders";
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
      element: (
        <>
          <Main></Main> <ScrollToTop />
        </>
      ),
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
          path: "/payment/failed",
          element: (
            <PrivetRoutes>
              <PaymentFailed></PaymentFailed>
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
          path: "/cartproductpayment",
          element: (
            <PrivetRoutes>
              <CartPaymentPages></CartPaymentPages>
            </PrivetRoutes>
          ),
        },
        {
          path: "/shop_payment_sucess",
          element: (
            <PrivetRoutes>
              <ShopPaymentSucessPage></ShopPaymentSucessPage>
            </PrivetRoutes>
          ),
        },
        {
          path: "/cart_payment_sucess",
          element: (
            <PrivetRoutes>
              <CartPaymentSucessPage></CartPaymentSucessPage>
            </PrivetRoutes>
          ),
        },
        {
          path: "/product/payment/sucess",
          element: <ShopBkashSucess></ShopBkashSucess>,
        },
        {
          path: "/product/payment/failed",
          element: <ShopBkashFailed></ShopBkashFailed>,
        },
        {
          path: "/cart/payment/failed",
          element: (
            <PrivetRoutes>
              <CartPaymentFailed></CartPaymentFailed>
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
          path: "/checkout",
          element: (
            <PrivetRoutes>
              <CheckOutPages></CheckOutPages>
            </PrivetRoutes>
          ),
        },
        {
          path: "/cart-checkout",
          element: (
            <PrivetRoutes>
              <CartCheckoutPages></CartCheckoutPages>
            </PrivetRoutes>
          ),
        },
        {
          path: "/account-checkout",
          element: (
            <PrivetRoutes>
              <AccountCheckoutPages></AccountCheckoutPages>
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
    {
      path: "/manage_account",
      element: (
        <PrivetRoutes>
          <>
            <ScrollToTop></ScrollToTop>
            <AccountsLayouts></AccountsLayouts>
          </>
        </PrivetRoutes>
      ),
      children: [
        {
          path: "/manage_account",
          element: <MyAccountsManage></MyAccountsManage>,
        },
        {
          path: "/manage_account/customized_orders",
          element: (
            <PrivetRoutes>
              <MyCustomizedOrders></MyCustomizedOrders>
            </PrivetRoutes>
          ),
        },
        {
          path: "/manage_account/shop_orders",
          element: (
            <PrivetRoutes>
              <MyordersComponents></MyordersComponents>
            </PrivetRoutes>
          ),
        },
        {
          path: "/manage_account/order/manage",
          element: (
            <PrivetRoutes>
              <ManageOrderPage></ManageOrderPage>
            </PrivetRoutes>
          ),
        },
        {
          path: "/manage_account/wishlist",
          element: (
            <PrivetRoutes>
              <MyWishlistPages></MyWishlistPages>
            </PrivetRoutes>
          ),
        },
        {
          path: "/manage_account/cartproduct",
          element: (
            <PrivetRoutes>
              <MycartPages></MycartPages>
            </PrivetRoutes>
          ),
        },
        {
          path: "/manage_account/review",
          element: (
            <PrivetRoutes>
              <MyReviewsPages></MyReviewsPages>
            </PrivetRoutes>
          ),
        },
        {
          path: "/manage_account/cancelorder",
          element: (
            <PrivetRoutes>
              <MyCancellOrderPage></MyCancellOrderPage>
            </PrivetRoutes>
          ),
        },
        {
          path: "/manage_account/personal_information",
          element: (
            <PrivetRoutes>
              <PersonalInformationEdit></PersonalInformationEdit>
            </PrivetRoutes>
          ),
        },
        {
          path: "/manage_account/my-profile",
          element: (
            <PrivetRoutes>
              <MyProfile></MyProfile>
            </PrivetRoutes>
          ),
        },
        {
          path: "/manage_account/address-book",
          element: (
            <PrivetRoutes>
              <MyAddress></MyAddress>
            </PrivetRoutes>
          ),
        },
        {
          path: "/manage_account/address-edit",
          element: (
            <PrivetRoutes>
              <MyAddressEdit></MyAddressEdit>
            </PrivetRoutes>
          ),
        },
      ],
    },
    {
      path: "/dashbord",
      element: (
        <PrivetRoutes>
          <>
            {" "}
            <DashbordLayouts></DashbordLayouts>
            <ScrollToTop />
          </>
        </PrivetRoutes>
      ),
      children: [
        {
          path: "/dashbord/",
          element: (
            <PrivetRoutes>
              <DashbordHome></DashbordHome>
            </PrivetRoutes>
          ),
        },
        {
          path: "/dashbord/shop-product",
          element: (
            <PrivetRoutes>
              <DashbordShopProducts></DashbordShopProducts>
            </PrivetRoutes>
          ),
        },
        {
          path: "/dashbord/shop-category",
          element: (
            <PrivetRoutes>
              <DashbordShopCategory></DashbordShopCategory>
            </PrivetRoutes>
          ),
        },
        {
          path: "/dashbord/customized-product",
          element: (
            <PrivetRoutes>
              <DashbordCustomizedProduct></DashbordCustomizedProduct>
            </PrivetRoutes>
          ),
        },
        {
          path: "/dashbord/customized-category",
          element: (
            <PrivetRoutes>
              <DashbordCustomizedCategory></DashbordCustomizedCategory>
            </PrivetRoutes>
          ),
        },
        {
          path: "/dashbord/orders",
          element: (
            <PrivetRoutes>
              <DashbordOrders></DashbordOrders>
            </PrivetRoutes>
          ),
        },
        {
          path: "/dashbord/customized-orders",
          element: (
            <PrivetRoutes>
              <DashbordCustomizedOrders></DashbordCustomizedOrders>
            </PrivetRoutes>
          ),
        },
        {
          path: "/dashbord/customers",
          element: (
            <PrivetRoutes>
              <DashbordCustomers></DashbordCustomers>
            </PrivetRoutes>
          ),
        },
        {
          path: "/dashbord/staff",
          element: (
            <PrivetRoutes>
              <DashbordStaffs></DashbordStaffs>
            </PrivetRoutes>
          ),
        },
        {
          path: "/dashbord/setting",
          element: (
            <PrivetRoutes>
              <DashbordSeeting></DashbordSeeting>
            </PrivetRoutes>
          ),
        },
        {
          path: "/dashbord/comming-soon",
          element: (
            <PrivetRoutes>
              <DashbordCommingPage></DashbordCommingPage>
            </PrivetRoutes>
          ),
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
