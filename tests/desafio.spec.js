const {test, expect} = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.bertrand.pt/');
    await expect(page).toHaveTitle('Bertrand Livreiros');
    await page.getByRole('button', { name: 'Aceitar' }).click();
});

async function searchBook(page, title) {
  await page.getByPlaceholder('Pesquisar').fill(title);
  await page.getByRole('button', { name: 'Ver todos os resultados' }).click();
  await page.getByRole('link', { name: title, exact: true }).first().click();
}



test('Cenario 1', async ({ page }) => {
    await searchBook(page, '1984');

    const author = page.locator('.right-author');
    await expect(author).toHaveText('de George Orwell');
    await expect(page.getByText('ISBN: 9789722071550')).toBeVisible();
    await expect(page.getByText('Dimensões: 156 x 238 x 22 mm')).toBeVisible();
    await expect(page.getByText('Páginas: 344')).toBeVisible();
   
});

test('Cenario 2', async ({ page }) => {
    await searchBook(page, '1984');

    await page.locator('h3:has-text("OUTROS LIVROS DO AUTOR")').click();

    await page.getByRole('link', { name: 'A Quinta dos Animais', exact: true }).first().click();

    await expect(page).toHaveTitle(/A Quinta dos Animais, de George Orwell/);

    const author = page.locator('.right-author');
    await expect(author).toHaveText('de George Orwell');
    const bookTitle = page.locator('.right-title-details');
    await expect(bookTitle).toHaveText('A Quinta dos Animais');
});


test('Cenario 3', async ({ page }) => {

    await searchBook(page, 'Do Not Disturb');

    await expect(page.locator('#productPageRightSectionTop-language')).toHaveText('idioma: Inglês');

    await expect(page.locator('span.icon.language-flag.Inglês')).toBeVisible();
    const author = page.locator('.right-author');
    await expect(author).toHaveText('de Freida McFadden');
    const bookTitle = page.locator('.right-title-details').first();
    await expect(bookTitle).toHaveText('Do Not Disturb');
});


test('Cenario 4', async ({ page }) => {
    await searchBook(page, '1984');

    const priceText = await page.locator('#productPageRightSectionTop-saleAction-price-current').innerText();
    await expect(priceText).toBe('12,50€');

    await page.getByRole('button', { name: 'Comprar' }).click();

    await page.getByRole('button', { name: 'Cesto de compras' }).click();

    const priceCartText = await page.locator('div.col-xs-12.total span.value').innerText();


    const price = parseFloat(priceText.replace('€', '').replace(',', '.').trim());
    const priceCart = parseFloat(priceCartText.replace('€', '').replace(',', '.').trim());

    expect(priceCart).toBe(price);

});


test('Cenario 5', async ({ page }) => {
    await page.locator('[aria-controls="menu-lateral"]:visible').click();

    await page.getByRole('tab', { name: 'As nossas livrarias' }).click();
    await page.locator('a').filter({ hasText: 'Rede de livrarias' }).first().click()

    await page.getByRole('textbox', { name: 'Localidade' }).click();
    await page.locator('label[for="search-districts-search-districts-11"]').click();
    await expect(page.locator('span:has-text("LIVRARIA BERTRAND - ALEGRO SINTRA")')).toBeVisible();

});