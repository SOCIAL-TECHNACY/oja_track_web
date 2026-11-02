"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Mail,
  Plus,
  RefreshCw,
  Shield,
  Trash2,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";
import { getStaffApi, inviteStaffApi, revokeStaffInvitationApi } from "@/lib/api/retail";
import { Input } from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import Badge from "@/app/components/ui/Badge";
import type { MembershipRole } from "@/types/auth";
import { useAuth } from "@/lib/auth/auth-context";

interface StaffMember {
  id: string;
  userId: string;
  role: string;
  status: string;
  user: {
    firstName?: string;
    lastName?: string;
    email: string;
    phone?: string;
  };
  branch?: {
    name: string;
  };
}

export default function ShopStaffPage() {
  const { user: authUser } = useAuth();
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    role: "staff",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const fetchStaff = async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const res = await getStaffApi();
      if (res.success && res.staff) {
        setStaffList(res.staff);
      } else {
        setStaffList([]);
      }
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to load team directory from server.";
      setApiError(errorMsg);
      setStaffList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      await inviteStaffApi({
        email: inviteForm.email.trim(),
        first_name: inviteForm.firstName.trim() || undefined,
        last_name: inviteForm.lastName.trim() || undefined,
        role: inviteForm.role,
      });
      setMessage(`Invitation sent successfully to ${inviteForm.email}`);
      setInviteModalOpen(false);
      setInviteForm({ email: "", firstName: "", lastName: "", role: "staff" });
      await fetchStaff();
    } catch (err: unknown) {
      const errText = err instanceof Error ? err.message : "Failed to send invitation";
      setMessage(errText);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Staff & Access Permissions
          </h1>
          <p className="text-xs sm:text-sm text-secondary-text mt-0.5">
            Manage store roles, cashier access, and staff invitations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => fetchStaff()}
            title="Refresh staff"
            className="w-10 h-10 rounded-xl border border-border bg-background flex items-center justify-center text-secondary-text hover:text-foreground"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>
          <Button
            variant="primary"
            size="md"
            onClick={() => setInviteModalOpen(true)}
            className="font-bold flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Invite Staff Member</span>
          </Button>
        </div>
      </div>

      {/* API Notice / Error */}
      {apiError && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 text-xs text-amber-600 dark:text-amber-400">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{apiError}</span>
          </div>
          <button onClick={() => fetchStaff()} className="underline font-bold shrink-0">
            Retry
          </button>
        </div>
      )}

      {message && (
        <div className="p-3.5 rounded-2xl bg-success/10 border border-success/30 flex items-center gap-2 text-xs text-success">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Staff Directory Table */}
      <div className="bg-background border border-border rounded-3xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-bold text-foreground">Active Team Members</h2>
          <span className="text-xs text-secondary-text font-semibold">
            {staffList.length} members
          </span>
        </div>

        {isLoading ? (
          <div className="space-y-3 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-surface-alt rounded-2xl" />
            ))}
          </div>
        ) : staffList.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-border rounded-2xl">
            <Users className="w-10 h-10 mx-auto text-secondary-text opacity-40 mb-2" />
            <p className="text-sm font-semibold text-foreground">No staff members found</p>
            <p className="text-xs text-secondary-text mt-1 max-w-sm mx-auto">
              You haven&apos;t invited any team members to this store yet. Click below to invite your cashiers and managers.
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setInviteModalOpen(true)}
              className="mt-4 font-bold"
            >
              Invite First Staff Member
            </Button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {staffList.map((m) => (
              <div
                key={m.id}
                className="p-3.5 rounded-2xl border border-border bg-surface-alt flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-sm">
                    {m.user.firstName?.[0] || m.user.email[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-foreground">
                        {m.user.firstName ? `${m.user.firstName} ${m.user.lastName || ""}` : m.user.email}
                      </span>
                      <Badge status={m.status === "active" ? "success" : "warning"}>
                        {m.status === "active" ? "Active" : "Invited"}
                      </Badge>
                    </div>
                    <p className="text-xs text-secondary-text">{m.user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-left sm:text-right">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-surface text-[10px] font-bold uppercase tracking-wider text-secondary-text border border-border">
                      {m.role}
                    </span>
                    <p className="text-[11px] text-secondary-text mt-0.5">
                      {m.branch?.name || "All Branches"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Invite Modal */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-3xl p-6 max-w-md w-full space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">Invite Staff Member</h3>
              <button
                onClick={() => setInviteModalOpen(false)}
                className="text-secondary-text hover:text-foreground text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleInvite} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-secondary-text uppercase mb-1">
                  Email Address *
                </label>
                <Input
                  type="email"
                  placeholder="cashier@gmail.com"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-secondary-text uppercase mb-1">
                    First Name
                  </label>
                  <Input
                    placeholder="Emeka"
                    value={inviteForm.firstName}
                    onChange={(e) => setInviteForm({ ...inviteForm, firstName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block font-semibold text-secondary-text uppercase mb-1">
                    Last Name
                  </label>
                  <Input
                    placeholder="Okafor"
                    value={inviteForm.lastName}
                    onChange={(e) => setInviteForm({ ...inviteForm, lastName: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-secondary-text uppercase mb-1">
                  Assigned Store Role
                </label>
                <select
                  value={inviteForm.role}
                  onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value })}
                  className="w-full h-11 px-3 rounded-xl border border-border bg-surface-alt text-xs font-medium outline-none focus:border-brand-primary"
                >
                  <option value="staff">Cashier / Staff (POS Sales Only)</option>
                  <option value="manager">Store Manager (POS + Inventory)</option>
                  <option value="admin">Administrator (Full Access)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={() => setInviteModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isSubmitting || !inviteForm.email.trim()}
                  className="font-bold"
                >
                  {isSubmitting ? "Dispatching..." : "Send Invitation"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
