import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { history } from '../../../../App';
// import { history } from '../../../../App';
import _ from 'lodash'
import { TOKEN, USER_LOGIN } from '../../../../util/settings/config';
import {
  BarChartOutlined,
  DownOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Dropdown } from "antd";
import { OPEN_MODAL_USER } from '../../../../redux/actions/types/QuanLyNguoiDungType';
export default function Header(props) {

  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
  console.log(userLogin);
  const dispatch = useDispatch();
  const menu = (
    <Menu>
      <Menu.Item>
        {/* <UserOutlined  /> */}
        <button onClick={() => {
            dispatch({
              type: OPEN_MODAL_USER,
            });
          }}>
          <UserOutlined  /> Cá nhân
        </button>
      </Menu.Item>

      {userLogin.maLoaiNguoiDung === "QuanTri" ? (
        <Menu.Item>
          <NavLink to="/admin" className="flex items-center p-2 hover:text-yellow-400 text-white">
            <BarChartOutlined />
            Quản Trị
          </NavLink>
        </Menu.Item>
      ) : (
        ""
      )}

      <Menu.Item>
        {/* <LogoutOutlined /> */}
        <button
          onClick={() => {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN);
            window.location.reload();
          }}
        >
           <LogoutOutlined /> Đăng xuất
        </button>
      </Menu.Item>
    </Menu>
  );
  const renderLogin = () => {
    if (_.isEmpty(userLogin)) {
      return <Fragment>
        <button onClick={() => {
          history.push('/login');
        }} class="self-center px-8 py-3 rounded">Sign in</button>

        <button onClick={() => {
          history.push('/register')
        }}
          class="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Sign up</button>
      </Fragment>
    }

    return  <Dropdown overlay={menu}>
      <button class="self-center px-8 py-3 rounded">Hello {userLogin.taiKhoan} <DownOutlined className="text-sm" /> </button>
       {/* <button onClick={() => {  localStorage.removeItem(USER_LOGIN);  localStorage.removeItem(TOKEN);  history.push('/home');
                    window.location.reload() }}>
                    Đăng xuất
                </button> */}
    </Dropdown> 
  }
  return (
    <header class="p-4 dark:bg-gray-800 dark:text-gray-100 bg-opacity-40 bg-black text-white fixed w-full z-10 h-15">
      <div class="container flex justify-between h-10 mx-auto">
        <NavLink to="/" rel="noopener noreferrer" href="#" aria-label="Back to homepage" class="flex items-center p-2">
            {/* <img src="./images/logo.png" style={{ width: 140 }} alt="logo" /> */}
            <img src="https://movie.zalopay.vn/images/tix.svg"  style={{ width: 40,height:40 }} alt="" />
            
        </NavLink>
        {/* <ul class="items-stretch hidden space-x-3 lg:flex">
          <li class="flex">
            <NavLink to="/home" className="flex items-center px-4 -mb-1  dark:border-transparent
             dark:text-violet-400 dark:border-violet-400 text-white" activeClassName='border-b-2 border-white'>Home</NavLink>
          </li>
          <li class="flex">
            <NavLink to="/contact" href="#" className="flex items-center
             px-4 -mb-1 dark:border-transparent text-white"  activeClassName='border-b-2 border-white'>Contact</NavLink>
          </li>
          <li class="flex">
            <NavLink to="/news" href="#" className="flex items-center
             px-4 -mb-1 dark:border-transparent text-white"  activeClassName='border-b-2 border-white'>News</NavLink>
          </li>

        </ul> */}
        <div class="items-center flex-shrink-0 hidden lg:flex">
          {renderLogin()}

        </div>
        <button class="p-4 lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 dark:text-gray-100">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </header>

  );

}


