import { useCallback, useEffect, useRef, useState } from "react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Ticker } from "./components/Ticker";
import { Leaderboard } from "./components/Leaderboard";
import { ModelExplorer } from "./components/ModelExplorer";
import { Labs } from "./components/Labs";
import { Economy } from "./components/Economy";
import { Pricing } from "./components/Pricing";
import { Updates } from "./components/Updates";
import { Footer } from "./components/Footer";
import { ModelDrawer } from "./components/ModelDrawer";
import { LabDrawer } from "./components/LabDrawer";
import { CommandPalette } from "./components/CommandPalette";
import { CompareModal } from "./components/CompareModal";
import { Toast } from "./components/Toast";

export default function App() {
  const [modelId, setModelId] = useState<string | null>(null);
  const [labId, setLabId] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([
    "claude-opus-5-5",
    "gpt-6-1-sol",
  ]);
  const toastTimer = useRef<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const notify = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 3600);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, []);

  const handleSelectModel = useCallback((id: string) => {
    setLabId(null);
    setSearchOpen(false);
    setCompareOpen(false);
    setModelId(id);
  }, []);

  const handleSelectLab = useCallback((id: string) => {
    setModelId(null);
    setSearchOpen(false);
    setCompareOpen(false);
    setLabId(id);
  }, []);

  const handleCloseModel = useCallback(() => setModelId(null), []);
  const handleCloseLab = useCallback(() => setLabId(null), []);
  const handleCloseSearch = useCallback(() => setSearchOpen(false), []);
  const handleCloseCompare = useCallback(() => setCompareOpen(false), []);

  const handleOpenSearch = useCallback(() => {
    setModelId(null);
    setLabId(null);
    setCompareOpen(false);
    setSearchOpen(true);
  }, []);

  const handleOpenCompare = useCallback(() => {
    setModelId(null);
    setLabId(null);
    setSearchOpen(false);
    setCompareOpen(true);
  }, []);

  const handleToggleCompare = useCallback(
    (id: string) => {
      if (compareIds.includes(id)) {
        setCompareIds((current) => current.filter((entry) => entry !== id));
        return;
      }
      if (compareIds.length >= 4) {
        notify("The comparison desk holds four models. Remove one first.");
        return;
      }
      setCompareIds((current) => [...current, id]);
    },
    [compareIds, notify],
  );

  const handleRemoveCompare = useCallback((id: string) => {
    setCompareIds((current) => current.filter((entry) => entry !== id));
  }, []);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setModelId(null);
        setLabId(null);
        setCompareOpen(false);
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav onSearch={handleOpenSearch} onCompare={handleOpenCompare} />
      <main id="main">
        <Hero onCompare={handleOpenCompare} />
        <Ticker />
        <Leaderboard onSelectModel={handleSelectModel} />
        <ModelExplorer
          onSelectModel={handleSelectModel}
          compareIds={compareIds}
          onToggleCompare={handleToggleCompare}
          onOpenCompare={handleOpenCompare}
        />
        <Labs onSelectLab={handleSelectLab} />
        <Economy />
        <Pricing onSelectModel={handleSelectModel} />
        <Updates />
      </main>
      <Footer onCompare={handleOpenCompare} />

      <ModelDrawer
        open={Boolean(modelId)}
        modelId={modelId}
        selected={Boolean(modelId && compareIds.includes(modelId))}
        onClose={handleCloseModel}
        onSelectLab={handleSelectLab}
        onToggleCompare={handleToggleCompare}
        onOpenCompare={handleOpenCompare}
      />
      <LabDrawer
        open={Boolean(labId)}
        labId={labId}
        onClose={handleCloseLab}
        onSelectModel={handleSelectModel}
      />
      <CommandPalette
        open={searchOpen}
        onClose={handleCloseSearch}
        onSelectModel={handleSelectModel}
        onSelectLab={handleSelectLab}
      />
      <CompareModal
        open={compareOpen}
        ids={compareIds}
        onClose={handleCloseCompare}
        onRemove={handleRemoveCompare}
        onAdd={handleToggleCompare}
        onOpenModel={handleSelectModel}
      />
      {toast ? (
        <Toast message={toast} onClose={() => setToast(null)} />
      ) : null}
    </>
  );
}
