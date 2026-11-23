-- Questions served per device, per hour and per day, so nobody can pull the whole bank with a script.
-- `key` is an HMAC of the IP and the UTC date: the IP itself is never stored, and the key changes every day.
CREATE TABLE IF NOT EXISTS rate_limits (
  key     TEXT    NOT NULL,
  bucket  TEXT    NOT NULL,   -- h:<hours since epoch> | d:<days since epoch>
  count   INTEGER NOT NULL,
  expires INTEGER NOT NULL,   -- ms; rows past this are deleted
  PRIMARY KEY (key, bucket)
);
CREATE INDEX IF NOT EXISTS idx_rate_limits_expires ON rate_limits (expires);
