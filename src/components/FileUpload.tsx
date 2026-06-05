import { type ChangeEvent } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (json: Record<string, unknown>) => void;
  onError: (error: string) => void;
}

export function FileUpload({ onFileUpload, onError }: FileUploadProps) {
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const result = event.target?.result;
        if (typeof result !== 'string') {
          throw new Error("Le résultat n'est pas une chaîne de caractères.");
        }
        
        const json = JSON.parse(result) as Record<string, unknown>;
        onFileUpload(json);
      } catch (error) {
        console.error("Invalid JSON file", error);
        onError("Le fichier fourni n'est pas un JSON valide ou n'a pas pu être lu.");
      }
    };
    reader.onerror = () => {
      onError("Erreur lors de la lecture du fichier.");
    };
    reader.readAsText(file);
    
    // Reset the input value so the same file can be uploaded again if needed
    e.target.value = '';
  };

  return (
    <label className="flex items-center gap-2 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-md cursor-pointer transition-colors text-sm font-medium shadow-sm whitespace-nowrap group text-stone-700 hover:text-stone-900">
      <Upload className="w-4 h-4 text-emerald-500 group-hover:text-emerald-600 transition-colors" />
      <span>Fichier Local</span>
      <input 
        type="file" 
        className="hidden" 
        accept=".json,application/json"
        onChange={handleFileUpload}
      />
    </label>
  );
}
