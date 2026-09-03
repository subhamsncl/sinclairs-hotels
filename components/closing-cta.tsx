import Image from 'next/image';
import Link from 'next/link';

export function ClosingCta({
  image,
  heading,
  body,
  href,
  cta = 'Enquire Now',
}: {
  image: string;
  heading: string;
  body: string;
  href: string;
  cta?: string;
}) {
  return (
    <section className="relative flex h-[36vh] min-h-[280px] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 animate-hero-zoom">
        <Image src={image} alt="" fill sizes="100vw" quality={90} className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-forest-dark/75" />
      <div className="relative px-6 text-center text-cream">
        <h2 className="font-display text-3xl drop-shadow-lg sm:text-4xl">{heading}</h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-cream/80">{body}</p>
        <Link
          href={href}
          className="mt-6 inline-block rounded bg-gold px-8 py-3 text-sm uppercase tracking-wider text-forest-dark transition duration-300 hover:bg-gold-light hover:shadow-lg"
        >
          {cta}
        </Link>
      </div>
    </section>
  );
}
