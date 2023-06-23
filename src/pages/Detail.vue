<template>
  <v-layout>
    <AppBar />
    <v-main>
      <v-container fluid>
        <v-row dense>
          <v-col cols="12">
            <v-card color="#952175" theme="dark">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="text-h5"> {{ itemId }} </v-card-title>
                  <v-card-subtitle>Ellie Goulding</v-card-subtitle>
                  <v-card-actions>
                    <v-btn class="ms-2" icon="mdi-play" variant="text"></v-btn>
                  </v-card-actions>
                </div>
                <v-avatar class="ma-3" size="125" rounded="0">
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
                  ></v-img>
                </v-avatar>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { Source } from "@interfaces";
import { key } from "@store";
import { useStore } from "vuex";
import AppBar from "@components/AppBar.vue";
import { useRoute } from "vue-router";

const store = useStore(key);
const route = useRoute();

const itemId = computed<string | string[]>(() => route.params.id);

const sources = computed<string[]>(() => {
  return store.getters.getSources.map((source: Source) => source.name);
});
</script>
