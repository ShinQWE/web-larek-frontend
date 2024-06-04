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