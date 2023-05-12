import { z } from "zod";
import { ZId } from "../../types/Id.js";
import { ZImage } from "../../types/Image.js";

export const ZLoadingScreen = z.object({
  id: ZId,
  image: ZImage,
  imageWide: ZImage,
  imagePrimaryColor: z.string(),
});
