import { z } from "zod";
import { ZId } from "../../common/types/Id.js";
import { ZImage } from "../../common/types/Image.js";

export const ZLoadingScreen = z.object({
  id: ZId,
  image: ZImage,
  imageWide: ZImage,
  imagePrimaryColor: z.string(),
});

export type LoadingScreen = z.infer<typeof ZLoadingScreen>;
