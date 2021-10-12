import './Header.scss';
import {Link} from "react-router-dom";
import React, { useContext } from 'react';
import logo from './3.png';
import { UserContext } from '../../context/Context';
import { _requestLogout } from '../../backend/auth';

function Header({match, history}){
    const [user, setUser] = useContext(UserContext);

    /*API 코드 필요 */
    const logout = ()=>{
        _requestLogout()
        .then(res=>{
            console.log(res);
            setUser({});
            sessionStorage.removeItem('Token');
            console.log(sessionStorage.getItem('Token'));//이거 없으면 session remove가 안됨... 뭐노...
            document.location.href = "/";//history 객체가 작동을 안함...
            //아무래도 sessionStorage를 지우는 과정이 비동기거나 뭐 그런 듯..
        }).catch(err=>{
            console.log(err.response);
        })
    }
    
    const getUserId = ()=>{
        if(Object.keys(user).length == 0)
            return -1;
        const url = user.url;
        const t = url.split('/');
        return t[4];
    }

    return(
        <div className="header_div">
            <img className="logo_image" alt="logo" src={logo}/>
            <ul className="menu_list">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/mentoring">Mentoring</Link></li>
                <li><Link to="/mymentoring">My mentoring</Link></li>
                <li><Link to="/community">Community</Link></li>
                { Object.keys(user).length != 0 ? 
                    <li><Link to={`/profile/${getUserId()}`}>profile</Link>/<a href="" onClick={logout}>logout</a></li> :
                    <li><Link to="/login">login</Link></li>
                }  
            </ul>
        </div>
    );
    
}

export default Header;