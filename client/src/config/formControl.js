export const RegisterFormControl = [
  {
    name: "username",
    label: "Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text"
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email"
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password"
  },
]
export const LoginFormControl = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email"
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password"
  },
]

export const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard"
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products"
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders"
  },
]