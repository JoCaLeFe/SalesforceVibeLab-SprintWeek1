// Reusable presentational component for a single Account.

// Derive a stable colour hue from the industry text so each industry
// gets a consistent coloured badge without maintaining a fixed map.
function industryHue(industry) {
  let sum = 0;
  for (let i = 0; i < industry.length; i += 1) {
    sum += industry.charCodeAt(i);
  }
  return sum % 360;
}

export default function AccountRow({ account }) {
  const { Name, Industry, Phone } = account;

  return (
    <tr>
      <td className="cell-name">{Name}</td>
      <td>
        {Industry ? (
          <span
            className="badge"
            style={{
              backgroundColor: `hsl(${industryHue(Industry)} 70% 50% / 0.14)`,
              color: `hsl(${industryHue(Industry)} 55% 40%)`,
            }}
          >
            {Industry}
          </span>
        ) : (
          <span className="muted">—</span>
        )}
      </td>
      <td>
        {Phone ? (
          <a className="phone" href={`tel:${Phone}`}>
            {Phone}
          </a>
        ) : (
          <span className="muted">—</span>
        )}
      </td>
    </tr>
  );
}
