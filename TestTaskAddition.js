test('Add a new task to the list', () => {
  // Simulate adding a task
  addTask('New Task');

  // Check if the task is added to the list
  const taskList = document.getElementById('taskList');
  expect(taskList.innerHTML).toContain('New Task');
});
