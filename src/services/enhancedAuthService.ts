import { useApiState } from "@/hooks/useApiState";
import * as ApiService from "./apiClient";

// Enhanced Auth Service with state management
export function useEnhancedAuth() {
  const loginState = useApiState({
    showGlobalLoading: true,
    loadingMessage: "Signing in...",
    onSuccess: (data) => {
      console.log("Login successful:", data);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const registerState = useApiState({
    showGlobalLoading: true,
    loadingMessage: "Creating account...",
    onSuccess: (data) => {
      console.log("Registration successful:", data);
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  const logoutState = useApiState({
    showGlobalLoading: false,
    onSuccess: () => {
      console.log("Logout successful");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });

  const profileState = useApiState({
    showGlobalLoading: false,
    onError: (error) => {
      console.error("Profile fetch failed:", error);
    },
  });

  const login = async (email: string, password: string) => {
    return loginState.execute(() => ApiService.login(email, password), {
      component: "EnhancedAuthService",
      action: "login",
    });
  };

  const register = async (
    fullName: string,
    email: string,
    password: string
  ) => {
    return registerState.execute(
      () => ApiService.register(fullName, email, password),
      { component: "EnhancedAuthService", action: "register" }
    );
  };

  const logout = async () => {
    return logoutState.execute(() => ApiService.logout(), {
      component: "EnhancedAuthService",
      action: "logout",
    });
  };

  const getProfile = async () => {
    return profileState.execute(() => ApiService.getProfile(), {
      component: "EnhancedAuthService",
      action: "getProfile",
    });
  };

  return {
    // Login
    login,
    loginState: {
      isLoading: loginState.isLoading,
      error: loginState.error,
      isSuccess: loginState.isSuccess,
    },

    // Register
    register,
    registerState: {
      isLoading: registerState.isLoading,
      error: registerState.error,
      isSuccess: registerState.isSuccess,
    },

    // Logout
    logout,
    logoutState: {
      isLoading: logoutState.isLoading,
      error: logoutState.error,
      isSuccess: logoutState.isSuccess,
    },

    // Profile
    getProfile,
    profileState: {
      isLoading: profileState.isLoading,
      error: profileState.error,
      isSuccess: profileState.isSuccess,
    },
  };
}
