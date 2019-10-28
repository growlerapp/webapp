<template>
  <div class="Logo">
    <div class="Logo-body">
      <div class="Logo-icon">
        <router-link to="/">
          <img src="/img/img-logo-white.svg" alt="growlerapp">
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Logo'
}
</script>

<style>
.Logo {
  text-align: center;
}

.Logo-icon img {
  max-width: 120px;
  display: inline-block;
}
</style>
