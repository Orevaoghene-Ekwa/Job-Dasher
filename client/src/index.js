import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import NavBar from './components/Navbar';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom'
import HomePage from './components/Home';
import SignUpPage from './components/SignUp';
import LoginPage from './components/Login';
import CreateJobPage from './components/CreateJob';
import AdminHome from './components/Admin';
import AboutPage from './components/About';
import Footer from './components/Footer';
import NotFound from './components/404';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './auth';


const App = ()=>{

    const [logged]=useAuth()
    const userRole = localStorage.getItem("userRole")

    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            once: true,     // Whether animation should happen only once
        });
    }, []);

    return (
        <Router>
            <NavBar/>
            <Routes>
                {/* unauthorizedRoutes */}
                {!logged &&(
                    <>
                        <Route path='/' element={<HomePage />}/>
                        <Route path='home' element={<HomePage/>}/>
                        <Route path='/signup' element={<SignUpPage />}/>
                        <Route path='/login' element={<LoginPage/>} />
                        <Route path='/about' element={<AboutPage/>}/>
                    </>
                )}

                {/* ProtectedRoute */}
                <Route element={<ProtectedRoute/>}>
                    <Route path='/signup' element={<Navigate to="/"/>}/>
                    <Route path='/login' element={<Navigate to="/"/>} />
                    {
                        userRole != "admin"?
                        (
                            <>
                                <Route path='/' element={<HomePage />}/>
                                <Route path='/home' element={<HomePage />}/>
                                <Route path='/about' element={<AboutPage/>}/>
                            </>
                        ):
                        (
                            <>
                                <Route path='/' element={<AdminHome />}/>
                                <Route path='/home' element={<AdminHome/>}/>
                                <Route path='/admin' element={<AdminHome/>}/>
                                <Route path='/create-job' element={<CreateJobPage/>}/>
                            </>
                        )
                    }
                </Route>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
            <Footer/>
        </Router>
    );
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);