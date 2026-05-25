export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-sm font-bold text-white shadow-lg shadow-primary/30">
        D
      </div>

      <div>
        <p className="text-sm font-bold tracking-tight">DuruSer</p>

        <p className="text-xs text-muted-foreground">Sipariş Paneli</p>
      </div>
    </div>
  );
}
