<template>
  <v-container grid-list-xs
    ><v-row align-center class="info-box">
      <v-col sm2 xs12 offset-sm9>
        <h2>Bagel Shop</h2>
        <div>
          <p>Khan Saab ki sabse purani dukan</p>
        </div>
      </v-col>
    </v-row>
    <!--  -->
    <v-layout align-center class="info-box" row wrap>
      <v-flex sm2 xs12 offset-sm1>
        <h2>Our Bagels</h2>
        <div>
          <p>But our tasty, super, yummy and magnificient bagels</p>
        </div>
      </v-flex>
      <!--  -->
      <v-flex sm2 xs12>
        <h2>Our Bagels</h2>
        <div>
          <p>But our tasty, super, yummy and magnificient bagels</p>
        </div>
      </v-flex>
      <!--  -->
      <v-flex sm2 xs12>
        <h2>Our Bagels</h2>
        <div>
          <p>But our tasty, super, yummy and magnificient bagels</p>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
  <!-- <v-card class="d-flex pa-2" outlined tile>
    <div>I'm a flexbox container!</div>
  </v-card> -->
</template>

<script>
// import HelloWorld from '../components/HelloWorld'

export default {
  name: "",

  components: {},
};
</script>

<style lang="scss">
.info-box .flex h2 {
  border: 5px solid #fff;
  padding: 10px;
  margin-bottom: 5px;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 16px;
  text-align: center;
}

.info-box .flex div {
  background-color: #fff;
  padding: 20px;
}

.layout:first-child {
  height: 40vh;
}

.layout:last-child {
  height: 40vh;
}
</style>
