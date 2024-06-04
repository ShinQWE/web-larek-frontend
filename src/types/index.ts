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

// Интерфейс, описывающий страницу
export interface IPage {
   // счётчик товаров в корзине
   counter: number;
   // массив карточек с товарвми
   store: HTMLElement[];
   // Переключатель для блокировки отключает прокрутку страницы
   locked: boolean;
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

// Интерфейс, описывающий корзину товара
export interface IBasket {
   // массив элементов li с товаром
   list: HTMLElement[];
   // общая цена товаров
   price: number;
}

// Интерфейс, описывающий окно заказа товара
export interface IOrder {
   // Адрес
   address: string;
   // Способ оплаты
   payment: string;
}

// Интерфейс, описывающий окно контакты
export interface IContacts {
   // Телефон
   phone: string;
   // Электронная почта
   email: string;
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

