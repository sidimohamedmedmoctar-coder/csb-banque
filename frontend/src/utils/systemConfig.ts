// ── Types ─────────────────────────────────────────────────────────────────────

export interface SystemConfig {
  overdraftLimit:   number;   // découvert autorisé sur les comptes courants (MAD)
  transferLimit:    number;   // plafond journalier des virements (MAD)
  transferFee:      number;   // frais de virement en % du montant
  creditMinAmount:  number;   // montant minimum d'un versement (MAD)
  creditMaxAmount:  number;   // montant maximum d'un versement (MAD)
}

// ── Clé de stockage ───────────────────────────────────────────────────────────

export const CONFIG_KEY = 'bank_system_config';

export const DEFAULT_CONFIG: SystemConfig = {
  overdraftLimit:   5000,
  transferLimit:    100000,
  transferFee:      0.5,
  creditMinAmount:  10000,
  creditMaxAmount:  1000000,
};

// ── Lecture ───────────────────────────────────────────────────────────────────

export function loadSystemConfig(): SystemConfig {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (!raw) return { ...DEFAULT_CONFIG };
    // Fusionne avec les valeurs par défaut pour que les clés manquantes restent valides
    return { ...DEFAULT_CONFIG, ...(JSON.parse(raw) as Partial<SystemConfig>) };
  } catch {
    return { ...DEFAULT_CONFIG };
  }
}

// ── Écriture ──────────────────────────────────────────────────────────────────

export function saveSystemConfig(config: SystemConfig): void {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  // Notifie les autres onglets pour qu'ils prennent en compte les nouvelles limites immédiatement
  window.dispatchEvent(new StorageEvent('storage', { key: CONFIG_KEY }));
}
