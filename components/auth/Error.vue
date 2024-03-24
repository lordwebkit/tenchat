<script setup lang="ts">
import IconWarning from "~/components/icon/warning.vue";
const props = defineProps<{ message: string | undefined }>();
</script>
<template>
  <Transition>
    <div
      class="fixed top-10 left-1/2 z-30 -translate-x-1/2 border-2 rounded-lg bg-auth-left border-red-900 py-4 px-4 transition-all flex gap-4"
      v-if="props.message"
    >
      <IconWarning :color="'#7f1d1d'" />
      <p class="text-center text-red-900 text-[18px]">
        {{ props.message }}
      </p>
    </div>
  </Transition>
</template>
<style scoped>
.v-enter-from {
  top: -64px;
  opacity: 0;
}

.v-enter-active {
  transition: top 0.2s ease-in, opacity 0.5s ease-in;
}

.v-enter-to {
  top: 40px;
  opacity: 1;
}

.v-leave-from {
  top: 40px;
}

.v-leave-active {
  transition: top 0.2s ease-in;
}

.v-leave-to {
  top: -64px;
}
</style>
