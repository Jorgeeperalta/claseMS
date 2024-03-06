<template>
  <main>
    <v-toolbar color="#6a8bc3" extended flat></v-toolbar>
    <v-card class="mx-auto" max-width="700" style="margin-top: -70px">
      <v-toolbar flat style="padding: 0 20px">
        <p class="font-weight-bold font-italic">Filtro de Búsqueda:</p>
        <v-radio-group v-model="checkbusqueda" inline hide-details>
          <v-radio label="Potencia" value="potencia"></v-radio>
          <v-radio label="Articulos" value="articulos"></v-radio>
          <v-radio label="Ventas" value="ventas"></v-radio>
        </v-radio-group>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text style="padding: 0 20px">
        <v-row class="align-center">
          <v-col
            style="align-content: center"
            cols="9"
            v-if="checkbusqueda == 'potencia'"
          >
            <br />
            <v-row>
              <v-col md="8">
                <v-text-field
                  label="Enter value here"
                  variant="outlined"
                  single-line
                  v-model="numeroPotencia"
                ></v-text-field>
              </v-col>
              <v-col md="4"
                ><v-btn
                  class="text-none mb-4"
                  color="indigo-darken-3"
                  size="x-large"
                  block
                  variant="outlined"
                  @click="calcular"
                  >Calcular</v-btn
                ></v-col
              >
            </v-row>
            Resultado: {{ resultado }}
          </v-col>
          <v-col cols="9" v-if="checkbusqueda == 'articulos'">
            <v-row>
              <v-col md="4">
                <v-text-field
                  label="Nombre"
                  variant="outlined"
                  single-line
                  v-model="nombre"
                ></v-text-field>
              </v-col>
              <v-col md="4">
                <v-text-field
                  label="Precio"
                  variant="outlined"
                  single-line
                  v-model="precio"
                ></v-text-field>
              </v-col>
              <v-col md="4"
                ><v-btn
                  class="text-none mb-4"
                  color="indigo-darken-3"
                  size="x-large"
                  block
                  variant="outlined"
                  @click="agregar"
                  >Agregar</v-btn
                ></v-col
              >
            </v-row>
            {{ resultado }}
          </v-col>
          <v-col cols="9" v-if="checkbusqueda == 'ventas'">
            <v-row>
              <v-col md="4">
                <v-autocomplete
                  v-model="values"
                  :items="articulos"
                  item-title="nombre"
                  item-value="id"
                  density="comfortable"
                  label="Comfortable"
                ></v-autocomplete>
              </v-col>
              <v-col md="4">
                <v-text-field
                  placeholder="Cantidad"
                  v-model="cantidad"
                ></v-text-field>
              </v-col>
              <v-col md="4">
                <v-btn @click="agregarProducto">Agregar</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="4">
                <div v-for="product in carritoLleno" :key="product">
                  <v-row>
                    <v-col md="2"> {{ product.cantidad }} </v-col>
                    <v-col md="3">{{ product.nombre }} </v-col>
                    <v-col md="3">{{ product.subtotal }} </v-col>
                    <v-col md="4"
                      ><v-btn @click=" eliminaProducto(product.id)" variant="outlined"
                        >elimina</v-btn
                      ></v-col
                    >
                  </v-row>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- <v-col cols="12">
      <v-data-table
        items-per-page="10"
        :headers="headers"
        :items="desserts"
        item-value="name"
        class="elevation-1"
      >
      <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Tabla</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" dark class="mb-2" v-bind="props">
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Dessert name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.calories"
                      label="Calories"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.fat"
                      label="Fat (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.carbs"
                      label="Carbs (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.protein"
                      label="Protein (g)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon size="small" class="me-2" @click="editItem(item.raw)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item.raw)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
    </v-data-table>
    </v-col> -->
  </main>
</template>
<script>
import recurso from "../recursos/recursos.js";
export default {
  components: {},
  data: () => ({
    cantidad: 0,
    carrito: [],
    carritoLleno: null,
    values: [],
    resultado: [],
    numeroPotencia: 0,
    operaciones: recurso,
    checkbusqueda: "",
    dialog: false,
    dialogDelete: false,
    nombre: "",
    precio: "",
    headers: [
      {
        text: "Dessert (100g serving)",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Calories", value: "calories" },
      { text: "Fat (g)", value: "fat" },
      { text: "Carbs (g)", value: "carbs" },
      { text: "Protein (g)", value: "protein" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    idArticulo: 0,
    articulos: [],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    eliminaProducto (pk){
      alert(pk)
          this.carritoLleno = this.operaciones.eliminarProductoDeCarrito(pk,this.carritoLleno)
    },
    agregarProducto() {
      this.carritoLleno = this.operaciones.carritoAgrega(
        this.cantidad,
        this.values,
        this.carrito
      );
      console.log(this.carritoLleno);
    },
    agregar() {
      this.idArticulo += 1;
      this.resultado = this.operaciones.guardaArticulos(
        this.nombre,
        this.precio,
        this.articulos,
        this.idArticulo
      );
    },
    calcular() {
      switch (this.checkbusqueda) {
        case "potencia":
          this.resultado = this.operaciones.potencia(this.numeroPotencia);
          console.log(this.resultado);
          break;
      }
    },
    initialize() {
      this.desserts = [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>