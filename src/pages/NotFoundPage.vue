<template>
  <div class="not-found">
    <div class="c">
      <div class="_404">404</div>
      <hr />

      <div v-if="pageName === 'product-page'">
        <div class="_1">ПРОДУКТ</div>
        <div class="_2">НЕ НАЙДЕН</div>
      </div>
      <div v-else>
        <div class="_1">СТРАНИЦА</div>
        <div class="_2">НЕ НАЙДЕНА</div>
      </div>

      <router-link class="btn" :to="{ name: 'main' }">
        ВЕРНУТЬСЯ В КАТАЛОГ
      </router-link>
    </div>
  </div>
</template>

<script>
/* eslint-disable quotes */
export default {
  props: { pageName: String },
};
</script>

<style scoped>
.not-found {
  background: #9eff00;
  color: #fff;
  font-family: "PressStart", sans-serif;
  max-height: 700px;
  overflow: hidden;
}
.c {
  text-align: center;
  display: block;
  position: relative;
  width: 80%;
  margin: 100px auto;
}
._404 {
  font-size: 220px;
  position: relative;
  display: inline-block;
  z-index: 2;
  height: 250px;
  letter-spacing: 15px;
}
._1 {
  margin: 15px 0;
  text-align: center;
  display: block;
  position: relative;
  letter-spacing: 12px;
  font-size: 4em;
  line-height: 80%;
}
._2 {
  margin: 10px 0;
  text-align: center;
  display: block;
  position: relative;
  font-size: 20px;
}

.btn {
  background-color: #fff;
  position: relative;
  display: inline-block;
  width: 358px;
  padding: 15px;
  z-index: 5;
  font-size: 25px;
  margin: 0 auto;
  color: #9eff00;
  text-decoration: none;
  margin-right: 10px;
}

hr {
  padding: 0;
  border: none;
  border-top: 5px solid #fff;
  color: #fff;
  text-align: center;
  margin: 0px auto;
  width: 420px;
  height: 10px;
  z-index: -10;
}
</style>
