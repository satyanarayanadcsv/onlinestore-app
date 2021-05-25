import React,{ useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import { Icon } from 'react-icons-kit'
import { cart } from 'react-icons-kit/entypo/cart'
import { useHistory } from 'react-router-dom'
import { auth } from "../config/Config";
import { CartContext } from "../global/CartContext";

export const Navbar = ({ user }) => {

    const history = useHistory();
    const {totalQty} = useContext(CartContext);

    // handle logout
    const handleLogout = () => {
        auth.signOut().then(() => {
            history.push('/login');
        })
    }

    return (
        <div className='navbox'>
            <div className='leftside'>
                <img src={logo} alt=''/>
            </div>
            {!user && <div className='rightside'>
                <span><Link to="signup" className='navlinks'>SIGN UP</Link></span>
                <span><Link to="login" className='navlinks'>LOGIN</Link></span>
            </div>}
            {user && <div className='rightside'>
                <span><Link to="/" className='navlinks'>{user}</Link></span>
                <span><Link to="cartproducts" className='navlinks'><Icon icon={cart} /></Link></span>
            
                    <span className='no-of-products'>{totalQty}</span>
                
                <span><button className='logout-btn' onClick={handleLogout}>LOGOUT</button></span>
            </div>}
        </div>
    )
}
