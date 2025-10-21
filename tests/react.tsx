import {Fragment, useRef} from "react";

// @ts-expect-error
function Component() { // eslint-disable-line react-refresh/only-export-components,@typescript-eslint/no-unused-vars
  const ref = useRef(0);
  const value = ref.current; // eslint-disable-line react-hooks/refs
  // @ts-expect-error
  const _x = (
    <div>
      <Fragment>{/* eslint-disable-line @eslint-react/no-useless-fragment */}
        <button/>
        <button/>
      </Fragment>
    </div>
  );
  return <><button disabled={true}>{value}</button></>; // eslint-disable-line @eslint-react/no-useless-fragment,@eslint-react/jsx-shorthand-fragment
}
