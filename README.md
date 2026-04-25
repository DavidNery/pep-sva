# PEP Vital Signs Analyzer

## Descrição

A extensão **PEP Vital Signs Analyzer** é uma ferramenta para o navegador Chrome projetada para automatizar a análise e extração de dados vitais e de glicemia capilar do sistema PEP (Plataforma Eletrônica do Paciente). Seu objetivo principal é facilitar o trabalho de médicos, permitindo a rápida obtenção de resumos formatados dos sinais vitais das últimas 24 horas, com detecção automática de alterações clínicas relevantes.

## Funcionalidades

- **Análise Automática de Sinais Vitais**: Processa dados de sinais vitais como pressão arterial sistólica (PAS) e diastólica (PAD), frequência cardíaca (FC), frequência respiratória (FR), temperatura (TAX), saturação de oxigênio (SpO2), entre outros, coletados nas últimas 24 horas.
- **Detecção de Alterações**: Aplica regras clínicas para identificar valores fora do normal, como PAS < 90 ou ≥ 140 mmHg, FC < 60 ou > 100 bpm, etc.
- **Resumo Formatado**: Gera um texto estruturado com os valores mínimo e máximo de cada sinal vital, além de alertas para alterações.
- **Integração com Glicemia Capilar**: Inclui dados de HGT ordenados por horário.
- **Cópia para Área de Transferência**: Copia automaticamente o resumo para a área de transferência, pronto para ser colado em evoluções médicas.
- **Interface Flutuante (FAB)**: Adiciona um botão flutuante discreto na página, com menu para acessar as funcionalidades.
- **Funcionalidade Futura**: Placeholder para cópia de prescrições (ainda não implementada).

## Instalação

1. **Baixe a Última Versão**:
   - Acesse a página de [Releases](https://github.com/DavidNery/pep-sva/releases) no GitHub.
   - Baixe o arquivo `pep-sva-release.zip` da versão mais recente.

2. **Extraia o Arquivo**:
   - Extraia o conteúdo do arquivo ZIP baixado para uma pasta separada

3. **Carregue no Chrome**:
   - Abra o Chrome e navegue para `chrome://extensions/`.
   - Ative o **Modo Desenvolvedor** (canto superior direito).
   - Clique em **Carregar sem compactação**.
   - Selecione a pasta que os arquivos foram extraídos e clique em **Carregar**.

A extensão estará ativa nas páginas correspondentes do sistema PEP.

## Uso

1. Navegue para uma página de evolução médica no sistema PEP (ex.: `https://pep.sgh.saude.rn.gov.br/pep/cadastrar_evolucao_medica/*`).
2. Um botão flutuante (FAB) aparecerá no canto da página.
3. Passe o mouse sobre o botão para abrir o menu.
4. Clique em **"Copiar sinais vitais (24h)"** para processar e copiar os dados.
5. Cole o texto copiado na área de evolução médica.

**Nota**: A extensão busca dados do dia anterior automaticamente. Certifique-se de que a página tenha o ID do paciente na URL.

## Desenvolvimento

- **Modo Desenvolvimento**: Use `npm run dev` para compilar com watch e recarregar automaticamente durante o desenvolvimento.
- **Estrutura do Projeto**:
  - `src/content.ts`: Script principal injetado nas páginas.
  - `src/domain/`: Lógica de processamento de dados (HealthDataProcessor, ClinicalRules).
  - `src/ui/`: Componentes de interface (FabComponent).
  - `src/services/`: Cliente de API (ApiClient).
  - `src/utils/`: Utilitários (DateParser, UrlParser).
- **Tecnologias**: TypeScript, Webpack, CSS.

## Requisitos

- Navegador Chrome (ou baseado em Chromium).
- Acesso ao sistema PEP (Plataforma Eletrônica do Paciente) do Hospital Geral de Natal (HGN).

## Contribuição

Contribuições são bem-vindas! Para contribuir:
1. Faça um fork do repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`).
4. Push para a branch (`git push origin feature/nova-funcionalidade`).
5. Abra um Pull Request.

## Licença

Este projeto é licenciado sob a [MIT License](LICENSE).

## Suporte

Para dúvidas ou problemas, abra uma issue no repositório ou entre em contato com a equipe de desenvolvimento.