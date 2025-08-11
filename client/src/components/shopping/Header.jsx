import {
  House,
  LogOut,
  Menu,
  ShoppingCart,
  Snowflake,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config/formControl";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { DropdownMenuContent } from "../ui/dropdown-menu";
import { logoutUser } from "@/features/auth/authSlice";
import { toast } from "sonner";
import CartWrapper from "./cartWrapper";
import { fetchCartItems } from "@/features/shop/cartSlice";
import { Label } from "../ui/label";

const MenuItems = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleNavigate = (currentMenuItem) => {
    sessionStorage.removeItem("filters");
    const currentFilter =
      currentMenuItem.id !== "home" &&
      currentMenuItem.id !== "products" &&
      currentMenuItem.id !== "search"
        ? { category: [currentMenuItem.id] }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(new URLSearchParams(`?category=${currentMenuItem.id}`))
      : navigate(currentMenuItem.path);
  };

  return (
    <nav className="flex-col flex mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          key={menuItem.id}
          className=" cursor-pointer text-sm font-semibold"
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
};

const HeaderRightContent = () => {
  const { user } = useSelector((state) => state.auth.user);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  return (
    <div className="flex lg:items-center lg:flex-row gap-4">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className={`top-0 right-0 rounded-full bg-red-500 px-1 text-[11px] text-white ${cartItems?.items?.length === 0 ? "hidden": "absolute"}`} >{cartItems?.items?.length}</span>
          <span className="sr-only">user cart</span>
        </Button>
        <CartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItem={cartItems && cartItems.items && cartItems.items}
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-semibold">
              {user?.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="right" className="px-3 py-3 w-56">
          <DropdownMenuLabel>Logged in as {user?.username}</DropdownMenuLabel>
          <DropdownMenuSeparator className="h-2" />
          <DropdownMenuItem
            onClick={() => navigate("/shop/account")}
            className="flex items-center border-t py-2 cursor-pointer hover:bg-gray-100 px-2 ease-in transition-all"
          >
            <User className="mr-2 w-4 h-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator className="h-2" />
          <DropdownMenuItem
            onClick={handleLogout}
            className="flex items-center border-t py-2 cursor-pointer hover:bg-gray-100 px-2 ease-in transition-all"
          >
            <LogOut className="mr-2 w-4 h-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ShoppingHeader = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <Snowflake className="h-6 w-6" />
          <span className="font-semibold ">Ecommerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs py-3 px-5  ">
            <HeaderRightContent />
            <MenuItems />
          </SheetContent>
        </Sheet>

        <div className="hidden lg:block ">
          <MenuItems />
        </div>

        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
