import { 
  Route, 
  Routes 
} from "react-router-dom";

import { 
  CallbackPage,
  HomePage,
  LogoutPage,
  NotFoundPage 
} from "./pages";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthGuard, LoaderOverlay } from "./components";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <LoaderOverlay/>
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route 
        path="/callback" 
        element={<AuthGuard component={CallbackPage}/>} 
      />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="*" element={<AuthGuard component={NotFoundPage}/>} />
    </Routes>
  )
}

export default App
