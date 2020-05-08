<template>
	<div>
		<div class="dispaly">
			<Input
				style="width: 200px;margin-right:15px"
				search
				placeholder="搜索角色"
				icon="ios-search"
				@on-click="handleSearch(1,12)"
				@on-search="handleSearch(1,12)"
				v-model="searchName"
			/>
			<Button type="primary" @click="handleAddBanner">+添加权限</Button>
		</div>
		<Table :columns="columns" :data="data1"></Table>
		<Page :total="total" @on-change="handlePage" :page-size="limit" :current="page"></Page>
		<Drawer :title="updata?'修改权限':'添加权限'" v-model="bannerOff" width="40">
			<div style="padding:10px">
				<span>权限类型：</span>
				<Input style="width:200px;" v-model="name"></Input>
			</div>
			<div style="padding:10px">
				<span>权限范围：</span>
				<Card style="width:100%">
					<div>
						<Checkbox :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
						<Divider></Divider>
						<ul>
							<li v-for="item in list" :key="item.name">
								<Checkbox
									:indeterminate="item.indeterminate"
									:value="item.checkAll"
									@click.prevent.native="handleCheckAllItem(item)"
								>{{item.name}}</Checkbox>
								<Divider></Divider>
								<ul>
									<li style="margin-left:20px;">
										<CheckboxGroup v-model="item.checkAllGroup" @on-change="checkAllGroupChangeitem(item)">
											<Checkbox
												v-for="items in item.children"
												:label="items.name"
												:key="items.name"
											>{{items.meta.title}}</Checkbox>
										</CheckboxGroup>
										<Divider></Divider>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</Card>
			</div>
			<div style="padding:10px" class="center">
				<Button type="primary" style="width: 100px" @click="handleAdd">提交</Button>
			</div>
		</Drawer>
	</div>
</template>

<script>
// import TablePage from "../components/table/TablePage";
import { getList } from '../../libs/util'
import { roleAdd, roleUpdate, roleList } from "../../api/system";
export default {
	// components: { TablePage },
	data () {
		return {
			id: 0,
			checkAll: false,
			list: [],
			bannerOff: false,
			searchName: '',
			name: "",
			updata: false,
			columns: [
				{
					title: "序号",
					key: "id",
					align: "center"
				},
				{
					title: "权限类型",
					key: "name",
					align: "center"
				},
				// {
				//   title: "权限范围",
				//   key: "permission",
				//   align: "center"
				// },
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
										marginLeft: "15px"
									},
									on: {
										click: () => {
											try {
												this.list = getList(JSON.parse(
													params.row.auth
												), this.list)
											} catch (err) {

											}
											console.log(this.list)
											this.updata = true;
											this.id = params.row.id;
											this.checkAll = this.list.every(item =>
												item.checkAllGroup.length === item.children.length
													? true
													: false
											);
											this.bannerOff = true;
											this.name = params.row.name;
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
			total: 0,
			page: 1,
			limit: 12
		};
	},
	methods: {
		handleSearch (page, limit) {
			this.page = page || this.page
			let params = {
				name: this.searchName,
				pageNum: this.page,
				pageSize: 12
			}
			roleList(params)
				.then(res => {
					console.log(res)
					res.data.data.forEach(item => {
						try {
							// item.createTime = a(new Date(item.createTime))
						} catch (err) {

						}

					})
					this.data1 = res.data.data;
				})
				.catch(err => {});
		},
		handleAddBanner () {
			this.bannerOff = true;
			this.updata = false;
		},
		handleAdd () {
			if (this.name) {
				const data = {
					id: this.id,
					auth: JSON.stringify(this.list),
					name: this.name,
					status: 1
				}
				if (this.updata) {
					console.log(this.list)
					roleUpdate(data.id, data)
						.then(res => {
							this.$Message.success("修改成功");
							this.handleSearch();
							this.bannerOff = false;
						})
						.catch(err => {
							this.$Message.error("修改失败");
						});
				} else {
					roleAdd(data)
						.then(res => {
							this.$Message.success("添加成功");
							this.handleSearch();
							this.bannerOff = false;
						})
						.catch(err => {
							this.$Message.error("添加失败");
						});
				}
			} else {
				this.$Message.error("权限类型不能为空");
			}
		},
		handleCheckAll () {
			let off;
			off = this.list.every(item => {
				return item.checkAllGroup.length === 0;
			});
			let off1 = this.list.some(item => {
				return item.checkAllGroup.length !== 0;
			});
			console.log(off1);
			if (off) {
				this.list.forEach(item => {
					this.checkAll = true;
					item.checkAll = true;

					item.children.forEach(items => {
						item.checkAllGroup.push(items.name);
					});
				});
			} else if (off1) {
				this.list.forEach(item => {
					this.checkAll = false;
					item.checkAll = false;
					item.indeterminate = false;
					item.checkAllGroup = [];
				});
			}
		},
		handleCheckAllItem (item) {
			if (item.checkAllGroup.length) {
				item.indeterminate = false;
				item.checkAll = false;
				item.checkAllGroup = [];
			} else {
				item.indeterminate = false;
				item.checkAll = true;
				item.children.forEach(items => {
					item.checkAllGroup.push(items.name);
				});
			}
			if (
				this.list.every(item => {
					return item.checkAll;
				})
			) {
				this.checkAll = true;
			} else {
				this.checkAll = false;
			}
		},
		checkAllGroupChangeitem (item) {
			if (
				item.checkAllGroup.length > 0 &&
				item.checkAllGroup.length !== item.children.length
			) {
				item.indeterminate = true;
				item.checkAll = false;
			} else if (item.checkAllGroup.length === item.children.length) {
				item.indeterminate = false;
				item.checkAll = true;
			} else {
				item.indeterminate = false;
				item.checkAll = false;
			}
			if (
				this.list.every(item => {
					return item.checkAll;
				})
			) {
				this.checkAll = true;
			} else {
				this.checkAll = false;
			}
		},
		handlePage (index) {
			this.page = index;
			this.handleSearch();
		}
	},
	created () {
		this.handleSearch();
		this.$store.getters.menuList.forEach(item => {
			this.list.push({
				name: item.meta.title,
				indeterminate: false,
				checkAll: false,
				checkAllGroup: [],
				children: item.children
			});
		});
		console.log(this.list);
	}
};
</script>

<style>
.dispaly {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	height: 40px;
}
.center {
	position: absolute;
	left: 50%;
	margin-left: -50px;
	margin-top: 30px;
}
ul {
	list-style: none;
}
.mg-lf {
	margin-left: 15px;
}
</style>
