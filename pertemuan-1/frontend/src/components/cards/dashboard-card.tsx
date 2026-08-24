import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * Pattern C — "Dashboard Order/Purchase/Refund Card".
 * Seen on: OrderCard, PurchaseCard, RefundCard — near-identical across
 * all three on the source platform.
 * Shape: rounded-md border border-gray-30, header border-b border-gray-70,
 * footer bg-gray-10.
 */
export function CardDashboardDemo() {
  return (
    <div className="border-gray-30 w-full max-w-md overflow-hidden rounded-md border">
      <div className="border-gray-70 flex items-center justify-between border-b p-4 md:p-6">
        <div>
          <p className="text-muted text-sm">Order #10245</p>
          <p className="text-foreground text-base font-semibold">
            Backlink Placement — Tier 1
          </p>
        </div>
        <Badge variant="yellow">Processing</Badge>
      </div>

      <div className="p-4 md:p-6">
        <dl className="grid grid-cols-2 gap-y-2 text-sm">
          <dt className="text-muted">Placed on</dt>
          <dd className="text-foreground text-right">12 Jul 2026</dd>
          <dt className="text-muted">Total</dt>
          <dd className="text-foreground text-right">$249.00</dd>
        </dl>
      </div>

      <div className="bg-gray-10 flex items-center justify-end gap-2 p-4 md:p-6">
        <Button variant="secondary" size="sm">
          View invoice
        </Button>
        <Button size="sm">Track order</Button>
      </div>
    </div>
  );
}
