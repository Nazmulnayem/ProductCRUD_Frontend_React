import React from "react";
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
class Login extends React.Component{
    constructor() {
        super();
        this.state = {

            email:'',
            password:'',
            isLogin: false,
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
        axios.post(`http://127.0.0.1:8000/api/login`, {
            email:this.state.email,
            password:this.state.password

        })
            .then(response =>{

                localStorage.setItem('access_token',response.data.access_token);
                if (response.status === 200) {
                    this.setState({ isLogin: true });
                    window.location.reload();
                }
            })
            .catch(response =>{

                    this.setState({ msg: 'Credential Not Match' });

            })


    }
    render() {
        if (this.state.isLogin) {
            return <Redirect to = {{ pathname: "/home" }} />;

        }


        return(
           <login>
               <section className="pt-5 pb-5 bg-info" >
                   <div className="container ">
                       <div className="row justify-content-center" style={{paddingTop:"100px",paddingBottom:"300px"}}>
                           <div className="col-lg-4 bg-white pt-5 pb-5 shadow-lg" style={{borderRadius:"10px"}}>

                               <form onSubmit={this.handleSubmit}>

                                   <h3 className="text-center">Login</h3>
                                   <h3 className="text-center" style={{fontSize:'12px',color:'red'}}>{this.state.msg}</h3>
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

                                   <button type="submit" className="btn btn-info btn-block justify-content-center" >Login</button>


                               </form>
                           </div>

                       </div>
                   </div>
               </section>

           </login>


        )
    }


}
export default Login