import "./App.css";

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <h2>DevOps Practice</h2>
        <span>React Application</span>
      </nav>

      <main className="container">
        <h1>Welcome to My DevOps Journey!</h1>

        <p>
          This is my first React application. I will use this project to
          practice deployment and DevOps tools.
        </p>

        <div className="card">
          <h2>Application Status</h2>
          <p className="status">● Application Running</p>
          <p>Frontend: React.js</p>
          <p>Build Tool: Vite</p>
          <p>Deployment: Coming Soon</p>
        </div>

        <button onClick={() => alert("React is working!")}>
          Test Application
        </button>
      </main>

      <footer>Created for DevOps Practice | 2026</footer>
    </div>
  );
}

export default App;
