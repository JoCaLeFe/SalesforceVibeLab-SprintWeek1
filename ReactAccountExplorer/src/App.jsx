import AccountExplorer from './components/AccountExplorer.jsx';

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">◈</span>
          <div>
            <h1>Account Explorer</h1>
            <p className="subtitle">
              React &middot; sample data from <code>Account_Sample_Data.json</code>
              <span className="badge-offline">no live Salesforce connection</span>
            </p>
          </div>
        </div>
      </header>

      <main className="app-main">
        <AccountExplorer />
      </main>

      <footer className="app-footer">SF Vibe Lab UADY · Week 1</footer>
    </div>
  );
}
