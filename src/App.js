import "./App.css"

import React, { Component } from "react"
import { Redirect, Route, Switch } from "react-router-dom"

import Customers from "./components/customers"
import MovieForm from "./components/movieForm"
import Movies from "./components/movies"
import NavBar from "./components/navBar"
import NotFound from "./components/notFound"
import Rentals from "./components/rentalss"

class App extends Component {
    render() {
        return (
            <>
                <NavBar />
                <main className="container">
                    <Switch>
                        <Route path="/movies/:id" component={MovieForm} />
                        <Route path="/movies" component={Movies} />
                        <Route path="/customers" component={Customers} />
                        <Route path="/rentals" component={Rentals} />
                        <Route path="/not-found" component={NotFound} />
                        <Redirect exact from="/" to="/movies" />
                        <Redirect to="/not-found" />
                    </Switch>
                </main>
            </>
        )
    }
}

export default App
