<template>
  <v-card class="mx-auto">
    <v-img
      class="align-end text-white"
      height="200"
      :src="props.data.urlToImage"
      cover
    >
      <v-card-title>
        {{ props.data.title }}
      </v-card-title>
    </v-img>
    <v-card-subtitle class="pt-4">
      {{ props.data.description }}
    </v-card-subtitle>
    <v-card-text>
      <div>{{ props.data.content }}</div>
      <div class="pt-2">
        {{ new Date(props.data.publishedAt).toDateString() }}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="orange" @click="onExploreClick">Explore</v-btn>
      <v-btn color="orange" @click="onEditClick">Edit</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
import { Article } from "@interfaces";

interface Props {
  data: Article;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "onExplore"): void;
  (e: "onEdit"): void;
}>();

const onExploreClick = () => emit("onExplore");
const onEditClick = () => emit("onEdit");
</script>
