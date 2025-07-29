import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import AuthLayout from "./components/auth/layout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AdminLayout from "./components/admin/layout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminOrders from "./pages/admin/Orders";
import AdminFeatures from "./pages/admin/Features";
import AdminProducts from "./pages/admin/Products";
import ShoppingLayout from "./components/shopping/Layout";
import NotFound from "./pages/notFound/NotFound";
import ShoppingHome from "./pages/shopping/Home";
import ShoppingAccount from "./pages/shopping/Account";
import ShoppingListing from "./pages/shopping/Listing";
import ShoppingCheckout from "./pages/shopping/Checkout";
import UnAuthorized from "./pages/unAuthorized/unAuthorized";
import CheckAuth from "./components/common/CheckAuth";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./features/auth/authSlice";
import { LoaderOne } from "@/components/ui/loader";

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
        </Route>

        <Route path="/unAuthorized" element={<UnAuthorized />}></Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
