const taskList = document.querySelector('.tasks-list');
const addTaskForm = document.querySelector('.add-task-form');
const localStorageKey = 'task-list-key';
let storageData = JSON.parse(localStorage.getItem(localStorageKey)) ?? [];

function addItem(item) {
  return `<li data-id="${item.id}">
      ${item.text}
    </li>`;
}

function addItems(items) {
  return items.map(addItem).join('');
}

taskList.insertAdjacentHTML('beforeend', addItems(storageData));

addTaskForm.addEventListener('submit', e => {
  e.preventDefault();
  const button = e.submitter;
  const text = addTaskForm.querySelector('.add-task-input').value.trim();
  if (button.classList.contains('submit-btn-clear')) {
    localStorage.removeItem('task-list-key');
    storageData = [];
    taskList.innerHTML = '<h2>Tasks:</h2>';
    return;
  } 
  if (text) {
    storageData.push({id: Date.now(), text});
    localStorage.setItem(localStorageKey, JSON.stringify(storageData));
    taskList.insertAdjacentHTML('beforeend', addItem({id: Date.now(), text}));
    addTaskForm.reset();
  }
});

taskList.addEventListener("dblclick", (e) => {
    const id = e.target.dataset.id;
    const index = storageData.findIndex(element => element.id === Number(id));
    if (index !== -1) {
      storageData.splice(index, 1);
      localStorage.setItem(localStorageKey, JSON.stringify(storageData));
    }
    taskList
      .querySelectorAll('li')
      .forEach(li => {
        if (li.dataset.id === id) {
          li.remove();
        }
      });
}
)