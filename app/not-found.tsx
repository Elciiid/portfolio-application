import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0f",
        color: "#f0f0fa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, system-ui, sans-serif",
        gap: "16px",
      }}
    >
      <p style={{ fontSize: "80px", fontWeight: 700, opacity: 0.08, lineHeight: 1 }}>
        404
      </p>
      <h1 style={{ fontSize: "24px", fontWeight: 600, marginTop: "-32px" }}>
        Page not found
      </h1>
      <p style={{ color: "#6b7280", fontSize: "14px" }}>
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        style={{
          marginTop: "8px",
          padding: "10px 24px",
          background: "#7c3aed",
          color: "white",
          borderRadius: "10px",
          textDecoration: "none",
          fontSize: "14px",
          fontWeight: 500,
        }}
      >
        Go home
      </Link>
    </div>
  );
}
