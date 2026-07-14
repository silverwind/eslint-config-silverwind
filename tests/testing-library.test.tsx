// @ts-expect-error
import {cleanup, render, screen} from "@testing-library/react"; // eslint-disable-line @typescript-eslint/no-unused-vars,testing-library/no-manual-cleanup
const view = render(<div/>);
screen.getByText("foo");
view.getByText("foo"); // eslint-disable-line testing-library/prefer-screen-queries

// react/immutability is disabled in test files, so this mutation-in-render pattern lints clean without a directive
function Mutating() {
  let mutated = 0;
  return <button onClick={() => { mutated = 1; }}>{mutated}</button>;
}
render(<Mutating/>);
