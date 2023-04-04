class ManageTasks {
  constructor() {
    this.taskArr = this.loadTasksFromLocalStorage();
  }

  addTask(taskDescrption) {
    const newTask = {
      description: taskDescrption,
      completed: false,
      index: this.taskArr.length + 1,
    };

    this.taskArr.push(newTask);
    this.storeTasksInLocalStorage();
  }

  removeTask(index) {
    this.taskArr.splice(index, 1);

    // Update remaining properties' indices
    this.taskArr.forEach((task, i) => {
      task.index = i + 1;
    });
    this.storeTasksInLocalStorage();
  }

  editTask(index, newDescription) {
    this.taskArr[index].description = newDescription;
    this.storeTasksInLocalStorage();
  }

  completedTask(index, completed) {
    this.taskArr[index].completed = completed;
    this.storeTasksInLocalStorage();
  }

  storeTasksInLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.taskArr));
  }

  // eslint-disable-next-line class-methods-use-this
  loadTasksFromLocalStorage() {
    const storedTasks = JSON.parse(window.localStorage.getItem('tasks'));
    if (storedTasks) {
      return storedTasks.map((task) => {
        task.index += 1;
        return task;
      });
    }
    return [];
  }
}

export default ManageTasks;
