import React from "react";
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

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <h1>Header components</h1>

      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
        </Route>

        <Route path="/admin" element={<AdminLayout/>}>
          <Route path="dashboard" element={<AdminDashboard/>}/>
          <Route path="orders" element={<AdminOrders/>}/>
          <Route path="features" element={<AdminFeatures/>}/>
          <Route path="products" element={<AdminProducts/>}/>
        </Route>

        <Route path="/shop" element={<ShoppingLayout/>} >
          
        </Route>

        <Route path="*" element={<NotFound/>} ></Route>

      </Routes>
    </div>
  );
}

export default App;
