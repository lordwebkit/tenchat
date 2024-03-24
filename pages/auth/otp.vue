<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRegistrationStore } from "~/stores/registration";

import AuthTitle from "~/components/auth/Title.vue";
import AuthButton from "~/components/auth/Button.vue";

const { form } = storeToRefs(useRegistrationStore());

const otp = ref({
  email: "kminchelle",
  password: "0lelplR",
});

const isUserFilled = computed(() => {
  return true;
});

const isUserValid = computed(() => {
  if (!isUserFilled.value) {
    return false;
  }

  return true;
});

const login = async () => {};

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
        <AuthTitle class="md:translate-x-[-6px]">Enter OTP</AuthTitle>
        <p class="text-[#71717A]">
          Sent OTP on <span class="text-auth-element">{{ form.email }}</span>
        </p>
        <NuxtLink
          class="font-bold text-auth-element hover:text-auth-right"
          to="/auth/signup"
          >Change email</NuxtLink
        >
        <div class="flex gap-4">
          <input
            type="text"
            placeholder="—"
            class="border border-auth-element rounded-lg p-4 w-16 text-center font-[Inter] text-[18px] bg-transparent outline:border-auth-element placeholder:text-[#2D31A6] placeholder:text-opacity-20"
            maxlength="1"
          />
          <input
            type="text"
            placeholder="—"
            class="border border-auth-element rounded-lg p-4 w-16 text-center font-[Inter] text-[18px] bg-transparent outline:border-auth-element placeholder:text-[#2D31A6] placeholder:text-opacity-20"
            maxlength="1"
          />
          <input
            type="text"
            placeholder="—"
            class="border border-auth-element rounded-lg p-4 w-16 text-center font-[Inter] text-[18px] bg-transparent outline:border-auth-element placeholder:text-[#2D31A6] placeholder:text-opacity-20"
            maxlength="1"
          />
          <input
            type="text"
            placeholder="—"
            class="border border-auth-element rounded-lg p-4 w-16 text-center font-[Inter] text-[18px] bg-transparent outline:border-auth-element placeholder:text-[#2D31A6] placeholder:text-opacity-20"
            maxlength="1"
          />
          <input
            type="text"
            placeholder="—"
            class="border border-auth-element rounded-lg p-4 w-16 text-center font-[Inter] text-[18px] bg-transparent outline:border-auth-element placeholder:text-[#2D31A6] placeholder:text-opacity-20"
            maxlength="1"
          />
          <input
            type="text"
            placeholder="—"
            class="border border-auth-element rounded-lg p-4 w-16 text-center font-[Inter] text-[18px] bg-transparent outline:border-auth-element placeholder:text-[#2D31A6] placeholder:text-opacity-20"
            maxlength="1"
          />
        </div>
      </div>
      <div class="flex flex-col gap-7 md:pl-[5px] md:pr-[6px]">
        <AuthButton
          :active="isUserValid"
          :loading="false"
          @click.prevent="() => (isUserValid ? login() : '')"
          :class="isUserValid ? 'cursor-pointer' : 'cursor-default'"
        >
          submit
        </AuthButton>
      </div>
    </div>
  </div>
</template>
