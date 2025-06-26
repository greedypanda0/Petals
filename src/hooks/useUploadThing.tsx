import { useUploadThing as uploadThing } from "@/lib/uploadthing";
import { useState } from "react";

export function useUploadThing() {
  const [isLoading, setLoading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { startUpload, routeConfig } = uploadThing("imageUploader", {
    onClientUploadComplete: (file) => {
      console.log("uploaded successfully!", file);
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
    onUploadBegin: (file) => {
      console.log("upload has begun for", file);
    },
  });

  const upload = async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const res = await startUpload([file]);
      const uploadedUrl = res?.[0]?.ufsUrl;

      if (!uploadedUrl) throw new Error("No URL returned");
      setUrl(uploadedUrl);

      return uploadedUrl;
    } catch (err: any) {
      const msg = err?.message ?? "Upload failed";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, url, error, upload };
}
