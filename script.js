async function loadLinks() {
  const res = await fetch('links.json');
  const links = await res.json();
  renderLinks(links);
}

function renderLinks(links) {
  const searchInput = document.getElementById('search');
  const dashboard = document.getElementById('dashboard');

  function display(filtered) {
    dashboard.innerHTML = '';
    if (filtered.length === 0) {
      dashboard.innerHTML = '<p class="text-gray-500">No links found.</p>';
      return;
    }

    filtered.forEach(link => {
      const card = document.createElement('div');
      card.className = "bg-white dark:bg-gray-800 shadow-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700";
      card.innerHTML = `
        <div class="mb-2 text-sm text-blue-600 dark:text-blue-400 font-medium">${link.category}</div>
        <h2 class="text-lg font-semibold">${link.name}</h2>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">${link.desc || ''}</p>
        <a href="${link.url}" target="_blank"
          class="inline-block px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Open
        </a>
      `;
      dashboard.appendChild(card);
    });
  }

  display(links);

  searchInput.addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    const filtered = links.filter(l =>
      l.name.toLowerCase().includes(q) ||
      l.desc?.toLowerCase().includes(q) ||
      l.category.toLowerCase().includes(q)
    );
    display(filtered);
  });
}

loadLinks();
