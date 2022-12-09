import axios from 'axios';
import './TestingRendersCss.css';
import { useState } from 'react';
import { InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Box,
  Button,
  TextField,
  Container,
  Slider,
  FormControl,
} from '../MuiExports';

export default function TestingRenders(props) {
  const {
    test
  } = props
  
  const [something, setSomething] = useState(0)

  axios.get('http://127.0.0.1:8000/test/3')
  // axios.get('https://pandora-extravaganza.herokuapp.com/test/3')
  .then(res => {
    setSomething(res.data.message)
  })
  .catch(err => {
    console.log('error!', err)
  })

  // Button Functions
  function buttonAlert(name) {
    alert(`Color is ${name}!`)
  }

  return (
    <main>
      <div>
        <p>The future is here!</p>
        <p>{test}</p>
        <p>{something === 0 ? '' : something}</p>    
      </div>
      <div className='Buttons'>
        <Button variant="text" color='secondary' size='small' onClick={()=>{buttonAlert('secondary')}}>Text</Button>
        <Button variant="contained" color='success' size='medium' onClick={()=>{buttonAlert('success')}}>Contained</Button>
        <Button variant="outlined" color='error' size='large' onClick={()=>{buttonAlert('error')}}>Outlined</Button>
      </div>
      <Box
        className='TestBox'
        sx={{
          marginTop: 5
        }}      
      >
        <TextField label="I'm here!"/>
      </Box>
      <Container className='ContainerBackground'>
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Slider/>
          <TextField label="I don't know"/>
        </Box>
      </Container>
        <InputGroup className="mb-3">
          <FormControl placeholder="Search" />
          <input type='text'  placeholder='Username'/>
          <Button variant="outline-secondary">🔍</Button>
        </InputGroup>
    </main>
  );
}