import { ProductView } from "../../../components/product/ProductView";
import { getProducts } from "../../../services/shopify/products";
import { redirect } from "next/navigation";

interface ProductPageProps {
  searchParams: Promise<{
    id?: string;
  }>;
}

// metadata
export async function generateMetadata({ searchParams }: ProductPageProps) {
  const params = await searchParams;
  const id = params.id;

  if (!id) return {};

  const products = await getProducts(id);
  const product = products[0];

  if (!product) return {};

  return {
    title: product.title,
    description: product.description,
    keywords: product.tags,
    openGraph: {
      images: [product.image],
    },
  };
}

// page
export default async function ProductPage({ searchParams }: ProductPageProps) {
  const params = await searchParams;
  const id = params.id;

  if (!id) {
    redirect("/");
  }

  const products = await getProducts(id);
  const product = products[0];

  if (!product) {
    redirect("/");
  }

  return <ProductView product={product} />;
}
