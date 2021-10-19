export class ViewModel<T = any> {
  protected data: T;

  constructor(data: T) {
    this.data = data;
  }
}
