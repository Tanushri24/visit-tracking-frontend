import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './core/routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;