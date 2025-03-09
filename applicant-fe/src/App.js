import './App.css';
import Create from './components/create/create';
import Read from './components/read/read';
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="main">
        <p style={{ fontSize: '1.5em', fontWeight: 'bolder' }}>Applicants</p>
        <div>
          <Route exact path='/' component={Read} />
        </div>

        <div style={{ marginTop: 20 }}>
          <Route exact path='/create' component={Create} />
        </div>
      </div>
    </Router>
  );
}

export default App;
