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