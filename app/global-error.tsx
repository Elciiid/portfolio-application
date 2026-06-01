"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body
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
        <h2 style={{ fontSize: "20px", fontWeight: 600 }}>
          Something went wrong
        </h2>
        <button
          onClick={reset}
          style={{
            padding: "10px 24px",
            background: "#7c3aed",
            color: "white",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
