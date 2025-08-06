'use client'

import type { productTable, productVariantTable } from '@/db/schema'
import ProductItem from './product-item'

interface ProductListProps {
  title: string
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[]
  })[]
}

export default async function ProductList({
  title,
  products,
}: ProductListProps) {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold px-5">{title}</h3>
      <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        {products.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
