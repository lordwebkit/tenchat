import { defineStore } from "pinia";
import type {
  AuthResponse,
  AuthUserError,
  AuthCredentials,
  AuthResponseError,
} from "~/interfaces/auth";

const authenticateUserUrl = "https://dummyjson.com/auth/login";

export const useAuthStore = defineStore("auth", () => {
  const authenticated = ref(false);
  const loading = ref(false);

  const authUserError = reactive<AuthUserError>({
    data: null,
    error: false,
  });

  const authenticateUser = async ({ email, password }: AuthCredentials) => {
    loading.value = true;

    try {
      const response: AuthResponse = await $fetch(authenticateUserUrl, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: {
          username: email,
          password,
        },
      });

      loading.value = false;

      if (response) {
        const token = useCookie("token");
        token.value = response.token;
        authenticated.value = true;
      }
    } catch (e) {
      loading.value = false;
      const error: AuthResponseError = e as AuthResponseError;

      authUserError.data = error.data;
      authUserError.error = true;

      setTimeout(() => {
        authUserError.data = null;
      }, 2000);
    }
  };

  const logUserOut = () => {
    const token = useCookie("token");
    authenticated.value = false;
    token.value = null;
  };

  return {
    authenticated,
    loading,
    authUserError,
    authenticateUser,
    logUserOut,
  };
});
