import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import AddProduct from "../../DashboardData/AddProduct";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/auth";

const Navbar = () => {
  const [addProduct, setAddProduct] = useState(null);

  // ✅ CHANGE THIS
  const [search, setSearch] = useState("");

  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cartSlice);
  const { favoriteData } = useSelector((state) => state.favoriteSlice);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignin = () => {
    navigate("/signup");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  function handleAddProduct() {
    setAddProduct(true);
  }

  function handleOpenCart() {
    navigate("/cart");
  }

  function handleOpenWishList() {
    navigate("/favorite");
  }

  // ✅ SEARCH FUNCTION
  function handleSearch(e) {
    setSearch(e.target.value);

    // redirect to search page
    navigate(`/search?query=${e.target.value}`);
  }

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo" onClick={() => navigate("/")}></div>

      <div className="menu-wrapper">
        <div className="menu-toggle">☰</div>

        {/* Menu */}
        <ul className="nav-links">
          <li>
            <a href="#" onClick={() => navigate("/")}>
              Home
            </a>
          </li>

          <li>
            <a href="#" onClick={() => navigate("/allproducts")}>
              Shop
            </a>
          </li>

          <li>
            <a href="#" onClick={() => navigate("/allproducts")}>
              New Arrivals
            </a>
          </li>

          <li>
            <a href="#" onClick={() => navigate("/allproducts")}>
              Brands
            </a>
          </li>

          {!auth && (
            <li className="mobile-auth">
              <button className="btn" onClick={handleLogin}>
                Login
              </button>

              <button className="btn" onClick={handleSignin}>
                Register
              </button>
            </li>
          )}
          {auth && (
            <li className="mobile-auth">
              <button className="btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Right Section */}
      <div className="nav-right">
        {/* Search */}
        <div className="search-box">
          <input
            type="text"
            name="search"
            value={search}
            onChange={handleSearch}
            placeholder="Search..."
          />

          <span className="material-symbols-outlined icon">
            search
          </span>
        </div>

        <div className="cart-wishlist">
          {auth && (
            <>
              <span className="cart-icon">
                <span
                  className="material-symbols-outlined cart-icon"
                  onClick={handleOpenCart}
                >
                  shopping_cart
                </span>

                <span className="nav-count">
                  {cartItems.length ?? "0"}
                </span>
              </span>

              <span className="cart-icon">
                <span
                  className="material-symbols-outlined cart-icon"
                  onClick={handleOpenWishList}
                >
                  favorite
                </span>

                <span className="nav-count">
                  {favoriteData.length ?? "0"}
                </span>
              </span>
            </>
          )}

          {/* Profile */}
          {auth && (
            <div className="profile-container">
              <div className="profile-wrapper">
                <div className="profile-icon">
                  <span className="material-symbols-outlined cart-icon">
                    account_circle
                  </span>
                </div>

                <div className="dropdown">
                  <button onClick={handleAddProduct}>
                    Add Product
                  </button>

                  <button onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;