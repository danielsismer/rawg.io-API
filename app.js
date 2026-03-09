const api_key = "09dd64fe2906466d91c8a6a69e9cc752";
const api_url = "https://api.rawg.io/api"
const input = document.querySelector(".input-search")

async function setMainGames() {

    const data = await fetch(`${api_url}/games?page=1&page_size=4&ordering=-rating&key=${api_key}`);
    const response = await data.json();

    const grid = document.querySelector(".games-grid");
    grid.innerHTML = "";

    response.results.forEach(product => {

        grid.innerHTML += `
            <div class="game-card">
                <div class="game-card__thumb">
                    <img src="${product.background_image}" alt="${product.name}">
                </div>
                <div class="game-card__body">
                    <span class="game-card__genre">${product.genres[0]?.name ?? 'Sem gênero'}</span>
                    <h3 class="game-card__name">${product.name}</h3>
                    <div class="game-card__footer">
                        <span class="game-card__rating">⭐ ${product.rating}</span>
                        <a href="detail.html?id=${product.id}" class="btn btn--card">Detalhes</a>
                    </div>
                </div>
            </div>
        `;

    });

}

async function loadDetail() {

    const grid = document.querySelector(".detail-grid");
    const url_params = new URLSearchParams(window.location.search);
    const product_id = url_params.get("id");

    const data = await fetch(`${api_url}/games/${product_id}?key=${api_key}`);
    const response = await data.json();

    grid.innerHTML = "";

    grid.innerHTML += `

    <div id="detail-main">

        <p class="detail-eyebrow" id="detail-genre">${response.genres[0]?.name ?? 'Sem gênero'}</p>
        <h1 class="detail-title" id="detail-title">${response.name}</h1>

        <div class="detail-meta" id="detail-meta">
            <span class="meta-chip">⭐ ${response.rating}</span>
            <span class="meta-chip">📅 ${response.released ?? 'A definir'}</span>
            <span class="meta-chip">🗳️ ${response.ratings_count} votos</span>
        </div>

        <p class="detail-desc-title">// Sobre o jogo</p>
        <p class="detail-desc" id="detail-desc">
            ${response.description_raw.slice(0, 600)}...
        </p>

        <p class="detail-desc-title">// Plataformas</p>
        <div class="tags-list" id="detail-platforms">
            ${response.parent_platforms.map(p => `<span class="tag">${p.platform.name}</span>`).join('')}
        </div>

    </div>

    <aside class="detail-sidebar" id="detail-sidebar">

        <div class="sidebar-block">
            <div class="sidebar-block__label">Avaliação</div>
            <div class="sidebar-block__value big" id="sidebar-rating">${response.rating}</div>
            <div style="font-family:'Share Tech Mono',monospace;font-size:0.65rem;color:var(--text-dim);margin-top:0.2rem;" id="sidebar-votes">
                ${response.ratings_count} avaliações
            </div>
        </div>

        <hr style="border:none;border-top:1px solid var(--border);">

        <div class="sidebar-block">
            <div class="sidebar-block__label">Lançamento</div>
            <div class="sidebar-block__value" id="sidebar-released">
                ${response.released
            ? new Date(response.released).toLocaleDateString('pt-BR')
            : 'A definir'}
            </div>
        </div>

        <div class="sidebar-block">
            <div class="sidebar-block__label">Gêneros</div>
            <div class="tags-list" id="sidebar-genres">
                ${response.genres.map(g => `<span class="tag">${g.name}</span>`).join("")}
            </div>
        </div>

        <div class="sidebar-block">
            <div class="sidebar-block__label">Desenvolvedor</div>
            <div class="sidebar-block__value" id="sidebar-dev">
                ${response.developers.map(d => `<span class="tag">${d.name}</span>`).join("")}
            </div>
        </div>

        <a href="catalog.html" class="btn btn--ghost" style="width:100%;justify-content:center;">
            ← Ver mais jogos
        </a>

    </aside>
    `;
}



async function initCatalog() {

    let debounceTimer;

    input.addEventListener("input", () => {

        clearTimeout(debounceTimer);

        debounceTimer = setTimeout(async () => {

            const grid = document.querySelector(".games-grid");
            const data = await fetch(`${api_url}/games?search=${input.value}&key=${api_key}&page_size=20`);
            const response = await data.json();

            grid.innerHTML = "";

            response.results.forEach(game => {
                grid.innerHTML += `
            <div class="game-card">
                <div class="game-card__thumb">
                    <img src="${game.background_image}" alt="${game.name}">
                </div>
                <div class="game-card__body">
                    <span class="game-card__genre">
                        ${game.genres.map(g => `<span class="tag">${g.name}</span>`).join("")}
                    </span>
                    <h3 class="game-card__name">${game.name}</h3>
                    <div class="game-card__footer">
                        <span class="game-card__rating">⭐ ${game.rating}</span>
                        <a href="detail.html?id=${game.id}" class="btn btn--card">Detalhes</a>
                    </div>
                </div>
            </div>
            `
            });

        }, 600);

    });

    const grid = document.querySelector(".games-grid");
    const data = await fetch(`${api_url}/games?key=${api_key}&page_size=20&page=1`);
    const response = await data.json();

    grid.innerHTML = "";

    response.results.forEach(game => {

        grid.innerHTML += `
            <div class="game-card">
                <div class="game-card__thumb">
                    <img src="${game.background_image}" alt="${game.name}">
                </div>
                <div class="game-card__body">
                    <span class="game-card__genre">
                        ${game.genres.map(g => `<span class="tag">${g.name}</span>`).join("")}
                    </span>
                    <h3 class="game-card__name">${game.name}</h3>
                    <div class="game-card__footer">
                        <span class="game-card__rating">⭐ ${game.rating}</span>
                        <a href="detail.html?id=${game.id}" class="btn btn--card">Detalhes</a>
                    </div>
                </div>
            </div>
        `;

    });

}

function manipulateRoutes() {

    const url = window.location.href.toLowerCase();

    if (url.includes("index.html") || url.endsWith("/")) {
        setMainGames();
    } else if (url.includes("catalog.html")) {
        initCatalog();
    } else if (url.includes("detail.html")) {
        loadDetail();
    }

}

manipulateRoutes();