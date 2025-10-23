import React, { useEffect, useState, useMemo } from "react";
import { useAuth } from "../auth/AuthContext";
import {
  Mail,
  Wand2,
  Loader2,
  RefreshCcw,
  Search,
  LogOut,
} from "lucide-react";

const BACKEND_BASE = import.meta.env.PUBLIC_BACKEND_URL || "http://localhost:8000";

// ────────────────────────────────────────────────────────────
// Helper utilities
// ────────────────────────────────────────────────────────────
const getHeader = (email, name) => {
  const headers = email?.payload?.headers || [];
  const h = headers.find((hdr) => hdr.name?.toLowerCase() === name.toLowerCase());
  return h ? h.value : "";
};

const getSubject = (email) => getHeader(email, "subject") || "(No Subject)";
const getSnippet = (email) => email?.snippet || "";
const getFrom = (email) => getHeader(email, "from") || "Unknown sender";

// ────────────────────────────────────────────────────────────
// InboxPage component – styled to match Landing/Login
// ────────────────────────────────────────────────────────────
export default function InboxPage() {
  const { token, user, isAuthenticated, logout } = useAuth();

  const [emails, setEmails] = useState([]);
  const [selectedEmailId, setSelectedEmailId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [generatingId, setGeneratingId] = useState(null);

  const displayName =
    user?.name ?? user?.given_name ?? user?.email?.split("@")[0] ?? "there";

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      window.location.href = "/login";
    }
  }, [isAuthenticated]);

  // Fetch inbox when we have a token (and on manual refresh)
  async function fetchEmails(signal) {
    setError(null);
    setRefreshing(true);
    try {
      const res = await fetch(`${BACKEND_BASE}/auth/gmail/messages`, {
        headers: { Authorization: `Bearer ${token}` },
        signal,
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 401) {
          setError("Your session expired. Please sign in again.");
          logout?.();
          window.location.href = "/login";
          return;
        }
        throw new Error(json.detail || `Server returned ${res.status}`);
      }

      const list = json.messages || json || [];
      setEmails(Array.isArray(list) ? list : []);
      if (Array.isArray(list) && list.length > 0) {
        setSelectedEmailId(list[0].id);
      } else {
        setSelectedEmailId(null);
      }
    } catch (err) {
      if (err.name !== "AbortError") setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();
    setLoading(true);
    fetchEmails(controller.signal);
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Generate AI reply (placeholder: alerts returned HTML)
  async function handleGenerateReply(email) {
    if (!email) return;
    try {
      setGeneratingId(email.id);
      const res = await fetch(`${BACKEND_BASE}/rag/generate_reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ emailId: email.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || res.statusText);
      alert("Draft reply (HTML):\n\n" + data.draft_html);
    } catch (err) {
      alert("Failed to generate reply: " + err.message);
    } finally {
      setGeneratingId(null);
    }
  }

  const filteredEmails = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return emails;
    return emails.filter((e) => {
      const s = getSubject(e).toLowerCase();
      const sn = getSnippet(e).toLowerCase();
      const fr = getFrom(e).toLowerCase();
      return s.includes(q) || sn.includes(q) || fr.includes(q);
    });
  }, [emails, search]);

  const selectedEmail = useMemo(
    () => filteredEmails.find((e) => e.id === selectedEmailId) || null,
    [filteredEmails, selectedEmailId]
  );

  // Skeleton row for loading state
  const SkeletonRow = () => (
    <div className="animate-pulse p-4 rounded-xl border border-slate-700 bg-slate-900/60">
      <div className="h-4 w-1/3 bg-slate-700 rounded mb-2" />
      <div className="h-3 w-2/3 bg-slate-800 rounded" />
    </div>
  );

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

      {/* Navigation (consistent with Landing/Login) */}
      <nav className="relative z-50 px-6 lg:px-12 py-6 flex justify-between items-center backdrop-blur-md bg-slate-900/70 border-b border-slate-800">
        <a href="/" className="flex items-center space-x-3">
          <img src="/logo_perfect.svg" alt="Loquitor Logo" className="h-10 w-auto" />
          <span className="text-2xl font-bold tracking-tight">Loquitor</span>
        </a>
        <div className="hidden md:flex items-center space-x-3">
          <a href="/#capabilities" className="px-3 py-2 text-slate-300 hover:text-white transition-colors">
            Capabilities
          </a>
          <a href="/#research" className="px-3 py-2 text-slate-300 hover:text-white transition-colors">
            Research
          </a>
          <a href="/#architecture" className="px-3 py-2 text-slate-300 hover:text-white transition-colors">
            Architecture
          </a>
          <button
            onClick={() => {
              logout?.();
              window.location.href = "/login";
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg hover:shadow-emerald-500/25"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>

        {/* Mobile CTA */}
        <div className="md:hidden">
          <button
            onClick={() => {
              logout?.();
              window.location.href = '/login';
            }}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg hover:shadow-emerald-500/25"
          >
            Sign out
          </button>
        </div>
      </nav>

      {/* Page content */}
      <section className="relative z-10 px-6 lg:px-12 py-8 lg:py-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
                Hi, {displayName}!{" "}
                <span role="img" aria-label="waving hand">
                  👋
                </span>
              </h1>
              <p className="text-slate-400 mt-1">Here’s your inbox.</p>
            </div>

            {/* Search + Refresh */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search subject, sender, snippet…"
                  className="pl-9 pr-3 py-2.5 w-72 bg-slate-900/70 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/60 placeholder:text-slate-500"
                />
              </div>
              <button
                onClick={() => {
                  if (!token) return;
                  const controller = new AbortController();
                  fetchEmails(controller.signal);
                }}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800/60 transition-colors"
                disabled={refreshing || loading}
                aria-live="polite"
                title="Refresh"
              >
                {refreshing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCcw className="w-4 h-4" />}
                <span className="hidden sm:inline">{refreshing ? "Refreshing…" : "Refresh"}</span>
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              className="mb-6 border border-red-500/30 bg-red-950/40 text-red-200 rounded-xl px-4 py-3"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </div>
          )}

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: List */}
            <div className="lg:col-span-5 space-y-3">
              <div className="bg-slate-900/70 backdrop-blur border border-slate-700 rounded-2xl p-3 sm:p-4">
                <div className="max-h-[70vh] overflow-auto space-y-3 pr-1">
                  {loading ? (
                    <>
                      <SkeletonRow />
                      <SkeletonRow />
                      <SkeletonRow />
                      <SkeletonRow />
                    </>
                  ) : filteredEmails.length === 0 ? (
                    <div className="flex flex-col items-center text-center py-16">
                      <Mail className="w-10 h-10 text-slate-500 mb-3" />
                      <p className="text-slate-400">No emails found.</p>
                    </div>
                  ) : (
                    filteredEmails.map((email) => {
                      const active = email.id === selectedEmailId;
                      return (
                        <button
                          key={email.id}
                          onClick={() => setSelectedEmailId(email.id)}
                          className={`w-full text-left p-4 rounded-xl border transition-all ${
                            active
                              ? "border-emerald-500/40 bg-slate-800/60 shadow-md shadow-emerald-500/10"
                              : "border-slate-700 bg-slate-900/60 hover:bg-slate-800/50"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {/* Avatar */}
                            <div
                              className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${
                                active
                                  ? "bg-gradient-to-br from-emerald-600 to-teal-600 text-white"
                                  : "bg-slate-800 text-slate-300"
                              }`}
                              aria-hidden="true"
                            >
                              {getFrom(email).slice(0, 1).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <p className="font-semibold truncate">{getSubject(email)}</p>
                              </div>
                              <p className="text-xs text-slate-400 mt-1 truncate">{getFrom(email)}</p>
                              <p className="text-sm text-slate-300 mt-2 line-clamp-2">
                                {getSnippet(email)}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Right: Preview / Actions */}
            <div className="lg:col-span-7">
              <div className="bg-slate-900/70 backdrop-blur border border-slate-700 rounded-2xl p-5 sm:p-7 h-full">
                {!selectedEmail ? (
                  <div className="flex flex-col items-center justify-center text-center py-20">
                    <Mail className="w-12 h-12 text-slate-500 mb-4" />
                    <h3 className="text-xl font-semibold">Select an email to preview</h3>
                    <p className="text-slate-400 mt-1">
                      Choose a message on the left to view details and generate a reply.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-emerald-900/30 backdrop-blur rounded-full border border-emerald-500/30">
                        <Mail className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm text-emerald-300">Message Preview</span>
                      </div>
                      <h2 className="text-2xl font-bold mt-4">{getSubject(selectedEmail)}</h2>
                      <p className="text-slate-400 mt-1">{getFrom(selectedEmail)}</p>
                    </div>

                    <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4 sm:p-5">
                      <p className="text-slate-300 whitespace-pre-line">
                        {getSnippet(selectedEmail) || "No snippet available."}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => handleGenerateReply(selectedEmail)}
                        disabled={generatingId === selectedEmail.id}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg hover:shadow-emerald-500/25 disabled:opacity-70"
                      >
                        {generatingId === selectedEmail.id ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Generating…
                          </>
                        ) : (
                          <>
                            <Wand2 className="w-5 h-5" />
                            Generate Reply
                          </>
                        )}
                      </button>

                      {/* Optional: placeholder secondary action */}
                      <button
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-700 bg-slate-900/50 hover:bg-slate-800/60 transition-all"
                        onClick={() => alert("Coming soon ✨")}
                        type="button"
                      >
                        Draft Options
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (consistent with Landing/Login) */}
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
}