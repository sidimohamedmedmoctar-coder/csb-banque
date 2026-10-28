// ── Types ─────────────────────────────────────────────────────────────────────

export type AuditLevel = 'INFO' | 'WARNING' | 'ERROR';

export interface AuditEntry {
  id:        number;
  timestamp: string;
  level:     AuditLevel;
  actor:     string;
  action:    string;
  details:   string;
}

// ── Clé de stockage ───────────────────────────────────────────────────────────

export const AUDIT_KEY  = 'bank_audit_logs';
const MAX_ENTRIES       = 500;   // rolling window

// ── Lecture ───────────────────────────────────────────────────────────────────

export function loadAuditLogs(): AuditEntry[] {
  try {
    const raw = localStorage.getItem(AUDIT_KEY);
    return raw ? (JSON.parse(raw) as AuditEntry[]) : [];
  } catch {
    return [];
  }
}

// ── Écriture ──────────────────────────────────────────────────────────────────

export function logAudit(entry: Omit<AuditEntry, 'id' | 'timestamp'>): void {
  try {
    const logs   = loadAuditLogs();
    const newLog: AuditEntry = {
      ...entry,
      id:        Date.now() + logs.length,   // collision-safe
      timestamp: new Date().toISOString(),
    };
    const updated = [...logs, newLog].slice(-MAX_ENTRIES);
    localStorage.setItem(AUDIT_KEY, JSON.stringify(updated));
    // Notifie les autres onglets ouverts (ex. superadmin qui regarde le journal en direct)
    window.dispatchEvent(new StorageEvent('storage', { key: AUDIT_KEY }));
  } catch { /* silencieux */ }
}

// ── Effacement ────────────────────────────────────────────────────────────────

export function clearAuditLogs(): void {
  localStorage.removeItem(AUDIT_KEY);
  window.dispatchEvent(new StorageEvent('storage', { key: AUDIT_KEY }));
}
