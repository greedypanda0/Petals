"use client";

import Main from "@/components/main";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { post } from "@/lib/api";
import { Camera, Loader2Icon } from "lucide-react";
import { useUploadThing } from "@/hooks/useUploadThing";
import { toast } from "sonner";

export default function NewBot() {
  const [form, setForm] = useState({
    name: "vaek",
    bio: "",
    image: "/nazuna.png",
    system_message: "",
  });

  const [file, setFile] = useState<File>();
  const [isLoading, setLoading] = useState(false);
  const { upload, isLoading: isImageUploading, url, error } = useUploadThing();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFile(file);
    const localPreview = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, image: localPreview }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select an image first.");
      return;
    }

    if (error) {
      toast.error("Error while adding bot", {
        description: error,
      });
    }

    setLoading(true);

    try {
      console.log("Starting upload");

      const __data = await upload(file);
      console.log("url", __data);

      if (!url) throw new Error("Image upload failed");
      console.log(url);

      const res = await post("/api/bots", {
        ...form,
        image: url,
      });

      if (res.success) {
        toast.success("Bot added successfully!");
        // optional: redirect or reset form
      } else {
        throw new Error(res.error || "Failed to add bot");
      }
    } catch (err: any) {
      toast.error("Error while adding bot", {
        description: err.message || "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Main>
      <div className="w-full flex justify-center py-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md rounded-xl shadow-xl p-6 flex flex-col items-center gap-6"
        >
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="w-36 h-36 rounded-full overflow-hidden shadow-md"
          >
            <div className="flex relative w-full h-full">
              <img
                src={form.image}
                alt="bot_image"
                className="w-full h-full object-cover"
                draggable={false}
                onError={(e) =>
                  ((e.target as HTMLImageElement).src = "/fallback.jpg")
                }
              />

              <div className="absolute w-full bottom-0 h-1/5 backdrop-blur flex justify-center items-center">
                <Camera size={16} className="text-primary" />
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {/* Name */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="grid gap-2"
            >
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="vaek"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </motion.div>

            {/* Bio */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="grid gap-2"
            >
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Enter bot description..."
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                required
                className="min-h-[120px]"
              />
            </motion.div>

            {/* System Message */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="grid gap-2"
            >
              <Label htmlFor="system">System Message</Label>
              <Textarea
                id="system"
                placeholder="Enter system message..."
                value={form.system_message}
                onChange={(e) =>
                  setForm({ ...form, system_message: e.target.value })
                }
                required
                className="min-h-[120px]"
              />
            </motion.div>

            {/* Submit */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="mt-2"
            >
              <Button
                type="submit"
                className="font-semibold transition w-full"
                disabled={isLoading || isImageUploading}
              >
                {isLoading && <Loader2Icon className="animate-spin" />}
                {isLoading || isImageUploading ? "Adding Bot..." : "Add Bot"}
              </Button>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </Main>
  );
}
