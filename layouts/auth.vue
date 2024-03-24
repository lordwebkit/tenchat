<script setup lang="ts">
const route = useRoute();

const title = computed(() => {
  switch (route.name) {
    case "auth-login":
      return "Connect with any device.";

    case "auth-signup":
      return "Join us!";

    case "auth-otp":
      return "It's just OTP verification";

    default:
      return "Connect with any device.";
  }
});

const description = computed(() => {
  switch (route.name) {
    case "auth-login":
      return "Everything you need is an internet connection.";

    case "auth-signup":
      return "Just go through the boring process of creating an account.";

    case "auth-otp":
      return "You are one step away from recovering your password.";

    default:
      return "Everything you need is an internet connection.";
  }
});

const image = computed(() => {
  switch (route.name) {
    case "auth-login":
      return "/image/auth/login.svg";

    case "auth-signup":
      return "/image/auth/signup.svg";

    case "auth-otp":
      return "/image/auth/otp.svg";

    default:
      return "/image/auth/login.svg";
  }
});
</script>
<template>
  <section class="flex min-h-screen">
    <div class="flex-1">
      <slot />
    </div>
    <div class="bg-auth-right relative flex-1 hidden lg:flex">
      <div
        class="ellipse bg-[url('~/assets/icon/auth/ellipse-2.svg')] bg-no-repeat bg-center -translate-y-6 h-full w-full absolute"
      ></div>
      <div
        class="ellipse ellipse__small bg-[url('~/assets/icon/auth/ellipse-1.svg')] bg-no-repeat bg-center -translate-y-6 h-full w-full absolute"
      ></div>

      <div
        class="w-full flex flex-col justify-around items-center relative z-20 h-full px-4"
      >
        <span></span>
        <img :src="image" alt="" class="w-30 h-30" />
        <div class="flex flex-col items-center">
          <p class="font-bold text-[20px] text-[#E0EAFF]">{{ title }}</p>
          <p class="text-[#E0EAFF] text-opacity-75">{{ description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped lang="scss">
@media (max-width: 1234px) {
  .ellipse {
    background-size: contain;

    &__small {
      width: 90%;
      left: 50%;
      transform: translate(-50%, -20px);
    }
  }
}
</style>
