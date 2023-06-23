<template>
  <div>
    <v-dialog v-model="dialogText" width="auto">
      <v-card>
        <v-card-text>
          {{ dialogText }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="warning" block @click="closeDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { key } from "@store";
import { useStore } from "vuex";
import { CLEAR_ERROR } from "@store/events";

const store = useStore(key);

const dialogText = computed<string>(() => {
  return store.getters.getError;
});

const closeDialog = () => {
  store.dispatch(CLEAR_ERROR);
};
</script>
