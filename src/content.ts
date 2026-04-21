import { HealthDataProcessor } from './domain/HealthDataProcessor';
import { ApiClient } from './services/ApiClient';
import { HgtResponse, SsvvResponse } from './types';
import { FabComponent } from './ui/FabComponent';
import { DateParser } from './utils/DateParser';
import { UrlParser } from './utils/UrlParser';

const processarECopiarSinaisVitais = async (): Promise<void> => {

  const originalBodyCursor = document.body.style.cursor;
  document.body.style.cursor = 'wait';

  try {
    const pacienteId = UrlParser.getPatientId();
    const dtStr = DateParser.getYesterdayISOString();

    const ssvvUrl = `https://pep.sgh.saude.rn.gov.br/pep/api/get_tab_ssvv?atendimento=${pacienteId}&data=${dtStr}`;
    const hgtUrl = `https://pep.sgh.saude.rn.gov.br/pep/api/get_tab_hgt?atendimento=${pacienteId}&data=${dtStr}`;

    const [ssvvJson, hgtJson] = await Promise.all([
      ApiClient.fetchJson<SsvvResponse>(ssvvUrl),
      ApiClient.fetchJson<HgtResponse>(hgtUrl)
    ]);

    const { resultados, alteracoes } = HealthDataProcessor.processSsvv(ssvvJson.dados || []);
    const hgts = HealthDataProcessor.processHgt(hgtJson.dados || []);

    const textoSinaisV_24h = resultados.join(' / ');
    const textoHgt = hgts.length > 0 ? `\nHGT: ${hgts.join(' - ')}` : '';
    const textoFinalparaCopiar = `Sinais Vitais (24h): ${textoSinaisV_24h}${textoHgt}`;

    await navigator.clipboard.writeText(textoFinalparaCopiar);

    alert("Sinais vitais copiados para a área de transferência!");

  } catch (error) {
    console.error("Erro ao processar dados vitais da extensão:", error);
    alert("Falha ao copiar sinais vitais. Verifique o console.");
  } finally {
    document.body.style.cursor = originalBodyCursor;
  }
};

const copiarPrescricao = (): void => {
  alert("Funcionalidade 'Copiar prescrição' ainda não implementada.");
  console.warn("A ação 'Copiar prescrição' foi acionada, mas não possui implementação.");
};

(() => {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initializeUI();
  } else {
    document.addEventListener('DOMContentLoaded', initializeUI);
  }
})();

function initializeUI() {
  console.log("PEP Vital Signs Analyzer: Inicializando UI...");

  const fab = new FabComponent({
    onCopySinais: processarECopiarSinaisVitais,
    onCopyPrescricao: copiarPrescricao
  });

  fab.mount();
}