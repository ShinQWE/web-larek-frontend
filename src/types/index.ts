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

