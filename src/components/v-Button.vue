<template>
  <div class="v-Button" :class="[_type]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'v-Button',

  props: {
    type: {
      type: String
    }
  },

  computed: {
    _type () {
      return {
        'v-Button--alt': this.type === 'alt'
      }
    }
  }
}
</script>

<style>
.v-Button {
  font-family: var(--font-family-primary);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
  background-color: var(--color-red);
  color: var(--color-white);
  display: inline-block;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  line-height: 1.1;
}

.v-Button:hover {
  background-color: color(var(--color-red) l(60%));
}

.v-Button:active,
.v-Button:focus {
  background-color: color(var(--color-red) b(10%));
}

.v-Button--alt {
  background-color: var(--color-white);
  color: var(--color-red);
}

.v-Button--alt:hover {
  background-color: color(var(--color-red) l(90%));
}

.v-Button--alt:active,
.v-Button--alt:focus {
  background-color: color(var(--color-white) b(10%));
}
</style>
