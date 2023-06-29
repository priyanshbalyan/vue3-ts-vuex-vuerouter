<template>
  <v-dialog v-model="open" fullScreen>
    <v-card>
      <v-card-text>
        <v-textarea
          label="New Title"
          v-model="editTitle"
          :rules="[counter]"
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-btn color="warning" block @click="editHeadline">
          Edit Headline
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { key } from "@store";
import { useStore } from "vuex";
import { UPDATE_HEADLINE } from "@store/events";

interface Props {
  item: string;
}

const MAX_LENGTH = 255;

const props = defineProps<Props>();
const emit = defineEmits<{ (e: "close"): void }>();

const store = useStore(key);

const open = computed<boolean>(() => !!props.item);
const editTitle = ref("");

const editHeadline = () => {
  if (editTitle.value.length <= MAX_LENGTH) {
    store.dispatch(UPDATE_HEADLINE, {
      text: props.item,
      newText: editTitle.value,
    });
    emit("close");
  }
};

const counter = (value) =>
  value.length <= MAX_LENGTH || `Max ${MAX_LENGTH} characters`;

watch(
  () => props.item,
  () => (editTitle.value = props.item)
);
</script>
