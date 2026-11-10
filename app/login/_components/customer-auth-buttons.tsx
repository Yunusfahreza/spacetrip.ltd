"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function CustomerAuthButtons({ next }: { next: string }) {
  const [mode, setMode] = React.useState<"login" | "register">("login");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);

  async function signInWithGoogle() {
    setPending(true);
    setError(null);
    setMessage(null);

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
      setError(e instanceof Error ? e.message : "Login Google gagal");
      setPending(false);
    }
  }

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError("Email dan password wajib diisi");
      return;
    }

    setPending(true);
    setError(null);
    setMessage(null);

    try {
      const supabase = createSupabaseBrowserClient();

      if (mode === "login") {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;
        window.location.href = next;
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        if (data.session) {
          window.location.href = next;
        } else {
          setMessage("Pendaftaran berhasil! Silakan login dengan akun kamu.");
          setMode("login");
          setPending(false);
        }
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan");
      setPending(false);
    }
  }

  return (
    <div className="grid gap-4">
      {/* Google OAuth Button */}
      <Button
        type="button"
        variant="outline"
        className="h-11 w-full rounded-full border-(--st-border) font-medium"
        onClick={signInWithGoogle}
        disabled={pending}
      >
        Lanjut dengan Google
      </Button>

      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="w-full border-t border-(--st-border)"></div>
        <span className="absolute bg-white px-3 text-xs text-(--st-text-muted)">
          atau dengan email
        </span>
      </div>

      {/* Email + Password Form */}
      <form onSubmit={handleEmailAuth} className="grid gap-3">
        <div className="flex rounded-lg bg-gray-100 p-1">
          <button
            type="button"
            className={`flex-1 rounded-md py-1.5 text-xs font-semibold transition ${
              mode === "login"
                ? "bg-white text-(--st-text) shadow-sm"
                : "text-(--st-text-muted)"
            }`}
            onClick={() => {
              setMode("login");
              setError(null);
              setMessage(null);
            }}
          >
            Masuk
          </button>
          <button
            type="button"
            className={`flex-1 rounded-md py-1.5 text-xs font-semibold transition ${
              mode === "register"
                ? "bg-white text-(--st-text) shadow-sm"
                : "text-(--st-text-muted)"
            }`}
            onClick={() => {
              setMode("register");
              setError(null);
              setMessage(null);
            }}
          >
            Daftar Baru
          </button>
        </div>

        <div>
          <label className="text-xs font-medium text-(--st-text)">Email</label>
          <Input
            type="email"
            placeholder="nama@email.com"
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
            placeholder="Minimal 6 karakter"
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

        {message ? (
          <div className="rounded-lg bg-emerald-50 p-2 text-xs text-emerald-700">
            {message}
          </div>
        ) : null}

        <Button
          type="submit"
          className="h-11 w-full rounded-full"
          disabled={pending}
        >
          {pending
            ? "Memproses..."
            : mode === "login"
            ? "Masuk dengan Email"
            : "Daftar Akun Baru"}
        </Button>
      </form>

      <div className="text-[11px] text-(--st-text-muted)">
        Dengan masuk, kamu setuju proses checkout & verifikasi pembayaran dilakukan manual.
      </div>
    </div>
  );
}
