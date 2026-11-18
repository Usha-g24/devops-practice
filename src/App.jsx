
import { useEffect, useState } from "react";
import "./App.css";

const API_URLS = {
  students: "/api/students",
  employees: "/api/employees",
  products: "/api/products",
};

function App() {
  const [activeTab, setActiveTab] = useState("students");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const tabs = [
    { id: "students", label: "Students", icon: "🎓" },
    { id: "employees", label: "Employees", icon: "👥" },
    { id: "products", label: "Products", icon: "📦" },
  ];

  const loadData = async (tab) => {
    setLoading(true);
    setError("");
    setRecords([]);

    try {
      const response = await fetch(API_URLS[tab]);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const result = await response.json();

      const data = Array.isArray(result)
        ? result
        : result.data || [];

      setRecords(data);
    } catch (err) {
      setError(err.message || "Unable to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(activeTab);
  }, [activeTab]);

  const columns = records.length
    ? Object.keys(records[0]).filter((key) => key !== "__v")
    : [];

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">M</span>
          <span>ManagePro</span>
        </div>

        <p className="menu-heading">MAIN MENU</p>

        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-button ${
              activeTab === tab.id ? "active" : ""
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}

        <div className="sidebar-bottom">
          <span className="online-dot"></span>
          Backend API
          <strong>Connected</strong>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h2>Management Dashboard</h2>
            <p>Manage your students, employees and products</p>
          </div>

          <div className="profile">
            <span>👤</span>
            Admin
          </div>
        </header>

        <section className="content">
          <div className="welcome">
            <div>
              <h1>Welcome back!</h1>
              <p>Here is your management overview.</p>
            </div>

            <button
              className="refresh-button"
              onClick={() => loadData(activeTab)}
              disabled={loading}
            >
              ↻ Refresh
            </button>
          </div>

          <div className="summary-cards">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`summary-card ${
                  activeTab === tab.id ? "selected" : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className="card-icon">{tab.icon}</div>
                <div>
                  <p>{tab.label}</p>
                  <h2>
                    {activeTab === tab.id
                      ? loading
                        ? "..."
                        : records.length
                      : "View"}
                  </h2>
                </div>
              </button>
            ))}
          </div>

          <section className="table-section">
            <div className="table-heading">
              <div>
                <h2>
                  {tabs.find((tab) => tab.id === activeTab)?.label}
                </h2>
                <p>Records fetched from MongoDB through your backend API</p>
              </div>
              <span className="record-count">
                {records.length} Records
              </span>
            </div>

            {loading && (
              <div className="message">Loading records...</div>
            )}

            {error && (
              <div className="error-message">
                {error}
                <p>
                  Check whether this API route exists in your backend:
                  {" "}{API_URLS[activeTab]}
                </p>
              </div>
            )}

            {!loading && !error && records.length === 0 && (
              <div className="message">
                No records found in this collection.
              </div>
            )}

            {!loading && !error && records.length > 0 && (
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      {columns.map((column) => (
                        <th key={column}>
                          {column.replace(/_/g, " ")}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {records.map((record, index) => (
                      <tr key={record._id || index}>
                        {columns.map((column) => (
                          <td key={column}>
                            {typeof record[column] === "object"
                              ? JSON.stringify(record[column])
                              : String(record[column] ?? "-")}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </section>

        <footer>
          ManagePro © 2026 | Student Management System
        </footer>
      </main>
    </div>
  );
}

export default App;
