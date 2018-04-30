<template>
  <div class="Splash">
    <div class="Splash-body">
      <h1>Growler App</h1>
      <div class="Splash-loading" :class="{'is-loading': loading}">
        <h2>Cargando y obteniendo tu ubicación...</h2>
        <h2 v-show="isGeoError">Debes dar permisos para localizar tu mejor growler</h2>
      </div>
      <loading type="top"/>
    </div>
  </div>
</template>

<script>
import user from '~/src/user'
import Loading from '~/src/components/Loading'

export default {
  name: 'Splash',

  components: {
    Loading
  },

  data: () => ({
    loading: false,
    isGeoError: false,
  }),

  mounted() {
    setTimeout(() => {
      this.loading = true
    }, 600)

    if (user.getUserData()) {
      this.$router.push('home')
    }
  },
}
</script>

<style scoped>
.Splash-loading {
  opacity: 0;
  visibility: hidden;
  transition: all .3s .3s ease;
  transform: translateY(-10px);
}

.Splash .is-loading {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.Splash-body {
  padding: 0 20px;
  text-align: center;
  height: calc(100vh - 200px);
  display: grid;
  align-content: center;
  text-align: center;
  background-color: #f3f5e3;
}

.Splash h1 {
  font-size: 4rem;
}

.Splash h2 {
  font-size: 1rem;
  font-family: var(--font-family-normal);
  font-weight: lighter;
}
</style>
