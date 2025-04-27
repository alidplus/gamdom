import { forwardRef, ForwardRefRenderFunction, PropsWithChildren } from "react";

const Component: ForwardRefRenderFunction<
  HTMLDialogElement,
  PropsWithChildren
> = ({ children }, ref) => {
  return (
    <dialog ref={ref} className="modal modal-bottom sm:modal-middle show">
      <div className="modal-box">{children}</div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default forwardRef(Component);
