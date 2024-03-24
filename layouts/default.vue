<script setup lang="ts"></script>
<template>
  <div>
    <div class="mainContent">
      <nuxt-link @click="logout">Logout</nuxt-link>
      <slot />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores/auth";

const router = useRouter();

const { logUserOut } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());

const logout = () => {
  logUserOut();
  router.push("/auth/login");
};
</script>
