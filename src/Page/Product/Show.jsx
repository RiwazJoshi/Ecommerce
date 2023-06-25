import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Show() {
    const [products, setProducts] = useState({})
    const { id } = useParams()
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}products/${id}`)
            .then(res => {
                setProducts(res.data.data)
            })
    }, [])
    return (
        <div>
            <div className='row'>
                <div className='col-md-6'>
                    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="..." class="d-block w-100" alt="..." />
                            </div>
                            <div class="carousel-item">
                                <img src="..." class="d-block w-100" alt="..." />
                            </div>
                            <div class="carousel-item">
                                <img src="..." class="d-block w-100" alt="..." />
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className='col-md-6'>
                    <h1>  {products.name}</h1>
                    <h2>  ${products.price}</h2>

                </div>
            </div>

        </div>
    )
}
