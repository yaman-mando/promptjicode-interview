-- Reports about mistakes in questions
CREATE TABLE IF NOT EXISTS reports (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at  INTEGER NOT NULL,
  question_id TEXT    NOT NULL,
  type        TEXT    NOT NULL,   -- wrong_answer | unclear | translation | code | other
  note        TEXT,
  name        TEXT,
  locale      TEXT,
  track       TEXT,
  status      TEXT    NOT NULL DEFAULT 'new'  -- new | done
);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports (status, created_at);
CREATE INDEX IF NOT EXISTS idx_reports_question ON reports (question_id);

-- Analytics for more than one site: interview (this app) and main (promptjicode.com, incl. /yaman)
ALTER TABLE sessions ADD COLUMN site TEXT NOT NULL DEFAULT 'interview';
CREATE INDEX IF NOT EXISTS idx_sessions_site ON sessions (site, first_ts);
-- Free label for click events, e.g. "email", "whatsapp", "service:rescue"
ALTER TABLE events ADD COLUMN label TEXT;
