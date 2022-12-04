import './App.css';
import { connect } from 'react-redux';
import Container from '@mui/material/Container';
import { Routes, Route } from 'react-router-dom';
// Component imports 
import { WebsiteLogin,TestingRenders } from './components/componentExports';

function App() {
  return (
    <main id ='Website' component="main">
      <Routes>
        <Route path='/' element={<WebsiteLogin/>}/>
        <Route path='/testingRenders' element={<TestingRenders/>}/>
      </Routes>
    </main>
  )
}

// Redux Storage Container
function GrabbingStorage(state) {
  return {
    test: state.reduxPlaceholder,
  }
}
export default connect(GrabbingStorage)(App);
 