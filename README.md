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
MVP расшифровывается:
Model (Модель) - часть приложения, которая работает с данными, проводит вычисления и руководит всеми бизнес-процессами.
View (Вид или представление) - часть приложения, показывающая пользователю интерфейс и данные из модели на экране.
Presenter (Представитель)) - часть приложения, которая обеспечивает связь, является посредником между моделью и видом.

## Основные типы данных

```
// Интерфейс главной страницы 
export interface IPage {
	catalogCard: HTMLElement[]; // каталог карт выводимых на сайт
}

// Тип категории товара 
export type CategoryType =
	| 'другое'
	| 'софт-скил'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

// Интерфейс карты товара
export interface ICardProduct {
	id: string; // id
	category: CategoryType; // категория товара
	img: string; // картинка
	description: string; // описание товара
	title: string; // название товара
	price: number | string | null; // цена
}

// Отображение корзины, что в ней находится
export interface IBasket {
	items: HTMLElement[]; // товары в корзине
	selectedId: string[]; // id товарова, которые выбраны
	totalPrice: number | string; // цена всех товаров (синапс)
}

// Адрес доставки
export interface IOrderForm {
	paymentMethod: string; // способ оплаты (при получении/онлайн)
	address: string; // адресс
}

// Контактные данные
export interface IContactsForm {
	email: string; // email
	phone: string; // телефон
}

// Оформление заказа
export interface ISuccess {
	id: string; // Идентификатор завершенного заказа
	total: number | string; // Цена заказа (Итог)
}
```

# Model - компоненты данных

## Класс AppData
За модель отвечает класс AppData. Этот класс должен отвечать за данные всех функционалов, реализованных в проекте.
Содержит методы:
- clearBasket(); // очистить корзину.
- getBasketList(); // получить список корзины.
- toggleBasketList(); // удалить или добавить товар в список корзины.
- setCatalog(); // установить список товаров.
- getTotal(); // получить общую сумму заказа.
- setOrderField(); // отслеживать изменения полей заказа.

# База код

## Класс EventEmitter
Базовый класс, центральный брокер событий. Позволяет компонентам подписываться на события или слушать события и реагировать на них.

- on<T extends object>(eventName: EventName, callback: (event: T) => void) - Установить обработчик на событие
- off(eventName: EventName, callback: Subscriber) - Снять обработчик с события
- emit<T extends object>(eventName: string, data?: T) - Инициировать событие с данными
- onAll(callback: (event: EmitterEvent) => void) - Слушать все события
- offAll() - Сбросить все обработчики
- trigger - Сделать коллбек триггер, генерирующий событие при вызове

## Класс api

Базовый класс - клиент для взаимодействия с API и сервером. 
Содержит методы:

- protected handleResponse(response: Response): Promise<object> - обрабатывает запрос и возвращает промис с данными
- get(uri: string) - get запрос (ответ с сервера)
- post(uri: string, data: object, method: ApiPostMethods = 'POST') - post запрос (отправить данные на сервер)

## Класс Component
Класс представления, от которого наследуют все другие классы представления - это класс Component.
От него непосредственно наследуют "общие" классы представления Modal, Basket, Form, Success.

Содержит методы:

- protected setText(element: HTMLElement, value: unknown) -  Установить текстовое содержимое
- toggleClass(element: HTMLElement, className: string, force?: boolean) - Переключить класс
- setDisabled(element: HTMLElement, state: boolean) - Сменить статус блокировки
- protected setHidden(element: HTMLElement) - Скрыть
- protected setVisible(element: HTMLElement) - Показать
- protected setImage(element: HTMLImageElement, src: string, alt?: string) - Установить изображение с алтернативным текстом
- render(data?: Partial<T>): HTMLElement - Вернуть корневой DOM-элемент

## Класс Model
Базовая модель, чтобы можно было отличить ее от простых объектов с данными

Содержит:

- const isModel = (obj: unknown): obj is Model<any> - Гарда для проверки на модель
- emitChanges(event: string, payload?: object) - Сообщить всем что модель поменялась

# View - компоненты представления

## Класс Modal
Класс управления поведением модальных окон. Наследует класс Component. 

Содержит:

- set content(value: HTMLElement) - установить содержимое модального окна
- open()
- close()
- render(data: IModalData): HTMLElement - вывести данные

## Класс Form
Класс для управления формами. Наследует класс Component.

Содержит: 

- protected onInputChange(field: keyof T, value: string) - изменение значений полей формы
- set valid(value: boolean) - установить валидацию полей
- set errors(value: string) - установить вывод об ошибках
- render(state: Partial<T> & IFormState) - возвращает форму с новым состоянием










