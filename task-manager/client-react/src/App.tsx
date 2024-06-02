import './App.css';
import Dashboard from './Dashboard/Dashboard';
import RegisterLogin from './RegisterLogin/RegisterLogin'; // Ajusta la ruta si es necesario

const App = () => {
  return (
    <div className="App">
      <Dashboard />
      <RegisterLogin />
    </div>
  );
}

export default App;