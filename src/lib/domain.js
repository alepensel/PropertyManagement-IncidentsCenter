import { entityDirectory } from "../data/incidentData.js";

export const priorityRank = {
  P1: 1,
  P2: 2,
  P3: 3,
  P4: 4,
};

export const slaLimits = {
  P1: 15,
  P2: 60,
  P3: 120,
  P4: 240,
};

export function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export function normalizeSearch(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

export function channelClass(channel) {
  return String(channel || "app").toLowerCase();
}

export function priorityClass(priority) {
  return `priority ${String(priority || "P4").toLowerCase()}`;
}

export function slaMinutes(ticket) {
  const hours = ticket.sla.match(/(\d+)h/);
  const minutes = ticket.sla.match(/(\d+)m/);
  const total = (hours ? Number(hours[1]) * 60 : 0) + (minutes ? Number(minutes[1]) : 0);
  return ticket.sla.includes("overdue") ? -total : total;
}

export function isSlaRisk(ticket) {
  return ["P1", "P2"].includes(ticket.priority) || ticket.sla.includes("overdue");
}

export function sortByTriage(items) {
  return [...items].sort((a, b) => {
    const priorityDiff = priorityRank[a.priority] - priorityRank[b.priority];
    if (priorityDiff !== 0) return priorityDiff;
    return slaMinutes(a) - slaMinutes(b);
  });
}

export function severityCopy(priority) {
  if (priority === "P1") return "Critical · High impact";
  if (priority === "P2") return "High · Resolve soon";
  if (priority === "P3") return "Medium · Follow-up";
  return "Low · Informational";
}

export function senderEmail(ticket) {
  if (ticket.email) return ticket.email;
  const localPart = normalizeSearch(ticket.requester).replace(/\d/g, "");
  const domain = ticket.role === "Tenant" ? "gmail.com" : ticket.role === "Provider" ? "providers.example" : "prophero-investors.com";
  return `${localPart || "contact"}@${domain}`;
}

export function messageClass(author) {
  return author.includes("Maria Gonzalez") || author.includes("System") || author.includes("AI") ? "prophero-message" : "requester-message";
}

export function isAiActivity(author) {
  return author.includes("AI") || author.includes("System");
}

export function formatSlaMinutes(minutes) {
  const absolute = Math.abs(minutes);
  const hours = Math.floor(absolute / 60);
  const remainingMinutes = absolute % 60;
  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (remainingMinutes > 0 || !parts.length) parts.push(`${remainingMinutes}m`);
  return `${parts.join(" ")} ${minutes < 0 ? "overdue" : "remaining"}`;
}

export function inferElapsedMinutes(ticket, previousPriority) {
  if (ticket.sla === "Within SLA") return Math.round(slaLimits[previousPriority] * 0.35);
  const currentDelta = slaMinutes(ticket);
  return currentDelta < 0 ? slaLimits[previousPriority] + Math.abs(currentDelta) : Math.max(0, slaLimits[previousPriority] - currentDelta);
}

export function recalculateSla(ticket, previousPriority, nextPriority) {
  const elapsed = inferElapsedMinutes(ticket, previousPriority);
  const nextDelta = slaLimits[nextPriority] - elapsed;
  return formatSlaMinutes(nextDelta);
}

export function requesterLabel(person) {
  return `${person.name} · ${person.role} · ${person.documentType} ${person.documentNumber}`;
}

export function propertyLabel(property) {
  return `${property.name} · ${property.id}`;
}

export function contractLabel(contract) {
  return `${contract.name} · ${contract.id}`;
}

export function allProperties() {
  return entityDirectory.flatMap((person) => person.properties);
}

export function allContracts() {
  return allProperties().flatMap((property) => property.contracts);
}

export function findRequester(value, ticket) {
  const normalizedValue = normalizeSearch(value);
  return (
    entityDirectory.find((person) => requesterLabel(person) === value) ||
    entityDirectory.find((person) => person.documentNumber === ticket.documentNumber) ||
    entityDirectory.find((person) => normalizeSearch(requesterLabel(person)).includes(normalizedValue))
  );
}

export function findProperty(value, requester) {
  const properties = requester ? requester.properties : allProperties();
  const normalizedValue = normalizeSearch(value);
  return properties.find((property) => propertyLabel(property) === value) || properties.find((property) => normalizeSearch(propertyLabel(property)).includes(normalizedValue));
}

export function findContract(value, property, requester) {
  const contracts = property ? property.contracts : requester ? requester.properties.flatMap((item) => item.contracts) : allContracts();
  const normalizedValue = normalizeSearch(value);
  return contracts.find((contract) => contractLabel(contract) === value) || contracts.find((contract) => normalizeSearch(contractLabel(contract)).includes(normalizedValue));
}

export function currentDirectoryMatch(ticket) {
  const requester = entityDirectory.find((person) => person.documentNumber === ticket.documentNumber) || entityDirectory.find((person) => person.name === ticket.requester);
  const properties = requester ? requester.properties : allProperties();
  const property = properties.find((item) => item.id === ticket.propertyId) || properties.find((item) => item.name === ticket.property);
  const contract = findContract(`${ticket.contract} · ${ticket.contractId}`, property, requester);
  return { requester, property, contract };
}

export function filterTickets(tickets, filters) {
  const priority = filters.priority || "all";
  const search = String(filters.search || "").trim().toLowerCase();
  const normalizedSearch = normalizeSearch(search);
  const dateFrom = filters.dateFrom || "";
  const dateTo = filters.dateTo || "";

  return tickets.filter((ticket) => {
    const navMatch =
      (filters.activeFilter === "total" && !["Resolved", "Closed"].includes(ticket.status)) ||
      (filters.activeFilter === "mine" && ticket.assignee === "Maria Gonzalez" && !["Resolved", "Closed"].includes(ticket.status)) ||
      (filters.activeFilter === "new" && ticket.status === "New") ||
      (filters.activeFilter === "assigned" && ticket.status === "Open / Assigned") ||
      (filters.activeFilter === "progress" && ticket.status === "In progress") ||
      (filters.activeFilter === "pending" && ticket.status === "Pending / Waiting") ||
      (filters.activeFilter === "resolved" && ticket.status === "Resolved") ||
      (filters.activeFilter === "closed" && ticket.status === "Closed");
    const priorityMatch = priority === "all" || ticket.priority === priority;
    const searchableFields = [
      ticket.title,
      ticket.requester,
      ticket.role,
      ticket.property,
      ticket.propertyId,
      ticket.contract,
      ticket.contractId,
      ticket.id,
      ticket.documentType,
      ticket.documentNumber,
      ticket.channel,
      ticket.category,
    ];
    const searchMatch =
      !search ||
      searchableFields.some((value) => String(value).toLowerCase().includes(search) || normalizeSearch(value).includes(normalizedSearch));
    const fromMatch = !dateFrom || ticket.createdDate >= dateFrom;
    const toMatch = !dateTo || ticket.createdDate <= dateTo;
    return navMatch && priorityMatch && searchMatch && fromMatch && toMatch;
  });
}

export function getMetrics(tickets) {
  const nonClosed = tickets.filter((ticket) => ticket.status !== "Closed");
  const open = tickets.filter((ticket) => !["Resolved", "Closed"].includes(ticket.status)).length;
  const metric = (priority) => nonClosed.filter((ticket) => ticket.priority === priority).length;
  const overdue = (priority) => nonClosed.filter((ticket) => ticket.priority === priority && ticket.sla.includes("overdue")).length;
  const p2AtRisk = nonClosed.filter((ticket) => ticket.priority === "P2" && !ticket.sla.includes("overdue")).length;

  return {
    open,
    p1: metric("P1"),
    p2: metric("P2"),
    p3: metric("P3"),
    p4: metric("P4"),
    p1Overdue: overdue("P1"),
    p2Overdue: overdue("P2"),
    p3Overdue: overdue("P3"),
    p4Overdue: overdue("P4"),
    p2AtRisk,
    mine: tickets.filter((ticket) => ticket.assignee === "Maria Gonzalez" && !["Resolved", "Closed"].includes(ticket.status)).length,
    newTickets: tickets.filter((ticket) => ticket.status === "New").length,
    assigned: tickets.filter((ticket) => ticket.status === "Open / Assigned").length,
    progress: tickets.filter((ticket) => ticket.status === "In progress").length,
    waiting: tickets.filter((ticket) => ticket.status === "Pending / Waiting").length,
    resolved: tickets.filter((ticket) => ticket.status === "Resolved").length,
    closed: tickets.filter((ticket) => ticket.status === "Closed").length,
  };
}

export function categoryDefaultPriority(category) {
  if (category === "Security") return "P1";
  if (category === "Maintenance" || category === "Payments") return "P2";
  if (category === "Contract" || category === "Operations") return "P3";
  return "P4";
}

export function nextTicketId(tickets) {
  const next = tickets.reduce((max, ticket) => {
    const number = Number(ticket.id.replace(/\D/g, ""));
    return Number.isFinite(number) ? Math.max(max, number) : max;
  }, 202600000) + 1;
  return `INC-${String(next).slice(0, 4)}-${String(next).slice(4).padStart(5, "0")}`;
}
