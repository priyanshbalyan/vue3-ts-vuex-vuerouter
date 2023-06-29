<template>
  <v-layout>
    <AppBar />
    <v-main>
      <v-container fluid>
        <v-row dense>
          <v-col cols="12" v-if="!!news">
            <v-card class="mx-auto" max-width="500">
              <v-img :src="news.urlToImage" cover></v-img>

              <v-card-title>
                {{ news.title }}
              </v-card-title>

              <v-card-subtitle>
                {{ news.description }}
                <br />
              </v-card-subtitle>

              <v-card-actions>
                <a :href="news.url">
                  <v-btn color="orange-lighten-2" variant="text">
                    Explore
                  </v-btn>
                </a>
                <v-spacer></v-spacer>

                <v-btn icon="mdi-chevron-up"></v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="true">
                  <v-divider></v-divider>

                  <v-card-text>
                    {{ news.content }}
                    <br /><br />
                    {{ news.source.name }}, Published
                    {{ new Date(news.publishedAt).toDateString() }}
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>
<script setup lang="ts">
import { computed, onMounted } from "vue";
import { Article } from "@interfaces";
import { key } from "@store";
import { useStore } from "vuex";
import AppBar from "@components/AppBar.vue";
import { useRoute, useRouter } from "vue-router";
import { UPDATE_VISITED } from "@store/events";

const store = useStore(key);
const route = useRoute();
const router = useRouter();

const itemId = computed<string>(() => route.params.id as string);

const news = computed<Article | null>(() => {
  if (itemId.value) return store.getters.getNews[itemId.value];
  return null;
});

onMounted(() => {
  if (!news.value) router.push("/");
  else {
    store.dispatch(UPDATE_VISITED, {
      title: news.value?.title,
      link: itemId.value,
    });
  }
});
</script>
