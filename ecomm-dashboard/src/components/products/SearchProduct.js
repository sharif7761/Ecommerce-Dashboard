import React, {useState} from 'react';
import Header from "../includes/Header";
import {Table} from "react-bootstrap";

const SearchProduct = () => {

    const [data, setData] = useState([])

    async function search(key) {
        let result = await fetch('http://127.0.0.1:8000/api/search-product/'+key)
        result = await result.json()
        setData(result)
    }

    return (
        <div>
            <Header />
            <div className="col-sm-6 offset-sm-3">
                <h1>Search Product</h1>
                <br/>
                <input type="text" onChange={(e) => search(e.target.value)} placeholder="Enter Product Name"  className="form-control"/>
                <br/>
                {
                    data.length > 0 ?
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data.map((item) =>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td><img width='80' height='80' src={'http://127.0.0.1:8000/'+item.file_path} /></td>
                                    <td>{item.description}</td>
                                    <td>{item.price}</td>
                                </tr>
                            )
                        }
                        </tbody>
                    </Table>
                    :
                    <h1>No Data Found</h1>
                }

            </div>
        </div>
    );
};

export default SearchProduct;
