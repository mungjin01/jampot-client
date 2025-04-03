export const HomePage = () => {
  const isElectron = typeof window !== 'undefined' && !!window.electronAPI;

  return (
    <div>
      <h1>Home Page</h1>

      {!isElectron && <div></div>}

      {isElectron && (
        <div>
          <button
            onClick={() => {
              window.location.href = 'https://localhost:5173/';
            }}
          >
            데스크탑 앱으로 이동하기 //추후 랜딩 느낌 페이지로 디자인
          </button>
        </div>
      )}
    </div>
  );
};
