-- Custom and open tests: time limit, chosen topics, and the estimated level of an open test
ALTER TABLE attempts ADD COLUMN time_limit INTEGER NOT NULL DEFAULT 0;
ALTER TABLE attempts ADD COLUMN topics TEXT;
ALTER TABLE attempts ADD COLUMN estimate TEXT;
CREATE INDEX IF NOT EXISTS idx_attempts_mode ON attempts (mode, level, ratio);
