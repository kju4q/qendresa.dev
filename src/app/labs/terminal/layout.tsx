export default function TerminalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="terminal-layout"
      style={{
        backgroundColor: "rgb(40 42 54)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        backgroundImage:
          "radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>
    </div>
  );
}
