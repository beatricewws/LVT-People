import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import EditUserForm from './components/EditUserForm';
import UsersList from './components/UsersList';


function CreateUserForm() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setUsername('')
        setEmail('')
        setPassword('')
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>Username:</p>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <p>Email:</p>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <p>Password:</p>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
      <button type="submit">Create User</button>
      <Router>
        <Link to="/edit"><button>Edit</button></Link>
        <Link to="/list"><button>List</button></Link>
        <Routes>
          <Route path="/edit" element={<EditUserForm />}></Route>
          <Route path="/list" element={<UsersList />}></Route>
        </Routes>
      </Router>
    </form>
  )
}

export default CreateUserForm;
