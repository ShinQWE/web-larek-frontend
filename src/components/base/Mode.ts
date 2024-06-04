// Базовая модель, чтобы отличить ее от простых объектов с данными
abstract class Model<T> {
   // Принимает данные для хранения, эвент эмиттер
   constructor(data: Partial<T>, protected events: IEvents) {} 
   // Вызывает эвент
   emitChanges(event: string, payload?: object) {}
}