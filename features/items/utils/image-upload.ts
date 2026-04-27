interface UploadApiResponse {
  url?: string;
  error?: string;
}

interface CloudinaryUnsignedError {
  message?: string;
}

interface CloudinaryUnsignedResponse {
  secure_url?: string;
  error?: CloudinaryUnsignedError;
}

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("Failed to read selected image."));
    };

    reader.onerror = () => {
      reject(new Error("Failed to read selected image."));
    };

    reader.readAsDataURL(file);
  });
}

async function uploadViaUnsignedPreset(file: File): Promise<string | null> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    return null;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const body = (await response
    .json()
    .catch(() => null)) as CloudinaryUnsignedResponse | null;

  if (!response.ok || !body?.secure_url) {
    throw new Error(body?.error?.message || "Cloudinary upload failed");
  }

  return body.secure_url;
}

async function uploadViaApiRoute(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const body = (await response
    .json()
    .catch(() => null)) as UploadApiResponse | null;

  if (!response.ok || !body?.url) {
    throw new Error(body?.error || "Upload failed. Please try another image.");
  }

  return body.url;
}

export async function uploadItemImage(file: File): Promise<string> {
  let unsignedError: string | null = null;

  try {
    const unsignedUrl = await uploadViaUnsignedPreset(file);
    if (unsignedUrl) {
      return unsignedUrl;
    }
  } catch (error: unknown) {
    unsignedError =
      error instanceof Error ? error.message : "Cloudinary upload failed";
  }

  try {
    return await uploadViaApiRoute(file);
  } catch (error: unknown) {
    const apiError =
      error instanceof Error
        ? error.message
        : "Upload failed. Please try another image.";

    throw new Error(
      unsignedError ? `${apiError} (${unsignedError})` : apiError,
    );
  }
}
