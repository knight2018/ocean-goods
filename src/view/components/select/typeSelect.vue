<template>
  <div>
    <div class="mg-lf mg-tp">
      <span>类型：</span>
      <Select v-model="type" style="width:200px" :transfer="true">
        <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
  </div>
</template>

<script>
export default {
  name: "typeSelect",
  props: {
    value: {
      type: Number,
      default: 0
    },
    off: {
      type: String,
      default: "all"
    }
  },
  data() {
    return {
      type: this.value,
      typeList: [
        {
          value: 1,
          label: "免费"
        },
        {
          value: 2,
          label: "解锁"
        }
      ]
    };
  },
  watch: {
    type(newVal) {
      this.$emit("input", newVal);
    },
    off(newVal) {
      if (newVal === "all") {
        this.typeList = [
          {
            value: 0,
            label: "全部"
          },
          {
            value: 1,
            label: "免费"
          },
          {
            value: 2,
            label: "解锁"
          }
        ];
      } else {
        this.typeList = [
          {
            value: 1,
            label: "免费"
          },
          {
            value: 2,
            label: "解锁"
          }
        ];
      }
    }
  }
};
</script>

<style scoped>
</style>