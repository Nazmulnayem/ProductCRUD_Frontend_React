import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import axios from "axios";
class EditProduct extends React.Component{
    constructor() {
        super()
        this.state = {
            productAPI: [],
            title:'',
            description:'',
            price:'',
            image:null,
        }
        this.handleChange = this.handleChange.bind(this)
        this.onImageChange = this.onImageChange.bind(this)


    }
    componentDidMount() {

        const config = {
            headers:{

                'Authorization' : 'bearer ' + localStorage.getItem('access_token')

            }
        };
        const id= window.location.pathname;

        fetch(`http://127.0.0.1:8000/api${id}`,config)
            .then(response => response.json())
            .then(data => {


                this.setState({

                    productAPI: data.data


                })
                console.log(data.data)
            })


    }
    onImageChange = event =>{
        this.setState({
            image: event.target.files[0]
        })
    }

    handleChange = event =>{
        const {name,defaultValue} = event.target
        this.setState({
            [name] : defaultValue,

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

        }

        const id= window.location.pathname;
        axios.put(`http://127.0.0.1:8000/api${id}`,{
            title:this.state.title,
            description:this.state.description,
            price:this.state.price,
        },{
            headers:{
                'Authorization' : 'bearer ' + localStorage.getItem('access_token'),
                'Content-Type' : 'application/x-www-form-urlencoded ',
                'Accept' : 'application/json '
            }

        })
            .then(response =>{

               console.log(response)
            })
            .catch(response =>{


            })


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
        return(
            <div>
                <section className="pt-5 pb-5" >
                    <div className="container ">
                        <div className="row justify-content-center" style={{paddingTop:"60px",paddingBottom:"300px"}}>
                            <div className="col-lg-6 bg-white pt-5 pb-5 shadow-lg" style={{borderRadius:"10px"}}>
                                <form onSubmit={this.handleSubmit}>
                                    <h3 className="text-center">Edit Product</h3>

                                    <div className="form-group">
                                        <label>Product Title</label>
                                        <input  type="text" name="title" className="form-control"
                                               placeholder="Enter title" defaultValue={this.state.productAPI.Title} onChange={this.handleChange} required/>

                                    </div>
                                    <div className="form-group">
                                        <label>Product Description</label>
                                        <textarea type="text" name="description" placeholder="Enter Description" className="form-control" defaultValue={this.state.productAPI.Description} onChange={this.handleChange}></textarea>

                                    </div>
                                    <div className="form-group">
                                        <label >Product Price</label>
                                        <input defaultValue={this.state.productAPI.Price} type="number" name="price" className="form-control"
                                               placeholder="Enter price" onChange={this.handleChange} required/>
                                    </div>

                                    <div className="form-group">
                                        <label >Product Image</label>
                                        <input type="file" name="image" className="form-control"
                                               placeholder="Product Image" onChange={this.onImageChange} />
                                               <img src={this.state.productAPI.Image} style={{height:"50px",width:"50px"}}/>
                                    </div>

                                    <button type="submit" className="btn btn-info btn-block justify-content-center" >Edit Product</button>


                                </form>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
export default EditProduct