// import { Locator, Page } from '@playwright/test';

// export default class TicketBoxElements {
//   readonly page: Page;

//   constructor(page: Page) {
//     this.page = page;
//   }

//   getHeader(): Locator {
//     return this.page.locator('header h1, h1');
//   }

//   getFirstName(): Locator {
//     return this.page.locator(
//       '#first-name, input[name="first-name"], input[placeholder="First Name"]'
//     );
//   }

//   getLastName(): Locator {
//     return this.page.locator(
//       '#last-name, input[name="last-name"], input[placeholder="Last Name"]'
//     );
//   }

//   getEmail(): Locator {
//     return this.page.locator(
//       '#email, input[type="email"], input[name="email"]'
//     );
//   }

//   getQuantity(): Locator {
//     return this.page.locator(
//       '#ticket-quantity, select[name="ticket-quantity"], select#quantity'
//     );
//   }

//   getVip(): Locator {
//     return this.page.locator(
//       '#vip, input[name="ticket-type"][value="vip"], input[value="vip"]'
//     );
//   }

//   getFriend(): Locator {
//     return this.page.locator(
//       '#friend, input[name="friend"], input[value="friend"]'
//     );
//   }

//   getCheckboxAgreement(): Locator {
//     return this.page.locator(
//       '#agree, input[name="agree"], input[type="checkbox"][name="agree"]'
//     );
//   }

//   getSignature(): Locator {
//     return this.page.locator(
//       '#signature, input[name="signature"], input[placeholder*="Signature"]'
//     );
//   }

//   getSubmit(): Locator {
//     return this.page.locator(
//       'button[type="submit"], input[type="submit"], button:has-text("Submit"), button:has-text("Reserve")'
//     );
//   }

//   getReset(): Locator {
//     return this.page.locator(
//       'button[type="reset"], input[type="reset"], button:has-text("Reset")'
//     );
//   }

//   getInfo(): Locator {
//     return this.page.locator(
//       '#info, #ticket-info, #confirmation, .confirmation, .success, .info'
//     );
//   }

//   getForm(): Locator {
//     return this.page.locator('form#ticketbox, form[name="ticketbox"], form');
//   }
// }
