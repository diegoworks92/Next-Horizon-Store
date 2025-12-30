import { env } from "../../config/env";
import { shopifyUrls } from "./urls";
import { getProducts } from "./products";

export const getCollections = async () => {
  try {
    const response = await fetch(shopifyUrls.collections.all, {
      headers: new Headers({
        "X-Shopify-Access-Token": env.SHOPIFY_API_KEY,
      }),
    });
    const { smart_collections } = await response.json();
    const transformedCollections = smart_collections.map((collection: any) => {
      return {
        id: collection.id,
        title: collection.title,
        handle: collection.handle,
      };
    });
    return transformedCollections;
  } catch (error) {
    console.log(error);
  }
};

export const getCollectionProducts = async (collectionHandle: string) => {
  try {
    const products = await getProducts();

    if (!products) return [];

    return products.filter((product: any) =>
      product.tags
        ?.map((tag: string) => tag.toLowerCase())
        .includes(collectionHandle.toLowerCase())
    );
  } catch (error) {
    console.error("Error in getCollectionProducts:", error);
    return [];
  }
};
