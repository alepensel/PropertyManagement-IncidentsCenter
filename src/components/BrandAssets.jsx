export function PropHeroLogo({ tone = "blue", className = "" }) {
  return (
    <img
      className={`${className} ${tone === "white" ? "logo-white" : "logo-blue"}`.trim()}
      src="/assets/prophero-logo.png"
      alt="PropHero"
      loading="eager"
    />
  );
}

export function ChannelMark({ channel, className = "" }) {
  const key = String(channel || "App").toLowerCase();
  const iconMap = {
    email: "/assets/channel-gmail.png",
    whatsapp: "/assets/channel-whatsapp.png",
    hubspot: "/assets/channel-hubspot.png",
    app: "/assets/channel-prophero-app.png",
  };
  const labelMap = {
    email: "Gmail",
    whatsapp: "WhatsApp",
    hubspot: "HubSpot",
    app: "PropHero App",
  };

  return (
    <img
      className={`channel-mark channel-mark-${key} ${className}`}
      src={iconMap[key] || iconMap.app}
      alt={labelMap[key] || labelMap.app}
      loading="lazy"
    />
  );
}

export function AiMark({ className = "" }) {
  return <span className={`ai-mark ${className}`} aria-hidden="true">*</span>;
}
