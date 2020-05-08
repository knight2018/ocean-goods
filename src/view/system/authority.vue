<template>
	<div>
		<div class="display">
			<Button type="primary" @click="handleAddBanner">+添加管理员</Button>
			<Input
				style="width: 200px;margin-right:15px"
				search
				placeholder="搜索管理员"
				icon="ios-search"
				@on-click="handleSearch(1,12)"
				@on-search="handleSearch(1,12)"
				v-model="search"
			/>
		</div>
		<Table :columns="columns" :data="data1"></Table>
		<Page :total="total" @on-change="handlePage" :page-size="limit" :current="page"></Page>
		<Drawer :title="update?'修改管理员':'添加管理员'" v-model="bannerOff" width="40">
			<div class="mg-tp">
				<span>用户名：</span>
				<Input style="width:200px;" v-model="sidebar.userName" />
			</div>
			<div class="mg-tp">
				<span>真实姓名：</span>
				<Input style="width:200px;" v-model="sidebar.realName" />
			</div>
			<div class="mg-tp">
				<span>登录密码：</span>
				<Input style="width:200px;" v-model="sidebar.passWord" />
			</div>
			<!-- <div class="mg-tp">
        <span>对应老师：</span>
        <Select v-model="type" style="width:200px">
          <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
			</div>-->
			<div class="mg-tp">
				<span>权限类型：</span>
				<Select v-model="type" style="width:200px">
					<Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
			</div>
			<div class="mg-tp">
				<span>状态：</span>
				<Select v-model="status" style="width:200px">
					<Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
			</div>
			<Button type="primary" style="width: 100px" class="center" :loading="loading" @click="handleAdd">提交</Button>
		</Drawer>
	</div>
</template>

<script>
// import TablePage from "../components/table/TablePage";
import { roleListAll, adminAdd, adminUpdate, adminList } from '../../api/system'
export default {
	//   components: { TablePage },
	data () {
		return {
			bannerOff: false,
			name: "",
			type: "",
			id: 0,
			page: 1,
			limit: 12,
			update: false,
			typeList: [],
			status: 1,
			loading: false,
			statusList: [
				{
					value: 1,
					label: "正常"
				},
				{
					value: 2,
					label: "不正常"
				}
			],
			search: "",
			sidebar: {
				passWord: "",
				realName: "",
				userName: ""
			},
			columns: [
				{
					title: "序号",
					key: "id",
					align: "center"
				},
				{
					title: "用户名",
					key: "userName",
					align: "center"
				},
				{
					title: "真实姓名",
					key: "realName",
					align: "center"
				},
				{
					title: "员工角色",
					key: "roleName",
					align: "center"
				},
				{
					title: "状态",
					key: "statusC",
					align: "center"
				},
				{
					title: "创建时间",
					key: "createTime",
					align: "center"
				},
				{
					title: "操作",
					key: "name",
					align: "center",
					render: (h, params) => {
						return h("div", {}, [
							// h(
							//   "a",
							//   {
							//     style: {
							//       marginLeft: "15px"
							//     },
							//     on: {
							//       click: () => {}
							//     }
							//   },
							//   "查看"
							// ),
							h(
								"a",
								{
									style: {
										//marginLeft: "15px"
									},
									on: {
										click: () => {
											this.update = true;
											this.id = params.row.id;
											this.bannerOff = true;
											this.sidebar = params.row;
											console.log(params.row.roleId, this.typeList)
											this.type = params.row.roleId;
											this.status = params.row.status;
										}
									}
								},
								"编辑"
							)
						]);
					}
				}
			],
			data1: [],
			total: 0
		};
	},
	methods: {
		handleAddBanner () {
			this.bannerOff = true;
			this.update = false;
		},
		handleSearch () {
			let params = {
				realName: this.search,
				pageSize: this.limit,
				pageNum: this.page
			}
			adminList(params)
				.then(res => {
					this.total = res.data.total
					//   this.total = res.data.total;
					res.data.data.forEach(item => {
						item.statusC = item.status === 1 ? '开启' : '关闭'
					})
					this.data1 = res.data.data;
				})
				.catch(err => { });
		},
		handleAdd () {
			let { passWord, realName, userName } = this.sidebar;
			const status = this.status,
				id = this.id,
				roleId = this.type;
			if (passWord && passWord.length < 6) {
				this.$Message.error("密码不允许少于6位");
				return null
			}
			let password = passWord || null;
			if (realName && userName && roleId) {
				this.loading = true
				if (this.update) {
					adminUpdate(id,{ password, realName, roleId, status, userName})
						.then(res => {
							this.$Message.success("修改成功");
							this.handleSearch()
							this.bannerOff = false;
							this.loading = false
						})
						.catch(err => {
							this.$Message.error("修改失败");
							this.loading = false
						});
				} else {
					if (!password) {
						this.$Message.error("密码不允许为空");
						return
					}
					adminAdd({ password, realName, roleId, status, userName })
						.then(res => {
							this.$Message.success("添加成功");
							this.handleSearch()
							this.bannerOff = false;
							this.loading = false
						})
						.catch(err => {
							this.$Message.error("添加失败");
							this.loading = false
						});
				}
			} else {
				this.$Message.error("不允许有空值");
			}
		},
		handlePage (index) {
			this.page = index;
			this.handleSearch();
		}
	},
	mounted () {
		this.handleSearch();
		roleListAll()
			.then(res => {
				if (res.data.data.length) {
					this.type = res.data.data[0].id;
					res.data.data.forEach(item => {
						this.typeList.push({
							value: item.id,
							label: item.name
						});
					});
				}
			})
			.catch(err => { });
	}
};
</script>

<style>
.display {
	display: flex;
	flex-direction: row-reverse;
}
.center {
	position: absolute;
	left: 50%;
	margin-left: -50px;
	margin-top: 30px;
}
.mg-tp {
	margin-top: 15px;
}
</style>
