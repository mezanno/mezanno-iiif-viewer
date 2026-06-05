import { useState, type FormEvent } from 'react';
import { Link as LinkIcon } from 'lucide-react';

interface UrlInputProps {
  onSubmit: (url: string) => void;
  isLoading?: boolean;
}

export function UrlInput({ onSubmit, isLoading = false }: UrlInputProps) {
  const [url, setUrl] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center w-full max-w-md">
      <LinkIcon className="w-4 h-4 text-stone-400 hidden sm:block" />
      <input 
        type="url" 
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="URL du manifest.json..."
        disabled={isLoading}
        className="flex-1 bg-white border border-stone-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed text-stone-800 placeholder-stone-400 shadow-sm"
      />
      <button 
        type="submit"
        disabled={!url.trim() || isLoading}
        className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-md font-medium transition-colors text-sm shadow-sm shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
      >
        Ouvrir
      </button>
    </form>
  );
}
