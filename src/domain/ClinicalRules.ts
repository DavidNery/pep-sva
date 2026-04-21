type RuleFunction = (value: number) => boolean;

export const VitalSignRules: Record<string, RuleFunction> = {
  PAS: value => value < 90 || value >= 140,
  PAD: value => value < 60 || value >= 90,
  FC: value => value < 60 || value > 100,
  FR: value => value < 12 || value > 20,
  TAX: value => value <= 35 || value >= 37.5,
  SpO2: value => value < 92
};

export const VitalSignTranslator: Record<string, string> = {
  sistolica: 'PAS',
  diastolica: 'PAD'
};

export const KeysToAnalyze = ['sistolica', 'diastolica', 'PAM', 'PAI', 'FC', 'FR', 'TAX', 'SpO2', 'O2', 'FiO2'];