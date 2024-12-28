import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import NavBar from './components/Navbar';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import HomePage from './components/Home';
import SignUpPage from './components/SignUp';
import LoginPage from './components/Login';
import CreateJobPage from './components/CreateJob';


const App = ()=>{


    return (
        <Router>
            <div className=''>
                <NavBar/>
                <Routes>
                    <Route path='/' element={<HomePage />}/>
                    <Route path='/signup' element={<SignUpPage />}/>
                    <Route path='/login' element={<LoginPage/>} />
                    <Route path='/create-job' element={<CreateJobPage/>}/>
                </Routes>
            </div> 
        </Router>
    );
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);