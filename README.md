# 📡 RAWG API — Referência de Endpoints

Documentação de referência dos endpoints utilizados no projeto **GameVault**.

Base URL: `https://api.rawg.io/api`

> ⚠️ Todas as requisições exigem o parâmetro `?key=SUA_CHAVE`. Obtenha sua chave gratuita em [rawg.io/apidocs](https://rawg.io/apidocs).

---

## 🎮 Jogos

### Listar jogos
```
GET /games?key={key}
```
Retorna a lista paginada de jogos.

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `key` | `string` | **Obrigatório.** Sua chave de API |
| `page` | `number` | Número da página (padrão: `1`) |
| `page_size` | `number` | Itens por página, máx. `40` (padrão: `20`) |
| `ordering` | `string` | Ordenação. Ex: `-rating`, `-added`, `name` |
| `search` | `string` | Busca por nome do jogo |
| `genres` | `string` | Slug do gênero. Ex: `action`, `rpg` |
| `platforms` | `number` | ID da plataforma. Ex: `4` (PC) |

**Exemplo:**
```
GET /games?key=abc123&page_size=20&ordering=-rating
```

---

### Buscar jogo por nome
```
GET /games?key={key}&search={termo}
```
Filtra jogos cujo nome contenha o termo buscado.

**Exemplo:**
```
GET /games?key=abc123&search=zelda
```

---

### Detalhes de um jogo
```
GET /games/{id}?key={key}
```
Retorna todos os dados de um jogo específico.

| Campo retornado | Tipo | Descrição |
|---|---|---|
| `id` | `number` | ID único do jogo |
| `name` | `string` | Nome do jogo |
| `background_image` | `string` | URL da imagem de capa |
| `released` | `string` | Data de lançamento (`YYYY-MM-DD`) |
| `rating` | `number` | Nota média (0–5) |
| `ratings_count` | `number` | Total de avaliações |
| `description_raw` | `string` | Descrição em texto puro |
| `genres` | `array` | Lista de gêneros |
| `platforms` | `array` | Lista de plataformas |
| `developers` | `array` | Lista de desenvolvedores |
| `playtime` | `number` | Tempo médio de jogo (horas) |

**Exemplo:**
```
GET /games/3498?key=abc123
```

---

### Filtrar jogos por gênero
```
GET /games?key={key}&genres={slug}
```
Retorna jogos de um gênero específico usando o `slug` do gênero.

**Exemplo:**
```
GET /games?key=abc123&genres=action&page_size=20
```

---

## 🗂️ Gêneros

### Listar gêneros
```
GET /genres?key={key}
```
Retorna todos os gêneros disponíveis.

| Campo retornado | Tipo | Descrição |
|---|---|---|
| `id` | `number` | ID do gênero |
| `name` | `string` | Nome do gênero. Ex: `Action` |
| `slug` | `string` | Slug para filtros. Ex: `action` |
| `games_count` | `number` | Total de jogos no gênero |

**Exemplo:**
```
GET /genres?key=abc123
```

---

## 🕹️ Plataformas

### Listar plataformas
```
GET /platforms?key={key}
```
Retorna todas as plataformas disponíveis.

**Exemplo:**
```
GET /platforms?key=abc123
```

---

## 📦 Estrutura de resposta paginada

Todos os endpoints de listagem seguem este formato:

```json
{
  "count": 500000,
  "next": "https://api.rawg.io/api/games?page=2&key=...",
  "previous": null,
  "results": [ ... ]
}
```

| Campo | Descrição |
|---|---|
| `count` | Total de itens encontrados |
| `next` | URL da próxima página (`null` se for a última) |
| `previous` | URL da página anterior (`null` se for a primeira) |
| `results` | Array com os itens da página atual |

---

## 🔗 Links úteis

- Documentação oficial: [rawg.io/apidocs](https://rawg.io/apidocs)
- Cadastro para chave gratuita: [rawg.io/login](https://rawg.io/login)