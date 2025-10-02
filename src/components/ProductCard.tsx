import React from "react";

type Variant = "vertical" | "horizontal" | "compact";

type ProductCardProps = {
  name: string;
  price: number;
  image: string;
  badge?: string;
  rating?: number;
  href?: string;
  onAddToCart?: () => void;
  variant?: Variant;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  image,
  badge,
  rating,
  href,
  onAddToCart,
  variant = "vertical",
}) => {
  const stars = Math.max(0, Math.min(5, rating ?? 0));

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    href ? (
      <a
        href={href}
        className="block focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-xl"
      >
        {children}
      </a>
    ) : (
      <>{children}</>
    );

  const Content = () => (
    <div className="p-4 space-y-2 flex flex-col justify-between">
      <Wrapper>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 font-medium">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(price)}
        </p>
      </Wrapper>

      {rating !== undefined && (
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              viewBox="0 0 20 20"
              className={`h-4 w-4 ${
                i < stars ? "fill-yellow-400" : "fill-gray-300 dark:fill-gray-600"
              }`}
            >
              <path d="M10 15.27 16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19 10 15.27z" />
            </svg>
          ))}
          <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
            {stars.toFixed(1)}
          </span>
        </div>
      )}

      <button
        type="button"
        onClick={onAddToCart}
        disabled={!onAddToCart}
        className="w-full rounded-lg bg-blue-600 text-white py-2 text-sm font-medium hover:bg-blue-700 transition disabled:bg-gray-400"
      >
        Adicionar ao carrinho
      </button>
    </div>
  );

  return (
    <div
      className={`rounded-xl border shadow hover:shadow-lg transition overflow-hidden
        bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700
        ${variant === "horizontal" ? "flex h-40" : "max-w-sm"}
        ${variant === "compact" ? "max-w-xs text-sm" : ""}`}
    >
      <div className={`relative ${variant === "horizontal" ? "w-40" : ""}`}>
        <img
          src={image}
          alt={name}
          className={`object-cover ${
            variant === "horizontal" ? "h-full w-full" : "h-48 w-full"
          }`}
        />
        {badge && (
          <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded">
            {badge}
          </span>
        )}
      </div>

      <Content />
    </div>
  );
};
