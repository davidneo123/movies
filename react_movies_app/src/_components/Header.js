import { Link } from 'react-router-dom';
import React from 'react';

export const Header = props =>
    <div className="row">
        <button><Link to="/register">Register Users</Link></button> 
        {props.user?
            <div className='col-sm-6'><button><Link to="/login">Logout  </Link></button><strong> MOVIES APP. Welcome {props.user.firstName}!</strong></div>:null}
        {props.user && props.user.role=='Admin'?
            <div className='col-sm-6'><button><Link to="/users"> Manage Users</Link></button>   </div>:null}
    </div>
