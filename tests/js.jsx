import {Fragment, useRef, useState} from "react";

// @ts-expect-error
function Component() { // eslint-disable-line react-refresh/only-export-components,@typescript-eslint/no-unused-vars
  const ref = useRef(0);
  // @ts-expect-error
  const _ref2 = useRef(null);
  const [_val, _setVal] = useState(null); // eslint-disable-line react/use-state
  const value = ref.current; // eslint-disable-line react/refs
  // @ts-expect-error
  const _x = (
    <div>
      <Fragment>
        <button/>
        ${"foo"}{/* eslint-disable-line react-jsx/no-leaked-dollar */}
        <button/>
      </Fragment>
    </div>
  );
  return <Fragment><button disabled={true}>{value}</button></Fragment>;
}
