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