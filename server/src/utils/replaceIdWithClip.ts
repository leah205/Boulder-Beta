import { getCloudinarySignedUrl } from "./cloudinary";

export default function replaceIdWithClip<
  Type extends object,
  K extends string,
>(
  input: Type & { public_id: string | undefined | null },
  resource_type: "video" | "image",
  resource_name: K,
): Omit<Type, "public_id"> & { clip: string | null } {
  const { public_id, ...res } = input;
  const media = public_id
    ? getCloudinarySignedUrl(public_id, resource_type)
    : null;
  return { ...res, [resource_name]: media } as Omit<Type, "public_id"> &
    Record<K, string | null>;
}
