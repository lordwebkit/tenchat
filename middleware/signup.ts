export default defineNuxtRouteMiddleware((to) => {
  const { authenticated } = storeToRefs(useAuthStore());
  const { form, isFormEmpty } = storeToRefs(useRegistrationStore());
  const token = useCookie("token");

  if (token.value) {
    authenticated.value = true;
  }

  if (!token.value) {
    if (!isFormEmpty.value) {
      form.value.confirmPassword = form.value.password = "";
    }
  }

  return;
});
