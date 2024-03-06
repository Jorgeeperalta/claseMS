<template>
  <v-app>
    <v-navigation-drawer expand-on-hover rail id="menu">
      <v-list density="compact">
        <v-list-item prepend-icon="mdi-home" title="Home" to="/"></v-list-item>

        <v-list-group v-for="(sistema, sisid) in menu" :key="sisid">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :prepend-icon="sistema.icono"
              :title="sistema.nombre"
            ></v-list-item>
          </template>
          <v-list-item
            v-for="(pantalla, i) in sistema.pantallas"
            :key="i"
            link
            @click="
              (pantallaSelecta = pantalla.name),
                (bloqueado = pantalla.bloqueado)
            "
            :to="
              $router.hasRoute(pantalla.name)
                ? {
                    name: pantalla.name,
                    params: {
                      pantalla: pantalla.name,
                      parametros: pantalla.parametros,
                    },
                  }
                : ''
            "
            :title="pantalla.nombre"
          ></v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <div
        class="loading-general"
        :class="globalData.isLoading ? 'activo' : ''"
      >
        <v-progress-circular
          :size="50"
          :width="5"
          color="#6a8bc3"
          indeterminate
        ></v-progress-circular>
      </div>
      <router-view
    /></v-main>
  </v-app>
</template>

<script>
import { useTheme } from "vuetify";
import { menuStore } from "./store/store";
import { globalData } from "@/main";

export default {
  name: "App",
  data: () => ({
    store: menuStore(),
    menu: [],
    globalData: globalData,
  }),
  async beforeCreate() {
    const theme = useTheme();
    localStorage.setItem("token", this.$route.query.t);
    let dm = 1;
    localStorage.setItem("dm", dm);
    theme.global.name.value = dm == 1 ? "dark" : "light";
  },
  async mounted() {
    const store = menuStore();
    console.log(store.color)
    if (this.menu.length == 0) await store.traerMenu();
    this.menu = menuStore().menu;
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
html,
body {
  font-family: "Roboto", sans-serif !important;
}
.loading-general {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  z-index: -5;
  transition: all 0.3s ease-in-out;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
}
.loading-general.activo {
  z-index: 999;
  opacity: 1;
}
#menu .v-list-item-title {
  letter-spacing: normal !important;
  font-size: 0.8125rem !important;
  font-weight: 500 !important;
}
#menu .v-list-item__spacer {
  width: 12px !important;
}
</style>
