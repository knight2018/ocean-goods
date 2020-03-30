<template>
	<div>
		<div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index">
			<template v-if="item.status === 'finished'">
				<img :src="item.url" />
				<div class="demo-upload-list-cover">
					<Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
					<Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
				</div>
			</template>
			<template v-else>
				<Progress v-if="item.showProgress" :percent="item.percentage" hide-info status="active"></Progress>
			</template>
		</div>
		<Upload
			ref="upload"
			:show-upload-list="false"
			:default-file-list="uploadList"
			:on-success="handleSuccess"
			:format="['jpg','jpeg','png']"
			:max-size="500"
			:on-format-error="handleFormatError"
			:on-exceeded-size="handleMaxSize"
			:before-upload="handleBeforeUpload"
			name="Body"
			:data="updata"
			:multiple="multiple"
			type="drag"
			action="//jsonplaceholder.typicode.com/posts/"
			style="display: inline-block;width:58px;"
		>
			<i-circle :percent="(num*100)" :size="45" style="margin-top: 5px" v-show="num!==0">
				<span class="demo-Circle-inner" style="font-size:8px">{{(num*100)}}%</span>
			</i-circle>
			<div style="width: 58px;height:58px;line-height: 58px;" v-show="num===0">
				<Icon type="ios-camera" size="20"></Icon>
			</div>
		</Upload>
		<Modal :title="imgName" v-model="visible" style="z-index: 99999">
			<img :src="url" v-if="visible" style="width: 100%" />
		</Modal>
	</div>
</template>
<script>
import OSS from "ali-oss";
import { config, sts } from "../../../api/data";
export default {
	name: "UploadImg",
	props: {
		value: {
			type: String,
			default: ''
		},
		off: {
			type: Number,
			default: 0
		},
		index: {
			type: Number,
			default: 999
		},
		multiple: {
			type: Boolean,
			default: true
		},
		genre: {
			type: String,
			default: ""
		}
	},
	data () {
		return {
			defaultList: [],
			multiples: this.multiple,
			updata: {
				Bucket: "img-1300053322",
				Region: "ap-guangzhou",
				Key: "ceshi",
				StorageClass: ""
			},
			imgName: "",
			visible: false,
			uploadList: [],
			length: this.index,
			addList: [],
			delList: [],
			url: "",
			store: null,
			time: null,
			num: 0
		};
	},
	methods: {
		handleView (item) {
			this.imgName = item.name;
			this.url = item.url;
			this.visible = true;
		},
		handleRemove (item) {
			//this.delete(item);
			this.delList.push(
				this.uploadList.splice(this.uploadList.indexOf(item), 1)[0]
			);
			// const fileList = this.$refs.upload.fileList;
			// this.$refs.upload.fileList.splice(fileList.indexOf(item), 1);
		},
		handleSuccess (res, file) {
			// file.url =
			//   "https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar";
			// file.name = "7eb99afb9d5f317c912f08b5212fd69a";
		},
		handleFormatError (file) {
			this.$Notice.warning({
				title: "The file format is incorrect",
				desc:
					"File format of " +
					file.name +
					" is incorrect, please select jpg or png."
			});
		},
		handleMaxSize (file) {
			this.$Notice.warning({
				title: "Exceeding file size limit",
				desc: "File  " + file.name + " is too large, no more than 500k."
			});
		},
		handleBeforeUpload (file) {
			const check = this.uploadList.length >= this.length;
			const that = this;
			if (check) {
				this.$Notice.warning({
					title: `最多上传${this.length}个`
				});
				return false;
			} else {
				console.log(`${localStorage.userName}/${new Date().getTime()}${file.name}`)
				that.put(
					`${localStorage.userName}/${new Date().getTime()}${file.name}`,
					file
				);
			}
			return false;
		},
		async getStore () {
			const Config = await config();
			const Sts = await sts(localStorage.userName);
			const configParams = Config.data;
			const stsParams = Sts.data;
			this.store = new OSS({
				accessKeyId: stsParams.data.AccessKeyId,
				accessKeySecret: stsParams.data.AccessKeySecret,
				stsToken: stsParams.data.SecurityToken,
				bucket: configParams.data.bucketName,
				region: configParams.data.endPoint
			});
			console.log(this.store);
			this.time = stsParams.data.Expiration;
		},
		async schedule (s) {
			console.log(s);
			if (s === 1) {
				this.num = 0;
			} else {
				this.num = s.toFixed(2);
			}

		},
		async put (name, file) {
			console.log(file.size);
			this.num = 0;
			if (this.time) {
				if (new Date(this.time) > new Date()) {
					try {
						// if (file.size > size) {

						// }else{
						//   let result = await this.store.put(name, file);
						// }

						// let result = await this.store.put(name, file);
						let result = await this.store.multipartUpload(name, file, {
							progress: this.schedule
							// parallel: 10,
							// partSize: 102400
						});
						//   // let res = await this.store.list({
						//   //   "max-keys": 5
						//   // });
						//   console.log(result);
						//let result = await this.store.delete(name);
						const str = result.res.requestUrls[0];
						const res = str.lastIndexOf("?");
						let url = "";
						if (res > 0) {
							url = str.substring(0, res);
						} else {
							url = str;
						}

						console.log(url);
						this.uploadList.push({
							name: result.name,
							url: url,
							status: "finished"
						});
						this.addList.push({
							name: result.name,
							url: url
						});
						console.log(result);
					} catch (error) {
						console.log(error);
					}
				} else {
					this.getStore();
					this.$Message.error("key过期请重新上传");
				}
			} else {
				this.$Message.error("请求数据出错请从新刷新页面");
			}
		},
		async delete (item) {
			if (this.time) {
				if (new Date(this.time) > new Date()) {
					try {
						let result = await this.store.delete(item.name);

						console.log(result);
					} catch (error) {
						console.log(this.uploadList);
						console.log(error);
					}
				} else {
					this.getStore();
					this.$Message.error("key过期请重新上传");
				}
			} else {
				this.$Message.error("请求数据出错请从新刷新页面");
			}
		}
	},
	watch: {
		value (newVal) {
			if (newVal) {
				let arr = newVal.split(',')
				const name = localStorage.userName
				const re = new RegExp(`${name}\\/(\\S*)`)
				const arrList = []
				arr.forEach(item => {
					console.log(item.match(re))
					let name
					try {
						name = item.match(re)[0]
					} catch (err) {
						this.$Message.error('图片不符合规则')
					}
					arrList.push({
						status: 'finished',
						url: item,
						percentage: 100,
						name
					})
				})
				this.uploadList = arrList;
			} else {
				this.uploadList = []
			}

		},
		// off (newVal) {
		// 	console.log(newVal);
		// 	if (newVal === 1 || newVal === 2) {
		// 		if (newVal === 2) {
		// 			console.log(this.addList);
		// 			this.addList.forEach(item => {
		// 				this.delete(item);
		// 			});
		// 		} else {
		// 			this.delList.forEach(item => {
		// 				this.delete(item);
		// 			});
		// 		}
		// 		this.delList = [];
		// 		this.addList = [];
		// 		console.log(this.addList);
		// 		this.$emit("on-change", 0);
		// 	}
		// },
		uploadList (newVal) {
			console.log(newVal)
			let list = []
			newVal.forEach(item => {
				list.push(item.url)
			})
			this.$emit("input", list.length ? list.join(',') : '');
		}
	},
	beforeDestroy () {
		if (this.off === 1 || this.off === 2) {
			if (this.off === 2) {
				console.log(this.addList);
				this.addList.forEach(item => {
					this.delete(item);
				});
			} else {
				this.delList.forEach(item => {
					this.delete(item);
				});
			}
			this.delList = [];
			this.addList = [];

			this.$emit("on-change", 0);
		}
	},
	mounted () {
		this.uploadList = this.$refs.upload.fileList;
		this.getStore();
	}
};
</script>
<style>
.demo-upload-list {
	display: inline-block;
	width: 60px;
	height: 60px;
	text-align: center;
	line-height: 60px;
	border: 1px solid transparent;
	border-radius: 4px;
	overflow: hidden;
	background: #fff;
	position: relative;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
	margin-right: 4px;
}
.demo-upload-list img {
	width: 100%;
	height: 100%;
}
.demo-upload-list-cover {
	display: none;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
	display: block;
}
.demo-upload-list-cover i {
	color: #fff;
	font-size: 20px;
	cursor: pointer;
	margin: 0 2px;
}
</style>