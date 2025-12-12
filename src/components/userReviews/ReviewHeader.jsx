export default function ReviewHeader({ totalReviews }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            fontSize: 22,
          }}
        >
          💬
        </span>
        <h1 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>User Reviews</h1>
      </div>

      <span style={{ fontSize: 14, color: "#6b7280" }}>
        Total Reviews: {totalReviews}
      </span>
    </div>
  );
}
