import { loginAction } from "@/actions/auth-actions";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-background to-red-50 p-6">
      <Card className="relative w-full max-w-md border-0 bg-white/80 shadow-2xl shadow-orange-100/50 backdrop-blur-xl">
        <CardContent className="space-y-8 p-8">
          <div className="flex justify-center">
            <Logo />
          </div>

          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Panele Giriş</h1>
            <p className="text-sm text-muted-foreground">
              Email ve şifrenizle giriş yapın.
            </p>
          </div>

          <form action={loginAction} className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="admin@duruser.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Şifre</Label>
              <Input
                name="password"
                type="password"
                placeholder="123456"
                required
              />
            </div>

            <Button className="h-11 w-full font-semibold">Giriş Yap</Button>
          </form>

          <div className="rounded-2xl bg-secondary p-4 text-xs text-muted-foreground">
            <p>Admin: admin@duruser.com / 123456</p>
            <p>Müşteri: customer@abcmarket.com / 123456</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
