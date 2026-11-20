-- Frontend, backend or full-stack test. Older attempts were all frontend.
ALTER TABLE attempts ADD COLUMN track TEXT NOT NULL DEFAULT 'frontend';
CREATE INDEX IF NOT EXISTS idx_attempts_track ON attempts (track, mode, level, ratio);
