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

## Web-larek
Данный проект проходится на модуле ООП и Архитектура приложений. 
В стартовом наборе находится:
готовая верстка;
часть базового кода:
минимальный набор утилит для работы с HTML;
брокер событий;
клиент API.
настроенный инструментарий.

Архитектурные принципы, по которым писался проект: 

В директории src/types/ разместил:
-index.ts (Интерфейс Settings - позволяет не забыть, какие настройки есть и какие значения могут принимать.
Также это позволит не приводить типы в каждом файле, где используется настройки.)
-html.ts:
Данный код определяет несколько обобщенных типов в TypeScript. Вот возможные названия для этих типов:
SelectorElement<T>: Обобщенный тип для выбора элемента.
SelectorCollection<T>: Обобщенный тип для коллекции выбора.
ElementChild: Тип для дочерних элементов.
ElementAttrs: Тип для атрибутов элемента.
ElementProps<T>: Тип для свойств элемента.
ElementValue<T>: Тип для значения элемента.
ElementCreator<T>: Тип для создания элемента.

В директории src/types/components/model разместил:
-AppState (Форматированные данные карты для отображения в корзине,
Какие модальные окна у нас есть, 
Какие изменения состояния приложения могут происходить,
Модель данных приложения,
Заполняемые пользователем данные, 
Состояние интерфейса,
Действия с API,
Пользовательские действия,
Настройки модели данных,
Функция, которая будет вызываться при изменении состояния,
Конструктор модели данных);
-LarekApi (ApiListResponse<Type>- это расширенный тип, который представляет собой ответ API, состоящий из элементов списка определенного типа;
Movie- это интерфейс, представляющий модель данных для окна карточки;
Contacts- это интерфейс, представляющий модель данных для контактов;
ILarekAPI- это интерфейс, предоставляющий API для работы с данными;)

В директории src/types/components/base резместил:
EventEmitter, View (Типы, отображения)
Названия компонентов придерживался MVP-архитектуре. 

Созданный из предоставленного кода, архитектурный проект состоит из следующих основных частей:
Настройки представлений - содержит настройки для отображения представлений.
Включает в себя:

  cardSelector- строка, представляющая селектор для выбора карточек.
  cardSettings- объект с настройками для карточек, включающий:
  categoryType- тип объекта ElementAttrs, представляющий настройки для карточек типа.
  text- строка, представляющая настройки для текстовых карточек.
  image- строка, представляющая настройки для изображений карточек.
  suptitleSinaps- строка, представляющая настройки для субзаголовка и синопсиса карточки.
  basketTemplate- строка, представляющая шаблон корзины.
  basketSettings- объект с настройками для корзины.
  activeItemClass- строка, представляющая класс активного элемента.
  itemClass- строка, представляющая классный элемент.
  
Настройки модалов - содержат настройки модальных окон. Включает в себя:
  modalCardTemplate- строка, представляющая шаблон модального окна для карточек.
  modalCardSettings- объект с настройками для модального окна карточки.
  categoryType- тип объекта ElementAttrs, представляющий настройки для карточек типа.
  text- строка, представляющая настройки для текстовых карточек.
  supText- строка, представляющая настройки для дополнительных текстовых карточек.
  image- строка, представляющая настройки для изображений карточек.
  suptitleSinaps- строка, представляющая настройки для субзаголовка и синопсиса карточки.
  buyBtn- строка, представляющая настройки для кнопки покупки.
  basketModal- объект с настройками для модального окна корзины.
  headerTitle- строка, представляющая заголовок модального окна.
  preText- строка или число, представляющее предварительный текст.
  text- строка, представляющая текст модального окна.
  sinaps- строка, представляющая синопсис модального окна.
  basket- строка, представляющая корзину.
  suptitleSinaps- строка, представляющая настройки для субзаголовка и модального окна синопсиса.
  buyBtn- строка, представляющая настройки для кнопки покупки.
  paymentModal- объект с настройками для модального окна оплаты.
  headerTitle- строка, представляющая заголовок модального окна.
  totalLabel- строка, представляющая метку для общей суммы.
  nextLabel- строка, представляющая метку для следующего шага.
  nextSettings- объект типа ElementCreator.
  paymentMethod- булево значение, указывающее, есть ли метод оплаты.
  emailModal- объект с настройками для модального окна почты электронной почты.
  headerTitle- строка, представляющая заголовок модального окна.
  emailLabel- строка, представляющая метку для адреса электронной почты.
  phoneLabel- строка, представляющая метку для номера телефона.
  nextSettings- объект типа ElementCreator, представляющий настройки для следующего шага.
  successModal- объект с настройками для модального получения окна завершается.
  title- строка, представляющая заголовок модального окна.
  description- строка, представляющая описание модального окна.
  action- строка, представляющая действие.
  
Настройки модели — содержат настройки для данных модели. Включает в себя:
appState- объект с настройками для состояния приложения, включающий:
formatCurrency- Функция, принимающая число и возвращающая его в формат валюты.
storageKey- строка, представляющая ключ хранилища.
Общая архитектура проекта включает в себя настройки для отображения представлений, модальных окон и моделей данных. Эти настройки определяют различные аспекты визуального представления и функциональности проекта.







