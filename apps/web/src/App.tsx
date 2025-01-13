import './App.css';
import { Button } from '@repo/ui';

function App() {
  return (
    <>
      <div className="card">
        <Button onClick={() => alert('Test')}>Test</Button>
      </div>
    </>
  );
}

export default App;
