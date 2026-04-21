import { SsvvRecord, HgtRecord } from '../types';
import { VitalSignRules, VitalSignTranslator, KeysToAnalyze } from './ClinicalRules';

export class HealthDataProcessor {
  static processSsvv(dados: SsvvRecord[]) {
    const alteracoes: Record<string, Record<string, number>> = {};

    const resultados = KeysToAnalyze.map(sinal => {
      const translatedKey = VitalSignTranslator[sinal] ?? sinal;

      const afericoesValidas = dados
        .map(registro => ({ valor: registro[sinal], hora: registro.Hora }))
        .filter(item => item.valor !== "-" && item.valor != null && item.valor !== "");

      if (afericoesValidas.length === 0) {
        return `${translatedKey}: SEM AFERIÇÕES`;
      }

      const numValues = afericoesValidas.map(a => parseFloat(a.valor as string));
      const min = Math.min(...numValues);
      const max = Math.max(...numValues);

      const rule = VitalSignRules[translatedKey];
      if (rule) {
        afericoesValidas.forEach(afericao => {
          const numVal = parseFloat(afericao.valor as string);
          if (rule(numVal)) {
            if (!alteracoes[translatedKey]) {
              alteracoes[translatedKey] = {};
            }
            alteracoes[translatedKey][afericao.hora] = numVal;
          }
        });
      }

      return `${translatedKey}: ${min} - ${max}`;
    });

    return { resultados, alteracoes };
  }

  static processHgt(dados: HgtRecord[]): string[] {
    return dados.sort((a, b) => a.Hora.localeCompare(b.Hora)).map(h => `${h.HGT} (${h.Hora})`);
  }
}