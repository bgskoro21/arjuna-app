import AppLayout from "@/layouts/app-layout";
import { useForm } from "@inertiajs/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { FormEvent } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserFormProps {
  user?: User; // ⬅️ optional
}

export default function UserForm({ user }: UserFormProps) {
  const isEdit = Boolean(user);

  const { data, setData, post, put, processing, errors } = useForm<{
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }>({
    name: user?.name ?? "",
    email: user?.email ?? "",
    password: "",
    password_confirmation: "",
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();

    if (isEdit && user) {
      put(`/users/${user.id}`);
    } else {
      post("/users");
    }
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: "Dashboard", href: "/dashboard" },
        { title: "Users", href: "/users" },
        { title: isEdit ? "Edit" : "Create", href: "#" },
      ]}
    >
      <div className="p-6 flex justify-start">
        <Card className="w-full max-w-2xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {isEdit ? "Edit User" : "Buat User Baru"}
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
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Password hanya create */}
              {!isEdit && (
                <>
                  <div className="space-y-1">
                    <Label>Password</Label>
                    <Input
                      type="password"
                      value={data.password}
                      onChange={(e) =>
                        setData("password", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-1">
                    <Label>Password Confirmation</Label>
                    <Input
                      type="password"
                      value={data.password_confirmation}
                      onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                      }
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end">
                <Button disabled={processing} className="rounded-xl">
                  {isEdit ? "Update User" : "Simpan User"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
