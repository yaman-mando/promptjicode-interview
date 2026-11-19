-- One row per finished test. No names or emails are stored.
CREATE TABLE IF NOT EXISTS attempts (
  id           TEXT PRIMARY KEY,
  mode         TEXT    NOT NULL DEFAULT 'level',  -- 'level' now, 'open' later
  level        TEXT    NOT NULL,                  -- junior | mid | senior
  locale       TEXT    NOT NULL,
  score        INTEGER NOT NULL,
  total        INTEGER NOT NULL,
  ratio        REAL    NOT NULL,                  -- score / total, used for percentiles
  duration_ms  INTEGER NOT NULL,
  question_ids TEXT    NOT NULL,                  -- JSON array
  answers      TEXT    NOT NULL,                  -- JSON array of chosen option indexes (or null)
  token        TEXT    NOT NULL UNIQUE,           -- signed test token, one save per test
  created_at   INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_attempts_level_ratio ON attempts (level, ratio);
