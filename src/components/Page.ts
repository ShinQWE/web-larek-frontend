
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
