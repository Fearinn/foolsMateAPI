import { z } from "zod";
import { ZId } from "../../common/types/Id.js";
import { ZImage } from "../../common/types/Image.js";

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
      width: 100,
      height: 50
    };

    item.imageUrl = undefined;
  }

  if (ZItemWithPreview.safeParse(item).success) {
    item.image = {
      url: ZItemWithPreview.parse(item).urlPreview,
      width: 100,
      height: 50
    };

    item.urlPreview = undefined;
  }

  return item;
});

export type Item = z.infer<typeof ZItem>;
