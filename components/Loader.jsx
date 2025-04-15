import { Loader2 } from "lucide-react";

function Loader() {
  return (
    <div className="w-full flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-blue-300 animate-spin" />
    </div>
  );
}

export default Loader;
