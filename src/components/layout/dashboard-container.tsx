import { cn } from "@/lib/utils";

type DashboardContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function DashboardContainer({
  children,
  className,
}: DashboardContainerProps) {
  return (
    <div
      className={cn(
        "page-enter mx-auto w-full max-w-[1600px] space-y-6 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
