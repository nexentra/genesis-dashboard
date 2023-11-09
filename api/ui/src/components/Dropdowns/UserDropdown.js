import { createPopper } from "@popperjs/core";
import { Link } from "react-router-dom";
import AuthService from "../../components/services/auth.services";
import { data } from "autoprefixer";
import React,{useState, useEffect } from "react";
import axios from 'axios';
import { useAlert } from 'react-alert'
const API_URL = process.env.NODE_ENV === "production" ? "/api/" : "http://localhost:8080/api/";

const UserDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const [userdata, setUserData] = useState({});
  const alert = useAlert()
  useEffect(() => {
    axios.get(API_URL + 'users/'+localStorage.getItem('userid'))
      .then((response) => {
        // alert.success("Lets goooo!!")
        setUserData(response.data);
        
      })
      .catch((error) => {
        alert.error(error.response.data.error)
      });
  }, []);
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="text-blueGray-500 block"
        href=""
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >

        <div className="items-center flex rounded-full shadow ">
          <span className="w-12 h-12 text-sm text-white bg-white inline-flex items-center justify-center rounded-full ">
            <img
              alt=""
              className="w-full rounded-full align-middle border-none"
              src={userdata.profile_icon}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src="/main.png"
              }}
            />
          </span>
        </div>
        
        
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <li className="items-center">
                <Link
                  className={
                    "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"}            
                  to="/profile"
                >
                  <i className="fas fa-user-circle text-blueGray-400 mr-2 text-sm"></i>{" "}
                  Profile Page
                </Link>
              </li>
              <Link
                  className={
                    "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"} 
                  to="/admin/settings"
                >
                  <i
                    className={
                      "fas fa-tools mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/settings") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Settings
                </Link>
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <button
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={AuthService.logout}
        ><i
        className={
          "fas fa-power-off mr-2 text-sm "
        }
      ></i>
          Logout
        </button>
      </div>
    </>
  );
};

export default UserDropdown;
