<template>
  <div class="all">
    <div class="all-data">
      <h2 class="title">{{ title }}</h2>
      <div class="all-data-table">
        <table>
          <tr>
            <th><img src="../../assets/ems.jpg" width="100" alt="" /></th>
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
            <td>{{ ems.from.name }}</td>
            <td>{{ ems.to.name }}</td>
            <td>{{ ems.to.country }}</td>
            <td>{{ ems.to.price }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="all-calendar">
      <v-date-picker
        v-model="date"
        class="mt-4"
        :max="max"
        @change="chooseDate"
      ></v-date-picker>
    </div>
  </div>
</template>

<script>
import ems from '../../services/ems'
export default {
  data: () => ({
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
  methods: {
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
  }
}
</style>
