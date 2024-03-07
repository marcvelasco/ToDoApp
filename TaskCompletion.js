test('Mark a task as completed', () => {
  // Add a task
  addTask('Task to be completed');

  // Simulate marking the task as completed
  const checkbox = document.querySelector('.task-actions input[type="checkbox"]');
  checkbox.click();

  // Check if the task is visually marked as completed
  const task = document.querySelector('.task-content span');
  expect(task.classList.contains('completed')).toBe(true);
});
