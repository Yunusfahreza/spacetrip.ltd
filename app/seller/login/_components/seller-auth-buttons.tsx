"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function SellerAuthButtons({ next }: { next: string }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function signInWithGoogle() {
    setPending(true);
    setError(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
        },
      });

      if (error) throw error;
      if (data.url) window.location.href = data.url;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Login gagal");
      setPending(false);
    }
  }

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError("Email dan password wajib diisi");
      return;
    }

    setPending(true);
    setError(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      // Check role
      if (data.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .maybeSingle();

        const role = profile?.role ?? "customer";
        if (role !== "seller" && role !== "admin") {
          setError("Akun ini terdaftar, namun tidak memiliki hak akses Admin/Seller.");
          setPending(false);
          return;
        }
      }

      window.location.href = next;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Login admin gagal");
      setPending(false);
    }
  }

  return (
    <div className="grid gap-4">
      {/* Form Email & Password */}
      <form onSubmit={handleEmailLogin} className="grid gap-3">
        <div>
          <label className="text-xs font-medium text-(--st-text)">Email Admin</label>
          <Input
            type="email"
            placeholder="admin@spacetrip.test"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={pending}
            required
            className="mt-1 h-10 rounded-xl"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-(--st-text)">Password</label>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={pending}
            required
            className="mt-1 h-10 rounded-xl"
          />
        </div>

        {error ? (
          <div className="rounded-lg bg-red-50 p-2 text-xs text-red-600">
            {error}
          </div>
        ) : null}

        <Button
          type="submit"
          className="h-11 w-full rounded-full"
          disabled={pending}
        >
          {pending ? "Memeriksa kredensial..." : "Masuk sebagai Admin"}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="w-full border-t border-(--st-border)"></div>
        <span className="absolute bg-white px-3 text-xs text-(--st-text-muted)">
          atau
        </span>
      </div>

      {/* Google OAuth Button */}
      <Button
        type="button"
        variant="outline"
        className="h-11 w-full rounded-full border-(--st-border)"
        onClick={signInWithGoogle}
        disabled={pending}
      >
        Masuk dengan Google
      </Button>

      <div className="text-[11px] text-(--st-text-muted)">
        Akses panel admin hanya untuk akun <span className="font-medium">Karyawan</span> atau <span className="font-medium">Super Admin</span>.
      </div>
    </div>
  );
}
