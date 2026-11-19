-- Visitor analytics. No IP addresses, names or emails are stored.
-- One row per browser session (a tab session; a new one starts after 30 minutes idle).
CREATE TABLE IF NOT EXISTS sessions (
  id            TEXT PRIMARY KEY,
  visitor       TEXT    NOT NULL,             -- random id kept in the browser
  is_new        INTEGER NOT NULL DEFAULT 1,   -- 1 = first session of this visitor
  first_ts      INTEGER NOT NULL,
  last_ts       INTEGER NOT NULL,             -- updated by page views and a heartbeat
  country       TEXT,                         -- ISO code from Cloudflare
  city          TEXT,
  device        TEXT,                         -- mobile | tablet | desktop
  browser       TEXT,
  os            TEXT,
  referrer      TEXT,                         -- host only
  utm_source    TEXT,
  landing       TEXT,
  locale        TEXT,
  pageviews     INTEGER NOT NULL DEFAULT 0,
  quiz_level    TEXT,                         -- last test started in this session
  quiz_started  INTEGER NOT NULL DEFAULT 0,   -- number of tests started
  quiz_answered INTEGER NOT NULL DEFAULT 0,   -- answers given in the last test
  quiz_total    INTEGER NOT NULL DEFAULT 0,
  quiz_done     INTEGER NOT NULL DEFAULT 0,   -- number of tests finished
  attempt_id    TEXT
);
CREATE INDEX IF NOT EXISTS idx_sessions_first ON sessions (first_ts);
CREATE INDEX IF NOT EXISTS idx_sessions_last ON sessions (last_ts);

-- Raw events: pageview, quiz_start, quiz_done, quiz_leave
CREATE TABLE IF NOT EXISTS events (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  ts       INTEGER NOT NULL,
  session  TEXT    NOT NULL,
  type     TEXT    NOT NULL,
  path     TEXT,
  level    TEXT,
  answered INTEGER,
  total    INTEGER
);
CREATE INDEX IF NOT EXISTS idx_events_ts ON events (ts);
CREATE INDEX IF NOT EXISTS idx_events_session ON events (session);
