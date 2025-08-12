import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import AuthLayout from "./components/auth/layout.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import AdminLayout from "./components/admin/layout.jsx";
import AdminDashboard from "./pages/admin/Dashboard.jsx";
import AdminOrders from "./pages/admin/Orders.jsx";
import AdminFeatures from "./pages/admin/Features.jsx";
import AdminProducts from "./pages/admin/Products.jsx";
import ShoppingLayout from "./components/shopping/Layout.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";
import ShoppingHome from "./pages/shopping/Home.jsx";
import ShoppingAccount from "./pages/shopping/Account.jsx";
import ShoppingListing from "./pages/shopping/Listing.jsx";
import ShoppingCheckout from "./pages/shopping/Checkout.jsx";
import UnAuthorized from "./pages/unAuthorized/unAuthorized.jsx";
import CheckAuth from "./components/common/CheckAuth.jsx";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./features/auth/authSlice.js";
import { LoaderOne } from "@/components/ui/loader.jsx";
import PaypalReturn from "./pages/shopping/PaypalReturn.jsx";
import PaymentSuccess from "./pages/shopping/PaymentSuccess.jsx";
import SearchProducts from "./pages/shopping/Search.jsx";

function App() {

  const { isAuthenticated, user, isLoading } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  if (isLoading) return (
    <div className="w-full h-screen flex items-center justify-center">
      <LoaderOne />
    </div>
  );

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* <h1>Header components</h1> */}

      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            </CheckAuth>
          }
        />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>

        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="paypal-return" element={<PaypalReturn />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>

        <Route path="/unAuthorized" element={<UnAuthorized />}></Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
