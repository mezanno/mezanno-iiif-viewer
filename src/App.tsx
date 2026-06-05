import { useState } from 'react';
import { UrlInput } from './components/UrlInput';
import { FileUpload } from './components/FileUpload';
import { ViewerArea } from './components/ViewerArea';
import iiifLogo from './assets/iiif-logo.png';

// Type alias for our supported content types
type ViewerContent = string | Record<string, unknown> | null;

function App() {
  const [activeContent, setActiveContent] = useState<ViewerContent>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUrlSubmit = (url: string) => {
    setError(null);
    setActiveContent(url);
  };

  const handleFileUpload = (json: Record<string, unknown>) => {
    setError(null);
    setActiveContent(json);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <div className="h-screen flex flex-col bg-stone-50 text-stone-800 font-sans overflow-hidden">
      <header className="bg-white/90 backdrop-blur-md border-b border-stone-200 px-4 py-3 sticky top-0 z-50 flex-shrink-0">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
          <div className="flex items-center gap-3">
            <img src={iiifLogo} alt="IIIF Logo" className="h-6 w-auto object-contain" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent drop-shadow-sm whitespace-nowrap">
              Mezanno IIIF Viewer
            </h1>
          </div>

          {/* Controls - Compact */}
          <div className="flex items-center gap-3 w-full sm:w-auto flex-1 sm:flex-none justify-end">
            <UrlInput onSubmit={handleUrlSubmit} />
            <div className="w-px h-6 bg-stone-300 hidden sm:block"></div>
            <FileUpload onFileUpload={handleFileUpload} onError={handleError} />
          </div>
        </div>
      </header>

      <main className="flex-1 w-full p-2 sm:p-4 flex flex-col gap-4 overflow-hidden relative">
        {/* Error Notification */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-2 rounded-lg relative flex-shrink-0 text-sm shadow-sm" role="alert">
            <span className="block sm:inline">{error}</span>
            <button
              className="absolute top-0 bottom-0 right-0 px-4 py-2"
              onClick={() => setError(null)}
            >
              <span className="sr-only">Fermer</span>
              <svg className="fill-current h-4 w-4 text-red-500 mt-1 hover:text-red-700 transition-colors" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <title>Fermer</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </button>
          </div>
        )}

        {/* Viewer Area */}
        <ViewerArea content={activeContent} />
      </main>
    </div>
  );
}

export default App;
