import {Fragment, useRef, useState} from "react";

// @ts-expect-error
function Component() { // eslint-disable-line react-refresh/only-export-components,@typescript-eslint/no-unused-vars
  const ref = useRef(0);
  // @ts-expect-error
  const _ref2 = useRef(null); // eslint-disable-line no-restricted-syntax
  const [_val, _setVal] = useState(null); // eslint-disable-line no-restricted-syntax,@eslint-react/naming-convention/use-state
  const value = ref.current; // eslint-disable-line react-hooks/refs
  // @ts-expect-error
  const _x = (
    <div>
      <Fragment>
        <button/>
        ${"foo"}{/* eslint-disable-line @eslint-react/jsx-dollar */}
        <button/>
      </Fragment>
    </div>
  );
  return <><button disabled={true}>{value}</button></>; // eslint-disable-line @eslint-react/jsx-shorthand-fragment
}
