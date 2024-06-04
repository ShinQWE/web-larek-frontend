https://github.com/ShinQWE/web-larek-frontend

# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Класс с работа с Api и обработчиком событий EventEmitter 

// Класс для работы с API
export class Api {
    // базовый URL для Api
    readonly baseUrl: string;
    // опции для fetch
    protected options: RequestInit;
    
    // конструктор принимает базовый URL и опции
    constructor(baseUrl: string, options: RequestInit = {}) {}
    // обрабатывает запрос и возвращает промис с данными
    protected handleResponse(response: Response): Promise<object> {}
    // get запрос
    get(uri: string) {}
    // post запрос
    post(uri: string, data: object, method: ApiPostMethods = 'POST') {}
}
