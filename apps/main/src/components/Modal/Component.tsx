import { forwardRef, ForwardRefRenderFunction, PropsWithChildren } from "react";

interface Props {
  open?: boolean;
}

const Component: ForwardRefRenderFunction<
  HTMLDialogElement,
  PropsWithChildren<Props>
> = ({ children, open }, ref) => {
  return (
    <dialog
      ref={ref}
      className="modal modal-bottom sm:modal-middle show"
      open={open}
    >
      <div className="modal-box">{children}</div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default forwardRef(Component);
