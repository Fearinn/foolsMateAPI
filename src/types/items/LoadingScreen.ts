import { z } from "zod";
import { ZImage } from "../Image.js";
import { ZId } from "../Id.js";

export const ZLoadingScreen = z.object({
  id: ZId,
  image: ZImage,
  imageWide: ZImage,
  imagePrimaryColor: z.string(),
});
