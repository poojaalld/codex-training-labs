const { toggleCompletion } = require('./index');

test('toggleCompletion flips task.completed for an in-memory task list', () => {
  const tasks = [
    { id: 'task-1', title: 'Unit test task', completed: false }
  ];

  const updatedTask = toggleCompletion(tasks, 'task-1');

  expect(updatedTask.completed).toBe(true);
  expect(tasks[0].completed).toBe(true);
});
