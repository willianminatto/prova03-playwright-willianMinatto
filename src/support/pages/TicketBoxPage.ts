import { Page, expect } from '@playwright/test';
import TicketBoxElements from '../elements/TicketBoxElements';

export default class TicketBoxPage {
  readonly el: TicketBoxElements;

  constructor(readonly page: Page) {
    this.el = new TicketBoxElements(page);
  }

  async validarTitulo(): Promise<void> {
    await expect(this.el.getHeader()).toContainText(/ticketbox/i);
  }

  async preencherFormularioCompleto(): Promise<void> {
    await this.el.getFirstName().fill('João');
    await this.el.getLastName().fill('Silva');
    await this.el.getEmail().fill('joao.silva@email.com');
    await this.el.getQuantity().selectOption('2');
    await this.el.getVip().check();
    await this.el.getFriend().check();
    await this.el.getCheckboxAgreement().check();
    await this.el.getSignature().fill('João Silva');
    await expect(this.el.getSubmit()).toBeEnabled({ timeout: 5000 });
    await this.el.getSubmit().click();
    await this.page.waitForSelector('#info, .confirmation, .success');
  }

  async validarFormularioEnviado(): Promise<void> {
    const info = this.el.getInfo();
    await expect(info).toBeVisible;
    await expect(info).toContainText(/2.*vip.*tickets/i);
  }

  async validarEmail(): Promise<void> {
    await this.el.getEmail().fill('invalido');
    await this.el.getEmail().blur();
    await expect(this.el.getEmail()).toHaveCSS(
      'border-color',
      'rgb(218, 82, 82)',
    );

    await this.el.getEmail().fill('valido@teste.com');
    await this.el.getEmail().blur();
    await expect(this.el.getEmail()).not.toHaveCSS(
      'border-color',
      'rgb(218, 82, 82)',
    );
  }

  async resetarFormulario(): Promise<void> {
    await this.preencherFormularioCompleto();
    await expect(this.el.getReset()).toBeVisible({ timeout: 10000 });
    await this.el.getReset().click();
    await expect(this.el.getFirstName()).toHaveValue('');
    await expect(this.el.getLastName()).toHaveValue('');
    await expect(this.el.getEmail()).toHaveValue('');
    await expect(this.el.getSignature()).toHaveValue('');
  }

  async validarEnvioSemCheckbox(): Promise<void> {
    await this.el.getFirstName().fill('Maria');
    await this.el.getLastName().fill('Oliveira');
    await this.el.getEmail().fill('maria@teste.com');
    await this.el.getQuantity().selectOption('1');
    await this.el.getVip().check();
    await this.el.getSignature().fill('Maria Oliveira');

    await expect(this.el.getSubmit()).toBeDisabled({ timeout: 3000 });
  }

  async validarTextoQuantidade(): Promise<void> {
    await this.el.getFirstName().fill('Teste');
    await this.el.getLastName().fill('Automatizado');
    await this.el.getEmail().fill('teste@qa.com');
    await this.el.getVip().check();
    await this.el.getCheckboxAgreement().check();
    await this.el.getSignature().fill('Teste Automatizado');

    await this.el.getQuantity().selectOption('1');
    await expect(this.el.getInfo()).toContainText(/1.*vip.*ticket/i
    );

    await this.el.getQuantity().selectOption('3');
    await expect(this.el.getInfo()).toContainText(/3.*vip.*tickets/i);
  }

  async validarElementosVisiveis(): Promise<void> {
    const elementos = [
      this.el.getHeader(),
      this.el.getSubmit(),
      this.el.getReset(),
      this.el.getQuantity(),
      this.el.getEmail(),
      this.el.getSignature(),
      this.el.getCheckboxAgreement()
    ];

    for (const elemento of elementos) {
      await expect(elemento).toBeVisible;
    }
  }
}
