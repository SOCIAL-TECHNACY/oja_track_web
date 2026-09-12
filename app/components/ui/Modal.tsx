"use client";

import { useEffect } from "react";
import Button from "./Button";
import { Input, SelectInput } from "./Input";

/*
 * Figma: extended-components > Section 1 — Modal Dialogs (15:2965)
 * White cards ~226px wide, radius 12, drop shadow.
 * Controlled: `open` + `onOpenChange`. Escape + overlay click close.
 */
export function Modal({
  open,
  onOpenChange,
  label,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  label: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foundation-base/60 p-4"
      onClick={() => onOpenChange(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[280px] rounded-xl border border-border bg-white p-5 shadow-[0_16px_48px_rgba(7,16,12,0.25)] dark:bg-foundation-secondary dark:border-[#1e3a2b]"
      >
        {children}
      </div>
    </div>
  );
}

export function ConfirmModal({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
}) {
  return (
    <Modal open={open} onOpenChange={onOpenChange} label="Delete product">
      <div className="flex items-center gap-2">
        <span aria-hidden className="text-danger">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M2.5 4.5h13M7 4.5V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1.5M4.5 4.5l1 10a1 1 0 0 0 1 .9h5a1 1 0 0 0 1-.9l1-10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <p className="text-base font-semibold text-light-primary dark:text-ink-primary">
          Delete Product?
        </p>
      </div>
      <p className="mt-2 text-xs leading-5 text-light-secondary">
        This action is permanent. You will lose all recorded inventory data for
        this item.
      </p>
      <div className="mt-4 flex gap-2">
        <Button
          variant="ghost"
          className="min-w-0 flex-1"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          className="min-w-0 flex-1"
          onClick={() => {
            onConfirm?.();
            onOpenChange(false);
          }}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
}

export function SuccessModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Modal open={open} onOpenChange={onOpenChange} label="Payment successful">
      <div className="flex flex-col items-center text-center">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="m4 10.5 4 4 8-9"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <p className="mt-3 text-base font-semibold text-light-primary dark:text-ink-primary">
          Payment Successful
        </p>
        <p className="mt-1 text-[11px] text-light-secondary">
          Transaction ID: TXN-4901
        </p>
        <p className="mt-1 text-lg font-bold text-brand-primary">₦15,000</p>
        <Button
          className="mt-4 w-full min-w-0"
          onClick={() => onOpenChange(false)}
        >
          Done
        </Button>
      </div>
    </Modal>
  );
}

export function FormModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Modal open={open} onOpenChange={onOpenChange} label="Add new product">
      <p className="text-base font-semibold text-light-primary dark:text-ink-primary">
        Add New Product
      </p>
      <div className="mt-4 space-y-3">
        <label className="block">
          <span className="mb-1 block text-[11px] font-semibold text-light-secondary">
            Product Name
          </span>
          <Input placeholder="e.g. Golden Penny Flour" className="h-[38px]" />
        </label>
        <div>
          <span className="mb-1 block text-[11px] font-semibold text-light-secondary">
            Category
          </span>
          <SelectInput placeholder="Select Category" className="h-[38px]" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold text-light-secondary">
              Price
            </span>
            <Input placeholder="₦0.00" className="h-[38px]" />
          </label>
          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold text-light-secondary">
              Stock
            </span>
            <Input placeholder="0" inputMode="numeric" className="h-[38px]" />
          </label>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <Button
          variant="ghost"
          className="min-w-0 flex-1"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>
        <Button
          className="min-w-0 flex-1"
          onClick={() => onOpenChange(false)}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
}
