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

function getTimeDiff(date1, date2) {
  const diffMs = Math.abs(date1 - date2);
  const oneMinute = 1000*60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;
  if(Math.floor(diffMs / oneDay) >= 1) {
    return `${Math.floor(diffMs/oneDay)} days`
  } else if (Math.floor(diffMs / oneHour) >= 1) {
    return `${Math.floor(diffMs/oneHour)} hours`
  } else {
    return `${Math.floor(diffMs/oneMinute)} minutes`
  }
}

function addItem(item) {
  return `<li data-id="${item.id} data-time="${item.time}">
      ${item.text}<span class="hours"> (${getTimeDiff(Date.now(),item.time)})</span>
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

