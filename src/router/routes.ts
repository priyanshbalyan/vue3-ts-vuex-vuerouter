import { RouteRecordRaw } from "vue-router";
import IndexPage from "@pages/IndexPage.vue";
import DetailPage from "@pages/DetailPage.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: IndexPage,
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: DetailPage,
  },
];

export default routes;
