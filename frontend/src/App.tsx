import { AppRouter } from "./app/routes/AppRouter"
import { AuthProvider } from "./features/auth/context/AuthProvider";

export function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}
