test('Delete a task from the list', () => {
  // Add a task
  addTask('Task to be deleted');

  // Simulate deleting the task
  const deleteButton = document.querySelector('.task-actions button:last-child');
  deleteButton.click();

  // Check if the task is removed from the list
  const taskList = document.getElementById('taskList');
  expect(taskList.innerHTML).not.toContain('Task to be deleted');
});
