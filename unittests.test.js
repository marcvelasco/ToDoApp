const { addTask, deleteTask, toggleTask, tasks } = require('./app');  // Adjust the path if necessary

describe('ToDo List Tests', () => {
  beforeEach(() => {
    // Clear the tasks array before each test
    tasks.length = 0;
  });

  test('Add a task', () => {
    addTask('New Task');
    expect(tasks).toHaveLength(1);
    expect(tasks[0].text).toBe('New Task');
    expect(tasks[0].completed).toBe(false);
  });

  test('Delete a task', () => {
    addTask('Task to be deleted');
    const taskId = tasks[0].id;
    deleteTask(taskId);
    expect(tasks).toHaveLength(0);
  });

  test('Toggle a task\'s completion', () => {
    addTask('Task to be toggled');
    const taskId = tasks[0].id;
    toggleTask(taskId);
    expect(tasks[0].completed).toBe(true);
    toggleTask(taskId);
    expect(tasks[0].completed).toBe(false);
  });
});
