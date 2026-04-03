"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ResultType } from "../data/results";

type ResultCardProps = {
  result: ResultType;
};

export default function ResultCard({ result }: ResultCardProps) {
  const router = useRouter();

  const onShare = async () => {
    const shareData = {
      title: `Which Ducky Are You? - ${result.title}`,
      text: `${result.title} - ${result.description}`,
      url: `${window.location.origin}/result/${result.key}`,
    };

    if (navigator.share) {
      await navigator.share(shareData).catch(() => {});
      return;
    }

    await navigator.clipboard.writeText(`${shareData.title}\n${shareData.url}`);
    alert("Result URL copied to clipboard.");
  };

  const onDownload = () => {
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ducky-result-${result.key}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen bg-gradient-to-br from-violet-50 to-fuchsia-100 p-5"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-3xl border border-indigo-100 bg-white/90 p-6 shadow-lg backdrop-blur-sm">
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-5xl">{result.title}</h1>
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className={`flex h-40 w-40 items-center justify-center rounded-full border-4 border-white shadow-xl bg-gradient-to-br ${result.color}`}>
            <span className="text-xl font-bold text-white uppercase">{result.key}</span>
          </div>
          <p className="text-md text-slate-700 md:text-lg">{result.description}</p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <button
            onClick={onShare}
            className="rounded-xl bg-indigo-600 px-4 py-3 text-white ring-1 ring-indigo-700 transition hover:bg-indigo-500"
          >
            Share
          </button>
          <button
            onClick={onDownload}
            className="rounded-xl bg-emerald-600 px-4 py-3 text-white ring-1 ring-emerald-700 transition hover:bg-emerald-500"
          >
            Download
          </button>
          <button
            onClick={() => router.push("/")}
            className="rounded-xl bg-slate-600 px-4 py-3 text-white ring-1 ring-slate-700 transition hover:bg-slate-500"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    </motion.section>
  );
}
