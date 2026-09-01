import { BrowserRouter, matchPath, Route, Routes, useLocation } from 'react-router-dom';
import './App.css'
import ScrollToTop from './components/common/scrollToTop';
import { ToastContainer } from 'react-toastify';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import Navbar from './components/layouts/navbar';
import Footer from './components/layouts/Footer';
import Products from './pages/Products';
import ProductDetailPage from './components/features/products/productDetail';
import Contact from './pages/Contact';
import LoginPage from './components/layouts/login';
import SignupPage from './components/layouts/Signup';
import Profile from './pages/profile';
import WishlistPage from './pages/Wishlist';
import CartPage from './pages/Cart';
import ManageAddress from './pages/Address';
import ReturnPolicySection from './pages/ReturnPolicy';
import PrivatePolicySection from './pages/PrivatePolicy';
import FAQPage from './pages/FAQ';
import OrderPage from './pages/order';
import Detail from './components/features/order/Detail';
import Checkout from "./components/features/checkOut/checkout"
import TrackOrder from './components/features/order/trackOrder';
import ReturnOrderDetail from './components/features/order/returnOrderDetail';
import ForgetPassword from './pages/forgetPassword';
import ResetPassword from "./pages/resetPassword";
import Aboutus from "./pages/Aboutus"
import Gallery from "./pages/Gallery"
import Bulkorder from './pages/Bulkorder';
import Blog from './pages/Blog';
import BlogDetails from './pages/blogDetails';
import { pageTransitionVariants } from './components/common/motion';
import WhatsAppButton from './components/common/whatsappButton'; 
import VerifyOtpPage from './components/layouts/verifyOtp';

function PageFrame({ children }) {
  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

function AppLayout() {
const location = useLocation();
const hideLayoutPaths = ["/signup", "/login","/verify-otp"];

const hideLayout = hideLayoutPaths.some((path) =>
    path.includes(":")
      ? matchPath({ path, end: false }, location.pathname)
      : location.pathname === path
  );

  const withPageMotion = (element) => <PageFrame>{element}</PageFrame>;

  return (
    <>
      {!hideLayout && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={withPageMotion(<Home />)} />     
            <Route path="/productpage" element={withPageMotion(<Products/>)} /> 
            <Route path="/contactpage" element={withPageMotion(<Contact/>)} />
            <Route path="/productdetail/:id" element={withPageMotion(<ProductDetailPage/>)} />
            <Route path="/login" element={withPageMotion(<LoginPage />)} />
            <Route path="/signup" element={withPageMotion(<SignupPage />)} />
            <Route path="/profilepage" element={withPageMotion(<Profile />)} />
            <Route path="/wishlistpage" element={withPageMotion(<WishlistPage />)} />
            <Route path="/cartpage" element={withPageMotion(<CartPage />)} />
            <Route path="/manageaddress" element={withPageMotion(<ManageAddress />)} />
            <Route path="/returnpolicy" element={withPageMotion(<ReturnPolicySection />)} />
            <Route path="/privatepolicy" element={withPageMotion(<PrivatePolicySection />)} />
            <Route path="/faqpage" element={withPageMotion(<FAQPage />)} />
            <Route path="/orderpage" element={withPageMotion(<OrderPage />)} />
            <Route path="/orderdetail/:id" element={withPageMotion(<Detail />)} />
            <Route path="/checkout" element={withPageMotion(<Checkout />)} />
            <Route path="/ordertrack/:id" element={withPageMotion(<TrackOrder />)} />
            <Route path="/return-order-detail/:id" element={withPageMotion(<ReturnOrderDetail />)} />
            <Route path="/forgetpassword" element={withPageMotion(<ForgetPassword />)} />
            <Route path="/reset-password/:token" element={withPageMotion(<ResetPassword />)} />
            <Route path="/aboutus" element={withPageMotion(<Aboutus/>)} />
            <Route path="/gallery" element={withPageMotion(<Gallery/>)} />
            <Route path="/bulkorder" element={withPageMotion(<Bulkorder/>)} />
            <Route path="/blog" element={withPageMotion(<Blog/>)} />
            <Route path="/blog/:id" element={withPageMotion(<BlogDetails/>)} />
            <Route path="/verify-otp" element={<VerifyOtpPage />} />
        </Routes>
        <WhatsAppButton />
      </AnimatePresence>
      {!hideLayout && <Footer />}
     
    </>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />        
        <AppLayout/>
        <ToastContainer 
          position="top-right" 
          autoClose={3000} 
          theme="light"
          style={{ fontSize: '16px', minHeight: '60px' }}/>
      </BrowserRouter>
    </div>
  )
}

export default App
