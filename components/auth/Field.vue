<script setup lang="ts">
const props = defineProps<{
  placeholder: string;
  type?: string;
  value: string;
}>();

const emit = defineEmits<{ input: [value: string] }>();
</script>
<template>
  <label
    class="py-2 border-2 border-auth-element border-opacity-50 bg-auth-element bg-opacity-10 rounded-xl flex px-2 items-center focus-within:border-auth-element"
  >
    <slot name="left"></slot>
    <input
      :type="props.type ?? 'text'"
      :placeholder="props.placeholder"
      :value="props.value"
      @input="(e) => emit('input', (e.target as HTMLInputElement).value)"
      class="font-[Inter] text-[18px] p-2 bg-transparent flex-1 outline-none placeholder:text-[#2D31A6] placeholder:text-opacity-20"
      required
    />
    <slot name="right"></slot>
  </label>
</template>
