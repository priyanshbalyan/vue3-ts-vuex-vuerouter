<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <v-layout>
    <AppBar />
    <v-main>
      <v-container fluid>
        <v-row dense>
          <v-col sm="4" cols="12">
            <v-text-field
              variant="outlined"
              rounded="xl"
              density="compact"
              label="Search"
              append-inner-icon="mdi-magnify"
              single-line
              hide-details
              v-model="searchText"
              @input="onInput"
            ></v-text-field>
          </v-col>
          <v-col sm="4" cols="12">
            <v-select
              variant="outlined"
              rounded="xl"
              clearable
              label="Select Source"
              single-line
              density="compact"
              :items="sources"
              v-model="selectedFilter"
            >
            </v-select>
          </v-col>
          <v-col sm="4" cols="12">
            <v-btn variant="outlined" size="large" block @click="onApiCall">
              Wrong api call
            </v-btn>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <VisitedLinks :links="visited" />
          </v-col>
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
            v-for="(news, index) in getNews"
            :key="news.url"
            lg="3"
            md="4"
            sm="6"
          >
            <CardComponent
              :data="news"
              :index="index"
              @onEdit="onCardEdit(news)"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <DialogComponent />
    <EditDialog :item="selectedItem" @close="onEditClose" />
  </v-layout>
</template>
<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { FETCH_NEWS, FETCH_SOURCES, FETCH_WRONG_CALL } from "@store/events";
import { key } from "@store";
import { useStore } from "vuex";
import CardComponent from "@components/CardComponent.vue";
import DialogComponent from "@components/DialogComponent.vue";
import EditDialog from "@components/EditDialog.vue";
import AppBar from "@components/AppBar.vue";
import { Source, Article, VisitedLink } from "@interfaces";
import VisitedLinks from "@components/VisitedLinks.vue";

const store = useStore(key);

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
const visited = computed<VisitedLink[]>(() => {
  return store.getters.getVisited;
});
const sources = computed<string[]>(() => {
  return store.getters.getSources.map((source: Source) => source.name);
});
const isLoading = computed<boolean>(() => {
  return store.getters.getLoading;
});

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
  if (!sources.value.length) {
    store.dispatch(FETCH_SOURCES);
  }
  if (!getNews.value.length) {
    store.dispatch(FETCH_NEWS);
  }
});
</script>
