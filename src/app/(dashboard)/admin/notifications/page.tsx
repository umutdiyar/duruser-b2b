import { Bell } from "lucide-react";

import { DashboardContainer } from "@/components/layout/dashboard-container";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { EmptyState } from "@/components/shared/empty-state";

export default function AdminNotificationsPage() {
  return (
    <>
      <DashboardHeader
        title="Bildirimler"
        description="Operasyonla ilgili güncellemeleri buradan takip edin."
      />

      <DashboardContainer>
        <EmptyState
          icon={Bell}
          title="Henüz bildiriminiz yok"
          description="Yeni siparişler, iptaller ve operasyon uyarıları ileride burada görüntülenecek."
        />
      </DashboardContainer>
    </>
  );
}
