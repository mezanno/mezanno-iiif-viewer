import Viewer from '@samvera/clover-iiif/viewer';
import { Link as LinkIcon } from 'lucide-react';

interface ViewerAreaProps {
  content: string | Record<string, unknown> | null;
}

export function ViewerArea({ content }: ViewerAreaProps) {
  return (
    <div className="flex-1 bg-white rounded-xl sm:rounded-2xl border border-stone-200 overflow-hidden shadow-xl shadow-emerald-900/5 relative ring-1 ring-stone-900/5">
      {content ? (
        <div className="absolute inset-0 h-full w-full z-0 custom-viewer-container">
          <Viewer iiifContent={content} options={{ canvasHeight: '100%' }} />
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-500">
          <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-4">
            <LinkIcon className="w-8 h-8 text-emerald-600/50" />
          </div>
          <p className="text-lg font-medium text-stone-600">Aucun manifest sélectionné</p>
          <p className="text-sm mt-2 text-stone-500">Veuillez fournir une URL ou un fichier local pour commencer.</p>
        </div>
      )}
    </div>
  );
}
