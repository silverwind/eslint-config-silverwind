import {Fragment, useRef, useState} from "react";

// @ts-expect-error
function Component() { // eslint-disable-line react-refresh/only-export-components,@typescript-eslint/no-unused-vars -- fixture
  const ref = useRef(0);
  // @ts-expect-error
  const _ref2 = useRef(null);
  // @ts-expect-error
  const [_val, set_val] = useState(null); // eslint-disable-line @typescript-eslint/no-unused-vars,react/no-unused-state -- fixture
  const [_val2] = useState(null); // eslint-disable-line react/no-unused-state -- fixture
  const value = ref.current; // eslint-disable-line react/refs -- fixture
  let mutated = 0;
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
  return <Fragment><button disabled={true} onClick={() => { mutated = 1; }}>{value}{mutated}</button></Fragment>; // eslint-disable-line react/immutability -- fixture
}
