<template>
  <canvas ref="sandbox"></canvas>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { Application } from "@splinetool/runtime";

const props = defineProps<{ path: string }>();
const emit = defineEmits<{ loaded: [] }>();

const sandbox = ref<HTMLCanvasElement>();
const loadSandbox = async () => {
  if (!sandbox.value || props.path === "") return;

  const spline = new Application(sandbox.value);
  spline.load(props.path);
  emit("loaded");
};
onMounted(loadSandbox);
watch(() => props.path, loadSandbox);
</script>
