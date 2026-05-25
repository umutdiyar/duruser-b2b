import { Bell, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type DashboardHeaderProps = {
  title: string;
  description?: string;
};

export function DashboardHeader({ title, description }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between px-6 lg:px-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>

          {description ? (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          <Button size="icon" variant="outline" className="hidden md:flex">
            <Search className="h-4 w-4" />
          </Button>

          <Button size="icon" variant="outline">
            <Bell className="h-4 w-4" />
          </Button>

          <Avatar className="h-10 w-10 border">
            <AvatarFallback>DB</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
