<template>
  <div
    class="Loading"
    :class="[_type]"></div>
</template>

<script>
export default {
  name: 'Loading',

  props: [
    'type'
  ],

  computed: {
    _type () {
      return {
        'Loading--top': this.type === 'top',
        'Loading--relative': this.type === 'relative',
        'Loading--left': this.type === 'left'
      }
    }
  }
}
</script>

<style scoped>
.Loading {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgeDE9IjI4LjE1NCUiIHkxPSI2My43NCUiIHgyPSI3NC42MjklIiB5Mj0iMTcuNzgzJSIgaWQ9ImEiPjxzdG9wIHN0b3AtY29sb3I9IiNDMUNCRDIiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjRkZGIiBzdG9wLW9wYWNpdHk9IjAiIG9mZnNldD0iMTAwJSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIpIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgc3Ryb2tlPSJ1cmwoI2EpIiBzdHJva2Utd2lkdGg9IjQiIGN4PSIxMCIgY3k9IjEyIiByPSIxMCIvPjxwYXRoIGQ9Ik0xMCAyQzQuNDc3IDIgMCA2LjQ3NyAwIDEyIiBzdHJva2U9IiNDMUNCRDIiIHN0cm9rZS13aWR0aD0iNCIvPjxyZWN0IGZpbGw9IiNDMUNCRDIiIHg9IjgiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiIHJ4PSI4Ii8+PC9nPjwvc3ZnPg==);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  animation-name: rotate-loading;
  animation-duration: 550ms;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  position: fixed;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  margin-left: -10px;
  top: 50%;
  left: 50%;
  z-index: 10;
}

.Loading--relative {
  position: relative;
  margin: 20px 0 0;
}

.Loading--left {
  position: relative;
  margin: 20px 0 0;
  left: auto;
}

.Loading--top {
  position: fixed;
  top: 20px;
  right: 20px;
  left: auto;
  margin: 0;
}

.is-loaded .Loading {
  display: none;
}

@keyframes rotate-loading {
  0% {
    transform:rotate(0);
  }
  100% {
    transform:rotate(360deg);
  }
}
</style>
