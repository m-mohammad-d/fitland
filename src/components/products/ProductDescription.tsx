interface Props {
  description: string;
}

export default function ProductDescription({ description }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-secondary-800 pb-4 text-xl font-semibold">توضیحات محصول</h2>

      <div className="text-neutral-700">
        {description.split("\n").map((paragraph, index) => (
          <p key={index} className="mb-4 leading-relaxed last:mb-0">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
