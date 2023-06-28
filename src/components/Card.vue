<template>
  <v-card class="mx-auto">
    <v-img
      class="align-end text-white"
      height="300"
      :src="props.data.urlToImage"
      cover
    >
      <v-card-title class="normal-white-space translucent">
        <div class="banner">
          {{ props.data.title }}
        </div>
        <div>
          <v-btn
            color="purple"
            @click="onEditClick"
            class="ma-2"
            icon="mdi-square-edit-outline"
          ></v-btn>
          <router-link :to="`/detail/${props.index}`">
            <v-btn color="blue" class="ma-2" icon="mdi-arrow-right"></v-btn>
          </router-link>
        </div>
      </v-card-title>
    </v-img>
  </v-card>
</template>
<script setup lang="ts">
import { Article } from "@interfaces";

interface Props {
  data: Article;
  index: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "onEdit"): void;
}>();

const onEditClick = () => emit("onEdit");
</script>
