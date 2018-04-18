<template>
  <div class="Header">
    <div class="Header-body">
      <div class="Header-icon">
        <svg version="1.1" x="0px" y="0px"
          width="48px" height="48px" viewBox="0 0 48 48" enable-background="new 0 0 48 48" xml:space="preserve">
          <rect x="2" y="22" width="44" height="4"/>
          <rect x="2" y="8" width="44" height="4"/>
          <rect x="2" y="36" width="44" height="4"/>
        </svg>
      </div>
      <div class="Header-logo">
        <router-link to="/">
          Growler App
        </router-link>
      </div>
      <div class="Header-right">
        <div
          class="Header-btn"
          v-if="$route.name === 'Store'"
          @click="$router.push({ path: '/' })"
        >
          <svg version="1.1" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
            <polygon points="17,0.586 5.586,12 17,23.414 18.414,22 8.414,12 18.414,2 "/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.Header-icon {
  text-align: left;
}

.Header-icon svg {
  vertical-align: middle;
  max-width: 40px;
  fill: var(--color-yellow);
  cursor: pointer;
}

.Header-logo {
  align-self: flex-end;
}

.Header-right {
  text-align: right;
}

.Header-btn {
  background-color: var(--color-yellow);
  color: var(--color-white);
  padding: 4px;
  width: 30px;
  height: 30px;
  line-height: 1;
  text-align: center;
  display: inline-block;
  border-radius: 2px;
  cursor: pointer;
}

.Header-btn svg {
  fill: #fff;
  width: 20px;
}
</style>
