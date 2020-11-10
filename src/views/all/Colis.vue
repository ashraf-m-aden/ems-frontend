<template>
  <div class="all">
    <div class="all-data">
      <h2 class="title">{{ title }}</h2>
      <!-- <div class="all-data-table">
        <table>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Expediteur</th>
            <th>Destinataire</th>
            <th>Pays</th>
            <th>Prix</th>
          </tr>
          <tr
            v-for="(ems, index) in colis"
            :key="index"
            class="data"
            @click="go(ems)"
          >
            <td>{{ index + 1 }}</td>
            <td>
              <img
                v-if="ems.type === 1"
                src="../../assets/ems.jpg"
                alt=""
                width="50"
              />
              <img
                v-if="ems.type === 2"
                src="../../assets/de.png"
                alt=""
                width="50"
              />
              <img
                v-if="ems.type === 3"
                src="../../assets/courrier.jpg"
                alt=""
                width="50"
              />
            </td>
            <td>{{ ems.from.name }}</td>
            <td>{{ ems.to.name }}</td>
            <td>{{ ems.to.country }}</td>
            <td>{{ ems.to.price }}</td>
          </tr>
        </table>
      </div> -->
      <div class="all-data-table" data-app>
        <v-container fluid>
          <v-data-iterator
            :items="colis"
            :items-per-page.sync="itemsPerPage"
            :page="page"
            :search="search"
            :sort-by="sortBy.toLowerCase()"
            :sort-desc="sortDesc"
            hide-default-footer
          >
            <template v-slot:default="props">
              <table>
                <tr>
                  <th>#</th>
                  <th>Type</th>
                  <th>Expediteur</th>
                  <th>Destinataire</th>
                  <th>Pays</th>
                  <th>Prix</th>
                </tr>
                <tr
                  v-for="(ems, index) in props.items"
                  :key="index"
                  class="data"
                  @click="go(ems)"
                >
                  <td>{{ index + 1 }}</td>
                  <td>
                    <img
                      v-if="ems.type === 1"
                      src="../../assets/ems.jpg"
                      alt=""
                      width="50"
                    />
                    <img
                      v-if="ems.type === 2"
                      src="../../assets/de.png"
                      alt=""
                      width="50"
                    />
                    <img
                      v-if="ems.type === 3"
                      src="../../assets/courrier.jpg"
                      alt=""
                      width="50"
                    />
                  </td>
                  <td>{{ ems.from.name }}</td>
                  <td>{{ ems.to.name }}</td>
                  <td>{{ ems.to.country }}</td>
                  <td>{{ ems.to.price }}</td>
                </tr>
              </table>
            </template>

            <!-- <template v-slot:footer>
              <v-row class="mt-2" align="center" justify="center">
                <span class="grey--text">Items per page</span>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      dark
                      text
                      color="primary"
                      class="ml-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      {{ itemsPerPage }}
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(number, index) in itemsPerPageArray"
                      :key="index"
                      @click="updateItemsPerPage(number)"
                    >
                      <v-list-item-title>{{ number }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>

                <v-spacer></v-spacer>

                <span
                  class="mr-4
            grey--text"
                >
                  Page {{ page }} of {{ numberOfPages }}
                </span>
                <v-btn
                  fab
                  dark
                  color="blue darken-3"
                  class="mr-1"
                  @click="formerPage"
                >
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn
                  fab
                  dark
                  color="blue darken-3"
                  class="ml-1"
                  @click="nextPage"
                >
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-row>
            </template> -->
            <template v-slot:footer>
              <div class="table-footer" >
                <div>
                  <span class="table-footer-entree">Nombre d'entrée</span>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      dark
                      text
                      color="primary"
                      class="ml-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      {{ itemsPerPage }}
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(number, index) in itemsPerPageArray"
                      :key="index"
                      @click="updateItemsPerPage(number)"
                    >
                      <v-list-item-title>{{ number }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                </div>
                <div><span
                  class="mr-4
            grey--text"
                >
                  Page {{ page }} / {{ numberOfPages }}
                </span>
                <v-btn
                small
                  fab
                  dark
                  color="#E6EE9C"
                  class="mr-1"
                  @click="formerPage"
                >
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn small
                  fab
                  dark
                  color="#E6EE9C"
                  class="ml-1"
                  @click="nextPage"
                >
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn></div>
              </div>
            </template>
          </v-data-iterator>
        </v-container>
      </div>
    </div>
    <div class="all-calendar">
        <v-row justify="center">

      <v-date-picker
        v-model="date"
        class="mt-4"
        :max="max"
        @change="chooseDate"
              color="#2A3B4D"
      header-color="#1A237E"       year-icon="mdi-calendar-blank"
      prev-icon="mdi-skip-previous"
      next-icon="mdi-skip-next"
      ></v-date-picker>
        </v-row>
    </div>
  </div>
</template>

<script>
import ems from '../../services/ems'
export default {
  data: () => ({
    itemsPerPageArray: [4, 8, 12],
    search: '',
    filter: {},
    sortDesc: false,
    page: 1,
    itemsPerPage: 4,
    sortBy: 'name',
    date:
      new Date().getDate() < 10
        ? new Date().getFullYear() +
          '-' +
          (new Date().getMonth() + 1) +
          '-0' +
          new Date().getDate()
        : new Date().getFullYear() +
          '-' +
          (new Date().getMonth() + 1) +
          '-' +
          new Date().getDate(),
    max:
      new Date().getFullYear() +
      '-' +
      (new Date().getMonth() + 1) +
      '-' +
      new Date().getDate(),
    title: "aujourd'hui",
    colis: []
  }),
  mounted () {
    ems.getAllEms({ date: this.date }).then(ems => {
      this.colis = ems.data
    })
  },
  computed: {
    numberOfPages () {
      return Math.ceil(this.colis.length / this.itemsPerPage)
    }
  },
  methods: {
    nextPage () {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage () {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage (number) {
      this.itemsPerPage = number
    },
    chooseDate (event) {
      this.title = event
      if (new Date() === new Date(event)) {
      }
      ems.getAllEms({ date: this.date }).then(ems => {
        this.colis = ems.data
      })
    },
    go (ems) {
      if (ems.type === 2) {
        this.$router.push({ path: '/express-review', query: { id: ems._id } })
      } else {
        this.$router.push({ path: '/review', query: { id: ems._id } })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../sass/main.scss";

.all {
  display: flex;
  max-width: 100%;
  min-width: 100%;

  &-data {
    width: 80%;
    border: solid black 1px;
    padding: 3rem 0 1rem 1rem;
    .title {
      font-size: 2rem;
      text-transform: uppercase;
      font-family: "quick";
    }

    &-table {
      font-family: quick;
      font-size: 1.5rem;
      .data {
        &:hover {
          background: #263238;
          color: white;
        }
      }
      td {
        cursor: pointer;
        padding: 1rem 1rem 1rem 1rem;
      }
      th {
        padding: 1rem 1rem 1rem 1rem;
      }
    }
  }
  &-calendar {
    border: solid black 1px;
    border-left: none;
  }
}
.table-footer {
  border-top: solid 1px $color-dark-grey;
  padding-top: 2rem;
  display: flex;
  justify-content: space-around;
}
</style>
