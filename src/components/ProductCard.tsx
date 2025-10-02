import React from "react";

type ProductCardProps = {
  name: string;
  price: number;
  image: string;
  badge?: string;
  rating?: number;
  variant?: "default" | "horizontal" | "compact";
  onAddToCart: () => void;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  image,
  badge,
  rating,
  variant = "default",
  onAddToCart,
}) => {
  const formatPrice = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  // Layouts diferentes
  if (variant === "horizontal") {
    return (
      <div className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition">
        <img
          src={image}
          alt={name}
          className="w-24 h-24 object-cover rounded-md"
        />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {name}
          </h3>
          <p className="text-blue-600 font-semibold">{formatPrice(price)}</p>
          {rating && (
            <p className="text-yellow-500 text-sm">⭐ {rating.toFixed(1)}</p>
          )}
          <button
            onClick={onAddToCart}
            className="mt-2 px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Adicionar
          </button>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 flex flex-col items-center text-center transition">
        <img
          src={image}
          alt={name}
          className="w-28 h-28 object-cover rounded-md mb-2"
        />
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
          {name}
        </h3>
        <p className="text-blue-600 font-semibold text-sm">
          {formatPrice(price)}
        </p>
        {badge && (
          <span className="text-xs mt-1 text-green-600 font-medium">
            {badge}
          </span>
        )}
        <button
          onClick={onAddToCart}
          className="mt-2 px-2 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Adicionar
        </button>
      </div>
    );
  }

  // Layout padrão
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition flex flex-col">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
          {name}
        </h3>
        <p className="text-blue-600 font-semibold mb-2">{formatPrice(price)}</p>
        {rating && (
          <p className="text-yellow-500 text-sm mb-2">⭐ {rating.toFixed(1)}</p>
        )}
        {badge && (
          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mb-2">
            {badge}
          </span>
        )}
        <button
          onClick={onAddToCart}
          className="mt-auto px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};
