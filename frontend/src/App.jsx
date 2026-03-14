import { useState } from "react";
import "./index.css";
import Dashboard           from "./components/Dashboard";
import VenuePicker, { FOOD_VENUES, HEALTH_VENUES } from "./components/VenuePicker";
import RecommendScreen     from "./components/RecommendScreen";
import StepFlow            from "./components/StepFlow";
import StatusScreen        from "./components/StatusScreen";
import CustomInputScreen   from "./components/CustomInputScreen";
import CustomOptionsPicker from "./components/CustomOptionsPicker";
import { useGrocery }      from "./hooks/useGrocery";

export default function App() {
  const { status, data, error, fetchGrocery, switchMode, reset } = useGrocery();
  const [screen, setScreen]         = useState("home"); // home | venue | custom-input | custom-options | stepping
  const [venueList, setVenueList]   = useState(FOOD_VENUES);
  const [accentColor, setAccentColor] = useState("#FF8C42");
  const [customOptions, setCustomOptions]       = useState([]);
  const [customDescription, setCustomDescription] = useState("");
  const [customEmoji, setCustomEmoji]             = useState("❓");
  const [customLoading, setCustomLoading]         = useState(false);
  const [customError, setCustomError]             = useState(null);

  const handleReset        = () => { reset(); setScreen("home"); };
  const handleBackToVenue  = () => { reset(); setScreen("venue"); };
  const handleBackToCustomOptions = () => { reset(); setScreen("custom-options"); };

  const openVenuePicker = ({ venues, color }) => {
    setVenueList(venues);
    setAccentColor(color);
    setScreen("venue");
  };

  const handleCustomOptions = (options, description, emoji) => {
    setCustomDescription(description);
    setCustomEmoji(emoji || "❓");
    if (options === null) {
      // loading signal
      setCustomLoading(true);
      setCustomError(null);
      setCustomOptions([]);
      setScreen("custom-loading");
    } else if (!options.length) {
      setCustomLoading(false);
      setCustomError("Could not get suggestions. Please try again.");
    } else {
      setCustomOptions(options);
      setCustomLoading(false);
      setCustomError(null);
      setScreen("custom-options");
    }
  };

  const handleCustomSelect = (opt) => {
    fetchGrocery({
      placeType:   opt.placeType,
      searchQuery: opt.searchQuery,
      customSteps: opt.insideSteps,
    });
  };

  // Determine correct back handler based on where we came from
  const backFromStatus = screen === "custom-options" || customOptions.length
    ? handleBackToCustomOptions
    : handleBackToVenue;

  if (status === "locating" || status === "loading" || status === "error")
    return <StatusScreen status={status} error={error} onRetry={() => {}} onBack={backFromStatus} />;

  if (status === "ready" && data && screen !== "stepping")
    return (
      <RecommendScreen
        data={data}
        onConfirm={() => setScreen("stepping")}
        onBack={backFromStatus}
        onSwitchMode={switchMode}
        switching={false}
      />
    );

  if (status === "loading" && data && screen !== "stepping")
    return (
      <RecommendScreen
        data={data}
        onConfirm={() => {}}
        onBack={backFromStatus}
        onSwitchMode={() => {}}
        switching={true}
      />
    );

  if (status === "ready" && data && screen === "stepping")
    return <StepFlow data={data} onReset={handleReset} />;

  if (screen === "custom-loading")
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ background: "#FFF8F0" }}>
        <div className="text-7xl animate-bounce">{customEmoji}</div>
        <div className="text-center">
          <p className="text-2xl font-black text-indigo-600">খুঁজছি…</p>
          <p className="text-sm font-bold text-gray-400 mt-1">Finding options for you…</p>
        </div>
        {customError && (
          <div className="flex flex-col items-center gap-3">
            <p className="text-red-500 font-semibold text-sm">{customError}</p>
            <button onClick={() => setScreen("custom-input")}
              className="px-6 py-3 rounded-2xl text-white font-black border-none"
              style={{ background: "#6366F1" }}>← Try again</button>
          </div>
        )}
      </div>
    );

  if (screen === "custom-input")
    return (
      <CustomInputScreen
        onOptions={handleCustomOptions}
        onBack={() => setScreen("home")}
      />
    );

  if (screen === "custom-options")
    return (
      <CustomOptionsPicker
        options={customOptions}
        description={customDescription}
        onSelect={handleCustomSelect}
        onBack={() => setScreen("custom-input")}
      />
    );

  if (screen === "venue")
    return (
      <VenuePicker
        venues={venueList}
        title={accentColor === "#3B82F6" ? "কোথায় যাবেন?" : "কী খুঁজছেন?"}
        titleEn={accentColor === "#3B82F6" ? "Where do you need to go?" : "What are you looking for?"}
        accentColor={accentColor}
        onSelect={placeType => fetchGrocery({ placeType })}
        onBack={() => setScreen("home")}
      />
    );

  return (
    <Dashboard
      onFood={() => openVenuePicker({ venues: FOOD_VENUES, color: "#FF8C42" })}
      onDoctor={() => openVenuePicker({ venues: HEALTH_VENUES, color: "#3B82F6" })}
      onCustom={() => setScreen("custom-input")}
    />
  );
}
