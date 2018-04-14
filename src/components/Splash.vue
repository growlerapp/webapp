<template>
  <div class="Splash">
    <div class="Splash-body">
      <h1>Growler App</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Splash',
}
</script>

<style>
.Splash {
  height: 100vh;
  display: grid;
  align-content: center;
  text-align: center;
  background-color: #f3f5e3;
}

.Splash-body {
  padding: 20px;
}

.Splash h1 {
  font-size: 4rem;
}
</style>
