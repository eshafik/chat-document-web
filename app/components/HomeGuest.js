import React, {useState} from 'react'
import Axios from 'axios';

import Page from './Page'

function HomeGuest() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    async function handleSubmit(e) {
        e.preventDefault();
        try{
          await Axios.post('/register', {username, email, password});
          console.log("successfully created");

        }catch(e){
          console.log(e.response);
        }
    }
  return (
    <Page wide={true} title="Welcome">
    <div className="row align-items-center">
      <div className="col-lg-7 py-3 py-md-5">
        <h1 className="display-3">DocChat! Want to Chat with Your Documents?</h1>
        
      </div>
      <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
        {/* <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username-register" className="text-muted mb-1">
              <small>Username</small>
            </label>
            <input onChange={e => setUsername(e.target.value)} id="username-register" name="username" className="form-control" type="text" placeholder="Pick a username" autoComplete="off" />
          </div>
          <div className="form-group">
            <label htmlFor="email-register" className="text-muted mb-1">
              <small>Email</small>
            </label>
            <input onChange={e => setEmail(e.target.value)} id="email-register" name="email" className="form-control" type="text" placeholder="you@example.com" autoComplete="off" />
          </div>
          <div className="form-group">
            <label htmlFor="password-register" className="text-muted mb-1">
              <small>Password</small>
            </label>
            <input onChange={e => setPassword(e.target.value)} id="password-register" name="password" className="form-control" type="password" placeholder="Create a password" />
          </div>
          <button type="submit" className="py-3 mt-4 btn btn-lg btn-success btn-block">
            Sign up for ComplexApp
          </button>
        </form> */}
        <p className="lead text-muted">Welcome to <b>DocChat</b>! Our platform revolutionizes document interaction by leveraging cutting-edge AI technology. With our intuitive interface, users can engage in natural language conversations with documents, unlocking a world of knowledge at their fingertips. Whether you're seeking quick answers, in-depth insights, or educational exploration, <b>DocChat</b> empowers you to chat with documents like never before. Experience the future of information retrieval and discovery today!</p>
      </div>
    </div>
  </Page>
  )
}

export default HomeGuest