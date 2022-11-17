const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo');
const todoList = document.getElementById('todos');
const filterOption = document.getElementById('filter-todos');

function addTodo(e) {
  e.preventDefault();

  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  const newTodo = `
    <input class="todo__title" type="text" value="${todoInput.value}" readonly ></input>
    <span class="trash-icon">
      <i class="fa-solid fa-trash-can"></i>
    </span>
    <span class="edit-icon">
      <i class="fa-solid fa-pen-to-square"></i>
    </span>
    <span class="complete-icon">
      <i class="fa-regular fa-square-check"></i>
    </span>
  `;

  todoDiv.innerHTML = newTodo;

  if (todoInput.value) todoList.appendChild(todoDiv);

  saveLocalTodos(todoInput.value);

  todoInput.value = '';
}

function checkRemove(e) {
  const item = e.target;
  const classList = [...item.classList];
  const todo = item.parentElement.parentElement;
  const taskInput = todo.children[0];
  let parent = item.parentElement;

  if (classList[1] === 'fa-trash-can') {
    todo.remove();
  } else if (classList[1] === 'fa-pen-to-square') {
    taskInput.removeAttribute('readonly');
    taskInput.focus();
    parent.innerHTML = '<i class="fa-solid fa-check"></i>';

    taskInput.addEventListener('keypress', event => {
      if (event.key === 'Enter') {
        const taskEdit = document.querySelector('.fa-check');
        taskEdit.click();
      }
    });
  } else if (classList[1] === 'fa-check') {
    taskInput.setAttribute('readonly', 'readonly');
    parent.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  } else if (classList[1] === 'fa-square-check') {
    todo.classList.toggle('opacity');
    taskInput.classList.toggle('completed');
  }
  removeLocalTodos(todo);
}

function filterTodos(e) {
  const todos = todoList.childNodes;
  todos.forEach(todo => {
    switch (e.target.value) {
      case 'completed':
        if (todo.classList.contains('completed')) todo.style.display = 'flex';
        else todo.style.display = 'none';
        break;

      case 'uncompleted':
        if (!todo.classList.contains('completed')) todo.style.display = 'flex';
        else todo.style.display = 'none';
        break;

      default:
        todo.style.display = 'flex';
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let savedTodos = localStorage.getItem('todos')
    ? JSON.parse(localStorage.getItem('todos'))
    : [];

  if (todo) savedTodos.push(todo);

  localStorage.setItem('todos', JSON.stringify(savedTodos));
}

function getLocalTodos() {
  let savedTodos = localStorage.getItem('todos')
    ? JSON.parse(localStorage.getItem('todos'))
    : [];

  savedTodos.forEach(todo => {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = `
    <input class="todo__title" type="text" value="${todo}" readonly ></input>
    <span class="trash-icon">
      <i class="fa-solid fa-trash-can"></i>
    </span>
    <span class="edit-icon">
      <i class="fa-solid fa-pen-to-square"></i>
    </span>
    <span class="complete-icon">
      <i class="fa-regular fa-square-check"></i>
    </span>
  `;

    todoDiv.innerHTML = newTodo;

    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let savedTodos = localStorage.getItem('todos')
    ? JSON.parse(localStorage.getItem('todos'))
    : [];

  const filteredTodos = savedTodos.filter(t => t !== todo.children[0].value);

  localStorage.setItem('todos', JSON.stringify(filteredTodos));
}

addTodoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', checkRemove);
filterOption.addEventListener('click', filterTodos);
document.addEventListener('DOMContentLoaded', getLocalTodos);
