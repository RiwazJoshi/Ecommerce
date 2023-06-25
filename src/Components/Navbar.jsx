import React, { useState } from "react";
import { Link } from "react-router-dom";


let Navbar = ({ login_status, setLoginStatus, search_items, setSearchItems, user }) => {
  let handleSubmitLogout = () => {
    localStorage.removeItem("Token-")
    setLoginStatus("false")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          {/* <a className="navbar-brand" href="#">Navbar</a> */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>

              {
                !login_status
                  ?
                  <>
                    <li className="nav-item">
                      <Link className="nav-link active" aria-current="page" to="./Login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active" aria-current="page" to="./Signup">Signup</Link>
                    </li>
                  </>
                  : <>
                    {user?.role == "buyer"
                      &&
                      <>
                        <li className="nav-item">
                          <Link className="nav-link active" aria-current="page" to="./Cart">Cart</Link>
                        </li>
                      </>
                    }
                    {
                      user?.role == "seller"
                      &&
                      <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="./products/Create">Create Products</Link>
                      </li>
                    }
                  </>

              }
            </ul>
            <form className="d-flex">
              <input className="form-control me-2"
                value={search_items}
                onChange={(e) => {
                  setSearchItems(e.target.value)
                }} type="search" placeholder="Search" aria-label="Search" />
              {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
              {login_status && <button
                style={{ height: "40px", width: "130px", margin: "5px" }}
                onClick={handleSubmitLogout} className="btn btn-outline-success" type="submit">Log-out</button>}
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}
export default Navbar