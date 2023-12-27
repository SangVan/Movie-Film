import { createBrowserHistory } from "history";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";

// import { Router, Switch } from "react-router";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Detail from "./pages/Detail/Detail";
import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import Checkout from "./pages/Checkout/Checkout";
import {Suspense,lazy} from 'react'
import { UserTemplate } from "./templates/UserTemplate/UserTemplate";
import {Router, Switch } from "react-router-dom";

import Profiles from "./pages/Profile/Profiles";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Films from "./pages/Admin/Films/Films";
import Users from "./pages/Admin/Users/Users";
import Showtime from "./pages/Admin/Showtime/Showtime";
import AddNew from "./pages/Admin/Films/AddNew/AddNew";
import Edit from "./pages/Admin/Films/Edit/Edit";
import AddUser from "./pages/Admin/Users/AddUser";
import EditUser from "./pages/Admin/Users/EditUser";



// const CheckoutTemplateLaZy = lazy(()=> import('./templates/CheckoutTemplate/CheckoutTemplate'));

export const history = createBrowserHistory();
function App() {
  return (
    <Router history={history}>
      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/contact" exact Component={Contact} />
        <HomeTemplate path="/news" exact Component={News} />
        <HomeTemplate path="/detail/:id" exact Component={Detail} />
        <HomeTemplate path="/profiles" exact Component={Profiles} />
    
        <CheckoutTemplate  path="/checkout/:id" exact Component={Checkout} />

        <UserTemplate path="/login" exact Component={Login} />
        <UserTemplate path="/register" exact Component={Register} />
        
        {/* <Suspense fallback={<h1>LOADING...</h1>}>
            <CheckoutTemplateLaZy path="/checkout/:id" exact Component={Checkout} />
        </Suspense> */}
        <AdminTemplate path="/admin" exact Component={Users} />
        <AdminTemplate path="/admin/films" exact Component={Films} />
        <AdminTemplate path="/admin/films/addnew" exact Component={AddNew} />
        <AdminTemplate path="/admin/films/edit/:id" exact Component={Edit} />
        <AdminTemplate path="/admin/users" exact Component={Users} />
        <AdminTemplate path="/admin/users/addnew" exact Component={AddUser} />
        <AdminTemplate path="/admin/users/edit/:tk" exact Component={EditUser}/>

        <AdminTemplate path="/admin/films/showtime/:id/:tenphim" exact Component={Showtime}/>
        <HomeTemplate path="/" exact Component={Home} />
      </Switch>
    </Router>
  );
}

export default App;

