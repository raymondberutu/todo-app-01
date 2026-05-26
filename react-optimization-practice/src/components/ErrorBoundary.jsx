import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary caught:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", textAlign: "center", color: "red", border: "1px solid red", margin: "1rem" }}>
          <h2>⚠️ Terjadi kesalahan pada UI</h2>
          <details style={{ whiteSpace: "pre-wrap", marginBottom: "1rem" }}>
            {this.state.error && this.state.error.toString()}
          </details>
          <button onClick={this.handleRetry} style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>
            Coba Lagi
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;