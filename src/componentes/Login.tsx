import { useState } from "react";
import { motion } from "framer-motion";
import { useHeader } from "../contextos/Header";

export default function Login() {
  const { darkMode } = useHeader();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulação de login
    setTimeout(() => setIsLoading(false), 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18,
      },
    },
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        darkMode ? "bg-zinc-950" : "bg-zinc-100"
      }`}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`w-full max-w-md rounded-3xl p-8 shadow-2xl border ${
          darkMode
            ? "bg-zinc-900/80 border-zinc-800 backdrop-blur-xl"
            : "bg-white/80 border-zinc-200 backdrop-blur-xl"
        }`}
      >
        {/* Logo / Título */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div
            className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${
              darkMode ? "bg-indigo-500/20" : "bg-indigo-100"
            }`}
          >
            <svg
              className={`h-7 w-7 ${
                darkMode ? "text-indigo-400" : "text-indigo-600"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1
            className={`text-2xl font-semibold tracking-tight ${
              darkMode ? "text-white" : "text-zinc-900"
            }`}
          >
            Bem-vindo de volta
          </h1>
          <p
            className={`mt-1 text-sm ${
              darkMode ? "text-zinc-400" : "text-zinc-500"
            }`}
          >
            Entre com suas credenciais
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <motion.div variants={itemVariants}>
            <label
              htmlFor="username"
              className={`mb-1.5 block text-sm font-medium ${
                darkMode ? "text-zinc-300" : "text-zinc-700"
              }`}
            >
              Usuário
            </label>
            <div className="relative">
              <div
                className={`pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 ${
                  darkMode ? "text-zinc-500" : "text-zinc-400"
                }`}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="seu.usuario"
                required
                className={`w-full rounded-xl border py-3 pl-11 pr-4 text-sm outline-none focus:ring-2 ${
                  darkMode
                    ? "border-zinc-700 bg-zinc-800/60 text-white placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-indigo-500/30"
                    : "border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-indigo-500/20"
                }`}
              />
            </div>
          </motion.div>

          {/* Password */}
          <motion.div variants={itemVariants}>
            <label
              htmlFor="password"
              className={`mb-1.5 block text-sm font-medium ${
                darkMode ? "text-zinc-300" : "text-zinc-700"
              }`}
            >
              Senha
            </label>
            <div className="relative">
              <div
                className={`pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 ${
                  darkMode ? "text-zinc-500" : "text-zinc-400"
                }`}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className={`w-full rounded-xl border py-3 pl-11 pr-4 text-sm outline-none focus:ring-2 ${
                  darkMode
                    ? "border-zinc-700 bg-zinc-800/60 text-white placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-indigo-500/30"
                    : "border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-indigo-500/20"
                }`}
              />
            </div>
          </motion.div>

          {/* Forgot password */}
          <motion.div variants={itemVariants} className="flex justify-end">
            <button
              type="button"
              className={`text-sm font-medium ${
                darkMode
                  ? "text-indigo-400 hover:text-indigo-300"
                  : "text-indigo-600 hover:text-indigo-500"
              }`}
            >
              Esqueceu a senha?
            </button>
          </motion.div>

          {/* Submit */}
          <motion.div variants={itemVariants}>
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className={`relative w-full overflow-hidden rounded-xl py-3.5 text-sm font-semibold text-white shadow-lg ${
                isLoading
                  ? "cursor-not-allowed bg-indigo-400"
                  : "bg-indigo-600 hover:bg-indigo-500"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Entrando...
                </span>
              ) : (
                "Entrar"
              )}
            </motion.button>
          </motion.div>
        </form>

        {/* Footer */}
        <motion.p
          variants={itemVariants}
          className={`mt-8 text-center text-sm ${
            darkMode ? "text-zinc-500" : "text-zinc-500"
          }`}
        >
          Não tem uma conta?{" "}
          <button
            type="button"
            className={`font-medium ${
              darkMode
                ? "text-indigo-400 hover:text-indigo-300"
                : "text-indigo-600 hover:text-indigo-500"
            }`}
          >
            Criar conta
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
}