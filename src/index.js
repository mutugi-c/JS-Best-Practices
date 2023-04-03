import './styles.css';
import ManageTasks from './manage_tasks.js';
import { toggleCompleted, clearCompleted } from './modules/checkTaskCompletion.js';

const taskManager = new ManageTasks([]);

const toDoList = document.getElementById('to-do-list');
const toDoForm = document.getElementById('to-do-form');
const toDoInput = document.getElementById('to-do-input');

const populateTaskList = (arr) => {
  arr.forEach((task) => {
    const toDoItem = document.createElement('li');
    toDoItem.classList.add('to-do-item');
    toDoItem.innerHTML = `
    <input type="checkbox" class="check-button" />
    <span class="task-description" contenteditable="true">${task.description}</span>
    <span class="fas fa-ellipsis-v"></span>
    <span class="fas fa-trash trash-icon hide"></span>
    `;
    toDoList.appendChild(toDoItem);

    const taskDescription = toDoItem.querySelector('.task-description');

    // Save edited task on enter key press
    taskDescription.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        const { index } = task; // object destructuring due to ESLint
        const newDescription = taskDescription.textContent.trim().substring(2);
        taskManager.editTask(index, newDescription);
        // Remove focus from the edited element
        taskDescription.blur();
      }
    });

    // Change list item behaviour on click
    toDoItem.addEventListener('click', () => {
      if (!toDoItem.classList.contains('active')) {
        // Remove the 'active' class from all other items
        document.querySelectorAll('.to-do-item').forEach((item) => {
          item.classList.remove('active');
          item.querySelector('.fa-ellipsis-v').classList.remove('hide');
          item.querySelector('.trash-icon').classList.add('hide');
          item.style.background = '';
        });

        // Add the 'active' class to the latest selected item
        toDoItem.classList.add('active');
        toDoItem.querySelector('.fa-ellipsis-v').classList.add('hide');
        toDoItem.querySelector('.trash-icon').classList.remove('hide');
        toDoItem.style.background = '#fffbc8';

        // Focus on the task description element for editing
        taskDescription.focus();
      }
    });

    // Add event listener to trash icon
    toDoItem.querySelector('.trash-icon').addEventListener('click', () => {
      taskManager.removeTask(task.index);
      toDoItem.remove();
    });

    // Add event listener to check-button
    const checkButton = toDoItem.querySelector('.check-button');
    checkButton.addEventListener('click', () => {
      const index = parseInt(toDoItem.dataset.index, 10);
      toggleCompleted(toDoList, taskManager, index);
    });

    toDoItem.dataset.index = taskManager.taskArr.indexOf(task);
  });
};

// Call function to update completed status
toggleCompleted(toDoList, taskManager);

// Add event listeners for completed clear button
const clearCompletedButton = document.getElementById('clear-completed');
clearCompletedButton.addEventListener('click', () => {
  clearCompleted(toDoList, taskManager);
});

// Add event listener for submission
toDoForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const taskDescription = toDoInput.value.trim();
  if (taskDescription !== '') {
    taskManager.addTask(taskDescription);

    toDoInput.value = '';
    const newTask = [taskManager.taskArr[taskManager.taskArr.length - 1]];
    populateTaskList(newTask);
  }
});

populateTaskList(taskManager.taskArr);
