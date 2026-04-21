import '../css/fab.css';

export interface FabOptions {
  onCopySinais: () => Promise<void>;
  onCopyPrescricao: () => void;
}

export class FabComponent {
  private container: HTMLDivElement | null = null;
  private menu: HTMLDivElement | null = null;
  private hideTimeout: number | null = null;

  constructor(private options: FabOptions) { }

  public mount(): void {
    if (this.container) return;

    this.createStructure();
    this.setupEvents();
  }

  private createStructure(): void {
    this.container = document.createElement('div');
    this.container.id = 'pep-fab-container';
    this.container.innerHTML = `<svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.17499 2.5C6.17499 2.22386 6.39885 2 6.67499 2H13.3178C13.594 2 13.8178 2.22386 13.8178 2.5V6.375C13.8178 6.65114 13.594 6.875 13.3178 6.875H6.67499C6.39885 6.875 6.17499 6.65114 6.17499 6.375V2.5ZM7.17499 3V5.875H12.8178V3H7.17499Z" fill="currentColor"/><path d="M4.5 5L4.5 17H15.5V5H13.5V4H15.5C16.0523 4 16.5 4.44772 16.5 5V17C16.5 17.5523 16.0523 18 15.5 18H4.5C3.94772 18 3.5 17.5523 3.5 17V5C3.5 4.44772 3.94772 4 4.5 4H6.5V5H4.5Z" fill="currentColor"/></svg>`;

    this.menu = document.createElement('div');
    this.menu.id = 'pep-fab-menu';

    const btnSinais = document.createElement('button');
    btnSinais.innerText = 'Copiar sinais vitais (24h)';
    btnSinais.addEventListener('click', () => {
      this.options.onCopySinais();
      this.forceHideMenu();
    });

    const btnPrescricao = document.createElement('button');
    btnPrescricao.innerText = 'Copiar prescrição';
    btnPrescricao.addEventListener('click', () => {
      this.options.onCopyPrescricao();
      this.forceHideMenu();
    });

    this.menu.appendChild(btnSinais);
    this.menu.appendChild(btnPrescricao);
    this.container.appendChild(this.menu);
    document.body.appendChild(this.container);
  }

  private setupEvents(): void {
    if (!this.container || !this.menu) return;

    this.container.addEventListener('mouseenter', () => {
      if (this.hideTimeout !== null) {
        window.clearTimeout(this.hideTimeout);
        this.hideTimeout = null;
      }
      this.showMenu();
    });

    this.container.addEventListener('mouseleave', () => {
      this.hideTimeout = window.setTimeout(() => {
        this.hideMenu();
      }, 250);
    });
  }

  private showMenu(): void {
    if (this.menu) this.menu.style.display = 'flex';
  }

  private hideMenu(): void {
    if (this.menu) this.menu.style.display = 'none';
  }

  private forceHideMenu(): void {
    if (this.hideTimeout !== null) {
      window.clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
    this.hideMenu();
  }
}