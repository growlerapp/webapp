<template>
  <div class="StoreItem">
    <div class="StoreItem-body">
      <div class="StoreItem-meta">
        <div class="StoreItem-meta StoreItem-meta--left">
          <router-link :to="{ name: 'Store', params: { id: id }}">
            <h3 class="StoreItem-meta-name" v-text="name"></h3>
          </router-link>
          <div class="StoreItem-meta-address" v-text="address"></div>
        </div>

        <div class="StoreItem-meta StoreItem-meta--right">
          <div class="Store-meta-distance">
            2 kms.
          </div>

          <div class="StoreItem-action">
            <router-link
              :to="{ name: 'Store', params: { id: id }}"
              class="StoreItem-btn"
            >
              <svg version="1.1" x="0px" y="0px"
                width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
              <path d="M23,9h-8V1c0-0.553-0.447-1-1-1h-4C9.447,0,9,0.447,9,1v8H1c-0.553,0-1,0.447-1,1v4c0,0.553,0.447,1,1,1h8v8
                c0,0.553,0.447,1,1,1h4c0.553,0,1-0.447,1-1v-8h8c0.553,0,1-0.447,1-1v-4C24,9.447,23.553,9,23,9z"/>
              </svg>
            </router-link>

            <div class="StoreItem-btn">
              <svg version="1.1" x="0px" y="0px"
                width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
              <path d="M12,0C7.6,0,3,3.4,3,9c0,5.3,8,13.4,8.3,13.7c0.2,0.2,0.4,0.3,0.7,0.3s0.5-0.1,0.7-0.3C13,22.4,21,14.3,21,9
                C21,3.4,16.4,0,12,0z M12,12c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S13.7,12,12,12z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StoreItem',

  props: [
    'id',
    'name',
    'address',
    'distance',
  ],

  data: () => ({
  }),

  methods: {}
}
</script>

<style>
.StoreItem {
  padding: 20px 0;
  border-bottom: 1px solid var(--color-yellow);
}

.StoreItem a {
  color: inherit;
}

.StoreItem:last-child {
  border: 0;
}

.StoreItem-body > .StoreItem-meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1em;
}

.StoreItem-meta--right {
  text-align: right;
  margin-top: 10px;
}

.StoreItem-meta-name {
  font-size: 1.8rem;
  margin-bottom: 10px;
  margin-top: 0;
}

.StoreItem-action {
  margin-top: 60px;
}

.StoreItem-btn {
  background-color: var(--color-yellow);
  color: var(--color-white);
  padding: 4px;
  width: 30px;
  height: 30px;
  line-height: 3.2;
  text-align: center;
  display: inline-block;
  border-radius: 2px;
}

.StoreItem-btn svg {
  fill: #fff;
  width: 20px;
}
</style>
