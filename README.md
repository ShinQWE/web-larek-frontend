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

## Архитектура проекта

Проект основан на модуле «Объектно-ориентированное программирование (ООП) и архитектура приложений». Он использует шаблон Модель-Представление-Презентатор (MVP)

MVP:

- Model : эта часть приложения работает с данными, выполняет расчеты и управляет всеми бизнес-процессами.
- View : эта часть приложения отображает пользовательский интерфейс и данные модели на экране.
- Presenter : эта часть приложения обеспечивает соединение и выступает в качестве посредника между моделью и представлением.

## Типы данных

В проекте используется несколько типов данных и интерфейсов:

- IBasketView: интерфейс, описывающий содержимое корзины

```
export interface IBasketView {
	items: HTMLElement[];
	total: number | string;
	selected: string[];
}
```

- IFormState: интерфейс описывает состояние полей формы

```
export interface IFormState {
   valid: boolean;
   errors: string[];
}

```

- categoryType: тип категории товара

```
export const categoryType: { [value: string]: string } = {
	'софт-скил': 'card__category_soft',
	'хард-скил': 'card__category_hard',
	'кнопка': 'card__category_button',
	'дополнительное': 'card__category_additional',
	'другое': 'card__category_other',
};
```

- paymentType: тип способа оплаты

```
export const paymentType: { [value: string]: string } = {
	'card': 'online',
	'cash': 'offline',
};
```

- IActions: интерфейс определяет действия, которые могут быть выполнены с карточкой товара

```
export interface IActions {
	onClick: (event: MouseEvent) => void;
}
```

- IPage: интерфейс определяет основные характеристики главной страницы

```
export interface IPage {
	catalog: HTMLElement[]; // каталог карт выводимых на сайт
	locked: boolean; // открыта ли карточка
}
```

- IModalData: интерфейс описывает содержимое модального окна

```
interface IModalData {
   content: HTMLElement;
}
```

- ProductStatus: тип статус товара

```
export type TProductStatus = 'active' | 'closed';
```

- ICardProduct: интерфейс описание карточки
```
export interface ICardProduct {
	id: string; // id
	category: string; // категория товара
	image: string; // картинка
	description: string; // описание товара
	title: string; // название товара
	price: number | null; // цена
}
```

- IOrderForm: интерфейс, описывающий адрес доставки товара

```
export interface IOrderForm {
	payment: string; // способ оплаты (при получении/онлайн)
	address: string; // адресс
}
```

- IContactsForm: интерфейс, описывающий контактные данные

```
export interface IContactsForm {
	email: string; // email
	phone: string; // телефон
}
```

- IContacts: интерфейс расширяет IContactsForm(контактные данные)

```
export interface IContacts extends IContactsForm {
	itemsContact: string[];
}
```

- ICardItem: интерфейс расширяет ICardProduct(описание карточки)

```
export interface ICardItem extends ICardProduct {
	buttonText: string;
	itemCountProducts: string | number;
}
```

- IOrder: интерфейс, описывающий список товаров

```
export interface IOrder extends IOrderForm, IContactsForm {
	items: string[];
	total: number | string;
}
```

## Компоненты данных

ProductCard - реализует экземпляр товара
export class ProductCard extends Model<ICardProduct> 


### AppData
Класс AppData отвечает за данные всех функций, реализованных в проекте. Содержит методы управления корзиной, каталогом, полями заказа и контактами,
а также наследует класс ProductCard

- toggleBasket(item: ProductCard) - удалить или добавить товар в список корзины
- clearBasket() - очистить корзину
- getTotal() - получить общую сумму заказа
- getBasket(): ProductCard[] - получить список BasketItem(список корзины)
- setCatalog(items: ICardProduct[]) - установить список товаров
- setOrderField(field: keyof IOrderForm, value: string) - отслеживать изменения полей заказа
- setContactField(field: keyof IContactsForm, value: string) - отслеживать изменения полей контактной информации
- validateOrder() - валидация полей (address)
- validateContacts() - валидация полей (email, phone)

### Larek
Класс Larek отвечает получаемые данные с сервера

- getProductList(): Promise<ICardProduct[]> - получаем список товара
- orderProduct(order: IOrder): Promise<ISuccess> - результат заказа

## Базовый код

Базовый код включает в себя несколько классов:

### EventEmitter:
Проект Web-larek использует класс EventEmitter для обработки событий. Этот класс действует как центральный брокер событий, позволяя компонентам подписываться на события, прослушивать их и реагировать соответствующим образом.
EventEmitter базовый класс, который позволяет компонентам подписываться на события или прослушивать их и реагировать на них.

- on<T extends object>(eventName: EventName, callback: (event: T) => void) - Установить обработчик на событие
- off(eventName: EventName, callback: Subscriber) - Снять обработчик с события
- emit<T extends object>(eventName: string, data?: T) - Инициировать событие с данными
- onAll(callback: (event: EmitterEvent) => void) - Слушать все события
- offAll() - Сбросить все обработчики
- trigger<T extends object>(eventName: string, context?: Partial<T>) - Сделать коллбек триггер, генерирующий событие при вызове

### api
api базовый класс для взаимодействия с API и сервером, также наследует класс Api

- get(uri: string) - get запрос, ответ с сервера
- post(uri: string, data: object, method: ApiPostMethods = 'POST') - post запрос, отправить данные на сервер
- handleResponse(response: Response): Promise<object> - обрабатывает запрос и возвращает промис с данными

### Component:
Component класс представления, от которого наследуются все остальные классы представлений. Инструментарий для работы с DOM в дочерних компонентах.
Это элемент DOM, который будет использоваться как контейнер для компонента. В этом контейнере будут добавляться создаваемые элементы, а также выполняться различные операции по конфигурации DOM-структур.

- toggleClass(element: HTMLElement, className: string, force?: boolean) - Переключить класс
- setText(element: HTMLElement, value: unknown) - Установить текстовое содержимое
- setDisabled(element: HTMLElement, state: boolean) - Сменить статус блокировки
- setHidden(element: HTMLElement) - Скрыть
- setVisible(element: HTMLElement) - Показать
- setImage(element: HTMLImageElement, src: string, alt?: string) - Установить изображение с алтернативным текстом
- render(data?: Partial<T>): HTMLElement - Вернуть корневой DOM-элемент

### Model:

Model базовая модель, позволяющая отличить ее от простых объектов данных.

// Гарда для проверки на модель (функция для проверки)

```
export const isModel = (obj: unknown): obj is Model<any> => {
	return obj instanceof Model;
};
```

- emitChanges(event: string, payload?: object) - cообщить всем что модель поменялась

## Компоненты представления

Компоненты представления включают в себя несколько классов:

### Modal
Класс для управления поведением модальных окон, наследует класс Component

- set content(value: HTMLElement) - установить содержимое модального окна
- open() 
- close()
- render(data: IModalData): HTMLElement - вывод данных

### Form
Класс для управления формами, наследует класс Component

- protected onInputChange(field: keyof T, value: string) - изменение значений полей формы
- set valid(value: boolean) - установить валидацию полей
- set errors(value: string) - установить вывод об ошибках
- toggleClassOrderForm(element: HTMLElement, className: string, force?: boolean) - форма заказа
- render(state: Partial<T> & IFormState) - возвращает форму с новым состоянием 

### Card
Класс для создание карточки, наследует класс Component

- set id(value: string) - установить id товара
- get id(): string - получить id товара
- set title(value: string) - установить название товара
- get title(): string - получить название товара
- set buttonText(status: string) - получить текст кнопки
- set category(value: string) - установить категорию товара
- set price(value: number | null) - установить цену товара
- set description(value: string) - установить описание товара

### Basket
Класс для отображение корзины, наследует класс Component

- set items(items: HTMLElement[]) - вставить данные в корзину
- set selected(items: ProductCard[]) - наличие товара в корзине
- set total(total: number) - установить сумма всех синнапсов

### Page
Класс для управления интерфейса главной страницы, наследует класс Component

- set counter(value: number | null) - счетчик товара
- set catalog(items: HTMLElement[]) - вывод каталога товара
- set locked(value: boolean) - прокрутка страницы (вкл/выкл)

Эти классы наследуются от Component класса и содержат методы для управления соответствующими элементами.

### Contacts
Класс для управления формой контактных данных пользователя, наследуются от Form класса

- set phone(value: string) - телефон
- set email(value: string) - эл. почта

### Order
Класс предназначен для выбора способа оплаты и ввода адреса доставки, наследуются от Form класса

- public paymentMethod(value: HTMLElement) - способ оплаты
- public set address(value: string) - адрес

Эти классы наследуются от Form класса и содержат методы для управления соответствующими элементами.

### Success
Класс для успешной оплаты.

- set total(total: string | number) - сумма всех синнапсов


## Взаимодействие между компонентами

Взаимодействие между компонентами в проекте Web-larek основано на архитектуре Model-View-Presenter (MVP).
Модель-представление-презентатор (MVP)

- Model : это часть приложения, которая работает с данными, проводит расчеты и управляет всеми бизнес-процессами. В этом проекте AppData за модель отвечает класс. Он содержит методы управления данными, относящимися к полям корзины, каталога, заказа и контактов.
- View : это часть приложения, которая отображает пользовательский интерфейс и данные модели на экране. Компоненты представления в этом проекте включают такие классы Modal, как Form, и другие, которые наследуются от Component класса. Эти классы содержат методы управления отображением и поведением различных элементов интерфейса.
- Presenter : это часть приложения, которая обеспечивает соединение и выступает посредником между моделью и представлением. Ведущий явно не определен в предоставленном тексте, но обычно он отвечает за координацию взаимодействия между моделью и представлением.

## Взаимодействие

- Класс AppData(модель) управляет данными и состоянием приложения. Он предоставляет методы для управления данными и их извлечения, такие как очистка корзины, получение списка корзин, настройка каталога и многое другое.
- Компоненты представления ( Modal, Form и т. д.) отображают данные модели на экране. Они также фиксируют взаимодействия и события пользователей, такие как изменения ввода и отправки форм.
- Presenter будет принимать взаимодействия пользователя, зафиксированные представлением, обрабатывать их по мере необходимости (возможно, используя методы, предоставляемые моделью), а затем обновлять представление, чтобы отразить любые изменения в данных или состоянии приложения.
- Класс EventEmitter можно использовать для облегчения связи между моделью, представлением и презентатором. Компоненты могут подписываться на события или прослушивать события и реагировать на них.
- Класс api взаимодействует с сервером, обрабатывая отправку и получение данных.
- Класс Component является базовым классом, от которого наследуются все остальные классы представлений. Он предоставляет общие методы для управления отображением и поведением элементов интерфейса.
- Класс Model представляет собой базовую модель, позволяющую отличить его от простых объектов данных. Он предоставляет метод уведомления всех об изменении модели.

Таким образом, взаимодействие между компонентами в этом проекте представляет собой цикл потока данных от модели к представлению, взаимодействия пользователя с представлением к презентатору и обновлений от презентатора обратно к модели и представлению.

## Внедрение процессов
Проект Web-larek основан на принципах объектно-ориентированного программирования (ООП) и архитектуры приложений. Он использует шаблон (MVP), который включает в себя:

- model : обрабатывает данные, расчеты и бизнес-процессы.
- view : отображает пользовательский интерфейс и данные модели на экране.
- presenter : действует как посредник между моделью и представлением.

В проекте используется несколько типов данных и интерфейсов, включая ICardProduct, IOrderForm, IContacts, IContactsForm, ICardItem и IOrder. Класс AppData отвечает за данные всех функций, реализованных в проекте. Включает в себя методы управления корзиной, каталогом, полями заказа и полями контактов.

Базовый код включает в себя несколько классов: EventEmitter, api, Componentи Model. Компоненты представления включают в себя несколько классов: Modal, Form, Success, Basket. Каждый из этих классов включает методы для управления соответствующими компонентами. 
