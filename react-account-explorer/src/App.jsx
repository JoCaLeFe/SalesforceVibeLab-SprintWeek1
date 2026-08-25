import AccountExplorer from './components/AccountExplorer.jsx';

export default function App() {
  return (
    <main className="page">
      <h1>Account Explorer</h1>
      <p className="subtitle">
        React &middot; reads <code>Account_Sample_Data.json</code> (no live Salesforce connection)
      </p>
      <AccountExplorer />
    </main>
  );
}
