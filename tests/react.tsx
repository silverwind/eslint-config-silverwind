import {useRef} from "react";

// @ts-expect-error
function Component() { // eslint-disable-line react-refresh/only-export-components,@typescript-eslint/no-unused-vars
  const ref = useRef(0);
  const value = ref.current; // eslint-disable-line react-hooks/refs
  return <><div>{value}</div></>; // eslint-disable-line @eslint-react/no-useless-fragment,@eslint-react/jsx-shorthand-fragment
}
