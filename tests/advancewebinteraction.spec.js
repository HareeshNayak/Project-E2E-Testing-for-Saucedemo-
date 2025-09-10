import { test, expect } from '@playwright/test';
test.setTimeout(120000); 

test('setup', async ({ page }) => {
  
  await page.goto('https://demoqa.com/alerts');
 
  await expect(page.getByRole('heading')).toContainText('Alerts');
});

test('simplealert', async ({ page }) => {
   //  Navigate to the Alerts demo page
  await page.goto('https://demoqa.com/alerts');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`); // Log the alert message
    dialog.dismiss().catch(() => {}); // Dismiss the alert safely
  });
   //  Trigger the alert by clicking the "Click me" button
  await page.locator('#alertButton').click();
   // Step 4: Verification point
  await expect(page.locator('#alertButton')).toBeVisible();
});

test('confirmation', async ({ page }) => {
  await page.goto('https://demoqa.com/alerts');
  // Attach the listener BEFORE triggering the dialog
  page.once('dialog', async dialog => {
    console.log('Dialog message:', dialog.message());
    await dialog.accept(); // ✅ Click OK
  });
  // Trigger the confirmation alert
  await page.locator('#confirmButton').click();

  // Verify the result message
  await expect(page.locator('#confirmResult')).toHaveText('You selected Ok');
});

test('frames', async ({ page }) => {
   //  Navigate to the Nested Frames page
  await page.goto('https://demoqa.com/nestedframes');
   //  Verify the heading on the page
  await page.getByRole('heading', { name: 'Nested Frames' }).click();
   // Access the parent frame (#frame1)
  await page.locator('#frame1').contentFrame().getByText('Parent frame').click();
   //  Access the child frame inside the parent frame
  await page.locator('#frame1').contentFrame().locator('iframe').contentFrame().getByText('Child Iframe').click();
   //  Assert that parent frame contains text "Parent frame"
  await expect(page.locator('#frame1').contentFrame().locator('body')).toContainText('Parent frame');
    // : Assert that child frame contains text "Child Iframe"
  await expect(page.locator('#frame1').contentFrame().locator('iframe').contentFrame().getByRole('paragraph')).toContainText('Child Iframe');
});

test('mouse', async ({ page }) => {
    //  Navigate to the mouse event demo page
  await page.goto('https://vinothqaacademy.com/mouse-event/');
   //  Click inside the "Enter First Name" text box (basic focus action)
  await page.getByRole('textbox', { name: 'Enter First Name' }).click();
   //  Perform a DOUBLE CLICK on the "Double Click Me" button
  await page.getByRole('button', { name: 'Double Click Me' }).click();
    //  Verify that the double-click action triggered the expected text
  await expect(page.locator('#dblclick')).toContainText('Double Click Me');
   //  Perform a RIGHT CLICK on the "Right Click Me" button
  await page.getByRole('button', { name: 'Right Click Me' }).click({
    button: 'right'
  });
   //  Verify that the right-click action triggered the expected text
  await expect(page.locator('#rightclick')).toContainText('Right Click Me');
});

test('keyboard', async ({ page }) => {
   // Navigate to the DemoQA Text Box page
  await page.goto('https://demoqa.com/text-box');
    //  Focus on the "Full Name" text box
  await page.getByRole('textbox', { name: 'Full Name' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Full Name' }).fill('BHAVANA');
  //  Press Tab to move focus to the next input field (Email)
  await page.getByRole('textbox', { name: 'Full Name' }).press('Tab');
    //  Fill the Email field
  await page.getByRole('textbox', { name: 'name@example.com' }).fill('BHAVANA@GMAIL.COM');
  //  Press Shift+Tab to move BACK to the Full Name field
  await page.getByRole('textbox', { name: 'name@example.com' }).press('Shift+Tab');
    //  Select all text in the Full Name field 
  await page.getByRole('textbox', { name: 'Full Name' }).press('ControlOrMeta+A');
   //  Overwrite by typing LAST NAME ("ULIYAR")
  await page.getByRole('textbox', { name: 'Full Name' }).fill('ULIYAR');
   //  (Verification Point):
  await expect(page.getByRole('textbox', { name: 'Full Name' })).toHaveValue('ULIYAR');
});

test('file', async ({ page }) => {
    //  Navigate to the file upload demo page
  await page.goto('https://the-internet.herokuapp.com/upload');
   //  Verify page heading "File Uploader" is visible
  await expect(page.getByRole('heading', { name: 'File Uploader' })).toBeVisible();
   // Create the path to the test file (make sure test_upload.txt exists in your project root)
  await page.getByRole('button', { name: 'Choose File' }).click();
    //  Upload the file using the <input type="file"> element
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('C:/playwright/tests/test_upload.txt');
    //  Click on the "Upload" button
  await page.getByRole('button', { name: 'Upload' }).click();
   //  (Verification Point): Check that the uploaded file name is displayed on the page
  await expect(page.locator('#uploaded-files')).toContainText('test_upload.txt');
});

test('Scroll to element in large DOM — with step-by-step assertions', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/large');
  //  Table exists & visible
  const table = page.locator('table#large-table');
  await expect(table).toBeVisible();
  //  Table has many rows (sanity check)
  const rows = table.locator('tbody tr');
  const rowCount = await rows.count();
  //  Locate target element (last row) and assert it's not in viewport before scroll
  const lastRow = rows.last();
  const inViewportBefore = await lastRow.evaluate((el) => {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    return r.top >= 0 && r.bottom <= vh;
  });
  expect(inViewportBefore).toBe(false);
  //  Scroll into view (action)
  await lastRow.scrollIntoViewIfNeeded();
  //  Assert the element is visible (Playwright visibility check)
  await expect(lastRow).toBeVisible();
  // Assert the element is inside the viewport (coordinate check)
  const inViewportAfter = await lastRow.evaluate((el) => {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    return r.top >= 0 && r.bottom <= vh;
  });
  expect(inViewportAfter).toBe(true);
  //  Assert the element is not obscured (elementFromPoint test)
  const notObscured = await lastRow.evaluate((el) => {
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const topEl = document.elementFromPoint(cx, cy);
    // true if the element itself or one of its children is at the center point
    return topEl === el || el.contains(topEl);
  });
});
