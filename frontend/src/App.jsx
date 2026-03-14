import "./index.css";
import Dashboard    from "./components/Dashboard";
import StepFlow     from "./components/StepFlow";
import StatusScreen from "./components/StatusScreen";
import { useGrocery } from "./hooks/useGrocery";

export default function App() {
  const { status, data, error, fetchGrocery, reset } = useGrocery();

  if (status === "idle")
    return <Dashboard onGrocery={fetchGrocery} />;

  if (status === "ready" && data)
    return <StepFlow data={data} onReset={reset} />;

  return <StatusScreen status={status} error={error} onRetry={fetchGrocery} />;
}
