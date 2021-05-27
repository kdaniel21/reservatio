import { defer, ObservableInput } from 'rxjs';

export const doOnSubscribe = <T>(onSubscribe: () => void | null) => {
  return (source: ObservableInput<T>) =>
    defer(() => {
      onSubscribe();
      return source;
    });
};
