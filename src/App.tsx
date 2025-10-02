import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  message: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export default function App() {
  const [data, setData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (values: FormData) => {
    const e: Errors = {};
    if (!values.name.trim()) e.name = "Informe seu nome.";
    if (!values.email.trim()) e.email = "Informe seu e-mail.";
    else if (!emailRegex.test(values.email)) e.email = "E-mail inválido.";
    if (!values.message.trim()) e.message = "Escreva sua mensagem.";
    else if (values.message.length < 10) e.message = "Use ao menos 10 caracteres.";
    return e;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eVal = validate(data);
    setErrors(eVal);
    if (Object.keys(eVal).length === 0) {
      setSubmitted(true);
      setData({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-4">✉️ Formulário de Contato</h1>

        {submitted && (
          <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-800 border border-green-200">
            Mensagem enviada com sucesso! ✅
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Nome */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Nome
            </label>
            <input
              id="name"
              name="name"
              value={data.name}
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.name ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-blue-300"
              }`}
              placeholder="Seu nome"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-blue-300"
              }`}
              placeholder="voce@exemplo.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Mensagem */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="message">
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              value={data.message}
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 h-28 focus:outline-none focus:ring-2 ${
                errors.message ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-blue-300"
              }`}
              placeholder="Escreva sua mensagem..."
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
