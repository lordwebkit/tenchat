<script setup lang="ts">
import IconWarning from "~/components/icon/warning.vue";

const props = defineProps<{ warning: boolean }>();
const emit = defineEmits<{
  confirm: [];
  deny: [];
}>();
</script>
<template>
  <Transition>
    <div
      class="fixed top-10 left-1/2 z-30 -translate-x-1/2 border-2 rounded-lg bg-auth-left border-yellow-600 py-4 px-4 transition-all flex flex-col gap-4"
      v-if="props.warning"
    >
      <div class="flex gap-4">
        <IconWarning :color="'#ca8a04'" />
        <p class="text-center text-yellow-600 text-[18px]">
          Registration data may be lost. Stay on the page?
        </p>
      </div>
      <div class="flex justify-end gap-4">
        <button
          class="border px-6 py-2 rounded-lg bg-auth-right text-white active:bg-auth-element"
          @click="() => emit('confirm')"
        >
          Yes
        </button>
        <button
          class="border px-6 py-2 rounded-lg bg-gray-300 active:bg-gray-200"
          @click="() => emit('deny')"
        >
          No
        </button>
      </div>
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
