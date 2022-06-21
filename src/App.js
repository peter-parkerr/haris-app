import './App.css';
import { ListProvider } from './utils/list';

import 'bootstrap/dist/css/bootstrap.css';
import DefaultView from './Screens/Default';
function App() {
  return (
    <div className="App">
      <ListProvider>
      <DefaultView/>
      </ListProvider>
    </div>
  );
}

export default App;
