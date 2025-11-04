import { test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import TicketBoxPage from '../support/pages/TicketBoxPage';
import { ai } from '@zerostep/playwright';

test.describe('Ticket Box - Testes E2E com ZeroStep', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.ticketbox')
    .retrieveData();

  let ticketBoxPage: TicketBoxPage;

  test.beforeEach(async ({ page }) => {
    ticketBoxPage = new TicketBoxPage(page);
    await page.goto(BASE_URL);
  });

  test('01 - Deve carregar a página corretamente', async () => {
    await ticketBoxPage.validarTitulo();
  });

  test('02 - Deve validar email incorreto e correto', async () => {
    await ticketBoxPage.validarEmail();
  });

  test('03 - Deve resetar o formulário', async () => {
    await ticketBoxPage.resetarFormulario();
  });

  test('04 - Deve impedir envio sem checkbox de concordância', async () => {
    await ticketBoxPage.validarEnvioSemCheckbox();
  });

  test('05 - Deve verificar visibilidade dos principais elementos', async () => {
    await ticketBoxPage.validarElementosVisiveis();
  });
  
  test('06 - Fluxo completo com IA - preencher formulário e enviar', async ({ page }) => {
    await page.goto('https://ticket-box.s3.eu-central-1.amazonaws.com/index.html');
  
    await ai(
      `
      Acesse a página do Ticket Box e:
      1. Preencha nome, sobrenome e email.
      2. Selecione 2 ingressos VIP.
      3. Marque o checkbox de concordância.
      4. Assine o formulário.
      5. Envie e valide a mensagem de confirmação.
      `,
      { page, test }
    );
  });
});
