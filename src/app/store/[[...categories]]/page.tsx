import { ProductsWrapper } from "../../../components/Store/ProductsWrapper";
import { getProducts } from "../../../services/shopify/products";
import {
  getCollectionProducts,
  getCollections,
} from "../../../services/shopify/collections";

interface CategoryProps {
  params: Promise<{
    categories?: string[];
  }>;
}

export default async function Category({ params }: CategoryProps) {
  const { categories } = await params;

  let products = [];
  const collections = await getCollections();

  if (categories && categories.length > 0) {
    const selectedCollection = collections.find(
      (collection: any) => collection.handle === categories[0]
    );

    if (selectedCollection) {
      products = await getCollectionProducts(selectedCollection.id);
    }
  } else {
    products = await getProducts();
  }

  return <ProductsWrapper products={products} />;
}
