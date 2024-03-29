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
import DashbordAddStaff from "./Components/DashbordComponents/DashbordAddStaff/DashbordAddStaff";
import DashbordEditStaff from "./Components/DashbordComponents/DashbordEditStaff/DashbordEditStaff";
import AdminRoutes from "./Routes/AdminRoutes/AdminRoutes";
import DashbordProductView from "./Components/DashbordComponents/DashbordProductView/DashbordProductView";
import DashbordProductEdit from "./Components/DashbordComponents/DashbordProductEdit/DashbordProductEdit";
import DashbordAddProduct from "./Components/DashbordComponents/DashbordAddProduct/DashbordAddProduct";
import DashbordCategoryView from "./Components/DashbordComponents/DashbordCategoryView/DashbordCategoryView";
import DashbordCategoryEdit from "./Components/DashbordComponents/DashbordCategoryEdit/DashbordCategoryEdit";
import DashbordAddCategory from "./Components/DashbordComponents/DashbordAddCategory/DashbordAddCategory";
import DashbordCustomProductEdit from "./Components/DashbordComponents/DashbordCustomProductEdit/DashbordCustomProductEdit";
import DashbordCustomProductAdd from "./Components/DashbordComponents/DashbordCustomProductAdd/DashbordCustomProductAdd";
import DashbordCutomProductView from "./Components/DashbordComponents/DashbordCutomProductView/DashbordCutomProductView";
import DashbordCustomizedCategoryView from "./Components/DashbordComponents/DashbordCustomizedCategoryView/DashbordCustomizedCategoryView";
import DashbordCustomizedCategoryEdit from "./Components/DashbordComponents/DashbordCustomizedCategoryEdit/DashbordCustomizedCategoryEdit";
import DashbordOrdersInvoise from "./Components/DashbordComponents/DashbordOrdersInvoise/DashbordOrdersInvoise";
import DashbordCustomizedOrdersInvoice from "./Components/DashbordComponents/DashbordCustomizedOrdersInvoice/DashbordCustomizedOrdersInvoice";
import EmployeeLayouts from "./Layouts/EmployeeLayouts/EmployeeLayouts";
import EmployeeHome from "./Components/EmployeeComponents/EmployeeHome/EmployeeHome";
import EmployeeLogin from "./Components/EmployeeComponents/EmployeeLogin/EmployeeLogin";
import EmployeeSignup from "./Components/EmployeeComponents/EmployeeSignup/EmployeeSignup";
import EmployeeRoutes from "./Routes/EmployeeRoutes/EmployeeRoutes";
import EmployeePrivetRoutes from "./Routes/EmployeePrivetRoutes";
import EmployeeAttendance from "./Components/EmployeeComponents/EmployeeAttendance/EmployeeAttendance";
import EmployeeLeaves from "./Components/EmployeeComponents/EmployeeLeaves/EmployeeLeaves";
import EmployeeSetting from "./Components/EmployeeComponents/EmployeeSetting/EmployeeSetting";
import DashbordAttendance from "./Components/DashbordComponents/DashbordAttendance/DashbordAttendance";
import ManagerRoutes from "./Routes/ManagerRoutes/ManagerRoutes";
import EmployeeTakeAttendance from "./Components/EmployeeComponents/EmployeeTakeAttendance/EmployeeTakeAttendance";
import DashbordTodayAttendance from "./Components/DashbordComponents/DashbordTodayAttendance/DashbordTodayAttendance";
import DashbordAttendanceSheet from "./Components/DashbordComponents/DashbordAttendanceSheet/DashbordAttendanceSheet";
import DashbordEmployeeAttendance from "./Components/DashbordComponents/DashbordEmployeeAttendance/DashbordEmployeeAttendance";
import DashbordEmployeeAttendanceEdit from "./Components/DashbordComponents/DashbordEmployeeAttendanceEdit/DashbordEmployeeAttendanceEdit";
import DashbordEmployeeSalaryMake from "./Components/DashbordComponents/DashbordEmployeeSalaryMake/DashbordEmployeeSalaryMake";
import DashbordEmployeeSalaryAdd from "./Components/DashbordComponents/DashbordEmployeeSalaryAdd/DashbordEmployeeSalaryAdd";
import DashbordEmployeeSalaryInvoice from "./Components/DashbordComponents/DashbordEmployeeSalaryInvoice/DashbordEmployeeSalaryInvoice";
import DashbordAddCustomer from "./Components/DashbordAddCustomer/DashbordAddCustomer";
import PremiumCustomerSignup from "./Pages/PremiumCustomerSignup/PremiumCustomerSignup";
import PremiumCustomerLogin from "./Pages/PremiumCustomerLogin/PremiumCustomerLogin";
import EmployeeLeavesRequest from "./Components/EmployeeComponents/EmployeeLeavesRequest/EmployeeLeavesRequest";
import EmployeeLeavesRequestEdit from "./Components/EmployeeComponents/EmployeeLeavesRequestEdit/EmployeeLeavesRequestEdit";
import DashbordLeaveManage from "./Components/DashbordComponents/DashbordLeaveManage/DashbordLeaveManage";
import DashbordLeaveResponse from "./Components/DashbordComponents/DashbordLeaveResponse/DashbordLeaveResponse";
import DashbordMission from "./Components/DashbordComponents/DashbordMission/DashbordMission";
import DashbordVission from "./Components/DashbordComponents/DashbordVission/DashbordVission";
import DashbordVissionEdit from "./Components/DashbordComponents/DashbordVissionEdit/DashbordVissionEdit";
import DashbordAddVission from "./Components/DashbordComponents/DashbordAddVission/DashbordAddVission";
import DashbordMissionAdd from "./Components/DashbordComponents/DashbordMissionAdd/DashbordMissionAdd";
import DashbordMissionEdit from "./Components/DashbordComponents/DashbordMissionEdit/DashbordMissionEdit";
import DashbordServicsContent from "./Components/DashbordComponents/DashbordServicsContent/DashbordServicsContent";
import DashbordServicsContentAdd from "./Components/DashbordComponents/DashbordServicsContentAdd/DashbordServicsContentAdd";
import DashbordServiceContentView from "./Components/DashbordComponents/DashbordServiceContentView/DashbordServiceContentView";
import DashbordPartnership from "./Components/DashbordComponents/DashbordPartnership/DashbordPartnership";
import DashbordPartnershipAdd from "./Components/DashbordComponents/DashbordPartnershipAdd/DashbordPartnershipAdd";
import DashbordProject from "./Components/DashbordComponents/DashbordProject/DashbordProject";
import DashbordProjectAdd from "./Components/DashbordComponents/DashbordProjectAdd/DashbordProjectAdd";
import DashbordProjectEdit from "./Components/DashbordComponents/DashbordProjectEdit/DashbordProjectEdit";
import DashbordProjectView from "./Components/DashbordComponents/DashbordProjectView/DashbordProjectView";
import BlogDetailsPage from "./Pages/BlogDetailsPage/BlogDetailsPage";
import DashbordBlogs from "./Components/DashbordComponents/DashbordBlogs/DashbordBlogs";
import DashbordBlogsAdd from "./Components/DashbordComponents/DashbordBlogsAdd/DashbordBlogsAdd";
import DashbordBlogsEdit from "./Components/DashbordComponents/DashbordBlogsEdit/DashbordBlogsEdit";
import DashbordBlogsView from "./Components/DashbordComponents/DashbordBlogsView/DashbordBlogsView";
import DashbordEditCustomer from "./Components/DashbordComponents/DashbordEditCustomer/DashbordEditCustomer";
import EmployeeMyAttendances from "./Components/EmployeeComponents/EmployeeMyAttendances/EmployeeMyAttendances";
import EmployeeMySalary from "./Components/EmployeeComponents/EmployeeMySalary/EmployeeMySalary";
import EmployeeSalaryMake from "./Components/EmployeeComponents/EmployeeSalaryMake/EmployeeSalaryMake";
import EmployeeStaff from "./Components/EmployeeComponents/EmployeeStaff/EmployeeStaff";
import MyCustomizedCancel from "./Components/AccountComponents/MyCustomizedCancel/MyCustomizedCancel";
export const servcontext = createContext();
function App() {
  const { data } = useFetch(`${process.env.REACT_APP_URL}/services`);
  const projectss = useFetch(`${process.env.REACT_APP_URL}/projects`);
  const blogss = useFetch(`${process.env.REACT_APP_URL}/blogs`);
  const memberss = useFetch(`${process.env.REACT_APP_URL}/members`);
  const categorys = useFetch(`${process.env.REACT_APP_URL}/project-category`);
  const shopcategorys = useFetch(`${process.env.REACT_APP_URL}/shopcategory`);
  const shopproducts = useFetch(`${process.env.REACT_APP_URL}/shopproduct`);
  const missionss = useFetch(`${process.env.REACT_APP_URL}/missions`);
  const vissionss = useFetch(`${process.env.REACT_APP_URL}/vissions`);

  const shopproduct = shopproducts?.data;
  const shopcategory = shopcategorys?.data;
  const blogs = blogss?.data;
  const projects = projectss?.data;
  const member = memberss?.data;
  const category = categorys.data;
  const missions = missionss?.data;
  const vissions = vissionss?.data;
  const alldata = {
    data,
    projects,
    blogs,
    member,
    category,
    shopcategory,
    shopproduct,
    missions,
    vissions,
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
          path: "/blog/details",
          element: <BlogDetailsPage></BlogDetailsPage>,
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
          path: `/shop-product/:id`,
          element: <ShopProducts></ShopProducts>,
        },
        {
          path: `/shop-details/:categoryid/:id`,
          element: <ShopProductDetails></ShopProductDetails>,
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
          path: "/premium/customer/signup",
          element: <PremiumCustomerSignup></PremiumCustomerSignup>,
        },
        {
          path: "/premium/customer/login",
          element: <PremiumCustomerLogin></PremiumCustomerLogin>,
        },
        {
          path: "/Login",
          element: <LoginPages></LoginPages>,
        },
        {
          path: "/employee/Login",
          element: <EmployeeLogin></EmployeeLogin>,
        },
        {
          path: "/employee/signup",
          element: <EmployeeSignup></EmployeeSignup>,
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
          path: "/manage_account/customized/cancelorder",
          element: (
            <PrivetRoutes>
              <MyCustomizedCancel></MyCustomizedCancel>
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
            <AdminRoutes>
              <DashbordHome></DashbordHome>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/attendance",
          element: (
            <AdminRoutes>
              <DashbordAttendance></DashbordAttendance>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/today/attendance",
          element: (
            <AdminRoutes>
              <DashbordTodayAttendance></DashbordTodayAttendance>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/sheet/attendance",
          element: (
            <AdminRoutes>
              <DashbordAttendanceSheet></DashbordAttendanceSheet>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/employee/attendance",
          element: (
            <AdminRoutes>
              <DashbordEmployeeAttendance></DashbordEmployeeAttendance>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/employee/attendance/edit",
          element: (
            <AdminRoutes>
              <DashbordEmployeeAttendanceEdit></DashbordEmployeeAttendanceEdit>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/employee/salary/make",
          element: (
            <AdminRoutes>
              <DashbordEmployeeSalaryMake></DashbordEmployeeSalaryMake>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/employee/salary/add",
          element: (
            <AdminRoutes>
              <DashbordEmployeeSalaryAdd></DashbordEmployeeSalaryAdd>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/employee/salary/invoice",
          element: (
            <AdminRoutes>
              <DashbordEmployeeSalaryInvoice></DashbordEmployeeSalaryInvoice>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/shop-product",
          element: (
            <AdminRoutes>
              <DashbordShopProducts></DashbordShopProducts>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/shop-product-add",
          element: (
            <AdminRoutes>
              <DashbordAddProduct></DashbordAddProduct>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/shop-product-edit",
          element: (
            <AdminRoutes>
              <DashbordProductEdit></DashbordProductEdit>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/shop-product-view",
          element: (
            <AdminRoutes>
              <DashbordProductView></DashbordProductView>
            </AdminRoutes>
          ),
        },

        {
          path: "/dashbord/custom-product-add",
          element: (
            <AdminRoutes>
              <DashbordCustomProductAdd></DashbordCustomProductAdd>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/custom-product-edit",
          element: (
            <AdminRoutes>
              <DashbordCustomProductEdit></DashbordCustomProductEdit>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/custom-product-view",
          element: (
            <AdminRoutes>
              <DashbordCutomProductView></DashbordCutomProductView>
            </AdminRoutes>
          ),
        },

        {
          path: "/dashbord/shop-category",
          element: (
            <AdminRoutes>
              <DashbordShopCategory></DashbordShopCategory>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/shop-category-add",
          element: (
            <AdminRoutes>
              <DashbordAddCategory></DashbordAddCategory>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/shop-category-view",
          element: (
            <AdminRoutes>
              <DashbordCategoryView></DashbordCategoryView>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/shop-category-edit",
          element: (
            <AdminRoutes>
              <DashbordCategoryEdit></DashbordCategoryEdit>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/customized-product",
          element: (
            <AdminRoutes>
              <DashbordCustomizedProduct></DashbordCustomizedProduct>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/customized-category",
          element: (
            <AdminRoutes>
              <DashbordCustomizedCategory></DashbordCustomizedCategory>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/customized-category-view",
          element: (
            <AdminRoutes>
              <DashbordCustomizedCategoryView></DashbordCustomizedCategoryView>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/customized-category-edit",
          element: (
            <AdminRoutes>
              <DashbordCustomizedCategoryEdit></DashbordCustomizedCategoryEdit>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/orders",
          element: (
            <AdminRoutes>
              <DashbordOrders></DashbordOrders>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/orders/invoice",
          element: (
            <AdminRoutes>
              <DashbordOrdersInvoise></DashbordOrdersInvoise>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/customized/orders/invoice",
          element: (
            <AdminRoutes>
              <DashbordCustomizedOrdersInvoice></DashbordCustomizedOrdersInvoice>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/customized-orders",
          element: (
            <AdminRoutes>
              <DashbordCustomizedOrders></DashbordCustomizedOrders>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/customers",
          element: (
            <AdminRoutes>
              <DashbordCustomers></DashbordCustomers>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/customers/edit",
          element: (
            <AdminRoutes>
              <DashbordEditCustomer></DashbordEditCustomer>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/staff",
          element: (
            <AdminRoutes>
              <DashbordStaffs></DashbordStaffs>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/staff/add-staff",
          element: (
            <AdminRoutes>
              <DashbordAddStaff></DashbordAddStaff>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/employee/leaves",
          element: (
            <AdminRoutes>
              <DashbordLeaveManage></DashbordLeaveManage>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/employee/leaves/response",
          element: (
            <AdminRoutes>
              <DashbordLeaveResponse></DashbordLeaveResponse>
            </AdminRoutes>
          ),
        },

        {
          path: "/dashbord/customers/add-customer",
          element: (
            <AdminRoutes>
              <DashbordAddCustomer></DashbordAddCustomer>
            </AdminRoutes>
          ),
        },

        {
          path: "/dashbord/staff/edit-staff",
          element: (
            <AdminRoutes>
              <DashbordEditStaff></DashbordEditStaff>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/missions",
          element: (
            <AdminRoutes>
              <DashbordMission></DashbordMission>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/vissions",
          element: (
            <AdminRoutes>
              <DashbordVission></DashbordVission>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/vissions/edit",
          element: (
            <AdminRoutes>
              <DashbordVissionEdit></DashbordVissionEdit>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/vissions/add",
          element: (
            <AdminRoutes>
              <DashbordAddVission></DashbordAddVission>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/missions/add",
          element: (
            <AdminRoutes>
              <DashbordMissionAdd></DashbordMissionAdd>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/missions/edit",
          element: (
            <AdminRoutes>
              <DashbordMissionEdit></DashbordMissionEdit>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/services/content",
          element: (
            <AdminRoutes>
              <DashbordServicsContent></DashbordServicsContent>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/services/content/view",
          element: (
            <AdminRoutes>
              <DashbordServiceContentView></DashbordServiceContentView>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/services/content/add",
          element: (
            <AdminRoutes>
              <DashbordServicsContentAdd></DashbordServicsContentAdd>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/partnership",
          element: (
            <AdminRoutes>
              <DashbordPartnership></DashbordPartnership>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/partnership/add",
          element: (
            <AdminRoutes>
              <DashbordPartnershipAdd></DashbordPartnershipAdd>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/project/content",
          element: (
            <AdminRoutes>
              <DashbordProject></DashbordProject>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/project/content/add",
          element: (
            <AdminRoutes>
              <DashbordProjectAdd></DashbordProjectAdd>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/project/content/edit",
          element: (
            <AdminRoutes>
              <DashbordProjectEdit></DashbordProjectEdit>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/project/content/view",
          element: (
            <AdminRoutes>
              <DashbordProjectView></DashbordProjectView>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/blog/content",
          element: (
            <AdminRoutes>
              <DashbordBlogs></DashbordBlogs>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/blog/content/add",
          element: (
            <AdminRoutes>
              <DashbordBlogsAdd></DashbordBlogsAdd>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/blog/content/edit",
          element: (
            <AdminRoutes>
              <DashbordBlogsEdit></DashbordBlogsEdit>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/blog/content/view",
          element: (
            <AdminRoutes>
              <DashbordBlogsView></DashbordBlogsView>
            </AdminRoutes>
          ),
        },

        {
          path: "/dashbord/setting",
          element: (
            <AdminRoutes>
              <DashbordSeeting></DashbordSeeting>
            </AdminRoutes>
          ),
        },
        {
          path: "/dashbord/comming-soon",
          element: (
            <AdminRoutes>
              <DashbordCommingPage></DashbordCommingPage>
            </AdminRoutes>
          ),
        },
      ],
    },

    {
      path: "/employee",
      element: (
        <>
          <EmployeePrivetRoutes>
            <EmployeeLayouts></EmployeeLayouts>
            <ScrollToTop />
          </EmployeePrivetRoutes>
        </>
      ),
      children: [
        {
          path: "/employee/",
          element: (
            <EmployeeRoutes>
              <EmployeeHome></EmployeeHome>
            </EmployeeRoutes>
          ),
        },
        {
          path: "/employee/attendance",
          element: (
            <ManagerRoutes>
              <EmployeeAttendance></EmployeeAttendance>
            </ManagerRoutes>
          ),
        },
        {
          path: "/employee/my/attendance",
          element: (
            <EmployeeRoutes>
              <EmployeeMyAttendances></EmployeeMyAttendances>
            </EmployeeRoutes>
          ),
        },
        {
          path: "/employee/my/salary",
          element: (
            <EmployeeRoutes>
              <EmployeeMySalary></EmployeeMySalary>
            </EmployeeRoutes>
          ),
        },
        {
          path: "/employee/take_attendance/attendance",
          element: (
            <ManagerRoutes>
              <EmployeeTakeAttendance></EmployeeTakeAttendance>
            </ManagerRoutes>
          ),
        },
        {
          path: "/employee/today/attendance",
          element: (
            <ManagerRoutes>
              <DashbordTodayAttendance></DashbordTodayAttendance>
            </ManagerRoutes>
          ),
        },
        {
          path: "/employee/sheet/attendance",
          element: (
            <ManagerRoutes>
              <DashbordAttendanceSheet></DashbordAttendanceSheet>
            </ManagerRoutes>
          ),
        },
        {
          path: "/employee/salary/make",
          element: (
            <ManagerRoutes>
              <EmployeeSalaryMake></EmployeeSalaryMake>
            </ManagerRoutes>
          ),
        },
        {
          path: "/employee/staff",
          element: (
            <ManagerRoutes>
              <EmployeeStaff></EmployeeStaff>
            </ManagerRoutes>
          ),
        },
        {
          path: "/employee/leaves",
          element: (
            <EmployeeRoutes>
              <EmployeeLeaves></EmployeeLeaves>
            </EmployeeRoutes>
          ),
        },
        {
          path: "/employee/leaves/request",
          element: (
            <EmployeeRoutes>
              <EmployeeLeavesRequest></EmployeeLeavesRequest>
            </EmployeeRoutes>
          ),
        },
        {
          path: "/employee/leaves/request/edit",
          element: (
            <EmployeeRoutes>
              <EmployeeLeavesRequestEdit></EmployeeLeavesRequestEdit>
            </EmployeeRoutes>
          ),
        },
        {
          path: "/employee/setting",
          element: (
            <EmployeeRoutes>
              <EmployeeSetting></EmployeeSetting>
            </EmployeeRoutes>
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
