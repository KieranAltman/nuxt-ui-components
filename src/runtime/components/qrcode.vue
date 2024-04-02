<template>
  <div ref="qrcodeContainer"></div>
</template>

<script setup lang="ts">
import EasyQrcode from "easyqrcodejs";
import { ref, onMounted } from "vue";

type QrcodeTags = "canvas" | "svg";

const props = withDefaults(
  defineProps<{ content: string; tag?: QrcodeTags; size?: number }>(),
  { tag: "canvas", size: 256 }
);

const qrcodeContainer = ref<HTMLElement>();
const renderQrcode = () => {
  if (!props.content || !qrcodeContainer.value) return;

  new EasyQrcode(qrcodeContainer.value, {
    text: props.content,
    width: props.size,
    height: props.size,
    drawer: props.tag,
  });
};

onMounted(() => {
  renderQrcode();
});
</script>
