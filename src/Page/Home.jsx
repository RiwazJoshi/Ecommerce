import axios from "axios"
import { useState } from "react"
import { useEffect, useContext } from "react"
import { Link, Route, useNavigate } from "react-router-dom"
import RoleComponent from "../Components/RoleComponent"
import ReactPaginate from 'react-paginate';
import { CartContext } from "../App"

let Home = (props) => {
  const cart_context = useContext(CartContext)
  let navigate = useNavigate()
  const [products, setProducts] = useState([])
  // const [cart_items, setCartItems] = useState([])
  const [pagination_info, setPaginationInfo] = useState(
    {
      total: 0,
      per_page: 25,
      page: 1
    }
  )
  let fetchProducts = () => {

    axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}products?search_term=${props.search_items}&page=${pagination_info?.page}`)
      .then(res => {
        // console.log(res);
        setProducts(res.data.data[0].data)
        setPaginationInfo(res.data.data[0].metadata[0])
      })
  }
  useEffect(() => {
    fetchProducts()
  }, [props.search_items, pagination_info?.page])

  let handleAddToCart = (product) => {
    console.log("Add To Cart");
    if (cart_context.cart_items.find(cart_item => cart_context.cart_items._id === product._id)) {
      // setCartItems([...cart_items, product])
      let temp = [...cart_context.cart_items].map(el => {
        if (el._id == product._id) {
          return {
            ...el,
            quantity: el.quantity + 1
          }
        }
        else {
          return el
        }
      })
      cart_context.setCartItems(temp)
    }
    else {
      cart_context.setCartItems([
        ...cart_context.cart_items, {
          ...product,
          quantity: 1
        }
      ])
    }
    {
      props.login_status == false ? navigate("/Login") : navigate("/")
    }
    // if(props.login_status !== true)  {

    //   navigate("/Login")
    // }
  }
  function handleDeleteProduct(id) {
    axios.delete("https://ecommerce-sagartmg2.vercel.app/api/products/" + id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Token-")
      }
    })
      .then(res => {
       
          fetchProducts()
          // <div class="alert alert-danger" role="alert">
          //   Item has been Deleted
          // </div>
         
      })
      .catch(err => {

      })
  }
  return (
    <>

      <div className="row">

        {
          products.map(product => {
            return (
              <div className="col-md-3 my-3" key={product._id}>
                <Link to={`/products/${product._id}`}>
                  <div className="card" >

                    {

                      product.images.length == 0 ?
                        <img src={require("../Assests/Images/no-image.jpg")} />
                        :
                        < img src={product.images[0]} className="card-img-top" alt="..."
                          style={
                            {
                              height: "200px"
                            }
                          } />
                    }

                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">${product.price}</p>
                      <RoleComponent role="buyer" user={props.user}>
                        <button className="btn btn-primary" onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product)
                        }} >Add to cart</button>
                      </RoleComponent>
                      <RoleComponent role="seller" user={props.user}>
                        <Link to={`products/edit/${product._id}`}> <button className="btn btn-secondary" onClick={(e) => {

                          handleAddToCart(product)
                        }}> Edit</button></Link>
                        <button className="btn btn-danger mx-2" onClick={(e) => {
                          e.preventDefault();
                          handleDeleteProduct(product._id)
                        }} >Delete</button>
                      </RoleComponent>

                    </div>
                  </div>
                </Link>
              </div>

            )
          })
        }
      </div>

      <div className="row">
        {products.length > 0
          &&
          <div className="react-paginate-wrapper">
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={(e) => {
                console.log(e)
                setPaginationInfo({
                  ...pagination_info,
                  page: e.selected + 1
                })
              }}
              pageRangeDisplayed={5}
              pageCount={Math.ceil(pagination_info.total / pagination_info.per_page)}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
            />
          </div>
        }
      </div>

    </>
  )
}
export default Home