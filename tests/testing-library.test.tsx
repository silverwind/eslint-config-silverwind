// @ts-expect-error
import {cleanup, render, screen} from "@testing-library/react"; // eslint-disable-line @typescript-eslint/no-unused-vars,testing-library/no-manual-cleanup
const view = render(<div/>);
screen.getByText("foo");
view.getByText("foo"); // eslint-disable-line testing-library/prefer-screen-queries
