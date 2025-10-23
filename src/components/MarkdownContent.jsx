import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function MarkdownContent({ content, title }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-12">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="bg-white dark:bg-slate-900/50 rounded-2xl shadow-xl p-8 lg:p-12 border border-slate-200 dark:border-slate-800">
          <div className="mb-8">
            <a
              href="/"
              className="inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
            >
              ← Back to Home
            </a>
          </div>

          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            {title}
          </h1>

          <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
