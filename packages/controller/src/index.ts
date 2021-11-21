export const add = (a: number, b: number) => a + b;
export * from './utils/sleep';
export * from './utils/toErrorMap';
export * from './utils/yupSchemas';
export * from './generated/graphql';

export { useCountRenders } from './hooks/useCountRenders';
export { useDebounce } from './hooks/useDebounce';
export { useMeasure } from './hooks/useMeasure';
export { usePrevious } from './hooks/usePrevious';
export { useTimeout } from './hooks/useTimeout';
export { useToggle } from './hooks/useToggle';
export { useWhyDidYouUpdate } from './hooks/useWhyDidYouUpdate';
