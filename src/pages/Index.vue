<template>
  <v-layout>
    <AppBar />
    <v-main>
      <v-container fluid>
        <v-row dense>
          <v-col cols="6">
            <v-text-field
              density="compact"
              variant="solo"
              label="Search"
              append-inner-icon="mdi-magnify"
              single-line
              hide-details
              v-model="searchText"
              @input="onInput"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-select
              clearable
              label="Select Source"
              variant="solo"
              single-line
              density="compact"
              :items="sources"
              v-model="selectedFilter"
            ></v-select>
          </v-col>
        </v-row>
        <v-row dense class="ml-1 mr-1">
          <v-btn block @click="onApiCall" class="mb-4">Wrong api call</v-btn>
        </v-row>
        <v-row dense>
          <v-col
            v-if="selectedFilter && getNews.length === 0"
            cols="12"
            class="text-center"
          >
            No news available from selected source
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12" v-if="isLoading">
            <v-progress-linear indeterminate color="green"></v-progress-linear>
          </v-col>
          <v-col
            v-else
            v-if="!isLoading"
            v-for="news in getNews"
            :key="news.url"
            cols="6"
          >
            <Card
              :data="news"
              @onExplore="onCardExplore"
              @onEdit="onCardEdit(news)"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Dialog />
    <EditDialog :item="selectedItem" @close="onEditClose" />
  </v-layout>
</template>
<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { FETCH_NEWS, FETCH_SOURCES, FETCH_WRONG_CALL } from "@store/events";
import { key } from "@store";
import { useStore } from "vuex";
import Card from "@components/Card.vue";
import Dialog from "@components/Dialog.vue";
import EditDialog from "@components/EditDialog.vue";
import AppBar from "@components/AppBar.vue";
import { Source, Article } from "@interfaces";
import { useRouter } from "vue-router";

const store = useStore(key);
const router = useRouter();

const searchText = ref<string>("");
const selectedFilter = ref<string | null>(null);
const selectedItem = ref<string>("");

const getNews = computed<Article[]>(() => {
  if (selectedFilter.value) {
    return store.getters.getNews.filter(
      (article: Article) => article.source.name === selectedFilter.value
    );
  }
  return store.getters.getNews;
});
const sources = computed<string[]>(() => {
  return store.getters.getSources.map((source: Source) => source.name);
});
const isLoading = computed<boolean>(() => {
  return store.getters.getLoading;
});

const onCardExplore = () => {
  router.push({ name: "detail", params: { id: "1" } });
};

const onInput = () => {
  store.dispatch(FETCH_NEWS, searchText.value);
};

const onApiCall = () => {
  store.dispatch(FETCH_WRONG_CALL);
};

const onCardEdit = (news: Article) => {
  selectedItem.value = news.title;
};

const onEditClose = () => {
  selectedItem.value = "";
};

onMounted(() => {
  store.dispatch(FETCH_NEWS);
  store.dispatch(FETCH_SOURCES);
});
</script>
