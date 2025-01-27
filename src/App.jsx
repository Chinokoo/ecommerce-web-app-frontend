import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import NavBar from "./components/NavBar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./store/useCartStore";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (user) {
      getCartItems();
    }
  }, [getCartItems, user]);

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-t from-stone-600 to-stone-900 text-white relative overflow-hidden px-2 md:px-10">
      <div className="relate z-50 pt-20">
        <NavBar />
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route
            path={"/signup"}
            element={!user ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path={"/login"}
            element={!user ? <LogInPage /> : <Navigate to="/" />}
          />
          <Route
            path={"/admin-dashboard"}
            element={
              user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />
            }
          />
          <Route path={"/category/:category"} element={<CategoryPage />} />
          <Route
            path={"/cart"}
            element={user ? <CartPage /> : <Navigate to={"/login"} />}
          />
          <Route
            path={"/success"}
            element={
              user ? <PurchaseSuccessPage /> : <Navigate to={"/login"} />
            }
          />
          <Route
            path={"/purchase-cancel"}
            element={user ? <PurchaseCancelPage /> : <Navigate to={"/login"} />}
          />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
