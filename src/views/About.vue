<template>
  <div class="About">
    <div class="About-bg"></div>
    <div class="About-body">
      <h1>
        Acerca <br>
        <span>de Growler App</span>
      </h1>
      <img class="About-sep" src="/img/img-separator.svg" alt="sep">
      <p>Esta aplicación busca acercar a los amantes de la buena cerveza artesanal con productores que permiten el llenado de <i>growlers</i> con sus variedades de cerveza.</p>
      <p>Está desarrollada bajo código <a href="https://github.com/growlerapp/" target="_blank">Open-Source</a> disponible para mejoras y aprendizaje.</p>
      <p>Hecho con ❤️ y 🍺 por quienes <a href="https://github.com/orgs/growlerapp/people" target="_blank">voluntariamente contribuyen</a>.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style>
.About {
  padding: 2em;
  text-align: center;
}

.About-body {
  position: relative;
}

.About h1 {
  text-transform: uppercase;
}

.About h1 span {
  font-family: var(--font-family-normal);
  text-transform: none;
  font-weight: normal;
  font-size: 1.4rem;
}

.About p {
  font-size: 1rem;
  line-height: 1.4;
}

.About-sep {
  display: block;
  margin: 20px auto;
  width: 120px;
  opacity: 0.6;
}

.About-bg {
  width: 50%;
  height: 40%;
  position: absolute;
  bottom: 0;
  background-image: url(/img/img-growler.svg);
  background-position: 50%;
  background-repeat: no-repeat;
  left: 50%;
  transform: translateX(-50%);
  opacity: .2;
  z-index: 0;
}
</style>
