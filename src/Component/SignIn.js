import React from 'react'
import axios from "axios";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";

class SignIn extends React.Component{
    constructor() {
        super();
        this.state = {
            name:'',
            email:'',
            password:'',
            password_confirmation:'',
            isSignin: false,
            msg:''
        };
        this.handleChange = this.handleChange.bind(this)


    }
    handleChange(event){
        const {name,value} =event.target
        this.setState({
            [name] : value
        })

    }


    handleSubmit = event => {


        event.preventDefault();

        axios.post(`http://127.0.0.1:8000/api/register`, {
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            password_confirmation:this.state.password_confirmation


        })
            .then(response =>{

                    this.setState({
                        msg:'user created successfully'
                    });

            })
            .catch(response =>{


                this.setState({ msg: 'The password confirmation does not match' });

            })


    }
    render() {

        return(
            <signin>
                <section className="pt-5 pb-5 bg-info" >
                    <div className="container ">
                        <div className="row justify-content-center" style={{paddingTop:"100px",paddingBottom:"300px"}}>
                            <div className="col-lg-4 bg-white pt-5 pb-5 shadow-lg" style={{borderRadius:"10px"}}>

                                <form onSubmit={this.handleSubmit}>

                                    <h3 className="text-center">Signin</h3>
                                    <h3 className="text-center" style={{fontSize:'14px',color:'Green'}}>{this.state.msg}</h3>

                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" name="name" className="form-control"
                                               placeholder="Enter name" onChange={this.handleChange} required/>

                                    </div>
                                    <div className="form-group">
                                        <label>Email address</label>
                                        <input type="email" name="email" className="form-control"
                                               placeholder="Enter email" onChange={this.handleChange} required/>

                                    </div>
                                    <div className="form-group">
                                        <label >Password</label>
                                        <input type="password" name="password" className="form-control"
                                               placeholder="Password" onChange={this.handleChange} required/>
                                    </div>
                                    <div className="form-group">
                                        <label >Confirm Password</label>
                                        <input type="password" name="password_confirmation" className="form-control"
                                               placeholder="Password" onChange={this.handleChange} required/>
                                    </div>

                                    <button type="submit" className="btn btn-info btn-block justify-content-center" >Signin</button>


                                </form>
                            </div>

                        </div>
                    </div>
                </section>
            </signin>
        )
    }
}
export default SignIn