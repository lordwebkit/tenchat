<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRegistrationStore } from "~/stores/registration";

import AuthTitle from "~/components/auth/Title.vue";
import AuthButton from "~/components/auth/Button.vue";

const { clearForm } = useRegistrationStore();
const { form } = storeToRefs(useRegistrationStore());

const { authenticateUser } = useAuthStore();
const { loading, authenticated } = storeToRefs(useAuthStore());

const inputs = ref(["", "", "", "", "", ""]);
const router = useRouter();

const isInputsFilled = computed(() => {
  for (const [field, value] of Object.entries(inputs.value)) {
    if (value === "") {
      return false;
    }
  }

  return true;
});

const isUserValid = computed(() => {
  if (!isInputsFilled.value) {
    return false;
  }

  return true;
});

const moveToNext = (index: number, event: Event) => {
  const inputValue = (event.target as HTMLInputElement).value;

  inputs.value[index] = inputValue.length > 1 ? inputValue[1] : inputValue[0];

  const nextInputIndex = index + 1;

  if (inputs.value[nextInputIndex] !== undefined) {
    const nextInput = document.querySelectorAll("input")[
      nextInputIndex
    ] as HTMLInputElement;
    nextInput.focus();
  } else {
    const nextInput = document.querySelectorAll("input")[0] as HTMLInputElement;
    nextInput.focus();
  }
};

const paste = (event: ClipboardEvent) => {
  if (event.clipboardData) {
    const pastedText = event.clipboardData.getData("text");
    const pastedLetters = pastedText.split("");

    inputs.value = inputs.value.map((value, index) => {
      return pastedLetters[index];
    });
  }
};

const login = async () => {
  await authenticateUser({ email: "kminchelle", password: "0lelplR" });

  if (authenticated) {
    clearForm();
    inputs.value = ["", "", "", "", "", ""];
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
    <div class="flex flex-col gap-6 w-full md:w-auto md:translate-y-[-36px]">
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-1">
          <AuthTitle class="md:translate-x-[-6px]">Enter OTP</AuthTitle>
          <p class="text-[#71717A] text-[20px]">
            Sent OTP on <span class="text-auth-element">{{ form.email }}</span>
          </p>
          <div class="">
            <NuxtLink
              class="font-bold text-auth-element hover:text-auth-right"
              to="/auth/signup"
              >Change email</NuxtLink
            >
          </div>
        </div>
        <div class="flex gap-5">
          <input
            type="text"
            placeholder="—"
            class="border-auth-element border-2 border-opacity-50 rounded-lg p-4 w-16 text-center font-[Inter] text-[18px] bg-transparent outline-auth-element placeholder:text-[#2D31A6] placeholder:text-opacity-20"
            maxlength="2"
            v-model="inputs[0]"
            @input="moveToNext(0, $event)"
            @paste="paste"
          />
          <input
            type="text"
            placeholder="—"
            class="border-auth-element border-2 border-opacity-50 rounded-lg p-4 w-16 text-center font-[Inter] text-[18px] bg-transparent outline-auth-element placeholder:text-[#2D31A6] placeholder:text-opacity-20"
            maxlength="2"
            v-model="inputs[1]"
            @input="moveToNext(1, $event)"
            @paste="paste"
          />
          <input
            type="text"
            placeholder="—"
            class="border-auth-element border-2 border-opacity-50 rounded-lg p-4 w-16 text-center font-[Inter] text-[18px] bg-transparent outline-auth-element placeholder:text-[#2D31A6] placeholder:text-opacity-20"
            maxlength="2"
            v-model="inputs[2]"
            @input="moveToNext(2, $event)"
            @paste="paste"
          />
          <input
            type="text"
            placeholder="—"
            class="border-auth-element border-2 border-opacity-50 rounded-lg p-4 w-16 text-center font-[Inter] text-[18px] bg-transparent outline-auth-element placeholder:text-[#2D31A6] placeholder:text-opacity-20"
            maxlength="2"
            v-model="inputs[3]"
            @input="moveToNext(3, $event)"
            @paste="paste"
          />
          <input
            type="text"
            placeholder="—"
            class="border-auth-element border-2 border-opacity-50 rounded-lg p-4 w-16 text-center font-[Inter] text-[18px] bg-transparent outline-auth-element placeholder:text-[#2D31A6] placeholder:text-opacity-20"
            maxlength="2"
            v-model="inputs[4]"
            @input="moveToNext(4, $event)"
            @paste="paste"
          />
          <input
            type="text"
            placeholder="—"
            class="border-auth-element border-2 border-opacity-50 rounded-lg p-4 w-16 text-center font-[Inter] text-[18px] bg-transparent outline-auth-element placeholder:text-[#2D31A6] placeholder:text-opacity-20"
            maxlength="2"
            v-model="inputs[5]"
            @input="moveToNext(5, $event)"
            @paste="paste"
          />
        </div>
      </div>
      <div class="flex flex-col gap-7 md:pl-[15px] md:pr-[15px]">
        <AuthButton
          :active="isUserValid"
          :loading="loading"
          @click.prevent="() => (isUserValid ? login() : '')"
          :class="isUserValid ? 'cursor-pointer' : 'cursor-default'"
        >
          submit
        </AuthButton>
      </div>
    </div>
  </div>
</template>
