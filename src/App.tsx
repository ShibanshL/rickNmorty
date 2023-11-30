import Home from "./component/Home";

function App() {
  return (
    <div
      className="h-[100vh] w-[100vw]"
      style={{
        backgroundImage: "url(/bgImg.jpg)",
      }}
    >
      <Home />
    </div>
  );
}

export default App;
