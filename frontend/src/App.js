import './App.css';
import axios from 'axios';
import { useState} from 'react';
import { connect } from 'react-redux';

function App(props) {
  const {
    test
  } = props
  
  const [something, setSomething] = useState(0)

  // axios.get('http://127.0.0.1:8000/test/3')
  axios.get('https://pandora-extravaganza.herokuapp.com/test/3')
  .then(res => {
    // return res.data.message.map(thing => {
    //   return <p>{thing}</p>
    // })
    setSomething(res.data.message)
  })
  .catch(err => {
    console.log('error!', err)
  })

  return (
    <div>
      <p>The future is here!</p>
      <p>{test}</p>
      <p>{something === 0 ? '' : something}</p>
    </div>
  );
}

// Redux Storage Container
function GrabbingStorage(state) {
  return {
    test: state.reduxPlaceholder,
  }
}
export default connect(GrabbingStorage)(App);
 