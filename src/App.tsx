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

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedCart = localStorage.getItem("cart");
    if (savedTheme === "dark") setDark(true);
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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

  const removeFromCart = (name: string) => {
    setCart((prev) => prev.filter((p) => p.name !== name));
  };

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

        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          🛍️ Catálogo de Produtos
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {/* Produto 1 */}
          <ProductCard
            name="Tênis Nike"
            price={299.9}
            image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
            badge="Novo"
            rating={4.7}
            onAddToCart={() =>
              addToCart({
                name: "Tênis Esportivo",
                price: 299.9,
                image:
                  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
              })
            }
          />

          {/* Produto 2 */}
          <ProductCard
            name="Relógio Smart"
            price={499.0}
            image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
            rating={4.2}
            onAddToCart={() =>
              addToCart({
                name: "Relógio Smart",
                price: 499.0,
                image:
                  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
              })
            }
          />

          {/* Produto 3 */}
          <ProductCard
            name="Bolsa Louis Vuitton"
            price={8500}
            image="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"
            badge="Luxo"
            onAddToCart={() =>
              addToCart({
                name: "Bolsa Louis Vuitton",
                price: 8500,
                image:
                  "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
              })
            }
          />

          {/* Produto 4 - Shark */}
          <ProductCard
            name="Tubarão Branco"
            price={500000}
            image="https://static.todamateria.com.br/upload/tu/ba/tubaraobranco-cke.jpg"
            badge="Exclusivo"
            rating={4.8}
            onAddToCart={() =>
              addToCart({
                name: "Tubarão Branco",
                price: 500.000,
                image:
                  "https://static.todamateria.com.br/upload/tu/ba/tubaraobranco-cke.jpg",
              })
            }
          />

          {/* Produto 5 */}
          <ProductCard
            name="Ferrari Esportiva"
            price={3500000}
            image="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80"
            badge="Exclusivo"
            rating={5}
            onAddToCart={() =>
              addToCart({
                name: "Ferrari Esportiva",
                price: 3500000,
                image:
                  "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80",
              })
            }
          />

          {/* Produto 6 - Prada */}
          <ProductCard
            name="Bolsa Prada"
            price={21000}
            image="https://images.unsplash.com/photo-1727691038583-bd59f477bb4f?q=80&w=1588&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            badge="Colecionador"
            rating={5}
            onAddToCart={() =>
              addToCart({
                name: "Bolsa Prada",
                price: 21000,
                image:
                  "https://images.unsplash.com/photo-1727691038583-bd59f477bb4f?q=80&w=1588&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
