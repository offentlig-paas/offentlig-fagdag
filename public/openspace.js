const API_BASE = 'https://fagdag-openspace.ekstern.dev.nav.no';
const topicsList = document.getElementById('topics-list');
const topicCount = document.getElementById('topic-count');
// const topicForm = document.getElementById('topic-form');
// const topicInput = document.getElementById('topic-input');

function getVotedIds() {
    try {
        return JSON.parse(localStorage.getItem('openspace-votes') || '[]');
    } catch { return []; }
}

function hasVoted(id) {
    return getVotedIds().includes(String(id));
}

function markVoted(id) {
    const voted = getVotedIds();
    voted.push(String(id));
    localStorage.setItem('openspace-votes', JSON.stringify(voted));
}

async function fetchTopics() {
    try {
        const res = await fetch(`${API_BASE}/api/topics`);
        if (!res.ok) throw new Error('Kunne ikke hente temaer');
        const topics = await res.json();
        renderTopics(topics);
    } catch (err) {
        topicsList.innerHTML = `
            <div class="ds-alert" data-color="danger">
                <p>Kunne ikke laste temaer. Prøv igjen senere.</p>
            </div>`;
        topicCount.textContent = '';
    }
}

function renderTopics(topics) {
    topicCount.textContent = `${topics.length} ${topics.length === 1 ? 'tema' : 'temaer'}`;

    if (topics.length === 0) {
        topicsList.innerHTML = `
            <div class="ds-alert" data-color="info">
                <p>Ingen temaer ennå. Vær den første til å foreslå et tema!</p>
            </div>`;
        return;
    }

    topicsList.innerHTML = topics.map((topic, i) => {
        const voted = hasVoted(topic.id);
        return `
        <div class="ds-card openspace-topic" data-color="neutral">
            <div class="ds-card__block openspace-topic-row">
                <div class="ds-button off-button" data-variant="secondary" data-id="${topic.id}" ${voted ? "disabled" : ""}>
                    <span>${topic.votes}</span>
                </div>
                <span class="ds-paragraph">${escapeHtml(topic.title)}</span>
            </div>
        </div>
    `;}).join('');

    // topicsList.querySelectorAll('.openspace-vote-btn:not([disabled])').forEach(btn => {
    //     btn.addEventListener('click', () => vote(btn, btn.dataset.id));
    // });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// async function vote(btn, id) {
//     if (hasVoted(id)) return;
//     btn.disabled = true;
//     try {
//         const res = await fetch(`${API_BASE}/api/topics/${id}/vote`, { method: 'POST' });
//         if (!res.ok) throw new Error('Kunne ikke stemme');
//         markVoted(id);
//         fetchTopics();
//     } catch (err) {
//         btn.disabled = false;
//     }
// }

// topicForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const title = topicInput.value.trim();
//     if (!title) return;

//     const submitBtn = topicForm.querySelector('button[type="submit"]');
//     submitBtn.disabled = true;

//     try {
//         const res = await fetch(`${API_BASE}/api/topics`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ title }),
//         });
//         if (!res.ok) throw new Error('Kunne ikke sende inn tema');
//         topicInput.value = '';
//         fetchTopics();
//     } catch (err) {
//         const card = topicForm.closest('.ds-card');
//         const existing = card.querySelector('.ds-alert');
//         if (existing) existing.remove();
//         const alert = document.createElement('div');
//         alert.className = 'ds-alert';
//         alert.dataset.color = 'danger';
//         alert.innerHTML = '<p>Kunne ikke sende inn tema. Prøv igjen.</p>';
//         card.appendChild(alert);
//         setTimeout(() => alert.remove(), 4000);
//     } finally {
//         submitBtn.disabled = false;
//     }
// });

fetchTopics();
