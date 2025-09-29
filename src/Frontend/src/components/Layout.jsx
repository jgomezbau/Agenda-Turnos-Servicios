import React from 'react';
import Navbar from './Navbar';
import SideBar from './SideBar';

export default function Layout({ children }) {
    return (
        <div className='grid-container h-screen'>
            <nav className='navbar'><Navbar/></nav>
            <aside className='sidebar'><SideBar/></aside>
            
        </div>
    )
}
