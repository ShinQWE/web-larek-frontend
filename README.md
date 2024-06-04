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
```TypeScript
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

// Интерфейс
export interface IEvents {
    on<T extends object>(event: EventName, callback: (data: T) => void): void;
    emit<T extends object>(event: string, data?: T): void;
    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}
/**
 * Брокер событий, классическая реализация
 * В расширенных вариантах есть возможность подписаться на все события
 * или слушать события по шаблону например
 */
export class EventEmitter implements IEvents {
    // Map состоящий из событий и подписчиков
    _events: Map<EventName, Set<Subscriber>>;

    constructor() {}
    /**
     * Установить обработчик на событие
     */
    on<T extends object>(eventName: EventName, callback: (event: T) => void) {}
    /**
     * Снять обработчик с события
     */
    off(eventName: EventName, callback: Subscriber) {}
    /**
     * Инициировать событие с данными
     */
    emit<T extends object>(eventName: string, data?: T) {}
    /**
     * Слушать все события
     */
    onAll(callback: (event: EmitterEvent) => void) {}
    /**
     * Сбросить все обработчики
     */
    offAll() {}
    /**
     * Сделать коллбек триггер, генерирующий событие при вызове
     */
    trigger<T extends object>(eventName: string, context?: Partial<T>) {}
```

## Типы данных и классы представления
```TypeScript

// Категории товаров 
type CategoryType = | 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';

// Интерфейс, который описывает карту товара
interface IProduct {
   // уникальный ID товара
   id: string;
   // описание товара
   description: string;
   // ссылка на картинку
   image: string;
   // название
   title: string;
   // категория товара
   category: CategoryType;
   // цена товара, может быть null
   price: number | null | string;
   // товар добавлен в корзину  ДА или НЕТ
   selected: boolean;
}

// Интерфейс, описывающий внутренне состояние приложения Используется для хранения карточек, корзины, заказа пользователя, ошибок в формах c карточками и корзиной
interface IAppState {
   // Корзина с товарами
   basket: Product[];
   // Массив карточек товара
   store: Product[];
   // Информация о заказе при покупке товара
   order: IOrder;
   // Ошибки при заполнении форм
   formErrors: FormErrors;
   // Метод для добавления товара в корзину
   addToBasket(value: Product): void;
   // Метод для удаления товара из корзины
   deleteFromBasket(id: string): void;
   // Метод для полной очистки корзины
   clearBasket(): void;
   // Метод для получения количества товаров в корзине
   getBasketAmount(): number;
   // Метод для получения суммы цены всех товаров в корзине
   getTotalBasketPrice(): number;
   // Метод для добавления ID товаров в корзине в поле items для order
   setItems(): void;
   // Метод для заполнения полей email, phone, address, payment в order
   setOrderField(field: keyof IOrderForm, value: string): void;
   // Валидация форм для окошка "контакты"
   validateContacts(): boolean;
   // Валидация форм для окошка "заказ"
   validateOrder(): boolean;
   // Очистить order после покупки товаров
   refreshOrder(): boolean;
   // Метод для превращения данных, полученых с сервера в тип данных приложения
   setStore(items: IProduct[]): void; 
   // Метод для обновления поля selected во всех товарах после совершения покупки
   resetSelected(): void;
}

// Интерфейс, который описывает поля Заказов товара
export interface IOrder {
   // массив ID купленных товаров
   items: string[];
   // способ оплаты
   payment: string;
   // сумма заказа
   total: number;
   // адрес доставки
   address: string;
   // электронная почта
   email: string;
   // телефон
   phone: string;
}

// Класс, описывает окно заказа товара
export class Order extends Form<IOrder> {

   // ссылки на внутренние элементы
   protected _card: HTMLButtonElement;
   protected _cash: HTMLButtonElement;

   // конструктор принимает имя блока, родительский элемент и обработчик событий
   constructor(protected blockName: string, container: HTMLFormElement, protected events: IEvents);

   // метод, отключающий подсвечивание кнопок
   disableButtons(): void;
}

// Интерфейс, описывающий страницу
export interface IPage {
   // счётчик товаров в корзине
   counter: number;
   // массив карточек с товарвми
   store: HTMLElement[];
   // Переключатель для блокировки отключает прокрутку страницы
   locked: boolean;
}

// Класс, описывает главную страницу
class Page extends Component<IPage> {
   // ссылки на внутренние элементы
   protected _counter: HTMLElement;
   protected _store: HTMLElement;
   protected _wrapper: HTMLElement;
   protected _basket: HTMLElement;

   // конструктор принимает родительский элемент и обработчик событий
   constructor(container: HTMLElement, protected events: IEvents);
   
   // сеттер для счётчика товаров в корзине
   set counter(value: number);
   // сеттер для карточек товаров на странице
   set store(items: HTMLElement[]); 
   // сеттер для блока прокрутки
   set locked(value: boolean);
}

// Интерфейс, описывающий карточку товара
export interface ICard {
   // ID
   id: string;
   // заголовок
   title: string;
   // категория
   category: string;
   // описание 
   description: string;
   // картинка
   image: string;
   // цена
   price: number | null;
   // товар добавлен в корзину  ДА или НЕТ
   selected: boolean;
}

// Класс, описывает карточку товара
class Card extends Component<ICard> {
   // ссылки на внутренние элементы карточки
   protected _title: HTMLElement;
   protected _image: HTMLImageElement;
   protected _category: HTMLElement;
   protected _price: HTMLElement;
   protected _button: HTMLButtonElement;

   // конструктор принимает имя блока, родительский контейнер и объект с колбэк функциями
   constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions);

   // сеттер и геттер для уникального ID
   set id(value: string);
   get id(): string;
   // сеттер и гетер для названия
   set title(value: string);
   get title(): string;
   // сеттер для кратинки
   set image(value: string);
   // сеттер для определения выбрали товар или нет
   set selected(value: boolean);
   // сеттер для цены
   set price(value: number | null); 
   // сеттер для категории
   set category(value: CategoryType);
}

// Интерфейс, описывающий корзину товара
export interface IBasket {
   // массив элементов li с товаром
   list: HTMLElement[];
   // общая цена товаров
   price: number;
}

// Класс, описывает корзину товара
export class Basket extends Component<IBasket> {
   // ссылки на внутренние элементы
   protected _list: HTMLElement;
   protected _price: HTMLElement;
   protected _button: HTMLButtonElement;

   // конструктор принимает имя блока, родительский элемент и обработчик событий
   constructor(protected blockName: string, container: HTMLElement, protected events: IEvents);

   // сеттер для общей цены
   set price(price: number);
   // сеттер для списка товаров 
   set list(items: HTMLElement[]);
   // метод отключающий кнопку "Оформить"
   disableButton(): void; 
   // метод для обновления индексов таблички при удалении товара из корзины
   refreshIndices(): void;
}

// Интерфейс, описывающий окно заказа товара
export interface IOrder {
   // Адрес
   address: string;
   // Способ оплаты
   payment: string;
}

// Класс, описывает окно заказа товара
export class Order extends Form<IOrder> {

   // ссылки на внутренние элементы
   protected _card: HTMLButtonElement;
   protected _cash: HTMLButtonElement;

   // конструктор принимает имя блока, родительский элемент и обработчик событий
   constructor(protected blockName: string, container: HTMLFormElement, protected events: IEvents);

   // метод, отключающий подсвечивание кнопок
   disableButtons(): void;
}

// Интерфейс, описывающий окно контакты
export interface IContacts {
   // Телефон
   phone: string;
   // Электронная почта
   email: string;
}

// Класс, описывает окно контакты
export class Contacts extends Form<IContacts> {

  // конструктор принимает родительский элемент и обработчик событий
   constructor(container: HTMLFormElement, events: IEvents);
   
}

// База компонент
abstract class Component<T> {
   // конструктор принимает родительский элемент
   protected constructor(protected readonly container: HTMLElement);
   
   // переключить класс
   toggleClass(element: HTMLElement, className: string, force?: boolean): void;
   // установить текстовое содержимое
   protected setText(element: HTMLElement, value: string): void;
   // сменить статус блокировки
   setDisabled(element: HTMLElement, state: boolean): void;
   // скрыть
   protected setHidden(element: HTMLElement): void;
   // показать
   protected setVisible(element: HTMLElement): void;
   // установить изображение с алтернативным текстом
   protected setImage(el: HTMLImageElement, src: string, alt?: string): void;
   // вернуть корневой DOM-элемент
   render(data?: Partial<T>): HTMLElement;
}

```

## Модели данных
```TypeScript

    // Базовая модель, чтобы отличить ее от простых объектов с данными
abstract class Model<T> {
   // Принимает данные для хранения, эвент эмиттер
   constructor(data: Partial<T>, protected events: IEvents) {} 
   // Вызывает эвент
   emitChanges(event: string, payload?: object) {}
}

// Класс, описывающий состояние приложения
export class AppState extends Model<IAppState> {
   // корзина с товарами
   basket: Product[] = [];
   // массив со всеми товарами
   store: Product[];
   // объект заказа клиента
   order: IOrder = {
      items: [],
      payment: '',
      total: null,
      address: '',
      email: '',
      phone: '',
   };
   // Объект с ошибками форм
   formErrors: FormErrors = {};
   // мтод для добавления товара в корзину
   addToBasket(value: Product): void;
   // метод для удаления товара из корзины
   deleteFromBasket(id: string): void;
   // метод для полной очистки корзины
   clearBasket(): void;
   // метод для получения количества товаров в корзине
   getBasketAmount(): number;
   // метод для получения суммы цены всех товаров в корзине
   getTotalBasketPrice(): number;
   // метод для добавления ID товаров в корзине в поле items для order
   setItems(): void;
   // метод для заполнения полей email, phone, address, payment в order
   setOrderField(field: keyof IOrderForm, value: string): void;
   // валидация форм для окошка "контакты"
   validateContacts(): boolean;
   // валидация форм для окошка "заказ"
   validateOrder(): boolean;
   // очистить order после покупки товаров
   refreshOrder(): boolean;
}

```












