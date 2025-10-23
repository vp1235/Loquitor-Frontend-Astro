import React, { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../auth/AuthContext";
import { Brain, Loader2 } from "lucide-react";

const BACKEND_BASE = import.meta.env.PUBLIC_BACKEND_URL || "http://localhost:8000";

const LoginPage = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();

  // Redirect behavior for Astro
  const from = "/inbox";

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = from;
    }
  }, [isAuthenticated, from]);

  // preserve original Google OAuth configuration & scopes
  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    access_type: "offline",
    scope: [
      "openid",
      "email",
      "profile",
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/gmail.send",
    ].join(" "),
    onSuccess: async (codeResponse) => {
      setIsLoading(true);
      setMessage("");

      try {
        const response = await fetch(`${BACKEND_BASE}/auth/google/callback`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: codeResponse.code,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || data.message || "Authentication failed");
        }

        if (data.access_token && data.user) {
          login(data.user, data.access_token);
          navigate(from, { replace: true });
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (error) {
        console.error("❌ Login failed:", error);
        setMessage(`Login failed: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.error("❌ Google login error:", error);
      setMessage("Google login failed. Please try again.");
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Grid background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #1e293b 1px, transparent 1px),
                             linear-gradient(to bottom, #1e293b 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Navigation (mirrors LandingPage) */}
      <nav className="relative z-50 px-6 lg:px-12 py-6 flex justify-between items-center backdrop-blur-md bg-slate-900/70 border-b border-slate-800">
        <a href="/" className="flex items-center space-x-3">
          <img src="/logo_perfect.svg" alt="Loquitor Logo" className="h-10 w-auto" />
          <span className="text-2xl font-bold tracking-tight">Loquitor</span>
        </a>
        <div className="hidden md:flex items-center space-x-8">
          <a href="/#capabilities" className="text-slate-300 hover:text-white transition-colors">
            Capabilities
          </a>
          <a href="/#research" className="text-slate-300 hover:text-white transition-colors">
            Research
          </a>
          <a href="/#architecture" className="text-slate-300 hover:text-white transition-colors">
            Architecture
          </a>
          {/* Keep same behavior as LandingPage: this routes to /login (we're already here) */}
          <button
            onClick={() => (window.location.href = "/login")}
            className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg hover:shadow-emerald-500/25"
          >
            Get Started
          </button>
        </div>

        {/* Mobile CTA */}
        <div className="md:hidden">
          <button
            onClick={() => googleLogin()}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg hover:shadow-emerald-500/25"
          >
            Sign in
          </button>
        </div>
      </nav>

      {/* Centered login card */}
      <section className="relative z-10 px-6 lg:px-12 py-20 lg:py-28">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-10">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto shadow-lg">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mt-6">
              Sign in to{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Loquitor
              </span>
            </h1>
            <p className="text-slate-400 mt-2">
              Secure Google OAuth with Gmail access for inbox features
            </p>
          </div>

          <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => googleLogin()}
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold bg-white text-slate-900 hover:bg-slate-100 transition-all disabled:opacity-70"
              aria-live="polite"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  {/* Google "G" mark */}
                  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.64 9.20454C17.64 8.56636 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20454Z"
                      fill="#4285F4"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4205 9 14.4205C6.65591 14.4205 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z"
                      fill="#34A853"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957273C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957273 13.0418L3.96409 10.71Z"
                      fill="#FBBC05"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z"
                      fill="#EA4335"
                    />
                  </svg>
                  Sign in with Google
                </>
              )}
            </button>

            {message && (
              <p
                className="text-red-400 text-sm text-center mt-4"
                role="alert"
                aria-live="assertive"
              >
                {message}
              </p>
            )}

            <p className="text-xs text-slate-500 text-center mt-4">
              By continuing you agree to our Terms &amp; Privacy Policy.
            </p>
          </div>
        </div>
      </section>

      {/* Footer (mirrors LandingPage) */}
      <footer className="relative z-10 border-t border-slate-800 px-6 lg:px-12 py-8 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <img src="/logo_perfect.svg" alt="Loquitor Logo" className="h-8 w-auto" />
            <span className="text-xl font-bold">Loquitor</span>
          </div>
          <div className="text-sm text-slate-500 flex items-center gap-4">
            <span>© {new Date().getFullYear()} Loquitor, LLC. All rights reserved.</span>
            <span className="text-slate-700">|</span>
            <a href="/terms" className="hover:text-emerald-400 transition-colors">Terms</a>
            <span className="text-slate-700">|</span>
            <a href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;