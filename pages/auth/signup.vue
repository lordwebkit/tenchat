<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRegistrationStore } from "~/stores/registration";

import AuthTitle from "~/components/auth/Title.vue";
import AuthField from "~/components/auth/Field.vue";
import AuthButton from "~/components/auth/Button.vue";
import AuthWarning from "~/components/auth/Warning.vue";

import IconPerson from "~/components/icon/person.vue";
import IconEnvelope from "~/components/icon/envelope.vue";
import IconEyeSlash from "~/components/icon/eyeSlash.vue";
import IconShieldSlash from "~/components/icon/shieldSlash.vue";

const { cleanForm, registrationUser } = useRegistrationStore();
const { form, unique, loading, isWarningClean } = storeToRefs(
  useRegistrationStore()
);

const router = useRouter();

const formCondition = ref(false);
const isVisiblePassword = ref({
  password: false,
  confirmPassword: false,
});

const isFormFilled = computed(() => {
  for (const [field, value] of Object.entries(form.value)) {
    if (value === "") {
      return false;
    }
  }

  return true;
});

const isFormValid = computed(() => {
  if (!isFormFilled.value) {
    return false;
  }

  if (!formCondition.value) {
    return false;
  }

  return true;
});

const registration = async () => {
  await registrationUser();

  if (unique) {
    router.push("/auth/otp");
  }
};

definePageMeta({
  layout: "auth",
  middleware: "signup",
});
</script>

<template>
  <div
    class="bg-auth-left flex h-full px-4 pt-4 md:pt-0 md:justify-center md:items-center"
  >
    <div
      class="flex flex-col gap-[25px] w-full md:w-auto md:-translate-y-[34px]"
    >
      <div class="flex flex-col">
        <AuthTitle class="md:translate-x-[-10px] pr-8 md:text-center"
          >Create your account</AuthTitle
        >
        <p class="text-[20px] text-[#71717A] md:-translate-x-[10px]">
          Unlock all Features!
        </p>
      </div>
      <div class="flex flex-col gap-[10px] md:pl-[2px] md:pr-[1px]">
        <AuthField
          :placeholder="'Username'"
          :value="form.username"
          @input="
            (username) => {
              form.username = username;
            }
          "
        >
          <template v-slot:left>
            <IconPerson />
          </template>
        </AuthField>
        <AuthField
          :placeholder="'Email'"
          :value="form.email"
          @input="
            (email) => {
              form.email = email;
            }
          "
        >
          <template v-slot:left>
            <IconEnvelope />
          </template>
        </AuthField>
        <AuthField
          :type="isVisiblePassword.password ? 'text' : 'password'"
          :placeholder="'Password'"
          :value="form.password"
          @input="
            (password) => {
              form.password = password;
            }
          "
        >
          <template v-slot:left>
            <IconShieldSlash />
          </template>
          <template v-slot:right>
            <IconEyeSlash
              class="cursor-pointer pr-3"
              :visible="isVisiblePassword.password"
              @click="
                () => (isVisiblePassword.password = !isVisiblePassword.password)
              "
            />
          </template>
        </AuthField>
        <AuthField
          :type="isVisiblePassword.confirmPassword ? 'text' : 'password'"
          :placeholder="'Confirm Password'"
          :value="form.confirmPassword"
          @input="
            (password) => {
              form.confirmPassword = password;
            }
          "
        >
          <template v-slot:left>
            <IconShieldSlash />
          </template>
          <template v-slot:right>
            <IconEyeSlash
              class="cursor-pointer pr-3"
              :visible="isVisiblePassword.confirmPassword"
              @click="
                () =>
                  (isVisiblePassword.confirmPassword =
                    !isVisiblePassword.confirmPassword)
              "
            />
          </template>
        </AuthField>
        <div class="flex items-center gap-2">
          <div class="flex items-center">
            <div class="inline-flex items-center">
              <label
                class="relative flex items-center cursor-pointer"
                htmlFor="formCondition"
              >
                <input
                  type="checkbox"
                  v-model="formCondition"
                  class="border-auth-element peer relative h-5 w-5 cursor-pointer appearance-none rounded border transition-all checked:border-auth-right checked:bg-auth-right"
                  id="formCondition"
                />
                <span
                  class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-width="1"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </span>
              </label>
            </div>
          </div>
          <label htmlFor="formCondition" class="cursor-pointer">
            Accept
            <NuxtLink
              class="text-auth-element hover:text-auth-right"
              to="/auth/conditions"
              >terms and conditions</NuxtLink
            >
          </label>
        </div>
      </div>
      <div class="flex flex-col gap-5">
        <AuthButton
          :active="isFormValid"
          :loading="loading"
          @click.prevent="() => (isFormValid ? registration() : '')"
          :class="isFormValid ? 'cursor-pointer' : 'cursor-default'"
        >
          sign up
        </AuthButton>
        <p class="text-center text-[#71717A]">
          You have account?
          <NuxtLink
            class="font-bold text-auth-element hover:text-auth-right"
            to="/auth/login"
            >Login now</NuxtLink
          >
        </p>
      </div>
    </div>
  </div>
  <AuthWarning
    :warning="isWarningClean"
    @deny="
      () => {
        cleanForm();
        navigateTo('/auth/login');
        isWarningClean = false;
      }
    "
    @confirm="() => (isWarningClean = false)"
  />
</template>
