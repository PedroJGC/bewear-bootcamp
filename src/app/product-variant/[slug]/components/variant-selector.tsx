import Image from 'next/image'
import Link from 'next/link'
import type { productVariantTable } from '@/db/schema'

interface VariantSelectorProps {
  selectedVariantSlug: string
  variants: (typeof productVariantTable.$inferSelect)[]
}

export default async function VariantSelector({
  variants,
  selectedVariantSlug,
}: VariantSelectorProps) {
  return (
    <div className="flex items-center gap-4">
      {variants.map(variant => (
        <Link
          href={`/product-variant/${variant.slug}`}
          key={variant.id}
          className={
            selectedVariantSlug === variant.slug
              ? 'border-primary rounded-xl border-2'
              : ''
          }
        >
          <Image
            width={68}
            height={68}
            src={variant.imageUrl}
            alt={variant.name}
            className="rounded-xl"
          />
        </Link>
      ))}
    </div>
  )
}
