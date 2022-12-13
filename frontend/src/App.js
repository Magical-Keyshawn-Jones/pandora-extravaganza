import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
// Component imports 
import { 
  HomePage,
  PageNotFound,
  Portfolio,
  TestingRenders,
  WebsiteLogin,
 } from './components/componentExports';

function App() {
  return (
    <main id ='Website' component="main">
      <Routes>
        <Route path='/' element={<WebsiteLogin/>}/>
        <Route path='/homePage' element={<HomePage/>}/>
        <Route path='/portfolio' element={<Portfolio/>}/>
        <Route path='/testingRenders' element={<TestingRenders/>}/>
        <Route path='*' element={<PageNotFound/>}/>
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
 