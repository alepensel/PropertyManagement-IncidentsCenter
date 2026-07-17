import { useEffect, useState } from "react";
import { categories, entityDirectory } from "../data/incidentData.js";
import { PropHeroLogo } from "./BrandAssets.jsx";
import { MobileIcon } from "./IconSprite.jsx";
import { categoryDefaultPriority, formatSlaMinutes, nextTicketId, slaLimits, sortByTriage, todayIso } from "../lib/domain.js";

const mobileUser = entityDirectory.find((person) => person.name === "Laura Martinez") || entityDirectory[0];

export function MobileApp({ screen, setScreen, tickets, onCreateTicket, onSelectTicket }) {
  const [showMenuHint, setShowMenuHint] = useState(false);
  const [propertyId, setPropertyId] = useMobileState("PROP-002113");
  const [contractId, setContractId] = useMobileState("CONT-00778");
  const [message, setMessage] = useMobileState("");
  const [category, setCategory] = useMobileState("Maintenance");
  const [attachments, setAttachments] = useMobileState(new Set());
  const [createdTicketId, setCreatedTicketId] = useMobileState("");

  const property = mobileUser.properties.find((item) => item.id === propertyId) || mobileUser.properties[0];
  const contract = property.contracts.find((item) => item.id === contractId) || property.contracts[0];
  const mobileTickets = sortByTriage(tickets.filter((ticket) => ticket.documentNumber === mobileUser.documentNumber || ticket.requester === mobileUser.name)).slice(0, 3);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowMenuHint(true), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  const toggleAttachment = (type) => {
    setAttachments((current) => {
      const next = new Set(current);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const createTicket = (event) => {
    event.preventDefault();
    if (!message.trim()) return;
    const priority = categoryDefaultPriority(category);
    const id = nextTicketId(tickets);
    const payload = [];
    if (attachments.has("photo")) {
      payload.push(
        { type: "photo", name: "incident-app-1.jpg", description: "Photo attached from the app" },
        { type: "photo", name: "incident-app-2.jpg", description: "Additional detail" },
      );
    }
    if (attachments.has("video")) payload.push({ type: "video", name: "incident-video.mp4", description: "Video 0:12" });

    onCreateTicket({
      id,
      title: `${category} - ${property.name}`,
      requester: mobileUser.name,
      role: mobileUser.role,
      documentType: mobileUser.documentType,
      documentNumber: mobileUser.documentNumber,
      property: property.name,
      propertyId: property.id,
      contract: contract.name,
      contractId: contract.id,
      channel: "App",
      created: "Now",
      createdDate: todayIso(),
      priority,
      status: "New",
      assignee: "Unassigned",
      sla: formatSlaMinutes(slaLimits[priority]),
      category,
      confidence: 82,
      summary: `Incident created from the app by ${mobileUser.name}. It is linked to ${property.name} and ${contract.name}.`,
      missing: ["Initial analyst review"],
      next: "Review attachments, confirm impact, and assign an owner.",
      messages: [
        [mobileUser.name, message.trim(), "Now", payload],
        ["System / AI", `Ticket classified as ${category.toLowerCase()} ${priority} from the app flow.`, "Now"],
      ],
    });
    setCreatedTicketId(id);
    setMessage("");
    setAttachments(new Set());
    setScreen("ticket-success");
  };

  return (
    <section className="mobile-app-view">
      <div className="mobile-stage">
        <div className="phone-shell" aria-label="PropHero app prototype">
          <MobileScreen active={screen === "home"}>
            <header className="mobile-header">
              <button
                className="hamburger"
                type="button"
                onClick={() => {
                  setShowMenuHint(false);
                  setScreen("account");
                }}
                aria-label="Open menu and My account"
              >
                <span></span><span></span><span></span>
              </button>
              <PropHeroLogo tone="blue" className="mobile-brand-logo" />
            </header>
            <nav className="mobile-tabs" aria-label="App sections">
              <button className="active" type="button">For me</button>
              <button type="button">Success stories</button>
              <button type="button">Tools</button>
              <button type="button">Resources</button>
            </nav>
            <main className="mobile-content">
              <h1>Your real estate portfolio</h1>
              <article className="portfolio-card" aria-label="Portfolio value">
                <div className="portfolio-card-heading">
                  <span>Portfolio value</span>
                  <img className="portfolio-card-mark" src="/assets/prophero-isologo.png" alt="" aria-hidden="true" />
                </div>
                <strong>$470,427</strong>
                <div className="portfolio-card-details">
                  <span>1 property</span>
                  <i aria-hidden="true">·</i>
                  <span>1 country</span>
                </div>
              </article>
              <section className="opportunities">
                <div>
                  <h2>Opportunities</h2>
                  <p>Properties selected with Data+AI and approved by our real estate experts</p>
                </div>
                <button type="button">View all</button>
              </section>
              <PropertyStrip />
            </main>
            <MobileBottom active="home" setScreen={setScreen} />
            {showMenuHint && (
              <button
                className="menu-discovery-overlay"
                type="button"
                onClick={() => setShowMenuHint(false)}
                aria-label="Dismiss menu guidance"
              >
                <span className="menu-discovery-message">New: find Contact us and create an incident in <strong>My account</strong>.</span>
              </button>
            )}
          </MobileScreen>

          <MobileScreen active={screen === "account"}>
            <Backbar onBack={() => setScreen("home")} />
            <main className="mobile-content account-content">
              <h1>My account</h1>
              <AccountGroup items={[["icon-user", "Profile"], ["icon-globe", "Language"], ["icon-coin", "Currency"]]} />
              <div className="account-group">
                <button className="contact-entry" type="button" onClick={() => setScreen("contact")}><MobileIcon id="icon-chat" /><span>Contact us</span></button>
                <button type="button"><MobileIcon id="icon-help" /><span>Help</span></button>
              </div>
              <AccountGroup items={[["icon-invite", "Refer a friend"]]} single />
            </main>
            <MobileBottom active="panel" setScreen={setScreen} />
          </MobileScreen>

          <MobileScreen active={screen === "contact"}>
            <Backbar onBack={() => setScreen("account")} />
            <main className="mobile-content contact-content">
              <h1>Contact us</h1>
              <article className="support-card consultation-card">
                <div>
                  <h2>My requests</h2>
                  <p>Review the status and latest updates for your incidents.</p>
                </div>
                <div className="mobile-consultations">
                  {mobileTickets.length ? mobileTickets.map((ticket) => (
                    <button
                      key={ticket.id}
                      type="button"
                      className="mobile-consultation"
                      onClick={() => onSelectTicket(ticket.id)}
                    >
                      <span>
                        <strong>{ticket.title}</strong>
                        <small>{ticket.id} · {ticket.status}</small>
                      </span>
                      <b className={ticket.sla.includes("overdue") ? "overdue-time" : "remaining-time"}>{ticket.sla}</b>
                    </button>
                  )) : <div className="mobile-empty">You do not have any incidents yet.</div>}
                </div>
              </article>
              <article className="support-card action-card">
                <h2>Create incident</h2>
                <p>Tell us what is happening so we can help you and track progress from the app.</p>
                <button className="mobile-primary" type="button" onClick={() => setScreen("ticket-form")}>Create incident</button>
              </article>
              <article className="support-card slim email-card">
                <h2>Send us an email</h2>
                <p>For general questions, we are still available at <strong>support@prophero.com</strong>.</p>
              </article>
            </main>
          </MobileScreen>

          <MobileScreen active={screen === "ticket-form"}>
            <Backbar onBack={() => setScreen("contact")} />
            <form className="mobile-content ticket-form" onSubmit={createTicket}>
              <h1>New incident</h1>
              <p className="form-intro">We will ask for a few details so we can understand what is happening and help as quickly as possible.</p>
              <div className="locked-requester">
                <span>Requester</span>
                <strong>{mobileUser.name}</strong>
                <small>{mobileUser.role} · {mobileUser.documentType} {mobileUser.documentNumber}</small>
              </div>
              <label>Property
                <span className="mobile-field-control">
                  <select value={propertyId} onChange={(event) => {
                    const nextProperty = mobileUser.properties.find((item) => item.id === event.target.value) || mobileUser.properties[0];
                    setPropertyId(nextProperty.id);
                    setContractId(nextProperty.contracts[0].id);
                  }}>
                    {mobileUser.properties.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                  </select>
                  <small>{property.id} · {property.contracts.length} linked contract{property.contracts.length === 1 ? "" : "s"}</small>
                </span>
              </label>
              <label>Contract
                <span className="mobile-field-control">
                  <select value={contractId} onChange={(event) => setContractId(event.target.value)}>
                    {property.contracts.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.id} · {property.name} · Start {item.startDate || "n/a"}</option>)}
                  </select>
                  <small>{contract.id} · {property.name} · Start {contract.startDate || "n/a"}</small>
                </span>
              </label>
              <label>Category
                <select value={category} onChange={(event) => setCategory(event.target.value)}>
                  {categories.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label>Message
                <textarea rows="5" placeholder="Tell us what is happening and since when." value={message} onChange={(event) => setMessage(event.target.value)}></textarea>
              </label>
              <div className="mobile-attachments">
                <span>Attachments</span>
                <div>
                  <button type="button" className={`attachment-toggle ${attachments.has("photo") ? "selected" : ""}`} onClick={() => toggleAttachment("photo")}>Image</button>
                  <button type="button" className={`attachment-toggle ${attachments.has("video") ? "selected" : ""}`} onClick={() => toggleAttachment("video")}>Video</button>
                </div>
                <small>{attachmentSummary(attachments)}</small>
              </div>
              <button className="mobile-primary" type="submit">Send incident</button>
            </form>
          </MobileScreen>

          <MobileScreen active={screen === "ticket-success"}>
            <main className="mobile-content success-content">
              <div className="success-mark"></div>
              <h1>Incident created</h1>
              <p>Your case has been registered. Our team will review it and move it forward as soon as possible.</p>
              <p>We will notify you from the app when there are updates or if we need more information.</p>
              <article className="success-card">
                <span>Ticket</span>
                <strong>{createdTicketId || "INC-2026-00000"}</strong>
                <small>Status: New</small>
              </article>
              <button className="mobile-secondary" type="button" onClick={() => setScreen("home")}>Back to home</button>
            </main>
          </MobileScreen>
        </div>
      </div>
    </section>
  );
}

function PropertyStrip() {
  const items = [
    ["property-photo-a", "EUR 80,000", "Valencia · 1 bed · 1 bath · 68 m2", ["PropHero exclusive", "Rent: EUR 520 pm", "Net yield: 6.7%"]],
    ["property-photo-b", "EUR 142,000", "Madrid · 2 beds · terrace · 74 m2", ["Renovated", "Rent: EUR 890 pm", "Net yield: 5.9%"]],
    ["property-photo-c", "EUR 118,500", "Malaga · apartment · 62 m2", ["High demand", "Rent: EUR 760 pm", "Net yield: 6.2%"]],
  ];

  return (
    <section className="property-strip" aria-label="Featured properties">
      {items.map(([photoClass, price, description, tags]) => (
        <article className="property-card" key={price}>
          <div className={`property-photo ${photoClass}`}></div>
          <div className="property-card-body">
            <strong>{price}</strong>
            <span>{description}</span>
            <div className="property-tags">
              {tags.map((tag) => <small key={tag}>{tag}</small>)}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

function MobileScreen({ active, children }) {
  return <section className={`mobile-screen ${active ? "active" : ""}`}>{children}</section>;
}

function Backbar({ onBack }) {
  return (
    <header className="mobile-backbar">
      <button type="button" onClick={onBack} aria-label="Back"></button>
    </header>
  );
}

function MobileBottom({ active, setScreen }) {
  const items = [
    ["home", "icon-home", "Home", () => setScreen("home")],
    ["search", "icon-search", "Explore"],
    ["advisor", "icon-advisor", "Advisor"],
    ["list", "icon-list", "List"],
    ["panel", "icon-panel", "Panel"],
  ];
  return (
    <nav className="mobile-bottom">
      {items.map(([key, icon, label, onClick]) => (
        <button key={key} className={active === key ? "active" : ""} type="button" onClick={onClick}>
          <MobileIcon id={icon} /><span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function AccountGroup({ items, single = false }) {
  return (
    <div className={`account-group ${single ? "single" : ""}`}>
      {items.map(([icon, label]) => (
        <button key={label} type="button"><MobileIcon id={icon} /><span>{label}</span></button>
      ))}
    </div>
  );
}

function attachmentSummary(attachments) {
  const labels = [];
  if (attachments.has("photo")) labels.push("2 images");
  if (attachments.has("video")) labels.push("1 video");
  return labels.length ? `${labels.join(" + ")} ready to send.` : "You can attach photos or videos to speed up the review.";
}

function useMobileState(initial) {
  return useState(initial);
}
