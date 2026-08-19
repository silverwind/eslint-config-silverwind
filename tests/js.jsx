import {Fragment, useRef, useState} from "react";

// @ts-expect-error
function Component() { // eslint-disable-line react-refresh/only-export-components,@typescript-eslint/no-unused-vars -- fixture
  const ref = useRef(0);
  // @ts-expect-error
  const _ref2 = useRef(null);
  const [_val, _setVal] = useState(null); // eslint-disable-line react/use-state,react/no-unused-state -- fixture
  const value = ref.current; // eslint-disable-line react/refs -- fixture
  // @ts-expect-error
  const _x = (
    <div>
      <Fragment>
        <button/>
        ${"foo"}{/* eslint-disable-line react-jsx/no-leaked-dollar -- fixture */}
        <button/>
      </Fragment>
    </div>
  );
  return <Fragment><button disabled={true}>{value}</button></Fragment>;
}
