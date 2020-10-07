<template>
  <div class="content">
    <div class="preview">
      <CollapsContent>
        <div class="preview-content">
          <div class="top-row">
            <img :src="selectedRobot.head.src" />
          </div>
          <div class="middle-row">
            <img :src="selectedRobot.leftArm.src" class="rotate-left" />
            <img :src="selectedRobot.torso.src" />
            <img :src="selectedRobot.rightArm.src" class="rotate-right" />
          </div>
          <div class="bottom-row">
          <img :src="selectedRobot.base.src" />
        </div>
        </div>
        </CollapsContent>
        <button class="add-to-cart" @click="addToCart()">Add To Chrt</button>
      </div>
    <div class="top-row">
      <div class="robo-name">
        {{selectedRobot.head.title}}
        <span class="sale" v-if="selectedRobot.head.onSale">Sale!</span>
      </div>
      <PartSelectors
        :parts="availableParts.heads"
        position="top"
        @partSelector="part => selectedRobot.head = part"
      />
    </div>
    <div class="middle-row">
      <PartSelectors
        :parts="availableParts.arms"
        position="left"
        @partSelector="part => selectedRobot.leftArm = part"
      />
      <PartSelectors
        :parts="availableParts.torsos"
        position="center"
        @partSelector="part => selectedRobot.torso = part"
      />
      <PartSelectors
        :parts="availableParts.arms"
        position="right"
        @partSelector="part => selectedRobot.rightArm = part"
      />
    </div>
    <div class="bottom-row">
      <PartSelectors
        :parts="availableParts.bases"
        position="bottom"
        @partSelector="part => selectedRobot.base = part"
      />
    </div>
  </div>
</template>

<script>
import availableParts from '../data/parts';
import PartSelectors from './PartSelector.vue';
import CollapsContent from '../shared/CollapsContent.vue';

export default {
  name: 'RobotBuilder',
  beforeRouteLeave(to, from, next) {
    if (this.addedToCart) {
      next(true);
    } else {
      const response = confirm('are you sure?');
      next(response);
    }
  },
  components: { PartSelectors, CollapsContent },
  data() {
    return {
      availableParts,
      addedToCart: false,
      cart: [],
      selectedRobot: {
        head: {},
        leftArm: {},
        torso: {},
        rightArm: {},
        base: {},
      },
    };
  },
  computed: {},
  methods: {
    addToCart() {
      const robot = this.selectedRobot;
      const cost = robot.head.cost
        + robot.leftArm.cost
        + robot.torso.cost
        + robot.rightArm.cost
        + robot.base.cost;
      this.$store.commit('addRobotToCart', {robot, cost});
      this.addedToCart = true;
    },
  },
};
</script>

<style scoped>
.part {
  position: relative;
  width: 165px;
  height: 165px;
  border: 3px solid #aaa;
}
.part img {
  width: 165px;
}
.top-row {
  display: flex;
  justify-content: space-around;
}
.middle-row {
  display: flex;
  justify-content: center;
}
.bottom-row {
  display: flex;
  justify-content: space-around;
  border-top: none;
}
.head {
  border-bottom: none;
}
.left {
  border-right: none;
}
.right {
  border-left: none;
}
.left img {
  transform: rotate(-90deg);
}
.right img {
  transform: rotate(90deg);
}
.bottom {
  border-top: none;
}
.prev-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 171px;
}
.next-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 171px;
}
.center .prev-selector,
.center .next-selector {
  opacity: 0.8;
}
.left .prev-selector {
  top: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.left .next-selector {
  top: auto;
  bottom: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.right .prev-selector {
  top: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  top: auto;
  bottom: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  right: -3px;
}
.robo-name {
  position: absolute;
  top: -25px;
  text-align: center;
  width: 100%;
}
.sale {
  color: red;
}
.content {
  position: relative;
}
.add-to-cart {
  position: absolute;
  width: 210px;
  padding: 3px;
  font-size: 16px;
}
.preview {
  position: absolute;
  right: 0;
  top: 30px;
  width: 210px;
  height: 210px;
}
.preview-content {
  border: 1px solid #999;
}
.preview img {
  width: 50px;
  height: 50px;
}
.rotate-right {
  transform: rotate(90deg);
}
.rotate-left {
  transform: rotate(-90deg);
}
</style>
