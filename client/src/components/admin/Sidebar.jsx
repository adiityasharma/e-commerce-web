import {
  BaggageClaim,
  LayoutDashboard,
  Settings,
  ShoppingBasket,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard size={22} />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket size={22} />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BaggageClaim size={22} />,
  },
];

const MeneItems = ({ setOpen }) => {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex-col flex gap-2 ">
      {adminSidebarMenuItems.map((menuItems) => (
        <div
          onClick={() => {
            navigate(menuItems.path);
            setOpen ? setOpen(false) : null;
          }}
          key={menuItems.id}
          className="flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer text-sm font-semibold hover:bg-gray-100"
        >
          {menuItems?.icon}
          <span>{menuItems.label}</span>
        </div>
      ))}
    </nav>
  );
};

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <SheetHeader className="border-b">
            <SheetTitle className="flex items-center gap-2 text-lg font-semibold">
              <Settings />
              Admin Panel
            </SheetTitle>
          </SheetHeader>
          <MeneItems setOpen={setOpen} />
        </SheetContent>
      </Sheet>

      <aside className="hidden flex-col  w-64 border-r bg-background p-6 lg:flex  ">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Settings />
          <h1 className="text-lg font-semibold ">Admin Panel</h1>
        </div>
        <MeneItems />
      </aside>
    </>
  );
};

export default AdminSidebar;
