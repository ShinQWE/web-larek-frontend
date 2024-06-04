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
