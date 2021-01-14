import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Cyclists of Madison in the house!</p>
        <a
          className="App-link"
          href="https://twitter.com/cyclists_of_msn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitters
        </a>
      </header>
    </div>
  );
}

export default App;
