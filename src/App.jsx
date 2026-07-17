import { useMemo, useState } from "react";
import { cloneSeedTickets } from "./data/incidentData.js";
import { Backoffice, Sidebar } from "./components/Backoffice.jsx";
import { IconSprite } from "./components/IconSprite.jsx";
import { MobileApp } from "./components/MobileApp.jsx";
import { getMetrics } from "./lib/domain.js";

const storageKey = "prophero.incident-centre.react.tickets.en.v1";

function loadInitialTickets() {
  try {
    const stored = window.localStorage?.getItem(storageKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch {
    // Local storage can be unavailable in embedded previews.
  }
  return cloneSeedTickets();
}

function persistTickets(nextTickets) {
  try {
    window.localStorage?.setItem(storageKey, JSON.stringify(nextTickets));
  } catch {
    // Demo state remains in memory when storage is unavailable.
  }
}

export default function App() {
  const [tickets, setTickets] = useState(loadInitialTickets);
  const [selectedId, setSelectedId] = useState(() => loadInitialTickets()[0]?.id);
  const [activeFilter, setActiveFilter] = useState("mine");
  const [currentView, setCurrentView] = useState("backoffice");
  const [mobileScreen, setMobileScreen] = useState("home");
  const [filters, setFilters] = useState({ priority: "all", search: "", dateFrom: "", dateTo: "" });
  const [toast, setToast] = useState("");

  const metrics = useMemo(() => getMetrics(tickets), [tickets]);

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  const commitTickets = (updater) => {
    setTickets((current) => {
      const next = typeof updater === "function" ? updater(current) : updater;
      persistTickets(next);
      return next;
    });
  };

  const updateTicket = (id, patch) => {
    commitTickets((current) => current.map((ticket) => (ticket.id === id ? { ...ticket, ...patch } : ticket)));
  };

  const assignToMe = (id) => {
    updateTicket(id, { assignee: "Maria Gonzalez", status: tickets.find((ticket) => ticket.id === id)?.status === "New" ? "Open / Assigned" : tickets.find((ticket) => ticket.id === id)?.status });
    showToast("Ticket assigned.");
  };

  const replyToTicket = (id, reply) => {
    commitTickets((current) =>
      current.map((ticket) =>
        ticket.id === id
          ? { ...ticket, messages: [...ticket.messages, ["Maria Gonzalez", reply, "Now"]] }
          : ticket,
      ),
    );
    showToast("Reply added to timeline.");
  };

  const createTicket = (ticket) => {
    commitTickets((current) => [ticket, ...current]);
    setSelectedId(ticket.id);
    setActiveFilter("total");
    showToast("Incident created from the app.");
  };

  const selectMobileTicket = (id) => {
    setSelectedId(id);
    setCurrentView("backoffice");
    setActiveFilter("total");
    showToast("Request selected in the backoffice.");
  };

  const goHome = () => {
    setCurrentView("backoffice");
    setActiveFilter("mine");
    setMobileScreen("home");
    setFilters({ priority: "all", search: "", dateFrom: "", dateTo: "" });
    setSelectedId(tickets[0]?.id);
  };

  return (
    <>
      <IconSprite />
      <div className="app-shell">
        <Sidebar
          activeFilter={activeFilter}
          currentView={currentView}
          metrics={metrics}
          onFilter={(filter) => {
            setActiveFilter(filter);
            setCurrentView("backoffice");
          }}
          onOpenMobile={() => {
            setCurrentView("mobile-app");
            setMobileScreen("home");
          }}
          onHome={goHome}
        />

        <main className="workspace">
          {currentView === "backoffice" ? (
            <Backoffice
              activeFilter={activeFilter}
              filters={filters}
              selectedId={selectedId}
              tickets={tickets}
              onFiltersChange={(patch) => setFilters((current) => ({ ...current, ...patch }))}
              onSelectTicket={setSelectedId}
              onTicketChange={updateTicket}
              onAssignToMe={assignToMe}
              onReply={replyToTicket}
            />
          ) : (
            <MobileApp
              screen={mobileScreen}
              setScreen={setMobileScreen}
              tickets={tickets}
              onCreateTicket={createTicket}
              onSelectTicket={selectMobileTicket}
            />
          )}
        </main>
      </div>
      <footer className="prototype-notice" aria-label="Prototype and rights notice">
        <strong>Business-case prototype</strong>
        <span>© 2026 Ale Pensel. Independent concept prototype for demonstration and training. Not a production system.</span>
      </footer>
      <div className={`toast ${toast ? "show" : ""}`} role="status" aria-live="polite">{toast}</div>
    </>
  );
}
