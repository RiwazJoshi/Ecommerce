import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
export default function Create() {
    const [product, setProduct] = useState()
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}products/${id}`)
                .then(res => {
                    setProduct(res.data.data)
                })
        }
    }, [])
    let handleSubmit = (e) => {
        e.preventDefault()


        let form_data = new FormData();
        form_data.append("name", e.target.name.value)
        form_data.append("price", e.target.price.value)
        let temp = [...e.target.images.files]
        temp.forEach(image => {
            form_data.append("images", image)

        })
        // product.images.forEach(image => {
        //     form_data.append("images", image)

        // })
        e.preventDefault();
        let method = "post"
        let url = (`${process.env.REACT_APP_SERVER_DOMAIN}products`)
        if (id) {
            method = "put"
            url = (`${process.env.REACT_APP_SERVER_DOMAIN}products/${id}`)
        }
        axios[method](url, form_data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("Token-")}`
            }
        })
            .then(res => {
                // alert("success")
                <div class="alert alert-success" role="alert">
                    Product has been listed
                </div>
            })
    }
    let handleChange = (e) => {
        if (e.target.type == "file") {

            setProduct({ ...product, [e.target.name]: [...product.images, ...e.target.files] })
        }
        else {

            setProduct({ ...product, [e.target.name]: e.target.value })
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>

                <div class="mb-3">
                    <label for class="form-label">Name</label>
                    <input type="text" class="form-control" name='name' value={product?.name} onChange={handleChange} id="exampleInputEmail1" aria-describedby="emailHelp " required />
                </div>
                <div class="mb-3">
                    <label for class="form-label">Price</label>
                    <input type="number" class="form-control" name='price' value={product?.price} onChange={handleChange} id="exampleInputEmail1" aria-describedby="emailHelp" required />
                </div>
                <div class="mb-3">
                    <label for class="form-label">Images</label>
                    <div>
                        {
                            product?.images?.map(image => {
                                let src = image;
                                if (typeof (image) != "string") {
                                    src = URL.createObjectURL(image)
                                }
                                return (
                                    <img src={image} height="100" width="100" />)
                            })
                        }
                    </div>
                    <input type="file" multiple class="form-control" onChange={handleChange} name='images' id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}