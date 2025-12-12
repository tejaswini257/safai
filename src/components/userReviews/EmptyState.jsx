export default function EmptyState() {
  return (
    <div style={{ textAlign: "center", color: "#6b7280", padding: "40px 0" }}>
      <div style={{ fontSize: 40, marginBottom: 8 }}>💬</div>
      <h2 style={{ fontSize: 18, marginBottom: 4 }}>No Reviews Found</h2>
      <p style={{ fontSize: 14 }}>
        There are no reviews matching the current filter.
      </p>
    </div>
  );
}
