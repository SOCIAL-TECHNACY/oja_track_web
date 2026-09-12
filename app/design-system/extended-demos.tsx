"use client";

import { useState } from "react";
import Button from "../components/ui/Button";
import { ActionSheet, FilterSheet } from "../components/ui/BottomSheet";
import Drawer from "../components/ui/Drawer";
import Dropdown from "../components/ui/Dropdown";
import {
  NoResultsState,
  OfflineState,
  ReconnectingState,
} from "../components/ui/EmptyState";
import { ConfirmModal, FormModal, SuccessModal } from "../components/ui/Modal";
import { Toast, ToastProvider, useToast } from "../components/ui/Toast";
import type { ToastStatus } from "../components/ui/Toast";
import DatePicker from "../components/ui/DatePicker";
import Tooltip from "../components/ui/Tooltip";

function DemoBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xs font-bold text-light-muted uppercase">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function ToastButtons() {
  const { toast } = useToast();
  const statuses: ToastStatus[] = ["success", "error", "warning", "info"];
  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((s) => (
        <Button
          key={s}
          variant="secondary"
          className="min-w-0"
          onClick={() => toast(s)}
        >
          Fire {s}
        </Button>
      ))}
    </div>
  );
}

/*
 * Client demo island for the extended (overlay / interactive) components.
 * Keeps page.tsx a Server Component; all controlled open-state lives here.
 */
export default function ExtendedDemos() {
  const [confirm, setConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState(false);
  const [actions, setActions] = useState(false);
  const [filter, setFilter] = useState(false);
  const [drawer, setDrawer] = useState(false);

  return (
    <ToastProvider>
      <div className="space-y-8">
        <DemoBlock title="Section 1 — Modal Dialogs">
          <div className="flex flex-wrap gap-2">
            <Button variant="danger" className="min-w-0" onClick={() => setConfirm(true)}>
              Delete Product?
            </Button>
            <Button className="min-w-0" onClick={() => setSuccess(true)}>
              Payment Successful
            </Button>
            <Button variant="tertiary" className="min-w-0" onClick={() => setForm(true)}>
              Add New Product
            </Button>
          </div>
          <ConfirmModal open={confirm} onOpenChange={setConfirm} />
          <SuccessModal open={success} onOpenChange={setSuccess} />
          <FormModal open={form} onOpenChange={setForm} />
        </DemoBlock>

        <DemoBlock title="Section 2 — Bottom Sheets">
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" className="min-w-0" onClick={() => setActions(true)}>
              Action Sheet
            </Button>
            <Button variant="secondary" className="min-w-0" onClick={() => setFilter(true)}>
              Filter Sheet
            </Button>
          </div>
          <ActionSheet open={actions} onOpenChange={setActions} />
          <FilterSheet open={filter} onOpenChange={setFilter} />
        </DemoBlock>

        <DemoBlock title="Section 3 — Toast Notifications">
          <ToastButtons />
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Toast status="success" />
            <Toast status="error" />
            <Toast status="warning" />
            <Toast status="info" />
          </div>
        </DemoBlock>

        <DemoBlock title="Section 4 — Drawer / Side Panel (260px)">
          <Button variant="secondary" className="min-w-0" onClick={() => setDrawer(true)}>
            Open Agent Drawer
          </Button>
          <Drawer open={drawer} onOpenChange={setDrawer} />
        </DemoBlock>

        <DemoBlock title="Section 5 — Tooltips">
          <div className="flex flex-wrap items-center gap-6">
            <Tooltip text="Commission earned from this shop" side="top">
              <Button variant="tertiary" className="min-w-0">
                Hover top
              </Button>
            </Tooltip>
            <Tooltip text="Quick shop status indicator" side="right">
              <Button variant="tertiary" className="min-w-0">
                Hover right
              </Button>
            </Tooltip>
            <Tooltip text="Press to verify agent status" side="bottom">
              <Button variant="tertiary" className="min-w-0">
                Hover bottom
              </Button>
            </Tooltip>
          </div>
        </DemoBlock>

        <div className="grid gap-8 md:grid-cols-2">
          <DemoBlock title="Section 6 — Date Picker">
            <DatePicker />
          </DemoBlock>
          <DemoBlock title="Section 7 — Dropdown / Select">
            <Dropdown />
          </DemoBlock>
        </div>

        <DemoBlock title="Section 8 — Empty States">
          <div className="grid gap-4 md:grid-cols-2">
            <NoResultsState />
            <div className="space-y-4">
              <OfflineState />
              <ReconnectingState />
            </div>
          </div>
        </DemoBlock>
      </div>
    </ToastProvider>
  );
}
