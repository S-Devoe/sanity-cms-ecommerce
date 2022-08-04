import SanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = SanityClient({
  projectId: "973ewi4n",
  dataset: "production",
  apiVersion: "2022-08-02",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => {
  return builder.image(source);
};
