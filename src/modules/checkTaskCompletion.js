// Update completed status
const toggleCompleted = (toDoList, taskManager, index) => {
  const toDoItem = toDoList.querySelector(`[data-index="${index}"]`);
  if (!toDoItem) {
    return;
  }
  const checkButton = toDoItem.querySelector('.check-button');
  if (checkButton.checked) {
    toDoItem.classList.add('completed');
    taskManager.completedTask(index, true);
    taskManager.storeTasksInLocalStorage();
  } else {
    toDoItem.classList.remove('completed');
    taskManager.completedTask(index, false);
    taskManager.storeTasksInLocalStorage();
  }
};

// Remove tasks identified as completed
const clearCompleted = (toDoList, manageTasks) => {
  const toDoItems = toDoList.querySelectorAll('.to-do-item');
  toDoItems.forEach((toDoItem) => {
    const checkButton = toDoItem.querySelector('.check-button');
    if (checkButton.checked) {
      const index = toDoItem.dataset.index - 1;
      manageTasks.removeTask(index);
      toDoItem.remove();
    }
  });
};

export { toggleCompleted, clearCompleted };
