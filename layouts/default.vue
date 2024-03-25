<script lang="ts" setup>
import { useAuthStore } from "~/stores/auth";
const { logUserOut } = useAuthStore();

const router = useRouter();

const logout = () => {
  logUserOut();
  router.push("/auth/login");
};
</script>
<template>
  <header class="py-2 flex w-full fixed">
    <div class="container mx-auto flex justify-end">
      <NuxtLink
        @click="logout"
        class="bg-auth-right text-white px-4 py-2 rounded-md cursor-pointer active:bg-auth-element"
        >Logout</NuxtLink
      >
    </div>
  </header>
  <slot />
</template>
