import React from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";
let Signup = () => {

  let navigate = useNavigate()
  const [is_submitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  })
  const [data, setData] = useState({
    name: "Ram",
    email: "ekeawh@gfs.com",
    password: "",
    role: "",
  })

  let handleSubmit = (e) => {
    e.preventDefault()
    let data = {
      "name": e.target.Name.value,
      "email": e.target.Email.value,
      "password": e.target.Password.value,
      "role": e.target.Role.value
    }
    setIsSubmitting(true)
    let handleData = (e) => {
      //  name :  setData({...data ,name:e.target.value})
    }
    // let url = "https://ecommerce-sagartmg2.vercel.app/api/users/signup"
    let url = (`${process.env.REACT_APP_SERVER_DOMAIN}users/signup`)
    axios.post(url, data)
      .then(res => {
        console.log(res);
        navigate("/Login")
      })
      .catch(err => {
        setIsSubmitting(false)
        let temp = {}
        console.log(err);
        err.response.data.errors.forEach(validation_error => {
          console.log("frhdsakjn");
          temp[validation_error["params"]] = validation_error.msg
        })
        console.log(err);
        setError(temp)
      })

  }
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="Name" class="form-label">Name</label>
            <input type="text" class="form-control" value={data.name} /*onChange={handleData}*/

              name="Name" aria-describedby="emailHelp" />
            {
              error.name
              &&
              <small style={{ color: "red" }}>{error.find(el => el.param == "name").msg}</small>

            }
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" value={data.email} onChange={(e) => {
              setData({ email: e.target.value })
            }}
              name="Email" aria-describedby="emailHelp" />
            {
              error.email
              &&
              <small style={{ color: "red" }}>{error.find(el => el.param == "email").msg}</small>
            }
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" name="Password" />
            {
              error.password
              &&
              <small style={{ color: "red" }}>{error.find(el => el.param == "password").msg}</small>

            }
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Role</label>
            <select class="form-select form-select-lg mb-3" name="Role" aria-label=".form-select-lg example">
              <option selected>Open this select menu</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary" disabled={is_submitting}>
            {
              is_submitting ? "Submiting" : "Submit"
            }
          </button>
        </form>
      </div>
    </>
  )
}
export default Signup

