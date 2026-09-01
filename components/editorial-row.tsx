import Image from 'next/image';

export function EditorialRow({
  title,
  body,
  image,
  alt,
  imageSide,
}: {
  title: string;
  body: string;
  image: string;
  alt: string;
  imageSide: 'left' | 'right';
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div
        className={`relative aspect-[4/3] lg:aspect-auto ${imageSide === 'left' ? 'lg:order-1' : 'lg:order-2'}`}
      >
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div
        className={`flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 ${imageSide === 'left' ? 'lg:order-2' : 'lg:order-1'}`}
      >
        <h2 className="font-display text-3xl text-forest">{title}</h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/70">{body}</p>
      </div>
    </div>
  );
}
