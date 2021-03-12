import React from 'react';
import Patio from '../Patio/Patio';
import PatioEntrada from '../PatioEntrada/PatioEntrada';
import {BrowserRouter as Router , Link , Route} from 'react-router-dom'


const expN = ()=>{
    return(
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">React Park</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/entrada">Entrada</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Saída</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <Route exact path="/" component={Patio} />
            <Route exact path="/entrada" component={PatioEntrada} />
        </Router>
        

    )
}

export default expN;