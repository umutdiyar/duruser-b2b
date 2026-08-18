import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type DateFilterProps = {
  id: string;
  name: string;
  label: string;
  defaultValue?: string;
};

export function DateFilter({ id, name, label, defaultValue }: DateFilterProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs text-muted-foreground">
        {label}
      </Label>
      <Input
        id={id}
        name={name}
        type="date"
        defaultValue={defaultValue}
        className="h-11 rounded-xl"
      />
    </div>
  );
}
