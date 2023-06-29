<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <div v-if="props.links.length">
    <v-list density="compact">
      <v-list-subheader>Visited</v-list-subheader>
      <v-list-item
        v-for="(item, i) in props.links"
        :key="i"
        :value="item"
        color="primary"
      >
        <router-link :to="`/detail/${item.link}`">
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </router-link>
      </v-list-item>
    </v-list>
  </div>
</template>
<script setup lang="ts">
import { VisitedLink } from "@interfaces";

interface Props {
  links: VisitedLink[];
}

const props = defineProps<Props>();
</script>
