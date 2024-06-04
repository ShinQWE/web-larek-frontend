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