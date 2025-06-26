import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "./auth";
import { generateReactHelpers } from "@uploadthing/react";

const f = createUploadthing();

export const UploadRouter = {
  imageUploader: f(
    {
      image: {
        maxFileSize: "2MB",
        maxFileCount: 1,
      },
    },
    {
      awaitServerData: false,
    }
  )
    .middleware(async ({ req }) => {
      const user = await auth();
      if (!user || !user.user?.email) {
        throw new UploadThingError("Unauthorized");
      }
      return { userId: user.user.id };
    })

    .onUploadComplete(() => {}),
} satisfies FileRouter;

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<UploadRouter>();


export type UploadRouter = typeof UploadRouter;
