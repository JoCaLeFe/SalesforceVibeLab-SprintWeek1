import { useMemo, useState } from 'react';
import accounts from '../data/Account_Sample_Data.json';
import AccountRow from './AccountRow.jsx';

const COLUMNS = [
  { key: 'Name', label: 'Name' },
  { key: 'Industry', label: 'Industry' },
  { key: 'Phone', label: 'Phone' },
];

export default function AccountExplorer() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('Name');
  const [sortDir, setSortDir] = useState('asc');

  // Filter by name, then sort by the active column. Mirrors the LWC behaviour.
  const visibleAccounts = useMemo(() => {
    const term = search.trim().toLowerCase();
    const filtered = accounts.filter((a) =>
      (a.Name || '').toLowerCase().includes(term)
    );
    return [...filtered].sort((a, b) => {
      const x = (a[sortBy] || '').toString().toLowerCase();
      const y = (b[sortBy] || '').toString().toLowerCase();
      if (x < y) return sortDir === 'asc' ? -1 : 1;
      if (x > y) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [search, sortBy, sortDir]);

  function toggleSort(key) {
    if (key === sortBy) {
      setSortDir((dir) => (dir === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(key);
      setSortDir('asc');
    }
  }

  return (
    <section className="card">
      <input
        className="search"
        type="search"
        placeholder="Search accounts by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table">
        <thead>
          <tr>
            {COLUMNS.map((col) => (
              <th key={col.key} onClick={() => toggleSort(col.key)}>
                {col.label}
                {sortBy === col.key ? (sortDir === 'asc' ? ' ▲' : ' ▼') : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleAccounts.map((account, index) => (
            <AccountRow key={`${account.Name}-${index}`} account={account} />
          ))}
        </tbody>
      </table>

      {visibleAccounts.length === 0 && (
        <p className="empty">No accounts match your search.</p>
      )}
    </section>
  );
}
