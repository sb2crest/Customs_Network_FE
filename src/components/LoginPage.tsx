import React from 'react';
import logo from '../assets/images/logo.png';
import '../assets/sass/components/_new_login.scss';
import background_image from '../assets/images/background image.jpg';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

const LoginPage: React.FC = () => {
    return (
        <div className="login flex" >
            <div className="container flex">
                <div className="image">
                    <img src={background_image} />
                    <img src={logo} className="logo" />
                    <div className="line"></div>
                </div>
                <div className="form-div flex">
                    <form className='form grid'>
                        <div className="input-div">
                            <div className="flex">
                                <div className="inputBox">
                                    <input type="text" />
                                    <span>User ID</span>
                                    <FaUser className='icon' />
                                </div>
                            </div>
                        </div>
                        <div className="input-div">
                            <div className="flex">
                                <div className="inputBox">
                                    <input type="password" />
                                    <span>Password</span>
                                    <RiLockPasswordFill className='icon' />
                                </div>
                            </div>
                        </div>
                        <div className='button'>
                            <button className='btn'>
                                Login
                            </button>
                        </div>

                    </form>
                    <div className='footer-container'>
                        Forgot Password ? |
                        <span> Privacy Poilcy</span>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default LoginPage