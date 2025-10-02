import { useEffect, useState } from "react";
import { ProductCard } from "./components/ProductCard";

type CartItem = {
  name: string;
  price: number;
  image: string;
  qty: number;
};

export default function App() {
  const [dark, setDark] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Carregar preferências do localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedCart = localStorage.getItem("cart");

    if (savedTheme === "dark") setDark(true);
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Salvar tema
  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  // Salvar carrinho
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Adicionar ao carrinho
  const addToCart = (item: Omit<CartItem, "qty">) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.name === item.name);
      if (exists) {
        return prev.map((p) =>
          p.name === item.name ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  // Remover do carrinho
  const removeFromCart = (name: string) => {
    setCart((prev) => prev.filter((p) => p.name !== name));
  };

  // Total formatado em R$
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const formatPrice = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex flex-col items-center gap-8 transition">
        {/* Botão de tema */}
        <button
          onClick={() => setDark(!dark)}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900 transition"
        >
          Alternar para {dark ? "☀️ Claro" : "🌙 Escuro"}
        </button>

        {/* Catálogo */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          🛍️ Catálogo de Produtos
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          <ProductCard
            name="Tênis Esportivo"
            price={299.9}
            image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop"
            badge="Novo"
            rating={4.7}
            onAddToCart={() =>
              addToCart({
                name: "Tênis Esportivo",
                price: 299.9,
                image:
                  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
              })
            }
          />

          <ProductCard
            name="Relógio Smart"
            price={499.0}
            image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop"
            rating={4.2}
            variant="horizontal"
            onAddToCart={() =>
              addToCart({
                name: "Relógio Smart",
                price: 499.0,
                image:
                  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
              })
            }
          />

          <ProductCard
            name="Mochila de Couro"
            price={199.5}
            image="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=800&auto=format&fit=crop"
            badge="-20%"
            variant="compact"
            onAddToCart={() =>
              addToCart({
                name: "Mochila de Couro",
                price: 199.5,
                image:
                  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=800&auto=format&fit=crop",
              })
            }
          />

          {/* Tubarão Branco 🦈 */}
          <ProductCard
            name="Tubarão Branco"
            price={500000}
            image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop"
            badge="Exclusivo"
            rating={5}
            onAddToCart={() =>
              addToCart({
                name: "Tubarão Branco",
                price: 500000,
                image:
                  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
              })
            }
          />
        </div>

        {/* Carrinho */}
        <div className="w-full max-w-3xl mt-8 rounded-lg bg-white dark:bg-gray-800 shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            🛒 Carrinho
          </h2>
          {cart.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300">
              Seu carrinho está vazio.
            </p>
          ) : (
            <ul className="space-y-3">
              {cart.map((item) => (
                <li
                  key={item.name}
                  className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.qty}x {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.name)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="flex justify-between items-center mt-4">
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              Total:
            </span>
            <span className="text-lg font-bold text-blue-600">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
