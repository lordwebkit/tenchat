import { defineStore } from "pinia";

interface User {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const useRegistrationStore = defineStore("registration", () => {
  const isWarningClean = ref(false);
  const loading = ref(false);
  const unique = ref(false);

  const form = ref<User>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const isFormEmpty = computed(() => {
    for (const [field, value] of Object.entries(form.value)) {
      if (value !== "") {
        return false;
      }
    }

    return true;
  });

  const cleanForm = () => {
    for (let field in form.value) {
      const key: keyof User = field as keyof User;
      form.value[key] = "";
    }
  };

  const registrationUser = async () => {
    loading.value = true;

    try {
      setTimeout(() => {
        loading.value = false;
        unique.value = true;
      }, 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    form,
    unique,
    loading,
    isFormEmpty,
    isWarningClean,
    cleanForm,
    registrationUser,
  };
});
