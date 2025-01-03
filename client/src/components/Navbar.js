import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth, logout } from '../auth'


const LoggedInLinks= ()=>{

    return (
        <>
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/about">About</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/" onClick={logout}>Log Out</Link>
            </li>
        </>
    )
}

const LoggedOutLinks = ()=>{
    return (
        <>
            <li className="nav-item">
                <Link className="nav-link active" to="/about">About</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/signup">Sign Up</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/login">Login</Link>
            </li>
        </>
    )
}

const AdminLinks = ()=>{
    return (
        <>
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/create-job">Create Job</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-Link active" to="/edit">Edit</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/" onClick={logout}>Log Out</Link>
            </li>
        </>
    )
}

const NavBar =()=>{

    const [logged]=useAuth()

    return ( 
        <header className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Job Dasher</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {logged?<LoggedInLinks/>:<LoggedOutLinks/>}
                    </ul>
                    {/* <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button className="btn btn-outline-light" type="submit">Search</button>
                    </form> */}
                </div>
            </div>
        </header>
    )
}



export default NavBar;