import React from 'react'
import {Link} from "react-router-dom";
class Nav extends React.Component{

    render() {
        let button;
        if(this.props.productAPI){

            button = (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">

                        <Link to="/home"><a  className="nav-link btn btn-success mr-5 ml-" style={{color:"white"}} >Home</a></Link>
                    </li>

                    <li className="nav-item">

                        <a  className="nav-link btn btn-danger mr-5 ml-2" style={{color:"white"}} onClick={()=>{localStorage.clear(); window.location.reload()} }>Logout</a>
                    </li>


                </ul>
            )
        }
        else{
            button = (

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item mr-3">
                        <Link to="/login"><a className="nav-link" style={{color:"black"}}>Login</a></Link>
                    </li>
                    <li className="nav-item mr-5">
                        <Link to="/signin"><a className="nav-link" style={{color:"black"}}>Signin</a></Link>

                    </li>



                </ul>
            )
        }
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">

                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {button}

                </div>
            </nav>
        )
    }


}
export default Nav