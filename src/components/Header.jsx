import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";

import "./css/header.css";
import { useItemValue } from "./context/itemContext";
import { auth } from "../firebase";

function Header() {
  const [{ cart, user }] = useItemValue();

  const showSearchBar = useMediaQuery("(min-width:724px)");

  const handleAuth = () => {
    if (user) auth.signOut();
  };

  return (
    <>
      <div className="header">
        <div className="header__left">
          <div className="header__menuIconContainer">
            <MenuIcon className="header__menuIcon" />
          </div>
          <Link to="/">
            <img
              src={require("./images/amazon.png")}
              alt="Amazon"
              className="header__logo"
            />
          </Link>
        </div>

        {showSearchBar && (
          <div className="header__search">
            <div className="header__search__filter">
              All
              <ArrowDropDownIcon className="header__right__downIcon" />
            </div>
            <input type="text" />
            <SearchIcon className="header__searchIcon" />
          </div>
        )}

        <div className="header__right">
          <Link to={!user && "/login"}>
            <div className="header__right__option">
              <p>
                Hello {!user && "Guest"}
                {user?.email.slice(0, -10)},
              </p>
              <div className="header__right__downText">
                <p onClick={handleAuth}>{!user ? "Sign in" : "Sign out"}</p>
                <ArrowDropDownIcon className="header__right__downIcon" />
              </div>
            </div>
          </Link>
          <Link to="/orders">
            <div className="header__right__option removed">
              <p>Returns</p>
              <div className="header__right__downText">
                <p>& Orders</p>
              </div>
            </div>
          </Link>
          <div className="header__right__option removed">
            <div className="header__right__downText mt-3">
              <p>Try Prime</p>
              <ArrowDropDownIcon className="header__right__downIcon" />
            </div>
          </div>
          <div className="header__right__option mr-2">
            <div className="header__right__downText">
              <Link to="/checkout">
                <AddShoppingCartIcon className="header__right__cart" />
              </Link>
              <p className="mt-3">Cart</p>
              <p className="header__right__total">{cart?.length}</p>
            </div>
          </div>
        </div>
      </div>
      {!showSearchBar && (
        <div className="header__searchContainer">
          <div className="header__search">
            <div className="header__search__filter">
              All
              <ArrowDropDownIcon className="header__right__downIcon" />
            </div>
            <input type="text" />
            <SearchIcon className="header__searchIcon" />
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
