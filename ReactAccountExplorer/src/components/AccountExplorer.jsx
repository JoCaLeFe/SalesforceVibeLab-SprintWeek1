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

  const count = visibleAccounts.length;

  return (
    <section className="card">
      <div className="toolbar">
        <div className="search-wrap">
          <svg className="search-icon" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" />
          </svg>
          <input
            className="search"
            type="search"
            placeholder="Search accounts by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search accounts by name"
          />
        </div>
        <span className="count">
          {count} {count === 1 ? 'account' : 'accounts'}
        </span>
      </div>

      {count > 0 ? (
        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => toggleSort(col.key)}
                    aria-sort={
                      sortBy === col.key
                        ? sortDir === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : 'none'
                    }
                  >
                    <span className="th-inner">
                      {col.label}
                      <span className="sort-caret">
                        {sortBy === col.key ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                      </span>
                    </span>
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
        </div>
      ) : (
        <div className="empty">
          <div className="empty-icon" aria-hidden="true">🔍</div>
          <p className="empty-title">No accounts found</p>
          <p className="empty-sub">
            Nothing matches “{search}”. Try a different search.
          </p>
        </div>
      )}
    </section>
  );
}
