export interface IFormState<T> {
  saveState(state: Partial<T>): void;
  restoreState(): Partial<T>;
}
