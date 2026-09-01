import {useRef} from "react";

export const foo = 1;
export type bar = number;

export function useFixture(): number {
  const ref = useRef(0);
  return ref.current; // eslint-disable-line react/refs -- fixture
}
