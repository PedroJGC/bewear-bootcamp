import { eq } from 'drizzle-orm'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Footer from '@/components/common/footer'
import Header from '@/components/common/header'
import ProductList from '@/components/common/product-list'
import { Button } from '@/components/ui/button'
import { db } from '@/db'
import { productTable, productVariantTable } from '@/db/schema'
import { formatCentsToBRL } from '@/helpers/money'
import VariantSelector from './components/variant-selector'

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductVariantPage({
  params,
}: ProductVariantPageProps) {
  const { slug } = await params
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  })

  if (!productVariant) {
    return notFound()
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: { variants: true },
  })

  return (
    <>
      <Header />
      <div className="flex flex-col space-y-6">
        {/* IMAGEM */}
        <Image
          src={productVariant.imageUrl}
          alt={productVariant.name}
          sizes="100vw"
          width={0}
          height={0}
          className="h-auto w-full rounded-3xl object-cover"
        />

        <div className="px-5">
          {/* VARIANTES */}
          <VariantSelector
            selectedVariantSlug={productVariant.slug}
            variants={productVariant.product.variants}
          />
        </div>

        <div className="px-5">
          <h2 className="text-lg font-semibold">
            {productVariant.product.name}
          </h2>
          <h3 className="text-muted-foreground text-sm">
            {productVariant.name}
          </h3>
          <h3 className="text-lg font-semibold">
            {formatCentsToBRL(productVariant.priceInCents)}
          </h3>
        </div>

        <div className="px-5">{/* QUANTIDADE */}</div>

        <div className="flex flex-col px-5 space-y-4">
          {/* BOTÕES */}
          <Button className="rounded-full" size="lg" variant="outline">
            Adicionar à sacola
          </Button>
          <Button className="rounded-full" size="lg">
            Comprar agora
          </Button>
        </div>

        <div className="px-5">
          <p className="text-shadow-amber-600">
            {productVariant.product.description}
          </p>
        </div>

        <ProductList title="Talvez você goste" products={likelyProducts} />

        <Footer />
      </div>
    </>
  )
}
