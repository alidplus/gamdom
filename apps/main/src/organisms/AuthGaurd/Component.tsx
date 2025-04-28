"use client";
import { whoamiQueryOptions } from "@/api";
import { Modal } from "@/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { Signin } from "..";

function InnerComponent({ children }: PropsWithChildren) {
  useSuspenseQuery(whoamiQueryOptions());

  return children;
}

export default withErrorBoundary(InnerComponent, {
  FallbackComponent({ resetErrorBoundary }) {
    return (
      <Modal open>
        <Signin onSubmit={() => setTimeout(resetErrorBoundary, 500)} />
        <p className="label">Please login to continue</p>
      </Modal>
    );
  },
});
