import { Children } from "react";
import AdminLayout from "./AdminLayout/AdminLayout";
import Login from '../pages/Login/Login';
const LoginRoute = {
path : "/",
children: [
{
    index: true,
    element: <Login/>
}
]
};
export default LoginRoute;