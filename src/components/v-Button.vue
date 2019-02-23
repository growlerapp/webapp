<template>
  <button class="v-Button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'v-Button'
}
</script>

<style>
.v-Button {
  font-family: var(--font-family-primary);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
  background-color: var(--color-red);
  display: inline-block;
  padding: 10px 20px;
  border-radius: 20px;
  color: var(--color-white);
  cursor: pointer;
}

.v-Button:hover {
  background-color: color(var(--color-red) l(60%));
}

.v-Button:active,
.v-Button:focus {
  background-color: color(var(--color-red) b(10%));
}
</style>
