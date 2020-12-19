import React from "react";
import axios from "axios";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from "./Component/Home";
import Login from "./Component/login";
import Nav from "./Component/Nav";
import SignIn from "./Component/SignIn";
import EditProduct from "./Component/editProduct";


export default class App extends React.Component{
    state = {};
    componentDidMount() {

        const config = {
            headers:{

                'Authorization' : 'Bearer ' + localStorage.getItem('access_token')

            }
        }

        fetch('http://127.0.0.1:8000/api/product',config)
            .then(response => response.json())
            .then(data => {


                this.setState({

                    productAPI: data.data


                })
                console.log(data)
            })


    }
    render() {
        return (
            <Router>
                <div>

                    <Nav productAPI={this.state.productAPI}/>


                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Switch>
                        <Route exact path="/">

                        <Login/>
                    </Route>
                        <Route exact path="/login">

                            <Login/>
                        </Route>
                        <Route path="/home">

                            <Home productAPI={this.state.productAPI}/>
                        </Route>
                        <Route path="/product/:id">
                            <EditProduct productAPI={this.state.productAPI}/>
                        </Route>
                        <Route path="/signin">
                           <SignIn/>
                        </Route>

                    </Switch>
                </div>

            </Router>
        );
    }


}


