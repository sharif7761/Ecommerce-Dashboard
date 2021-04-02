import React, {useEffect, useState} from 'react';
import Header from "../includes/Header";
import {withRouter} from 'react-router-dom'

const UpdateProduct = (props) => {

    const [data, setData] = useState([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState('')

    useEffect(  () => {
        getData()
    },[])

    async function editProduct(id) {

        let formData = new FormData()
        formData.append('name', name)
        formData.append('price', price)
        formData.append('description', description)
        formData.append('file_path', file)

        let result = await fetch('http://127.0.0.1:8000/api/updateproduct/'+id+'?_method=PUT', {
            method: 'POST',
            body: formData
        })
        alert('product updated')
        getData()
    }

    async function getData() {
        let result = await fetch('http://127.0.0.1:8000/api/product/'+props.match.params.id)
        result = await result.json()
        setData(result)
        setName(result.name)
        setPrice(result.price)
        setDescription(result.description)
        setFile(result.file)
    }

    return (
        <div>
            <Header />
            <div className="col-sm-6 offset-sm-3">
                <h1>Update Product</h1>
                <br/>
                <input type="text" defaultValue={data.name} onChange={(e) => setName(e.target.value)} placeholder="Enter Product Name" className="form-control"/>
                <br/>
                <input type="text" defaultValue={data.price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Product Price" className="form-control"/>
                <br/>
                <input type="text" defaultValue={data.description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Product Description" className="form-control"/>
                <br/>
                <input type="file" defaultValue={data.file_path} onChange={(e) => setFile(e.target.files[0])}  className="form-control"/>
                <br/>
                <img width='80' height='80' src={'http://127.0.0.1:8000/'+data.file_path} />
                <br /> <br />
                <button className="btn btn-primary" onClick={() => editProduct(data.id)}>Update Product</button>
            </div>
        </div>
    );
};

export default withRouter(UpdateProduct);
