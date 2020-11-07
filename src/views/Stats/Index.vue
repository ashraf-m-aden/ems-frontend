<template>
  <div>
    <div class="wrapper-title">
      {{title}}
    </div>
    <v-card height="350px" class="card">
      <div class="data">
        <EMS :data="data" :labels="label" :title="title"></EMS>
      </div>
      <div class="drawer">
        <h3 class="title"></h3>
        <div class="menu">
          <ul class="list-group">
            <li class="list-group-item" @click="getYear">Année</li>
            <li class="list-group-item">
              <div class="dropdown">
                <span
                  class="dropdown-toggle"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Mois
                </span>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <ul class="list-group">
                    <li
                      @click="getMonth(item)"
                      class="list-group-item month"
                      v-for="(item, index) in mois"
                      :key="index"
                    >
                      {{ item.name }}
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import EMS from './Ems'
import stats from '../../services/stats'
export default {
  components: {
    EMS
  },
  data () {
    return {
      mois: [
        { id: '1', name: 'Janvier' },
        { id: '2', name: 'Fevrier' },
        { id: '3', name: 'Mars' },
        { id: '4', name: 'Avril' },
        { id: '5', name: 'Mai' },
        { id: '6', name: 'Juin' },
        { id: '7', name: 'Juillet' },
        { id: '8', name: 'Aout' },
        { id: '9', name: 'Septembre' },
        { id: '10', name: 'Octobre' },
        { id: '11', name: 'Novembre' },
        { id: '0', name: 'Decembre' }
      ],
      data: [
        {
          name: 'EMS',
          chartType: 'bar',
          values: []
        },
        {
          name: 'EXPRESS',
          chartType: 'bar',
          values: []
        },
        {
          name: 'LETTRES',
          chartType: 'bar',
          values: []
        }
      ],
      label: [],
      title: ''
    }
  },
  methods: {

    getYear () {
      this.title = "L'année " + new Date().getFullYear()

      stats.getEmsStatsYear().then(result => {
        this.sortYear(result.data)
      })
    },
    getMonth (month) {
      this.title = 'Les chiffres du mois de ' + month.name
      if (parseInt(month.id) < 10) {
        stats.getEmsStatsMonth('0' + month.id).then(result => {
          this.sortMonth(month.id, result.data)
        })
      } else {
        stats.getEmsStatsMonth(month.id).then(result => {
          this.sortMonth(month.id, result.data)
        })
      }
    },

    async sortYear (array) {
      this.label = [
        'Janvier',
        'Fevrier',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Aout',
        'Septembre',
        'Octobre',
        'Novembre',
        'Decembre'
      ]

      var ems = array.filter(x => {
        return x.type === 1
      })
      var express = array.filter(x => {
        return x.type === 2
      })
      await ems.forEach(element => {
        this.data[0].values[new Date(element.month).getMonth()] = element.total
      })
      await express.forEach(element => {
        this.data[1].values[new Date(element.month).getMonth()] = element.total
      })
      for (let index = 0; index < 12; index++) {
        if (this.data[0].values[index] === undefined) {
          this.data[0].values[index] = 0
        }
      }
      for (let index = 0; index < 12; index++) {
        if (this.data[1].values[index] === undefined) {
          this.data[1].values[index] = 0
        }
      }
    },
    async sortMonth (id, array) {
      const year = new Date().getFullYear()
      var lastdate = new Date(year, id, 0)
      var numberofdays = new Date(lastdate).getDate()
      this.label = []
      this.data[0].values = []
      this.data[1].values = []
      this.data[2].values = []
      for (let index = 1; index <= numberofdays; index++) {
        this.label.push(index)
      }
      var ems = array.filter(x => {
        return x.type === 1
      })
      var express = array.filter(x => {
        return x.type === 2
      })
      await ems.forEach(element => {
        this.data[0].values[new Date(element.date).getDate() - 1] =
          element.total
      })
      await express.forEach(element => {
        this.data[1].values[new Date(element.date).getDate() - 1] =
          element.total
      })
      for (let index = 0; index < numberofdays; index++) {
        if (this.data[0].values[index] === undefined) {
          this.data[0].values[index] = 0
        }
      }
      for (let index = 0; index < numberofdays; index++) {
        if (this.data[1].values[index] === undefined) {
          this.data[1].values[index] = 0
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../sass/main.scss";
.wrapper-title {
  font-family: quick;
  font-size: 2rem;
  margin-top: 2rem;

}
.card {
  margin-top: 5rem;
  display: flex;
  width: 100%;
  flex-direction: row;
  .data {
    width: 80%;
  }
  .drawer {
    width: 20%;
    .title {
      font-size: 2rem;
      font-family: quick;
      margin-bottom: 5rem;
    }
    .list-group {
      list-style: none;
    }
    .list-group-item {
      border: none;
      list-style: none;
      font-size: 2rem;
      font-family: quick;
      padding: 1rem 0 1rem 0;
      cursor: pointer;

      &:hover {
        color: white;
        background: #2a3b4d;
      }
    }
    .dropdown-toggle {
      &::after {
        display: none;
      }
    }
    .month {
      border: none;
      list-style: none;
      font-size: 1rem;
      font-family: quick;
      margin: 0;
      margin-bottom: 0;
    }
  }
}
</style>
