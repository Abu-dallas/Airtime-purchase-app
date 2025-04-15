import { Loader2 } from "lucide-react";

function ComponentLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 className="w-12 h-12 text-blue-300 animate-spin" />
    </div>
  );
}

export default ComponentLoader;
