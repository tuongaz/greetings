<template>
  <label>{{ label }}</label>
  <input
    :placeholder="label"
    class="field"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    label: {
      required: true,
      type: String
    },
    modelValue: {
      type: [String, Number],
      default: ''
    }
  }
});
</script>
