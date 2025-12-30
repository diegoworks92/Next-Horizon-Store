import { ProductsWrapper } from "../../../components/Store/ProductsWrapper";
import { getProducts } from "../../../services/shopify/products";
import { getCollections } from "../../../services/shopify/collections";

interface CategoryProps {
  params: Promise<{
    categories?: string[];
  }>;
}

export default async function Category({ params }: CategoryProps) {
  const { categories } = await params;

  const allProducts = await getProducts();
  let products = allProducts;

  if (categories && categories.length > 0) {
    const collections = await getCollections();

    const selectedCollection = collections?.find(
      (collection: any) => collection.handle === categories[0]
    );

    if (selectedCollection) {
      const collectionTag = selectedCollection.title.toLowerCase();

      products = allProducts.filter((product: any) => {
        const tagsArray = Array.isArray(product.tags)
          ? product.tags
          : product.tags?.split(",") || [];
        return tagsArray.some(
          (tag: string) => tag.toLowerCase() === collectionTag
        );
      });
    }
  }

  return <ProductsWrapper products={products} />;
}
