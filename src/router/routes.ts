import { RouteRecordRaw } from "vue-router";
import Index from "@pages/Index.vue";
import Detail from "@pages/Detail.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: Index,
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: Detail,
  },
];

export default routes;
