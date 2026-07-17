import { useState } from "react";
import { assignees, categories, entityDirectory, priorities, statuses } from "../data/incidentData.js";
import {
  channelClass,
  contractLabel,
  currentDirectoryMatch,
  filterTickets,
  getMetrics,
  isAiActivity,
  isSlaRisk,
  messageClass,
  priorityClass,
  propertyLabel,
  recalculateSla,
  requesterLabel,
  senderEmail,
  severityCopy,
  sortByTriage,
} from "../lib/domain.js";
import { AiMark, ChannelMark, PropHeroLogo } from "./BrandAssets.jsx";

const navItems = [
  ["mine", "Assigned to me", "featured"],
  ["total", "Total incidents", "total-featured"],
  ["new", "New"],
  ["assigned", "Open/Assigned"],
  ["progress", "In progress"],
  ["pending", "Pending / Waiting"],
  ["resolved", "Resolved"],
  ["closed", "Closed"],
];

function channelLabel(channel) {
  return channel === "App" ? "PropHero App" : channel;
}

function navCount(metrics, filter) {
  return {
    mine: metrics.mine,
    total: metrics.open,
    new: metrics.newTickets,
    assigned: metrics.assigned,
    progress: metrics.progress,
    pending: metrics.waiting,
    resolved: metrics.resolved,
    closed: metrics.closed,
  }[filter];
}

export function Sidebar({ activeFilter, currentView, metrics, onFilter, onOpenMobile, onHome }) {
  return (
    <aside className="sidebar">
      <button className="brand brand-button" type="button" onClick={onHome} aria-label="Go to home dashboard">
        <PropHeroLogo tone="white" className="brand-logo" />
      </button>

      <nav className="side-nav" aria-label="Main navigation">
        {navItems.map(([filter, label, variant]) => (
          <button
            key={filter}
            className={[activeFilter === filter && currentView === "backoffice" ? "active" : "", variant || ""].filter(Boolean).join(" ")}
            type="button"
            onClick={() => onFilter(filter)}
          >
            <span>{label}</span>
            <b>{navCount(metrics, filter)}</b>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className={`app-access ${currentView === "mobile-app" ? "active" : ""}`} type="button" onClick={onOpenMobile}>
          <span>User app</span>
          <b>Demo</b>
        </button>
      </div>
    </aside>
  );
}

export function Backoffice({
  activeFilter,
  filters,
  selectedId,
  tickets,
  onFiltersChange,
  onSelectTicket,
  onTicketChange,
  onAssignToMe,
  onReply,
}) {
  const [mediaPreview, setMediaPreview] = useState(null);
  const filtered = filterTickets(tickets, { ...filters, activeFilter });
  const riskTickets = sortByTriage(filtered.filter(isSlaRisk));
  const withinTickets = sortByTriage(filtered.filter((ticket) => !isSlaRisk(ticket)));
  const selected = tickets.find((ticket) => ticket.id === selectedId) || [...riskTickets, ...withinTickets][0] || tickets[0];
  const metrics = getMetrics(tickets);

  return (
    <section className="backoffice-view">
      <Topbar filters={filters} onFiltersChange={onFiltersChange} />
      <Metrics metrics={metrics} />
      <section className="command-grid">
        <InboxPanel
          filters={filters}
          riskTickets={riskTickets}
          withinTickets={withinTickets}
          selectedId={selected?.id}
          onFiltersChange={onFiltersChange}
          onSelectTicket={onSelectTicket}
        />
        {selected ? (
          <>
            <TicketDetail
              ticket={selected}
              onTicketChange={onTicketChange}
              onAssignToMe={onAssignToMe}
              onReply={onReply}
              onPreviewAttachment={setMediaPreview}
            />
            <AiPanel ticket={selected} />
          </>
        ) : null}
      </section>
      {mediaPreview ? <MediaPreview attachment={mediaPreview} onClose={() => setMediaPreview(null)} /> : null}
    </section>
  );
}

function Topbar({ filters, onFiltersChange }) {
  return (
    <header className="topbar">
      <div className="top-title">Incident Command Centre</div>
      <div className="search-tools" aria-label="Search and dates">
        <label className="search">
          <span>Search</span>
          <input
            type="search"
            placeholder="Tickets, properties, people..."
            value={filters.search}
            onChange={(event) => onFiltersChange({ search: event.target.value })}
          />
        </label>
        <label className="date-filter">
          <span>From</span>
          <input type="date" value={filters.dateFrom} onChange={(event) => onFiltersChange({ dateFrom: event.target.value })} />
        </label>
        <label className="date-filter">
          <span>To</span>
          <input type="date" value={filters.dateTo} onChange={(event) => onFiltersChange({ dateTo: event.target.value })} />
        </label>
      </div>
      <div className="agent">
        <span className="avatar">MG</span>
        <div>
          <strong>Maria Gonzalez</strong>
          <small>CX Analyst</small>
        </div>
      </div>
    </header>
  );
}

function Metrics({ metrics }) {
  const metricCards = [
    ["Open tickets", metrics.open, "+2 vs yesterday", "negative", false],
    ["P1 critical", metrics.p1, `${metrics.p1Overdue} overdue`, "negative", metrics.p1Overdue > 0],
    [
      "P2 high",
      metrics.p2,
      metrics.p2Overdue > 0 ? `${metrics.p2Overdue} overdue` : `${metrics.p2AtRisk} at risk`,
      "warning",
      metrics.p2Overdue > 0,
    ],
    ["P3 medium", metrics.p3, metrics.p3Overdue > 0 ? `${metrics.p3Overdue} overdue` : "Within SLA", "", metrics.p3Overdue > 0],
    ["P4 low", metrics.p4, metrics.p4Overdue > 0 ? `${metrics.p4Overdue} overdue` : "Within SLA", "", metrics.p4Overdue > 0],
  ];

  return (
    <section className="metrics" aria-label="Operational metrics">
      {metricCards.map(([label, value, note, noteClass, overdue]) => (
        <article key={label} className={overdue ? "metric-overdue" : ""}>
          <span>{label}</span>
          <strong>{value}</strong>
          <small className={noteClass}>{note}</small>
        </article>
      ))}
    </section>
  );
}

function InboxPanel({ filters, riskTickets, withinTickets, selectedId, onFiltersChange, onSelectTicket }) {
  return (
    <section className="inbox-panel">
      <div className="panel-head">
        <div>
          <h2>Omnichannel inbox</h2>
        </div>
        <select aria-label="Filter by priority" value={filters.priority} onChange={(event) => onFiltersChange({ priority: event.target.value })}>
          <option value="all">All</option>
          {priorities.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
      </div>
      <div className="inbox-scroll">
        <div className="queue-label">SLA at risk</div>
        <div className="ticket-list">
          <TicketRows items={riskTickets} selectedId={selectedId} onSelectTicket={onSelectTicket} empty="No tickets at risk." />
        </div>
        <div className="queue-label inside">Within SLA</div>
        <div className="ticket-list compact">
          <TicketRows items={withinTickets} selectedId={selectedId} onSelectTicket={onSelectTicket} empty="No tickets within SLA." />
        </div>
        {!riskTickets.length && !withinTickets.length ? <div className="empty">No incidents match this filter.</div> : null}
      </div>
    </section>
  );
}

function TicketRows({ items, selectedId, onSelectTicket, empty }) {
  if (!items.length) return <div className="empty">{empty}</div>;
  return items.map((ticket) => (
    <button
      key={ticket.id}
      className={`ticket-row ${ticket.id === selectedId ? "selected" : ""} ${ticket.sla.includes("overdue") ? "sla-overdue" : ""}`}
      type="button"
      onClick={() => onSelectTicket(ticket.id)}
    >
      <div className={`channel ${channelClass(ticket.channel)}`}>
        <ChannelMark channel={ticket.channel} />
      </div>
      <div className="ticket-copy">
        <strong>{ticket.title}</strong>
        <span>{ticket.property}</span>
        <small>{ticket.requester}</small>
      </div>
      <div className="ticket-meta">
        <span className={priorityClass(ticket.priority)}>{ticket.priority}</span>
        <strong className={ticket.sla.includes("overdue") ? "overdue-time" : "remaining-time"}>{ticket.sla}</strong>
      </div>
    </button>
  ));
}

function TicketDetail({ ticket, onTicketChange, onAssignToMe, onReply, onPreviewAttachment }) {
  const assignedToMe = ticket.assignee === "Maria Gonzalez";
  const { requester, property } = currentDirectoryMatch(ticket);

  return (
    <section className="detail-panel">
      <div className="ticket-actions">
        <div>
          <div className="ticket-id-row">
            <p className="ticket-id">{ticket.id}</p>
            <span className={`${priorityClass(ticket.priority)} detail-priority`}>{ticket.priority}</span>
            <span className={ticket.sla.includes("overdue") ? "sla-chip overdue" : "sla-chip ok"}>
              {ticket.sla.includes("overdue") ? "SLA overdue" : "Within SLA"}
            </span>
            <small className="title-sla">{ticket.sla}</small>
          </div>
          <h2>{ticket.title}</h2>
        </div>
        <div className="action-row">
          <button className={assignedToMe ? "assigned-lock" : "primary"} type="button" disabled={assignedToMe} onClick={() => onAssignToMe(ticket.id)}>
            {assignedToMe ? "Assigned to you" : "Assign to me"}
          </button>
        </div>
      </div>

      <EntityStrip ticket={ticket} requester={requester} property={property} onTicketChange={onTicketChange} />
      <StateRow ticket={ticket} onTicketChange={onTicketChange} />

      <div className="tabs">
        <button className="active" type="button">Activity</button>
      </div>
      <Timeline ticket={ticket} onPreviewAttachment={onPreviewAttachment} />
      <ReplyBox ticket={ticket} onReply={onReply} />
    </section>
  );
}

function EntityStrip({ ticket, requester, property, onTicketChange }) {
  const requesterOptions = entityDirectory;
  const propertyOptions = requester ? requester.properties : entityDirectory.flatMap((item) => item.properties);
  const contractOptions = property ? property.contracts : propertyOptions.flatMap((item) => item.contracts);

  return (
    <div className="entity-strip">
      <div>
        <span>Channel</span>
        <strong className="channel-detail">
          <ChannelMark channel={ticket.channel} className={`channel-icon ${channelClass(ticket.channel)}`} />
          <b>{channelLabel(ticket.channel)}</b>
        </strong>
        <small>{ticket.channel === "Email" ? `${senderEmail(ticket)} · ${ticket.created}` : ticket.created}</small>
      </div>
      <EntitySelect
        label="Requester"
        value={requesterLabel(requester || requesterOptions[0])}
        options={requesterOptions.map((person) => [requesterLabel(person), `${person.properties.length} linked propert${person.properties.length === 1 ? "y" : "ies"}`])}
        onChange={(value) => {
          const nextRequester = entityDirectory.find((person) => requesterLabel(person) === value);
          const nextProperty = nextRequester.properties.find((item) => item.id === ticket.propertyId) || nextRequester.properties[0];
          const nextContract = nextProperty.contracts.find((item) => item.id === ticket.contractId) || nextProperty.contracts[0];
          onTicketChange(ticket.id, {
            requester: nextRequester.name,
            role: nextRequester.role,
            documentType: nextRequester.documentType,
            documentNumber: nextRequester.documentNumber,
            property: nextProperty.name,
            propertyId: nextProperty.id,
            contract: nextContract.name,
            contractId: nextContract.id,
          });
        }}
      />
      <EntitySelect
        label="Property"
        value={propertyLabel(property || propertyOptions[0])}
        options={propertyOptions.map((item) => [propertyLabel(item), requester ? `${requester.name}'s property` : "Available property"])}
        onChange={(value) => {
          const nextProperty = propertyOptions.find((item) => propertyLabel(item) === value);
          const nextContract = nextProperty.contracts.find((item) => item.id === ticket.contractId) || nextProperty.contracts[0];
          onTicketChange(ticket.id, {
            property: nextProperty.name,
            propertyId: nextProperty.id,
            contract: nextContract.name,
            contractId: nextContract.id,
          });
        }}
      />
      <EntitySelect
        label="Contract"
        value={contractLabel(contractOptions.find((item) => item.id === ticket.contractId) || contractOptions[0])}
        options={contractOptions.map((contract) => [contractLabel(contract), property ? `${property.name} contract` : "Available contract"])}
        onChange={(value) => {
          const nextContract = contractOptions.find((contract) => contractLabel(contract) === value);
          onTicketChange(ticket.id, { contract: nextContract.name, contractId: nextContract.id });
        }}
      />
    </div>
  );
}

function EntitySelect({ label, value, options, onChange }) {
  const [open, setOpen] = useDisclosure(false);
  return (
    <div className="entity-picker">
      <span>{label}</span>
      <button className="entity-trigger" type="button" onClick={() => setOpen(!open)}>
        <strong>{value.split(" · ")[0]}</strong>
        <small>{value.split(" · ").slice(1).join(" · ")}</small>
        <i aria-hidden="true"></i>
      </button>
      <div className={`entity-options ${open ? "open" : ""}`}>
        {options.map(([optionValue, meta]) => (
          <button
            key={optionValue}
            className="entity-option"
            type="button"
            onClick={() => {
              onChange(optionValue);
              setOpen(false);
            }}
          >
            <strong>{optionValue}</strong>
            <small>{meta}</small>
          </button>
        ))}
      </div>
    </div>
  );
}

function StateRow({ ticket, onTicketChange }) {
  return (
    <div className="state-row">
      <Select label="Status" value={ticket.status} options={statuses} onChange={(status) => onTicketChange(ticket.id, { status })} />
      <Select label="Assigned to" value={ticket.assignee} options={assignees} onChange={(assignee) => onTicketChange(ticket.id, { assignee })} />
      <Select
        label="Priority"
        value={ticket.priority}
        options={priorities}
        onChange={(priority) => onTicketChange(ticket.id, { priority, sla: recalculateSla(ticket, ticket.priority, priority) })}
      />
      <Select label="Category" value={ticket.category} options={categories} onChange={(category) => onTicketChange(ticket.id, { category })} />
    </div>
  );
}

function Select({ label, value, options, onChange }) {
  return (
    <label>
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function Timeline({ ticket, onPreviewAttachment }) {
  return (
    <div className="timeline">
      {ticket.messages.map(([author, body, time, attachments], index) => (
        <article key={`${author}-${time}-${index}`} className={`timeline-item ${messageClass(author)}`}>
          {isAiActivity(author) ? (
            <span className="dot ai-dot">
              <AiMark />
            </span>
          ) : (
            <span className="dot">{author.slice(0, 1)}</span>
          )}
          <div>
            <header>
              <strong>{author}</strong>
              <small>{time}</small>
            </header>
            <p>{body}</p>
            <Attachments attachments={attachments} onPreviewAttachment={onPreviewAttachment} />
          </div>
        </article>
      ))}
    </div>
  );
}

function Attachments({ attachments = [], onPreviewAttachment }) {
  if (!attachments.length) return null;
  return (
    <div className="attachments">
      {attachments.map((attachment) => (
        <button key={attachment.name} className={`attachment-thumb ${attachment.type}`} type="button" onClick={() => onPreviewAttachment(attachment)} aria-label={`Preview ${attachment.name}`}>
          <span className="attachment-preview" style={attachment.preview ? { "--attachment-preview": `url("${attachment.preview}")` } : undefined}>
            {attachment.type === "video" ? "Play" : ""}
          </span>
          <strong>{attachment.name}</strong>
          <small>{attachment.description}</small>
        </button>
      ))}
    </div>
  );
}

function MediaPreview({ attachment, onClose }) {
  const isVideo = attachment.type === "video";
  return (
    <div className="media-modal-backdrop" role="presentation" onClick={onClose}>
      <section className="media-modal" role="dialog" aria-modal="true" aria-label={`Preview ${attachment.name}`} onClick={(event) => event.stopPropagation()}>
        <button className="media-modal-close" type="button" onClick={onClose} aria-label="Close preview">×</button>
        <div className={`media-modal-frame ${isVideo ? "video" : ""}`} style={attachment.preview ? { "--attachment-preview": `url("${attachment.preview}")` } : undefined}>
          {isVideo ? <span>Video attachment · {attachment.description}</span> : null}
        </div>
        <div className="media-modal-meta">
          <strong>{attachment.name}</strong>
          <span>{attachment.description}</span>
        </div>
      </section>
    </div>
  );
}

function ReplyBox({ ticket, onReply }) {
  const [reply, setReply] = useDisclosure("");
  return (
    <form
      className="reply-box"
      onSubmit={(event) => {
        event.preventDefault();
        if (!reply.trim()) return;
        onReply(ticket.id, reply.trim());
        setReply("");
      }}
    >
      <input placeholder="Write a reply..." value={reply} onChange={(event) => setReply(event.target.value)} />
      <button type="submit">Send</button>
    </form>
  );
}

function AiPanel({ ticket }) {
  return (
    <aside className="ai-panel">
      <div className="ai-head">
        <span>AI</span>
        <strong>{ticket.confidence}% confidence</strong>
      </div>
      <div className="ai-block">
        <span>Summary</span>
        <p>{ticket.summary}</p>
      </div>
      <div className="ai-grid">
        <div>
          <span>Category</span>
          <strong>{ticket.category}</strong>
        </div>
        <div>
          <span>Priority</span>
          <strong>{ticket.priority}</strong>
          <small>{severityCopy(ticket.priority)}</small>
        </div>
      </div>
      <div className="ai-block">
        <span>Next action</span>
        <p>{ticket.next}</p>
      </div>
      <div className="ai-block">
        <span>Missing information</span>
        <ul>
          {ticket.missing.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function useDisclosure(initial) {
  return useState(initial);
}
