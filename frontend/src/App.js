import './App.css';
import { connect } from 'react-redux';

function App(props) {
  const {
    test
  } = props

  return (
    <div>
      <p>The future is here!</p>
      <p>{test}</p>
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
