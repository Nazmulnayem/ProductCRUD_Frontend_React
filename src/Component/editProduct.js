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
            id:'',
        }
        this.handleChange = this.handleChange.bind(this)
        this.onImageChange = this.onImageChange.bind(this)


    }
    componentDidMount() {

        const config = {
            headers:{

                'Authorization' : 'bearer ' + localStorage.getItem('access_token'),
                'Context-type' : 'application/x-www-form-urlencoded'

            }
        };
        const id= window.location.pathname;

        fetch(`http://127.0.0.1:8000/api${id}`,config)
            .then(response => response.json())
            .then(data => {


                this.setState({

                    productAPI: data.data,
                    id: data.data.id


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
        const {name,value} = event.target
        this.setState({
            [name] : value,

        })

    }
    handleSubmit = event => {

        event.preventDefault();
        const data = new FormData;
        data.append('id',this.state.id);
        data.append('title',this.state.title);
        data.append('description',this.state.description);
        data.append('price',this.state.price);
        data.append('image',this.state.image);

        const config = {
            headers:{
                'Authorization' : 'bearer ' + localStorage.getItem('access_token'),

            }
        }
        axios.post(`http://127.0.0.1:8000/api/update-product`,data,config)
            .then(response =>{
                window.alert('product updates successfully')
                window.location.reload()
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
                                        <label>Product Title : {this.state.productAPI.Title}</label>
                                        <input  type="text" name="title"   className="form-control"
                                               placeholder="Enter title"  onChange={this.handleChange} required/>

                                    </div>

                                    <div className="form-group">
                                        <label>Product Description : </label>
                                        <textarea type="text" name="description" placeholder="Enter Description"  className="form-control"  onChange={this.handleChange}></textarea>

                                    </div>

                                    <div className="form-group">
                                        <label >Product Price :  {this.state.productAPI.Price}</label>
                                        <input  type="number" name="price"className="form-control"
                                               placeholder="Enter price" onChange={this.handleChange}  required/>
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