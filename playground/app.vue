<template>
  <div>
    Nuxt module playground!
    <p v-for="i in 20" :key="i">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
      laboriosam tenetur non quisquam maiores sint doloremque totam mollitia
      numquam repellat? Inventore culpa, eius et aperiam molestias
      exercitationem non sit a.
    </p>

    <Qrcode content="hello world." :size="180" tag="svg" />

    <button @click="showModal = true">Show Modal</button>

    <Modal
      v-model:show="showModal"
      closable
      mask-closable
      title="Select Wallet"
    >
      <p v-for="i in 2" :key="i">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
        laboriosam tenetur non quisquam maiores sint doloremque totam mollitia
        numquam repellat? Inventore culpa, eius et aperiam molestias
        exercitationem non sit a.
      </p>
    </Modal>
  </div>
</template>

<script setup lang="ts">
const showModal = ref(false);
</script>
