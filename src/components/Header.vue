<template>
  <div class="Header">
    <div class="Header-body">
      <router-link to="/">
        Growler App
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',

  data: () => ({
  }),

  methods: {}
}
</script>

<style>
.Header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 60px;
  background-color: var(--color-black);
  color: var(--color-white);
  font-family: var(--font-family-primary);
}

.Header a {
  color: var(--color-white);
}

.Header-body {
  padding: 0 20px;
  font-size: 2rem;
  line-height: 1.8;
  text-align: center;
}
</style>
