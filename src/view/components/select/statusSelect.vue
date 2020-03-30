<template>
  <div>
    <div class="mg-lf mg-tp">
      <span>状态：</span>
      <Select v-model="status" style="width:200px"  :transfer="true">
        <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
  </div>
</template>

<script>
export default {
  name: "statusSelect",
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
      status: this.value,
      statusList: [
        {
          value: 1,
          label: "开启"
        },
        {
          value: 2,
          label: "关闭"
        }
      ]
    };
  },
  watch: {
    status(newVal) {
      this.$emit("input", newVal);
    },
    value(newVal) {
      this.status = newVal;
    },
    off(newVal) {
      console.log("????");
      if (newVal === "all") {
        this.statusList = [
          {
            value: 0,
            label: "全部"
          },
          {
            value: 1,
            label: "开启"
          },
          {
            value: 2,
            label: "关闭"
          }
        ];
      } else {
        this.statusList = [
          {
            value: 1,
            label: "开启"
          },
          {
            value: 2,
            label: "关闭"
          }
        ];
      }
    }
  }
};
</script>

<style scoped>
</style>