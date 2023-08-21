# Details

## Project setup

```
# yarn
yarn
```

### Compiles and hot-reloads for development

```
# yarn
yarn dev
```

### Compiles and minifies for production

```
# yarn
yarn build
```

### Lints and fixes files

```
# yarn
yarn lint
```

### Prettier to prettify code

```
# yarn
yarn format
```

# OR

### Run with docker

```
docker-compose up
```

Server will run on `http://localhost:8080/`

### ENV
Add a `.env` file in the root with the following:

```
VITE_APP_BASE_URL="https://newsapi.org/v2"
VITE_APP_API_KEY=API_KEY
```

### INFO

#### Components
The "components" folder houses all the reusable and stateless components.


#### Vuex store

At the moment, nothing remains stored within the Vuex store. Any data such as articles, search results, and visited history will vanish if the page is refreshed. In a React context, I would typically utilize a Redux store to maintain essential data persistently. Similarly, Vuex offers a solution called vuex-persistedstate that serves the same purpose. While I haven't had the opportunity to implement it due to time limitations, it's worth discussing as an option for maintaining data persistence.


#### Articles

Initially, the headlines endpoint wasn't providing any article IDs. To address this, I introduced an "id" key within the object, which is generated based on the headline's title. This adjustment was made to enhance application functionality, considering the initial consideration of using indexes.

I also implemented a getter that offers a key-value mapping with the article UUID as the key. This approach enables quicker and more efficient access, bypassing the need for find or filter operations. This getter is primarily utilized on the article details page.

Regarding the history of visited articles:

Presently, I'm maintaining a set of IDs to track visited articles. However, this method isn't entirely accurate. If a search query is active, the history will only reflect articles available in the search results, as it overrides the main article list array. An optimal solution would involve a dedicated history endpoint. However, due to time constraints and for the purpose of showcasing the concept, I've currently implemented it using saved article IDs. This approach is subject to change and can be easily adapted to a more robust solution in the future.

#### Article Details Page

When viewing the article details page, the article information is shown. However, if the page is refreshed, the application redirects the user to the home page. This is due to the Vuex store not persisting any data, causing the app to lose all information and necessitating the redirection.

#### Test

I am used to writing tests using Jest, but I'm currently encountering a configuration issue with Jest that seems persistent. I will delve deeper into the matter and attempt to resolve it.

Wrote utility test.