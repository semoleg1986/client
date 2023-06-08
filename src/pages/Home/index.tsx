import React from 'react'
import { Button } from '../../components/Form/Form.styled'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Button>Sign in</Button>
      <Link to='/signup'><Button>Sign up</Button></Link>
    </div>
  )
}

export default Home
