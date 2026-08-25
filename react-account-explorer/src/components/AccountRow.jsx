// Reusable presentational component for a single Account.
export default function AccountRow({ account }) {
  return (
    <tr>
      <td>{account.Name}</td>
      <td>{account.Industry || '—'}</td>
      <td>{account.Phone || '—'}</td>
    </tr>
  );
}
