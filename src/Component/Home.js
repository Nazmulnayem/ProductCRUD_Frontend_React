import React from "react";
import axios from "axios";
import Login from "./login";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import EditProduct from "./editProduct";
class Home extends React.Component{
    constructor() {
        super();
        this.state = {
            title:'',
            description:'',
            price:'',
            image:null,
        };
        this.handleChange = this.handleChange.bind(this)
        this.onImageChange = this.onImageChange.bind(this)
        this.deleteProduct= this.deleteProduct.bind(this)

    }
    onImageChange = event =>{
        this.setState({
            image: event.target.files[0]
        })
    }

    handleChange = event =>{
        const {name,value} = event.target
        this.setState({
            [name] : value,

        })

    }

    deleteProduct = param => event =>{
        const config = {
            headers:{
                'Authorization' : 'bearer ' + localStorage.getItem('access_token'),
                'Content-Type' : 'multipart/form-data'
            }
        }
        const id = param;

        console.log(param)
        axios.delete(`http://127.0.0.1:8000/api/product/`+id,config)
            .then(response =>{

                window.location.reload()
            })
            .catch(response =>{


            })

    }

    handleSubmit = event => {

        event.preventDefault();
                 const data = new FormData;
                 data.append('title',this.state.title);
                 data.append('description',this.state.description);
                 data.append('price',this.state.price);
                 data.append('image',this.state.image);

        const config = {
            headers:{
                'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
            }
        }


        axios.post(`http://127.0.0.1:8000/api/product`,data,config)
            .then(response =>{

                window.location.reload()
            })
            .catch(response =>{


            })


    }
     editProduct = param => event =>{
        return(
            <EditProduct/>
        )
     }
    render() {

        if(!this.props.productAPI){
            return (
                <section className="pt-5 pb-5 bg-info" >
                    <div className="container ">
                        <div className="row justify-content-center" style={{paddingTop:"100px",paddingBottom:"300px"}}>
                            <div className="col-lg-4 bg-white pt-5 pb-5 shadow-lg" style={{borderRadius:"10px"}}>
                                <div className="text-center">Not Loged in</div>
                            </div>

                        </div>
                    </div>
                </section>
            )
        }
        else{
            return(

                <home>
                <section>


                <div className="container mt-5">
                <div className="row justify-content-start mb-5 pb-3">
                <div className="col-md-10 heading-section ftco-animate">
                <h2 className="mb-4"><strong>Products CRUD</strong></h2>
            </div>
            <div className="col-md-2 ">
                <button type="button" className="btn btn-success" data-toggle="modal"
                        data-target="#exampleModalLong">
                    Create Product
                </button>
            </div>


            </div>
            <div className="row justify-content-start">
                <div className="col-md-10">
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Action</th>

                        </tr>
                        </thead>

                        {this.props.productAPI.map((data, i) => {

                            return (
                                <tbody>
                                <tr>

                                    <td>{data.id}</td>
                                    <td>{data.Title}</td>
                                    <td>{data.Description}</td>
                                    <td>{data.Price}</td>
                                    <img style={{height: "80px", width: "80px"}} src={data.Image}/>

                                    <td>

                                        <Link to={{pathname:`/product/${data.id}`}}><a  style={{color:"white"}} key={data.id}  className="btn btn-info ml-3">Edit</a></Link>
                                        <a onClick={this.deleteProduct(data.id)} className="btn btn-danger ml-3">Delete</a>
                                    </td>
                                </tr>
                                </tbody>

                            );

                        })}


                    </table>
                </div>

            </div>
            <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog"
            aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Create Product</h5>
            <button type="button" className="close" data-dismiss="modal"
                    aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div className="modal-body">
                <form onSubmit={this.handleSubmit}>

                    <div className="form-group">
                        <label>Product Title</label>
                        <input type="text" name="title" className="form-control"
                               placeholder="Enter title" onChange={this.handleChange} required/>

                    </div>
                    <div className="form-group">
                        <label>Product Description</label>
                        <textarea type="text" name="description" placeholder="Enter Description"  className="form-control" onChange={this.handleChange}></textarea>

                    </div>
                    <div className="form-group">
                        <label >Product Price</label>
                        <input type="number" name="price" className="form-control"
                               placeholder="Enter price" onChange={this.handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label >Product Image</label>
                        <input type="file" name="image" className="form-control"
                               placeholder="Product Image" onChange={this.onImageChange} />
                    </div>

                    <button type="submit" className="btn btn-info btn-block justify-content-center" >Save</button>


                </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary"
            data-dismiss="modal">Close
                </button>

            </div>
        </div>
        </div>
        </div>
        </div>


        </section>

        </home>

            )
        }

    }


}
export default Home