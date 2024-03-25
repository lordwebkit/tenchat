export default defineNuxtRouteMiddleware((to) => {
  const { authenticated } = storeToRefs(useAuthStore());
  const { isFormEmpty, isWarningFormLost, isNextRoutePath } = storeToRefs(
    useRegistrationStore()
  );
  const token = useCookie("token");

  if (token.value) {
    authenticated.value = true;
  }

  if (!token.value) {
    if (
      !isFormEmpty.value &&
      to.name !== "auth-signup" &&
      to.name !== "auth-otp"
    ) {
      isWarningFormLost.value = true;
      isNextRoutePath.value = to.fullPath;
      return navigateTo("/auth/signup");
    }

    const authPagesName = [
      "auth-login",
      "auth-signup",
      "auth-otp",
      "auth-conditions",
    ];

    for (let i = 0; i < authPagesName.length; i++) {
      if (to.name === authPagesName[i]) return;
    }

    return navigateTo("/auth/login");
  }
});
