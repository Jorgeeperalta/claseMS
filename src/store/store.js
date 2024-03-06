import { defineStore } from "pinia";

export const menuStore = defineStore("menu", {
  state: () => {
    return { menu: [], color:'red' };
  },

  actions: {
    async traerMenu() {
      console.log("entra");
      try {
        const response = await this.$ajax.post(
          `${this.$api}escritorio/traerMenuSistema`,
          {
            ruta: window.location.pathname.split("/")[1],
          }
        );
        this.menu = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
