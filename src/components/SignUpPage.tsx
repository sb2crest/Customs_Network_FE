import React from 'react';
import '../assets/sass/components/_new_sign-up.scss';
import logo from '../assets/images/logo.png';
import background_image from '../assets/images/background image.jpg';

const SignUpPage = () => {
    return (
        <div className="signup flex" >
            <div className="container flex">
                <div className="image">
                    <img src={background_image} />
                    <img src={logo} className="logo" />
                    <div className="line"></div>
                </div>
                <div className="form-div flex">
                    <form className='form grid'>
                        <div className="input-div">
                            <div className="flex" >
                                <div className="inputBox">
                                    <input type="text" />
                                    <span>First Name</span>
                                </div>
                            </div>
                        </div>
                        <div className="input-div">
                            <div className="flex" >
                                <div className="inputBox">
                                    <input type="text" />
                                    <span>Last Name</span>
                                </div>
                            </div>
                        </div>
                        <div className="input-div">
                            <div className="flex">
                                <div className="inputBox">
                                    <input type="text" />
                                    <span>User ID</span>
                                </div>
                            </div>
                        </div>
                        <div className="input-div">
                            <div className="flex">
                                <div className="inputBox">
                                    <input type="text" />
                                    <span>Email</span>
                                </div>
                            </div>
                        </div>
                        <div className="input-div">
                            <div className="flex">
                                <div className="inputBox">
                                    <input type="password" />
                                    <span>Password</span>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className='footer-container'>
                        <input type="checkbox" />
                        <span> &nbsp;I hereby, agree to all the Terms and Conditions</span>
                    </div>
                    <button className='btn'>
                        Register
                    </button>
                    <div className='member-container'>
                        Already Member?
                        <span className='login-here'> Login Here</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage