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
    // lógica - mudar
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <motion.div
      className='min-h-screen flex items-center justify-center px-4'
      animate={{ 
        backgroundColor : darkMode ? "#090911" : "#f4f4f5",
      }}
    >
      <motion.div
        animate={
          darkMode
            ? "bg-zinc-900/80 border-zinc-800 backdrop-blur-xl"
            : "bg-white/80 backdrop-blur-xl shadow-2xl"
        }
        className="w-full max-w-md rounded-3xl p-8"
      >
        {/* Logo / Título */}
        <motion.div
        animate={{
          color: darkMode ? "#fff" : "#090911" ,
        }}
        className="text-center mb-8">
          <h1
            className={`text-4xl font-semibold tracking-tight`}
          >
            Login - Gabardo TI
          </h1>
        </motion.div
        >

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <motion.div
            animate={{
              color: darkMode ? "#fff" : "#090911" ,
          }}      
          >
            <label
              htmlFor="username"
              className={`mb-1.5 block text-sm font-medium`}
            >
              E-mail:
            </label>
            <div className="relative">
              <div
                className={`pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5`}
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
              <motion.input
                id="username"
                type="text"
                value={username}
                animate={{
                  backgroundColor: darkMode
                    ? "rgba(39, 39, 42, 0.6)" // zinc-800/60
                    : "#ffffff",
                  color: darkMode ? "#ffffff" : "#18181b",
                  borderColor: darkMode ? "#3f3f46" : "#d4d4d8",
                }}
                whileFocus={{
                  borderColor: "#6366f1",
                  boxShadow: darkMode
                    ? "0 0 0 3px rgba(99, 102, 241, 0.30)"
                    : "0 0 0 3px rgba(99, 102, 241, 0.20)",
                }}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="exemplo@email.com"
                required
                className={`w-full rounded-xl border py-3 pl-11 pr-4 text-sm outline-none ${
                  darkMode
                    ? "placeholder:text-zinc-500"
                    : "placeholder:text-zinc-400"
                }`}
              />
            </div>
          </motion.div>

          {/* Password */}
          <motion.div
          animate={{
            color: darkMode ? "#fff" : "#090911" ,
          }} 
          >
            <label
              htmlFor="password"
              className={`mb-1.5 block text-sm font-medium ${
                darkMode ? "text-zinc-300" : "text-zinc-700"
              }`}
            >
              Senha:
            </label>
            <div className="relative">
              <div
                className={`pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5`}
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
              <motion.input
                id="password"
                type="password"
                value={password}
                animate={{
                  backgroundColor: darkMode
                    ? "rgba(39, 39, 42, 0.6)" // zinc-800/60
                    : "#ffffff",
                  color: darkMode ? "#ffffff" : "#18181b",
                  border: 'transparent',
                }}
                whileFocus={{
                  borderColor: "#6366f1",
                  boxShadow: darkMode
                    ? "0 0 0 3px rgba(99, 102, 241, 0.30)"
                    : "0 0 0 3px rgba(99, 102, 241, 0.20)",
                }}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className={`w-full rounded-xl border py-3 pl-11 pr-4 text-sm outline-none ${
                  darkMode
                    ? "placeholder:text-zinc-500"
                    : "placeholder:text-zinc-400"
                }`}
              />
            </div>
          </motion.div>

          {/* Forgot password */}
          <motion.div className="flex justify-end">
            <button
              type="button"
              className={`text-sm font-medium ${
                darkMode
                  ? "text-indigo-400 hover:text-indigo-300"
                  : "text-indigo-600 hover:text-indigo-500"
              }`}
            >
              Esqueceu a senha? Faz o L.
            </button>
          </motion.div>

          {/* Submit */}
          <motion.div>
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
      </motion.div>
    </motion.div>
  );
}