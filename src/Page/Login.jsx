import React from "react"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
let Login = (props) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("b@b.com")
  const [password, setPasswors] = useState("password")
  let handleSubmit = (e) => {
    e.preventDefault()
    let data = {
      "email": e.target.Email.value,
      "password": e.target.Password.value
    }
    // let url = "https://ecommerce-sagartmg2.vercel.app/api/users/login"
    let url = (`${process.env.REACT_APP_SERVER_DOMAIN}users/login`)
    axios.post(url, data)

      .then(res => {
        props.setLoginStatus(true)
        console.log("success")
        localStorage.setItem("Token-", res.data.access_token)
        console.log(res.data);
        axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}users/get-user`, {
          headers: {
            Authorization: `Bearer ${res.data.access_token}`
          }
        })
          .then(user_res => {
            props.setUser(user_res.data)
          })
        navigate("/")
      })
      .catch(err => {
        console.log("failed");
      })
  }


  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" value={"s@s.com"} name="Email" aria-describedby="emailHelp" />
            <div class="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" value={"password"} name="Password" />
          </div>
          <button onSubmit={handleSubmit} type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}
export default Login