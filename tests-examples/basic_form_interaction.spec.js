const { test, expect } = require('@playwright/test');
test('Basic form interaction with TodoMVC', async ({ page }) => {
// Navigate to the TodoMVC app
await page.goto('https://demo.playwright.dev/todomvc/');
// Verify the form input is present and editable
const todoInput = page.locator('.new-todo');
await expect(todoInput).toBeEditable();
await expect(todoInput).toHaveAttribute('placeholder', 'What needs to be done?');
// Add a new todo using form input
await todoInput.fill('Learn Playwright form interactions');
await todoInput.press('Enter');
// Verify the todo was added
await expect(page.locator('.todo-list li')).toHaveCount(1);
await expect(page.locator('.todo-list li label')).toHaveText('LearnPlaywright form interactions');
// Add multiple todos using different methods
const todos = [
'Practice text input',
'Test checkbox interactions',
'Try different submission methods'
];
for (const todo of todos) {
await todoInput.fill(todo);
await page.keyboard.press('Enter');
}
// Verify all todos were added
await expect(page.locator('.todo-list li')).toHaveCount(4);
// Test checkbox interactions
const firstTodoCheckbox = page.locator('.todo-listli').nth(0).locator('.toggle');
await firstTodoCheckbox.check();
await expect(firstTodoCheckbox).toBeChecked();
// Test editing a todo (double-click to edit)
const secondTodo = page.locator('.todo-list li').nth(1);
await secondTodo.dblclick();
const editInput = secondTodo.locator('.edit');
await editInput.fill('Updated: Practice advanced form interactions');
await editInput.press('Enter');
// Verify the edit was successful
await expect(secondTodo.locator('label')).toHaveText('Updated: Practiceadvanced form interactions');
});
