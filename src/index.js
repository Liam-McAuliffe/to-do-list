import './styles/reset.css';
import './styles/styles.css';

const listContainer = document.getElementById('list-container');
const inputBox = document.getElementById('input-box');
const addTaskButton = document.getElementById('addTask');

const loadTasks = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  listContainer.innerHTML = '';
  tasks.forEach((task) => {
    addTaskToDOM(task.text, task.completed);
  });
};

const saveTasks = () => {
  const tasks = [];
  document.querySelectorAll('#list-container li').forEach((li) => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains('checked'),
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTaskToDOM = (taskText, completed = false) => {
  if (!taskText) return;

  const li = document.createElement('li');
  li.textContent = taskText;
  if (completed) li.classList.add('checked');

  const span = document.createElement('span');
  span.innerHTML = '\u00d7';
  li.appendChild(span);

  listContainer.appendChild(li);
};

const addTask = () => {
  if (inputBox.value.trim() === '') {
    alert('Write something!');
    return;
  }
  addTaskToDOM(inputBox.value);
  saveTasks();
  inputBox.value = '';
};

const handleClick = (e) => {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked');
    saveTasks();
  } else if (e.target.tagName === 'SPAN') {
    e.target.parentElement.remove();
    saveTasks();
  }
};

const init = () => {
  loadTasks();
  addTaskButton.addEventListener('click', addTask);
  listContainer.addEventListener('click', handleClick, false);
};

init();
