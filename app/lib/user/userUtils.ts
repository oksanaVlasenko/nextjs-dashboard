import crypto from "crypto"; 

export const generateFileName = (originalName: string) => {
  const timestamp = Date.now(); 

  const hash = crypto.createHash("sha256").update(originalName + timestamp).digest("hex").substring(0, 8);
  const extension = originalName.split(".").pop(); 

  return `${timestamp}-${hash}.${extension}`;
};