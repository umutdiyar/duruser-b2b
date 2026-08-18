import { Bell } from "lucide-react";

import { DashboardContainer } from "@/components/layout/dashboard-container";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { EmptyState } from "@/components/shared/empty-state";

export default function CustomerNotificationsPage() {
  return (
    <>
      <DashboardHeader
        title="Bildirimler"
        description="Sipariş durumunuzla ilgili güncellemeleri buradan takip edin."
      />

      <DashboardContainer>
        <EmptyState
          icon={Bell}
          title="Henüz bildiriminiz yok"
          description="Siparişiniz onaylandığında, hazırlandığında, kargoya verildiğinde ve teslim edildiğinde burada görüntülenecek."
        />
      </DashboardContainer>
    </>
  );
}
