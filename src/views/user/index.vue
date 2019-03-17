<template>
  <div>
    <div class="card ">
      <div class="card-block">
        <el-row>
          <el-col :span="10">
            <div class="grid-content bg-purple-dark"></div>
          </el-col>
          <el-col :span="4" :offset="20">
            <el-button type="primary" size="mini" @click="onAdd()">添加</el-button>
            <el-button type="danger" size="mini" @click="onDel()" :disabled="!multipleSelection.length">删除</el-button>
          </el-col>
        </el-row>
        <el-table
          v-loading="loading"
          ref="multipleTable"
          :data="tableData"
          border
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="分类名称"
            prop="name">
          </el-table-column>
          <el-table-column
            label="分类标签"
            prop="tag">

          </el-table-column>
          <el-table-column
            label="描述"
            prop="desc">
          </el-table-column>


          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <a href="javascript:void(0)" class="btn btn-default btn-sm" @click="onEdit(scope.row._id,scope.row)"><i
                class="icon-note icons"></i>编辑</a>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                    @pagination="getTableList"/>

        <!--<b-pagination align="center" :total-rows="total" style="margin-top: 1rem" v-model="currentPage" :per-page="20">-->
        <!--</b-pagination>-->

      </div>
    </div>
    <!--modal编辑-->
    <el-dialog title="操作" :visible.sync="show">
      <el-form ref="dataForm" :rules="rules" :model="data" label-position="left" label-width="70px"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="名称" prop="name">
          <el-input v-model="data.name"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button><!--"dialogStatus==='create'?createData():updateData()"-->
      </div>
    </el-dialog>
    <!--modal删除-->
    <el-dialog title="删除" :visible.sync="delShow" :center="true" width="30%">
      <div class="delcenter">
        你确定要删除吗
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="delShow = false" size="small">取消</el-button>
        <el-button type="danger" @click="onRemove" size="small">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  /* eslint-disable space-before-function-paren,curly,semi,eqeqeq,valid-typeof,no-unused-vars */

  import {get, post, del, encodeUrl} from '@/utils/request'
  import Pagination from '@/components/Pagination'
  import {mapGetters} from 'vuex'
  //  const url = '/api/video'
  export default {
    computed: {
      ...mapGetters(['user'])
    },
    mounted() {
      this.getTableList()
    },
    data() {
      return {
        filter: null,
        preview: false,
        show: false,
        loading: false,
        tableData: [],
        multipleSelection: [],
        data: {},
        listQuery: {
          page: 1,
          limit: 20,
        },
        currentPage: 1,
        total: 0,
        delShow: false,
        settingData: {},
        errorText: '',
        dialogStatus: '',
        rules: {
          type: [{required: true, message: 'type is required', trigger: 'change'}],
          timestamp: [{type: 'date', required: true, message: 'timestamp is required', trigger: 'change'}],
          name: [{required: true, message: '名不能为空', trigger: 'blur'}]
        },
      }
    },
    methods: {
      onRemove() {
        return this.del(...this.multipleSelection.map((i) => i._id)).then(() => {
          this.getTableList();
          this.delShow = false
        })
      },
      del(...ids) {
        let promise = Promise.resolve()
        for (let id = ids.shift(); id; id = ids.shift()) {
          promise = promise.then(() => del(encodeUrl`/api/gvrchat/device/one/${id}`))
        }
        return promise
      },
      save(evt) {
        let data = this.data
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            return post(encodeUrl`/api/gvrchat/device/edit/${this.settingData.id}`, data)
              .then(() => {
                this.show = false
              })
              .then(this.getTableList.bind(this)).catch((data) => {
                this.loading = false

              })
          }
        })
      },
      getOneTable(id) {
        return get(encodeUrl`/api/gvrchat/device/one/${id}`).then(({data}) => {
          this.loading = false

          this.data = data
//          delete this.data._id
        }).catch((data) => {
          this.loading = false

        })
      },
      onEdit(id, row) {
        this.dialogStatus = 'update'
        this.loading = true
        this.settingData.id = id
        this.getOneTable(id).then(() => {
          this.show = true
        })
      },
      onDel() {
        this.delShow = true
      },
      onAdd() {
        this.dialogStatus = 'create'
        this.show = true
        this.data = {}
        this.settingData.id = ''
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      getTableList(page = 1) {
        this.loading = true
        console.log('limitlllll', this.listQuery)
        setTimeout(() => {
          console.log('limit', this.listQuery.limit)
          return get(`/api/gvrchat/devices`, this.listQuery).then(({data}) => {
            console.log(data)
            this.loading = false
            this.total = data.total
            this.tableData = data.list
            return data
          }, (res) => {
            this.loading = false
            return res
          })
        }, 0)

      },
      handleSelectionChange(val) {
        this.multipleSelection = val
//        console.log(val)
      }
    },
    components: {
      Pagination
    },
    watch: {
      // currentPage(page) {
      //   this.getTableList(page)
      // }
    }
  }
</script>
<style scoped="" lang="scss" rel="stylesheet/scss">
  .delcenter {
    text-align: center;
  }

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

</style>



