import { getCloudinarySignedUrl } from "./cloudinary";

export default function replaceIdWithClip<Type extends object>(
  input: Type & { public_id: string | undefined | null },
  resource_type: "video" | "image",
): Omit<Type, "public_id"> & { clip: string | null } {
  const { public_id, ...res } = input;
  const clip = public_id
    ? getCloudinarySignedUrl(public_id, resource_type)
    : null;
  const resWithClip = {
    ...res,
    clip,
  };
  return resWithClip;
}
