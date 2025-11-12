import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/authSlice'


const Home = () => {
  const {user} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout =()=>{
    dispatch(logout())
    navigate('/')
  }
  return (
    <div>
        <nav>
            <Link to='/profile' >Profile</Link> {" || "}
            <button onClick={handleLogout}> Logout </button>
        </nav>
        <h1>Welcome {user?.username || 'Guest'}</h1>
        <h5>Home Page</h5>
    </div>
  )
}

export default Home