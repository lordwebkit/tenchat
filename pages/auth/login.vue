<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores/auth";

import AuthTitle from "~/components/auth/Title.vue";
import AuthField from "~/components/auth/Field.vue";
import AuthButton from "~/components/auth/Button.vue";
import AuthError from "~/components/auth/Error.vue";

import IconEnvelope from "~/components/icon/envelope.vue";
import IconEyeSlash from "~/components/icon/eyeSlash.vue";
import IconShieldSlash from "~/components/icon/shieldSlash.vue";

const { authenticateUser } = useAuthStore();
const { loading, authenticated, authUserError } = storeToRefs(useAuthStore());

const router = useRouter();

const user = ref({
  email: "kminchelle",
  password: "0lelplR",
});

const isVisiblePassword = ref(false);

const isUserFilled = computed(() => {
  for (const [field, value] of Object.entries(user.value)) {
    if (value === "") {
      return false;
    }
  }

  return true;
});

const isUserValid = computed(() => {
  if (!isUserFilled.value) {
    return false;
  }

  if (authUserError.value.error) {
    return false;
  }

  return true;
});

const login = async () => {
  await authenticateUser(user.value);

  if (authenticated) {
    router.push("/");
  }
};

definePageMeta({
  layout: "auth",
});
</script>

<template>
  <div
    class="bg-auth-left flex h-full px-4 pt-4 md:pt-0 md:justify-center md:items-center"
  >
    <div class="flex flex-col gap-5 w-full md:w-auto md:translate-y-[-36px]">
      <div class="flex flex-col">
        <AuthTitle class="md:translate-x-[-6px] md:text-center"
          >Login to your Account</AuthTitle
        >
      </div>
      <div class="flex flex-col gap-7 md:pl-[5px] md:pr-[6px]">
        <div class="flex flex-col gap-7">
          <div class="flex justify-between items-center">
            <span class="h-[1px] w-1/4 bg-[#71717A]"></span>
            <p class="text-[#71717A] font-medium text-[15px]">with email</p>
            <span class="h-[1px] w-1/4 bg-[#71717A] translate-x-[-6px]"></span>
          </div>
          <div class="flex flex-col gap-3">
            <AuthField
              :placeholder="'Email'"
              :value="user.email"
              @input="
                (email) => {
                  user.email = email;
                  authUserError.error = false;
                }
              "
            >
              <template v-slot:left>
                <IconEnvelope />
              </template>
            </AuthField>
            <AuthField
              :type="isVisiblePassword ? 'text' : 'password'"
              :placeholder="'Password'"
              :value="user.password"
              @input="
                (password) => {
                  user.password = password;
                  authUserError.error = false;
                }
              "
            >
              <template v-slot:left>
                <IconShieldSlash />
              </template>
              <template v-slot:right>
                <IconEyeSlash
                  class="cursor-pointer pr-3"
                  :visible="isVisiblePassword"
                  @click="() => (isVisiblePassword = !isVisiblePassword)"
                />
              </template>
            </AuthField>
          </div>
        </div>
        <AuthButton
          :active="isUserValid"
          :loading="loading"
          @click.prevent="() => (isUserValid ? login() : '')"
          :class="isUserValid ? 'cursor-pointer' : 'cursor-default'"
        >
          log in
        </AuthButton>
      </div>
      <p class="text-center text-[#71717A]">
        Don’t have account?
        <NuxtLink
          class="font-bold text-auth-element hover:text-auth-right"
          to="/auth/signup"
          >Create an account</NuxtLink
        >
      </p>
    </div>
  </div>
  <AuthError :message="authUserError.data ? authUserError.data?.message : ''" />
</template>
