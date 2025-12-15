import AppLayout from "@/layouts/app-layout";
import { useForm } from "@inertiajs/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CreateUser() {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/users");
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: "Dashboard", href: "/dashboard" },
        { title: "Users", href: "/users" },
        { title: "Create", href: "#" },
      ]}
    >
      <div className="p-6 flex justify-start">
        <Card className="w-full max-w-2xl shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Buat User Baru
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={submit} className="space-y-5">
              
              {/* Name */}
              <div className="space-y-1">
                <Label>Nama</Label>
                <Input
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  placeholder="Masukkan nama"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                  placeholder="email@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <Label>Password</Label>
                <Input
                  type="password"
                  value={data.password}
                  onChange={(e) => setData("password", e.target.value)}
                  placeholder="********"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <Label>Password Confirmation</Label>
                <Input
                  type="password"
                  value={data.password_confirmation}
                  onChange={(e) => setData("password_confirmation", e.target.value)}
                  placeholder="********"
                />
                {errors.password_confirmation && (
                  <p className="text-red-500 text-sm">{errors.password_confirmation}</p>
                )}
              </div>
                
              <div className="flex justify-end">
                <Button disabled={processing} className="w-32 rounded-xl">
                    Simpan User
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
