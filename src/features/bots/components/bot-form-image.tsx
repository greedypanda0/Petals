import { getRandomPFP } from "@/lib/utils";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function BotFormImage({ setFile }: { setFile: (file: File) => void }) {
  const [preview, setPreview] = useState(getRandomPFP());

  useEffect(() => {
    let oldPreview: string | null = null;
    if (preview.startsWith("blob:")) {
      oldPreview = preview;
    }

    return () => {
      if (oldPreview) {
        URL.revokeObjectURL(oldPreview);
      }
    };
  }, [preview]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      return toast.error("Please select a valid image file");
    }

    setFile(selected);

    const blob = URL.createObjectURL(selected);
    setPreview(blob);
  };

  return (
    <div className="relative rounded-full overflow-hidden">
      <Image src={preview} alt="Bot Image" width={80} height={80} />
      <div className="absolute w-full bottom-0 h-1/5 backdrop-blur flex justify-center items-center">
        <Camera size={10} className="text-primary" />
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleImageUpload}
        />
      </div>
    </div>
  );
}
