export const statuses = [
  "New",
  "Open / Assigned",
  "In progress",
  "Pending / Waiting",
  "Resolved",
  "Closed",
];

export const assignees = [
  "Unassigned",
  "Maria Gonzalez",
  "Carlos Perez",
  "Lucia Alvarez",
  "Property Manager Valencia",
];

export const priorities = ["P1", "P2", "P3", "P4"];

export const categories = [
  "Maintenance",
  "Security",
  "Administration",
  "Contract",
  "Reporting",
  "Payments",
  "Operations",
];

export const entityDirectory = [
  {
    name: "Laura Martinez",
    role: "Investor",
    documentType: "DNI",
    documentNumber: "DEMO-DNI-001",
    properties: [
      {
        name: "Valencia - Ruzafa 2B",
        id: "PROP-002113",
        contracts: [
          { name: "Rental Contract", id: "CONT-00778", startDate: "01/03/2025" },
          { name: "PM Mandate", id: "CONT-00778-PM", startDate: "15/01/2025" },
        ],
      },
      {
        name: "Valencia - Ruzafa 1D",
        id: "PROP-002219",
        contracts: [{ name: "PM Mandate", id: "CONT-00841-PM", startDate: "10/04/2025" }],
      },
    ],
  },
  {
    name: "Carlos Ruiz",
    role: "Tenant",
    documentType: "NIE",
    documentNumber: "DEMO-NIE-002",
    properties: [
      {
        name: "Madrid - Chamberi 4A",
        id: "PROP-004311",
        contracts: [{ name: "Rental Contract", id: "CONT-00912", startDate: "01/02/2025" }],
      },
    ],
  },
  {
    name: "Ana Fernandez",
    role: "Tenant",
    documentType: "Passport",
    documentNumber: "DEMO-PASS-003",
    properties: [
      {
        name: "Barcelona - Poblenou 1C",
        id: "PROP-001894",
        contracts: [{ name: "Rental Contract", id: "CONT-00631", startDate: "20/05/2025" }],
      },
    ],
  },
  {
    name: "Miguel Angel Soto",
    role: "Investor",
    documentType: "DNI",
    documentNumber: "DEMO-DNI-004",
    properties: [
      {
        name: "Madrid - Salamanca 3E",
        id: "PROP-005214",
        contracts: [
          { name: "PM Mandate", id: "CONT-01082", startDate: "01/11/2024" },
          { name: "Rental Contract", id: "CONT-01083", startDate: "01/12/2024" },
        ],
      },
    ],
  },
  {
    name: "Javier Lopez",
    role: "Tenant",
    documentType: "NIE",
    documentNumber: "DEMO-NIE-005",
    properties: [
      {
        name: "Valencia - Ruzafa 1D",
        id: "PROP-002219",
        contracts: [{ name: "Rental Contract", id: "CONT-00841", startDate: "01/04/2025" }],
      },
    ],
  },
  {
    name: "Sofia Garcia",
    role: "Investor",
    documentType: "DNI",
    documentNumber: "DEMO-DNI-006",
    properties: [
      {
        name: "Barcelona - Eixample 2A",
        id: "PROP-003022",
        contracts: [
          { name: "PM Mandate", id: "CONT-00688", startDate: "15/09/2024" },
          { name: "Rental Contract", id: "CONT-00689", startDate: "01/10/2024" },
        ],
      },
    ],
  },
  {
    name: "Pedro Sanchez",
    role: "Investor",
    documentType: "Passport",
    documentNumber: "DEMO-PASS-007",
    properties: [
      {
        name: "Madrid - Chamberi 4A",
        id: "PROP-004311",
        contracts: [{ name: "PM Mandate", id: "CONT-00912-PM", startDate: "12/01/2025" }],
      },
    ],
  },
  {
    name: "Nadia Romero",
    role: "Investor",
    documentType: "DNI",
    documentNumber: "DEMO-DNI-008",
    properties: [
      {
        name: "Malaga - Centre 5B",
        id: "PROP-006018",
        contracts: [
          { name: "PM Mandate", id: "CONT-01104", startDate: "18/02/2025" },
          { name: "Rental Contract", id: "CONT-01105", startDate: "01/03/2025" },
        ],
      },
    ],
  },
  {
    name: "Diego Medina",
    role: "Provider",
    documentType: "DNI",
    documentNumber: "DEMO-DNI-009",
    properties: [
      {
        name: "Sevilla - Triana 2C",
        id: "PROP-007204",
        contracts: [{ name: "Service Order", id: "OS-00118", startDate: "05/06/2025" }],
      },
    ],
  },
  {
    name: "Valeria Torres",
    role: "Tenant",
    documentType: "NIE",
    documentNumber: "DEMO-NIE-010",
    properties: [
      {
        name: "Malaga - Centre 5B",
        id: "PROP-006018",
        contracts: [{ name: "Rental Contract", id: "CONT-01105", startDate: "01/03/2025" }],
      },
    ],
  },
];

export const seedTickets = [
  {
    id: "INC-2026-00482",
    title: "Wall damp - Valencia Ruzafa 2B",
    requester: "Laura Martinez",
    role: "Investor",
    documentType: "DNI",
    documentNumber: "DEMO-DNI-001",
    property: "Valencia - Ruzafa 2B",
    propertyId: "PROP-002113",
    contract: "Rental Contract",
    contractId: "CONT-00778",
    channel: "WhatsApp",
    created: "Today, 09:12",
    createdDate: "2026-06-15",
    priority: "P1",
    status: "In progress",
    assignee: "Maria Gonzalez",
    sla: "10m overdue",
    category: "Maintenance",
    confidence: 92,
    summary: "The investor reports damp on the bedroom wall. Two photos are attached and an urgent maintenance review is requested.",
    missing: ["Since when has this been happening?", "Are there more affected areas?", "Has the tenant been informed?"],
    next: "Assign to Valencia maintenance and request availability for a visit within the next 24 hours.",
    messages: [
      [
        "Laura Martinez",
        "Good morning, damp has appeared on the bedroom wall. I attached photos. Could you please review it?",
        "Today, 09:12",
        [
          { type: "photo", name: "wall-damp-1.jpg", description: "Damp near the skirting board", preview: "/assets/incident-evidence/wall-damp-bedroom.png" },
          { type: "photo", name: "wall-damp-2.jpg", description: "Moisture and damaged plaster detail", preview: "/assets/incident-evidence/wall-damp-bedroom.png" },
          { type: "video", name: "bedroom-walkthrough.mp4", description: "Video 0:18", preview: "/assets/incident-evidence/wall-damp-bedroom.png" },
        ],
      ],
      ["System / AI", "Ticket classified as maintenance P1 due to habitability risk.", "Today, 09:13"],
      ["Maria Gonzalez", "Hi Laura, we have created the incident and assigned it to the maintenance team. We will update you shortly.", "Today, 09:25"],
    ],
  },
  {
    id: "INC-2026-00481",
    title: "Kitchen water leak",
    requester: "Carlos Ruiz",
    role: "Tenant",
    documentType: "NIE",
    documentNumber: "DEMO-NIE-002",
    property: "Madrid - Chamberi 4A",
    propertyId: "PROP-004311",
    contract: "Rental Contract",
    contractId: "CONT-00912",
    channel: "Email",
    created: "Today, 09:05",
    createdDate: "2026-06-15",
    priority: "P1",
    status: "New",
    assignee: "Unassigned",
    sla: "5m remaining",
    category: "Maintenance",
    confidence: 89,
    summary: "The tenant reports a leak under the kitchen sink. Photos and a short walkthrough are attached; confirmation that the water has been shut off is still needed.",
    missing: ["Confirm whether the water was shut off", "Contact phone"],
    next: "Confirm whether an urgent provider is required.",
    messages: [["Carlos Ruiz", "There is a water leak under the sink and the floor is wet. I have attached photos and a short video.", "Today, 09:05", [
      { type: "photo", name: "kitchen-leak-cabinet.jpg", description: "Leaking sink trap and wet cabinet base", preview: "/assets/incident-evidence/kitchen-sink-leak.png" },
      { type: "photo", name: "kitchen-leak-pipe.jpg", description: "Active drip from the pipe joint", preview: "/assets/incident-evidence/kitchen-sink-leak.png" },
      { type: "video", name: "kitchen-leak-walkthrough.mp4", description: "Video 0:14", preview: "/assets/incident-evidence/kitchen-sink-leak.png" },
    ]]],
  },
  {
    id: "INC-2026-00476",
    title: "Air conditioning not cooling",
    requester: "Ana Fernandez",
    role: "Tenant",
    documentType: "Passport",
    documentNumber: "DEMO-PASS-003",
    property: "Barcelona - Poblenou 1C",
    propertyId: "PROP-001894",
    contract: "Rental Contract",
    contractId: "CONT-00631",
    channel: "App",
    created: "Today, 08:32",
    createdDate: "2026-06-15",
    priority: "P2",
    status: "Open / Assigned",
    assignee: "Carlos Perez",
    sla: "35m remaining",
    category: "Maintenance",
    confidence: 87,
    summary: "The tenant reports that the air conditioning turns on but does not cool. A photo and short video of the unit running are attached; temperature affects habitability.",
    missing: ["Equipment model", "Last maintenance date"],
    next: "Assign to HVAC provider and request equipment details.",
    messages: [["Ana Fernandez", "The air conditioning has not cooled since yesterday. It turns on but blows warm air. I attached a photo and video.", "Today, 08:32", [
      { type: "photo", name: "ac-unit-display.jpg", description: "Unit is on while the room remains warm", preview: "/assets/incident-evidence/ac-not-cooling.png" },
      { type: "video", name: "ac-airflow-check.mp4", description: "Video 0:11", preview: "/assets/incident-evidence/ac-not-cooling.png" },
    ]]],
  },
  {
    id: "INC-2026-00472",
    title: "Community fees question",
    requester: "Miguel Angel Soto",
    role: "Investor",
    documentType: "DNI",
    documentNumber: "DEMO-DNI-004",
    property: "Madrid - Salamanca 3E",
    propertyId: "PROP-005214",
    contract: "PM Mandate",
    contractId: "CONT-01082",
    channel: "HubSpot",
    created: "Yesterday, 17:20",
    createdDate: "2026-06-14",
    priority: "P3",
    status: "Pending / Waiting",
    assignee: "Lucia Alvarez",
    sla: "1h 20m remaining",
    category: "Administration",
    confidence: 81,
    summary: "The investor asks about a community fee shown in the monthly report and has attached the invoice with the charge circled.",
    missing: ["Confirm charge period"],
    next: "Send a charge breakdown and link to the monthly report.",
    messages: [["Miguel Angel Soto", "I do not understand this month community fee. Can you explain it? I attached the invoice and circled the charge.", "Yesterday, 17:20", [
      { type: "photo", name: "community-fee-invoice.jpg", description: "Community fee invoice with the charge circled", preview: "/assets/incident-evidence/community-fee-invoice.png" },
    ]]],
  },
  {
    id: "INC-2026-00470",
    title: "Blind does not go up",
    requester: "Javier Lopez",
    role: "Tenant",
    documentType: "NIE",
    documentNumber: "DEMO-NIE-005",
    property: "Valencia - Ruzafa 1D",
    propertyId: "PROP-002219",
    contract: "Rental Contract",
    contractId: "CONT-00841",
    channel: "WhatsApp",
    created: "Today, 10:05",
    createdDate: "2026-06-15",
    priority: "P2",
    status: "Pending / Waiting",
    assignee: "Property Manager Valencia",
    sla: "10m overdue",
    category: "Maintenance",
    confidence: 86,
    summary: "The tenant reports that the bedroom blind is stuck and cannot be raised. Photos and a short video are attached.",
    missing: ["Confirm whether it affects access or security"],
    next: "Assign a local blind repair provider and confirm same-day availability.",
    messages: [["Javier Lopez", "The bedroom blind is stuck down and will not go up. I have attached photos and a video showing the problem.", "Today, 10:05", [
      { type: "photo", name: "bedroom-blind-stuck.jpg", description: "Jammed blind slats and tangled control cord", preview: "/assets/incident-evidence/stuck-bedroom-blind.png" },
      { type: "video", name: "blind-control-test.mp4", description: "Video 0:09", preview: "/assets/incident-evidence/stuck-bedroom-blind.png" },
    ]]],
  },
  {
    id: "INC-2026-00468",
    title: "Contract renewal question",
    requester: "Sofia Garcia",
    role: "Investor",
    documentType: "DNI",
    documentNumber: "DEMO-DNI-006",
    property: "Barcelona - Eixample 2A",
    propertyId: "PROP-003022",
    contract: "PM Mandate",
    contractId: "CONT-00688",
    channel: "Email",
    created: "Today, 11:10",
    createdDate: "2026-06-15",
    priority: "P3",
    status: "Pending / Waiting",
    assignee: "Lucia Alvarez",
    sla: "45m remaining",
    category: "Contract",
    confidence: 79,
    summary: "The investor asks about next steps for the rental contract renewal.",
    missing: ["Confirm desired renewal date", "Validate current terms"],
    next: "Reply with renewal options and request preference confirmation.",
    messages: [["Sofia Garcia", "I would like to know how we are moving forward with the contract renewal.", "Today, 11:10"]],
  },
  {
    id: "INC-2026-00464",
    title: "2024 invoice request",
    requester: "Laura Martinez",
    role: "Investor",
    documentType: "DNI",
    documentNumber: "DEMO-DNI-001",
    property: "Valencia - Ruzafa 2B",
    propertyId: "PROP-002113",
    contract: "PM Mandate",
    contractId: "CONT-00778",
    channel: "HubSpot",
    created: "Yesterday, 12:40",
    createdDate: "2026-06-14",
    priority: "P4",
    status: "Resolved",
    assignee: "Maria Gonzalez",
    sla: "3h 10m remaining",
    category: "Administration",
    confidence: 76,
    summary: "The investor requests an annual invoice for tax documentation.",
    missing: ["No missing information"],
    next: "Send invoice and close if receipt is confirmed.",
    messages: [["Maria Gonzalez", "Invoice sent by email. We are leaving the case resolved.", "Yesterday, 13:05"]],
  },
  {
    id: "INC-2026-00460",
    title: "Monthly report question",
    requester: "Pedro Sanchez",
    role: "Investor",
    documentType: "Passport",
    documentNumber: "DEMO-PASS-007",
    property: "Madrid - Chamberi 4A",
    propertyId: "PROP-004311",
    contract: "PM Mandate",
    contractId: "CONT-00912",
    channel: "App",
    created: "Today, 12:05",
    createdDate: "2026-06-15",
    priority: "P4",
    status: "New",
    assignee: "Unassigned",
    sla: "3h 40m remaining",
    category: "Reporting",
    confidence: 74,
    summary: "The investor asks when the monthly property report will be available.",
    missing: ["Confirm requested month"],
    next: "Reply with estimated publication date and link the report when available.",
    messages: [["Pedro Sanchez", "When can I see the monthly Chamberi report?", "Today, 12:05"]],
  },
];

const caseCatalog = [
  {
    title: "Lock does not open",
    category: "Security",
    priority: "P1",
    summary: "The requester cannot access the property and requires urgent intervention.",
    missing: ["Photo of the lock", "Confirm whether anyone is inside", "Contact phone"],
    next: "Assign on-call locksmith and confirm safe access.",
    message: "I cannot open the front door. The key turns but does not unlock.",
  },
  {
    title: "Water heater without hot water",
    category: "Maintenance",
    priority: "P2",
    summary: "The water heater does not turn on and affects an essential property service.",
    missing: ["Photo of the water heater", "Equipment model", "Confirm whether it affects kitchen and shower"],
    next: "Request equipment photo and assign plumbing provider.",
    message: "We have had no hot water since last night. The water heater does not turn on.",
  },
  {
    title: "Water leaking from bathroom ceiling",
    category: "Maintenance",
    priority: "P1",
    summary: "Water is reported falling from the bathroom ceiling with possible habitability impact.",
    missing: ["Video of the leak", "Confirm whether the water was shut off", "Notify the upstairs neighbour"],
    next: "Escalate to property manager and urgent plumbing provider.",
    message: "Water is falling from the bathroom ceiling. I put a bucket down but it keeps dripping.",
  },
  {
    title: "Monthly statement review",
    category: "Reporting",
    priority: "P3",
    summary: "The investor requests clarification about monthly report amounts.",
    missing: ["Requested month", "Exact report line"],
    next: "Review report and send transaction breakdown.",
    message: "I need to review a difference in my property monthly statement.",
  },
  {
    title: "Bank account ownership change",
    category: "Administration",
    priority: "P4",
    summary: "The investor requests a change to the payout bank account.",
    missing: ["Updated IBAN", "Bank account ownership document"],
    next: "Request documentation and send secure update flow.",
    message: "I want to change the account where I receive rental payments.",
  },
  {
    title: "Building works noise",
    category: "Operations",
    priority: "P3",
    summary: "The tenant reports disturbance from building works and asks how long they will last.",
    missing: ["Noise schedule", "Photos or community notice"],
    next: "Check with building administration and reply with estimated timeline.",
    message: "There are very noisy works from early morning. Do you know how long it will last?",
  },
  {
    title: "Rent payment not received",
    category: "Payments",
    priority: "P2",
    summary: "The investor does not see the expected rent payment in their account.",
    missing: ["Rent month", "Expected payment date"],
    next: "Validate bank reconciliation and communicate payment status.",
    message: "I do not see this month rent payment credited.",
  },
  {
    title: "Renewal pending signature",
    category: "Contract",
    priority: "P3",
    summary: "The contract renewal is pending confirmation from one party.",
    missing: ["Party pending signature", "Deadline"],
    next: "Send reminder and update contract status.",
    message: "I wanted to know whether the renewal is ready to sign.",
  },
  {
    title: "Key lost by tenant",
    category: "Security",
    priority: "P2",
    summary: "The tenant lost a key and asks for replacement instructions.",
    missing: ["Confirm whether a copy is available", "Risk of unauthorised access"],
    next: "Coordinate copy or lock cylinder change depending on risk.",
    message: "I lost a flat key and need to know how to proceed.",
  },
];

const evidenceByTicket = {
  492: [
    { type: "photo", name: "bathroom-ceiling-leak.jpg", description: "Active ceiling leak and water damage", preview: "/assets/incident-evidence/bathroom-ceiling-leak.png" },
    { type: "video", name: "ceiling-drip.mp4", description: "Video 0:16", preview: "/assets/incident-evidence/bathroom-ceiling-leak.png" },
  ],
  495: [
    { type: "photo", name: "building-works-view.jpg", description: "Building renovation work directly outside the property", preview: "/assets/incident-evidence/building-works-noise.png" },
    { type: "video", name: "works-noise-sample.mp4", description: "Video 0:10", preview: "/assets/incident-evidence/building-works-noise.png" },
  ],
  501: [
    { type: "photo", name: "monthly-statement-page.jpg", description: "Monthly statement with the queried line highlighted", preview: "/assets/incident-evidence/monthly-statement-question.png" },
  ],
  504: [
    { type: "photo", name: "bathroom-ceiling-leak.jpg", description: "Active ceiling leak and water damage", preview: "/assets/incident-evidence/bathroom-ceiling-leak.png" },
  ],
};

function withoutMediaRequests(items, attachments) {
  if (!attachments.length) return items;
  return items.filter((item) => !/(photo|image|video|media|attachment)/i.test(item));
}

function nextActionWithEvidence(next, attachments) {
  if (!attachments.length) return next;
  return next
    .replace(/^Request equipment photo and /i, "")
    .replace(/^Request photos and /i, "")
    .replace(/^Request a video of the leak and /i, "");
}

const seedPlan = [
  [490, 7, 0, 0, "P1", "New", "Unassigned", "WhatsApp", "12m overdue", "Today, 08:48", "2026-06-15"],
  [491, 8, 0, 1, "P2", "Open / Assigned", "Carlos Perez", "HubSpot", "42m remaining", "Today, 08:55", "2026-06-15"],
  [492, 9, 0, 2, "P1", "In progress", "Maria Gonzalez", "Email", "18m overdue", "Today, 09:18", "2026-06-15"],
  [493, 0, 1, 3, "P3", "Pending / Waiting", "Lucia Alvarez", "App", "1h 55m remaining", "Today, 09:45", "2026-06-15"],
  [494, 1, 0, 4, "P4", "New", "Unassigned", "Email", "3h 30m remaining", "Today, 10:20", "2026-06-15"],
  [495, 2, 0, 5, "P3", "Open / Assigned", "Carlos Perez", "WhatsApp", "1h 15m remaining", "Today, 10:40", "2026-06-15"],
  [496, 3, 0, 6, "P2", "Pending / Waiting", "Maria Gonzalez", "HubSpot", "8m overdue", "Today, 11:02", "2026-06-15"],
  [497, 4, 0, 7, "P3", "In progress", "Lucia Alvarez", "Email", "55m remaining", "Today, 11:30", "2026-06-15"],
  [498, 5, 0, 8, "P2", "New", "Unassigned", "App", "28m remaining", "Today, 11:52", "2026-06-15"],
  [499, 6, 0, 3, "P3", "Resolved", "Maria Gonzalez", "Email", "Within SLA", "Today, 12:10", "2026-06-15"],
  [500, 7, 0, 4, "P4", "Closed", "Lucia Alvarez", "HubSpot", "Within SLA", "Yesterday, 16:35", "2026-06-14"],
  [501, 8, 0, 1, "P2", "In progress", "Property Manager Valencia", "WhatsApp", "50m remaining", "Yesterday, 15:10", "2026-06-14"],
  [502, 9, 0, 6, "P2", "Open / Assigned", "Maria Gonzalez", "App", "20m overdue", "Yesterday, 14:50", "2026-06-14"],
  [503, 0, 0, 0, "P1", "Pending / Waiting", "Carlos Perez", "WhatsApp", "25m overdue", "Yesterday, 13:10", "2026-06-14"],
  [504, 1, 0, 2, "P1", "In progress", "Maria Gonzalez", "Email", "6m remaining", "Yesterday, 12:05", "2026-06-14"],
  [505, 2, 0, 5, "P3", "New", "Unassigned", "App", "2h 15m remaining", "Yesterday, 11:40", "2026-06-14"],
  [506, 3, 0, 7, "P3", "Open / Assigned", "Lucia Alvarez", "HubSpot", "1h 35m remaining", "Yesterday, 10:20", "2026-06-14"],
  [507, 4, 0, 1, "P2", "Resolved", "Property Manager Valencia", "WhatsApp", "Within SLA", "Yesterday, 09:18", "2026-06-14"],
  [508, 5, 0, 4, "P4", "Pending / Waiting", "Maria Gonzalez", "Email", "2h 40m remaining", "2026-06-13, 18:10", "2026-06-13"],
  [509, 6, 0, 3, "P3", "Closed", "Carlos Perez", "App", "Within SLA", "2026-06-13, 16:25", "2026-06-13"],
  [510, 7, 0, 8, "P2", "New", "Unassigned", "WhatsApp", "1h remaining", "2026-06-13, 12:45", "2026-06-13"],
  [511, 8, 0, 0, "P1", "Open / Assigned", "Carlos Perez", "HubSpot", "14m remaining", "2026-06-13, 11:35", "2026-06-13"],
  [512, 9, 0, 5, "P3", "In progress", "Lucia Alvarez", "Email", "2h 5m remaining", "2026-06-12, 17:25", "2026-06-12"],
  [513, 0, 0, 6, "P2", "Pending / Waiting", "Maria Gonzalez", "App", "35m remaining", "2026-06-12, 15:50", "2026-06-12"],
  [514, 1, 0, 7, "P3", "Resolved", "Carlos Perez", "Email", "Within SLA", "2026-06-12, 14:15", "2026-06-12"],
  [515, 2, 0, 4, "P4", "New", "Unassigned", "HubSpot", "3h 20m remaining", "2026-06-11, 16:00", "2026-06-11"],
  [516, 3, 0, 3, "P3", "Open / Assigned", "Maria Gonzalez", "WhatsApp", "1h 10m remaining", "2026-06-11, 11:20", "2026-06-11"],
];

function makeSeedTicket([number, requesterIndex, propertyIndex, caseIndex, priority, status, assignee, channel, sla, created, createdDate]) {
  const person = entityDirectory[requesterIndex];
  const property = person.properties[propertyIndex] || person.properties[0];
  const contract = property.contracts[0];
  const item = caseCatalog[caseIndex];
  const attachments = evidenceByTicket[number] || [];
  return {
    id: `INC-2026-00${number}`,
    title: `${item.title} - ${property.name}`,
    requester: person.name,
    role: person.role,
    documentType: person.documentType,
    documentNumber: person.documentNumber,
    property: property.name,
    propertyId: property.id,
    contract: contract.name,
    contractId: contract.id,
    channel,
    created,
    createdDate,
    priority,
    status,
    assignee,
    sla,
    category: item.category,
    confidence: Math.max(71, 94 - (number % 19)),
    summary: item.summary,
    missing: withoutMediaRequests(item.missing, attachments),
    next: nextActionWithEvidence(item.next, attachments),
    messages: [
      [person.name, attachments.length ? `${item.message} I have attached supporting media.` : item.message, created, attachments],
      ["System / AI", `Ticket classified as ${item.category.toLowerCase()} ${priority} based on impact and SLA.`, created],
    ],
  };
}

seedTickets.push(...seedPlan.map(makeSeedTicket));

export function cloneSeedTickets() {
  return structuredClone(seedTickets);
}
