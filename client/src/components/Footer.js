import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth, logout } from '../auth'


const Footer =()=>{

    return ( 
        <Footer className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <footer class="bg-dark text-white-50">
                <span>©Job Dasher.</span>
            </footer>
            </div>
        </Footer>
    )
}



export default Footer

