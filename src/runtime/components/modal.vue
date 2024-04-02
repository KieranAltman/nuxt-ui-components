<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur bg-white/75 dark:bg-black/50 overflow-hidden"
        @click="onMaskClick"
      >
        <!-- panel -->
        <div class="w-full m-auto modal-panel" @click.stop>
          <slot name="panel">
            <div
              class="w-full max-w-96 mx-auto overflow-hidden rounded-3xl modal-panel-shadow bg-white text-black dark:bg-zinc-900 dark:text-white"
            >
              <!-- title -->
              <div class="relative flex min-h-10 items-center px-6 py-6">
                <h1 v-if="title" class="text-center text-lg font-semibold">
                  {{ title }}
                </h1>

                <!-- close button -->
                <button v-if="closable" class="absolute right-6" @click="close">
                  <Icon
                    name="mingcute:close-line"
                    class="!block text-xl transition hover:opacity-50"
                  />
                </button>
              </div>
              <!-- content -->
              <div class="relative overflow-hidden p-6 pt-0">
                <slot />
              </div>
            </div>
          </slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";

const props = withDefaults(
  defineProps<{
    show: boolean;
    title?: string;
    closable?: boolean;
    maskClosable?: boolean;
  }>(),
  { title: "" }
);
const showModal = defineModel("show");
const hasScrollBar = ref(true);

const toggleClass = () => {
  if (showModal.value) {
    document.body.style.setProperty("overflow", "hidden");
    if (hasScrollBar.value) {
      document.body.style.setProperty("padding-right", "15px");
    }
  } else {
    setTimeout(() => {
      document.body.style.cssText = "";
    }, 150);
  }
};
// 控制 body 滚动条显示 / 隐藏
onMounted(() => {
  hasScrollBar.value = document.body.scrollHeight > window.innerHeight;
  if (showModal.value) {
    toggleClass();
  }
});
onUnmounted(() => {
  toggleClass();
});
watch(
  () => props.show,
  () => {
    toggleClass();
  }
);
const close = () => {
  showModal.value = false;
};
const onMaskClick = () => {
  if (props.maskClosable) {
    close();
  }
};
</script>

<style>
.modal-panel-shadow {
  box-shadow: rgba(55, 65, 81, 0.15) 0px 8px 36px;
}

.modal-enter-from,
.modal-leave-to {
  @apply opacity-0;
}

.modal-enter-from .modal-panel {
  @apply scale-105 opacity-0 transform;
}

.modal-leave-to .modal-panel {
  @apply scale-105 opacity-0 transform;
}

.modal-enter-active,
.modal-leave-active {
  @apply transition-opacity duration-200 ease-in-out;
}
.modal-enter-active .modal-panel,
.modal-leave-active .modal-panel {
  @apply transition duration-200 ease-in-out;
}
</style>
