import { useState, useCallback } from "react";

/**
 * useToggle - a simple boolean toggle hook
 * @param initialValue - initial boolean state (default: false)
 */


export interface IUseToggle {
  isOpen?: boolean;
  toggle?: () => void;
  open?: () => void;
  close?: () => void;
}

export function useToggle(initialValue: boolean = false): IUseToggle {
  const [isOpen, setIsOpen] = useState(initialValue);

  const toggle = useCallback(() => setIsOpen(prev => !prev), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, toggle, open, close };
}
