export function IconSprite() {
  return (
    <svg className="icon-sprite" aria-hidden="true">
      <symbol id="icon-home" viewBox="0 0 24 24">
        <path d="M4 10.5 12 4l8 6.5" />
        <path d="M6.5 10v8.5h11V10" />
        <path d="M9.5 18.5v-5h5v5" />
      </symbol>
      <symbol id="icon-search" viewBox="0 0 24 24">
        <circle cx="10.8" cy="10.8" r="5.8" />
        <path d="m15.2 15.2 4.3 4.3" />
      </symbol>
      <symbol id="icon-advisor" viewBox="0 0 24 24">
        <path d="M5 6.8c0-1.2 1-2.2 2.2-2.2h9.6c1.2 0 2.2 1 2.2 2.2v6.4c0 1.2-1 2.2-2.2 2.2h-4.2L8.4 19v-3.6H7.2c-1.2 0-2.2-1-2.2-2.2Z" />
        <path d="m12 7.4.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6Z" />
      </symbol>
      <symbol id="icon-list" viewBox="0 0 24 24">
        <path d="M6 5.5h12" />
        <path d="M6 12h12" />
        <path d="M6 18.5h12" />
        <path d="m3.8 5.5.8.8 1.4-1.6" />
        <path d="m3.8 12 .8.8 1.4-1.6" />
        <path d="m3.8 18.5.8.8 1.4-1.6" />
      </symbol>
      <symbol id="icon-panel" viewBox="0 0 24 24">
        <path d="M4.5 18.5V5.5" />
        <path d="M4.5 18.5h15" />
        <path d="m7.2 15 3.4-3.8 3 2.4 4.5-6" />
        <path d="M16.2 7.6h1.9v1.9" />
      </symbol>
      <symbol id="icon-user" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="3.8" />
        <path d="M5.5 19c1-3 3.2-4.6 6.5-4.6s5.5 1.6 6.5 4.6" />
      </symbol>
      <symbol id="icon-globe" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8" />
        <path d="M4.5 12h15" />
        <path d="M12 4c2 2.2 3 4.9 3 8s-1 5.8-3 8" />
        <path d="M12 4c-2 2.2-3 4.9-3 8s1 5.8 3 8" />
      </symbol>
      <symbol id="icon-coin" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7.5v9" />
        <path d="M14.5 9.2c-.6-.8-1.5-1.1-2.5-1.1-1.4 0-2.4.7-2.4 1.8 0 2.7 5 1.2 5 4.1 0 1.1-1 1.9-2.6 1.9-1.2 0-2.2-.4-2.9-1.3" />
      </symbol>
      <symbol id="icon-chat" viewBox="0 0 24 24">
        <path d="M5 6.7c0-1.3 1-2.3 2.3-2.3h9.4c1.3 0 2.3 1 2.3 2.3v5.8c0 1.3-1 2.3-2.3 2.3h-4.1L8.1 19v-4.2h-.8c-1.3 0-2.3-1-2.3-2.3Z" />
        <path d="M8.5 9.5h.1" />
        <path d="M12 9.5h.1" />
        <path d="M15.5 9.5h.1" />
      </symbol>
      <symbol id="icon-help" viewBox="0 0 24 24">
        <path d="M6.5 5.5h11v13h-11z" />
        <path d="M10 9.2c.3-1 1.1-1.6 2.2-1.6 1.3 0 2.2.8 2.2 2 0 1.6-1.7 1.8-2.1 3.1" />
        <path d="M12 16h.1" />
      </symbol>
      <symbol id="icon-invite" viewBox="0 0 24 24">
        <circle cx="9.5" cy="8.2" r="3.2" />
        <path d="M4.2 18c.8-2.8 2.6-4.2 5.3-4.2 1.2 0 2.2.3 3 .9" />
        <path d="M17.4 11.8c1.4 0 2.5 1 2.5 2.4 0 2.8-4 4.7-4 4.7s-4-1.9-4-4.7c0-1.4 1.1-2.4 2.5-2.4.7 0 1.2.3 1.5.8.3-.5.8-.8 1.5-.8Z" />
      </symbol>
    </svg>
  );
}

export function MobileIcon({ id }) {
  return (
    <svg className="mobile-icon" aria-hidden="true">
      <use href={`#${id}`} />
    </svg>
  );
}
