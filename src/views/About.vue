<template>
  <v-container grid-list-xs
    ><v-layout align-center class="info-box">
      <v-flex sm4 xs12 offset-sm1>
        <h2>Bagel Shop - About Us</h2>
      </v-flex>
    </v-layout>
    <!--  -->
    <v-layout align-center class="info-box" row wrap>
      <v-flex sm4 xs12 offset-sm1>
        <h2>Our History</h2>
        <div>
          <p>We are settled from Mughal period in the heart of India, Delhi.</p>
        </div>
      </v-flex>
      <!--  -->
      <v-flex sm4 xs12>
        <h2>Our Bagels</h2>
        <div>
          <p>We are settled from Mughal period in the heart of India, Delhi.</p>
        </div>
      </v-flex>
      <!--  -->
      <!-- <v-flex sm2 xs12>
        <h2>Our Bagels</h2>
        <div>
          <p>But our tasty, super, yummy and magnificient bagels</p>
        </div>
      </v-flex> -->
    </v-layout>
  </v-container>
</template>

<style lang="scss" scoped>
.info-box:first-child .flex h2:first-child {
  font-size: 150%;
  padding: 25px;
}
</style>
