import { House, Menu, ShoppingCart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config/formControl";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { DropdownMenuContent } from "../ui/dropdown-menu";

const MenuItems = () => {
  return (
    <nav className="flex-col flex mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Link
          key={menuItem.id}
          to={menuItem.path}
          className="text-sm font-semibold"
        >
          {menuItem.label}
        </Link>
      ))}
    </nav>
  );
};

const HeaderRightContent = () => {

  const { user } = useSelector(state => state.auth)
  console.log(user)

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Button variant="outline" size="icon">
        <ShoppingCart className="w-6 h-6" />
        <span className="sr-only">user cart</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-semibold">
              {/* {user?.username[0].toUpperCase()} */}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel></DropdownMenuLabel>
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
          <House className="h-6 w-6" />
          <span className="font-semibold ">Ecommerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs ">
            <MenuItems />
          </SheetContent>
        </Sheet>

        <div className="hidden lg:block ">
          <MenuItems />
        </div>

        {isAuthenticated ? (
          <div>
            <HeaderRightContent />
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default ShoppingHeader;
