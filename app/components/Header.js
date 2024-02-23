 import React, {useContext, useState} from 'react'

 import HeaderLoggedOut from './HeaderLoggedOut'
 import HeaderLoggedIn from './HeaderLoggedIn'
import StateContext from '../StateContext'
 
 export default function Header(props) {
    const appState = useContext(StateContext);

   return (
    <header className="header-bar bg-info mb-3 fixed-top">
    <div className="container d-flex flex-column flex-md-row align-items-center p-3">
      <h4 className="my-0 mr-md-auto font-weight-normal">
        <a href="/" className="text-white">
          DocChat
        </a>
      </h4>
      {appState.isLoggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut/>}
    </div>
  </header>
   )
 }
 