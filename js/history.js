const historyList = document.querySelector('[data-type="history"]');
const historyListKey = 'history-list-key';
const themeKey = 'theme';
const deleteBtn = document.querySelector('.delete-btn');
const darkTheme = document.getElementById("dark-theme");
let historyStorageData = loadFromLS(historyListKey, []);

function saveToLS(key, value)  {
  const json = JSON.stringify(value);
  localStorage.setItem(key, json);
}

function loadFromLS(key, defaultValue) {
  const jsonData = localStorage.getItem(key);
  try {
    const data = JSON.parse(jsonData);
    return data ?? defaultValue;
  } catch {
    return jsonData ?? defaultValue;
  }
}

function addItem(item) {
  return `<li data-id="${item.id}">
      ${item.text}
    </li>`;
}

function addItems(items) {
  return items.reverse().map(addItem).join('');
}

const savedTheme = localStorage.getItem(themeKey);

if (savedTheme === "dark") {
  darkTheme.disabled = false;
}

historyList.insertAdjacentHTML('afterbegin', addItems(historyStorageData));

deleteBtn.addEventListener("click", (e) => {
    localStorage.removeItem(historyListKey);
    historyStorageData = [];
    historyList.innerHTML = '';
    return;
})

historyList.addEventListener("dblclick", (e) => {
  const id = e.target.dataset.id;
  const index = historyStorageData.findIndex(element => element.id === Number(id));
  if (index !== -1) {
    historyStorageData.splice(index, 1);
    saveToLS(historyListKey, historyStorageData);
  }
  historyList.querySelectorAll('li').forEach(li => {
    if (li.dataset.id === id) {
      li.remove();
    }
  });
})
