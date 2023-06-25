import React, { useContext, useState, createContext } from 'react';
import { useEffect } from 'react';
import {
  BrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import axios from 'axios';
import ProtectedRoute from './Components/ProtectedRoute';
import logo from './logo.svg';
import './App.css';
import Home from './Page/Home';
import Login from './Page/Login';
import Signup from './Page/Signup';
import Navbar from './Components/Navbar';
import Cart from './Page/Cart';
import Show from './Page/Product/Show';
import Upsert from './Page/Product/Create';
export const CartContext = createContext()
function App() {
  const [data_fetch, setDataFetch] = useState(false)
  const [login_status, setLoginStatus] = useState(false)
  const [search_items, setSearchItems] = useState("")
  const [user, setUser] = useState(null)
  const [cart_items, setCartItems] = useState([])
  useEffect(() => {
    if (localStorage.getItem("Token-")) {
      axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}users/get-user`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token-")}`
          }
        })

        .then(res => {
          setLoginStatus(true)
          setUser(res.data)
          setDataFetch(true)
        })
        .catch(err => {

        })
    }
    else {
      setDataFetch(true)
    }
  }, [])
  if (!data_fetch) {
    return (
      <><center>
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div></center>
      </>
    )
  }
  return (
    <>
      <div>
        <CartContext.Provider value={{
          cart_items,
          setCartItems
        }}>
          <BrowserRouter>
            <Navbar user={user} login_status={login_status} setLoginStatus={setLoginStatus} search_items={search_items} setSearchItems={setSearchItems} />
            <Routes>
              <Route path='Login' element={<Login setLoginStatus={setLoginStatus} setUser={setUser} />}></Route>
              <Route path='Signup' element={<Signup />} ></Route>
              <Route path='Create' element={<Upsert />} ></Route>
              <Route path='products'>
                <Route path='edit/:id' element={<Upsert />}></Route>
                <Route path=':id' element={<Show />}></Route>
                <Route path='create' element={<Upsert />}></Route>
              </Route>
              <Route path="/" element={<Home login_status={login_status} user={user} search_items={search_items} />} ></Route>
              <Route path="" user={user} element={<ProtectedRoute login_status={login_status} />}>
                <Route path="Cart" element={<Cart />}> </Route>
              </Route>

            </Routes>

          </BrowserRouter>
        </CartContext.Provider>
      </div>
    </>
  );
}

export default App;
