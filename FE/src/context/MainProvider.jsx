import { AuthProvider } from "./AuthProvider"

function MainProvider({children}) {
  return (
    <AuthProvider>
        {children}
    </AuthProvider>
  )
}

export default MainProvider