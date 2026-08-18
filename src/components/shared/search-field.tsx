import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchFieldProps = React.ComponentProps<typeof Input>;

export function SearchField({ className, ...props }: SearchFieldProps) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        type="search"
        className={cn("h-11 rounded-xl pl-9", className)}
        {...props}
      />
    </div>
  );
}
