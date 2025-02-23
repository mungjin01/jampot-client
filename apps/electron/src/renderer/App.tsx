import { Button } from '@repo/ui';

function App() {
  return (
    <>
      <div className="card">
        <Button colorTheme={'gray'}>Test</Button>
        <Button colorTheme="black" width="376px" height="48px">
          블랙
        </Button>
        <Button colorTheme="blue1" width="376px" height="48px">
          블루1
        </Button>
        <Button colorTheme="blue2" width="376px" height="48px">
          블루2
        </Button>
        <Button colorTheme="yellow1" width="376px" height="48px">
          옐로우1
        </Button>
      </div>
    </>
  );
}

export default App;
