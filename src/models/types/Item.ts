import { z } from "zod";
import { ZId } from "../../types/Id.js";
import { ZImage } from "../../types/Image.js";

const ZBaseItem = z.object({
  id: ZId,
  image: ZImage.optional(),
  imageUrl: z.string().url().optional(),
  urlPreview: z.string().optional(),
});

const ZItemWithImageUrl = ZBaseItem.merge(
  z.object({ imageUrl: z.string().url() })
);

const ZItemWithPreview = ZBaseItem.merge(
  z.object({ urlPreview: z.string().url() })
);

export const ZItem = ZBaseItem.transform((item) => {
  if (ZItemWithImageUrl.safeParse(item).success) {
    item.image = {
      url: ZItemWithImageUrl.parse(item).imageUrl,
      width: 400,
      height: 400,
    };

    item.imageUrl = undefined;
  }

  if (ZItemWithPreview.safeParse(item).success) {
    item.image = {
      url: ZItemWithPreview.parse(item).urlPreview,
      width: 400,
      height: 400,
    };

    item.urlPreview = undefined;
  }

  return item;
});

export type Item = z.infer<typeof ZItem>;
