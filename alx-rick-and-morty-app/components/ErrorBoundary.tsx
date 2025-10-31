import React from "react";
import * as Sentry from "@sentry/react";

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorCaptured:", error, errorInfo);
    Sentry.captureException(error, { extra: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-6 text-red-600">
          ⚠️ Something went wrong.
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
