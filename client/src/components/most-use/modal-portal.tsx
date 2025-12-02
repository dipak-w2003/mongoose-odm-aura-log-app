import { type ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode;
}

export default function ModalPortal({ children }: Props) {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.getElementById("todo-subtask-modal");
    setContainer(el);
  }, []);

  if (!container) return null;

  return createPortal(children, container);
}
