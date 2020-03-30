<template>
  <div style="display:flex" class="wrap">
    <div ref="editor" class="editor" style="width: 750px"></div>
    <div>
        <span>文章名称：</span>
        <Input style="width: 200px;" v-model="name"/>
    </div>
    <Button type="primary" @click="handleDown" class="mg-lf">下载</Button>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  data() {
    return {
      editor: null,
      name: ''
    };
  },
  methods: {
    handleDown() {
      const json = this.editor.txt.html();
      const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0, user-scalable=0"><title></title></head><body><div id="app" style="padding: 0 30px">${json}</div></body></html>`;
      let ele = document.createElement("a");
      ele.download = `${this.name}.html`;
      ele.style.display = "none";
      var blob = new Blob([html]);
      ele.href = URL.createObjectURL(blob);
      document.body.appendChild(ele);
      ele.click();
      document.body.removeChild(ele);
    }
  },
  mounted() {
    this.editor = new E(this.$refs.editor);
    this.editor.customConfig.uploadImgShowBase64 = true;
    this.editor.customConfig.showLinkImg = false;
    this.editor.create();
  }
};
</script>

<style>
.editor {
  margin: 0 auto;
}
.w-e-text-container {
  height: 1080px !important;
}

.just {
  justify-content: center;
}
.wrap{
    align-items: flex-start;
}
</style>