import $ from 'jQuery';

require('../../../../../static/lib/jquery/jquery-barcode.min');
(function () {

    let masterData = JSON.parse(IOT.getSessionStore(URI.BILL.BILL_ALLOT.DETAIL.PAGE));
    let $vue = new Vue({
        el: '.client-detail-hook',
        data: {

            upInsert:{},

            masterData:JSON.parse(IOT.getSessionStore(URI.BILL.BILL_ALLOT.DETAIL.PAGE)),
            rowData:{},
            insertData:{
                billMaster:JSON.parse(IOT.getSessionStore(URI.BILL.BILL_ALLOT.DETAIL.PAGE)),
                billDetails:[],

            },
            batch:{},



        },
        created:function (){
            if(masterData.state   ==1){  //初始化状态可以删除、审核
                $('#print_btn').after('<button class="primary_btn"  @click.stop="deleteBill()">删除</button><button class="primary_btn"  @click.stop="checkBill()">审核</button>' )
            }
            if(masterData.state   ==2){  //审核状态，可以完成

            }

            //获取详情信息
            IOT.getServerData(URI.BILL.BILL_DETAIL.LIST,{billNo:masterData.billNo},(ret) => {
                if (ret.code === 200) {
                    var  list = ret.rows

                    $.each(list,function(i,v){
                        $vue.$data.insertData.billDetails.push(v)
                    });
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });

            var billNo = masterData.billNo;
            $("#bcTarget").barcode(billNo, "code128",{
                // output:'css',       //渲染方式 css/bmp/svg/canvas
                //bgColor: '#ff0000', //条码背景颜色
                color: '#000000',   //条码颜色
                barWidth: 1,        //单条条码宽度
                barHeight: 50,     //单体条码高度
                // moduleSize: 5,   //条码大小
                // posX: 10,        //条码坐标X
                // posY: 5,         //条码坐标Y
                //  addQuietZone: false  //是否添加空白区（内边距）
            });
        },
        methods: {
            emitPage: function () {
                M.Page.load(this.boxs);
            },
            // 上一页
            prevStep: function () {
                M.Page.emitPrePage();
                M.Table.refresh.all();
            },
            // 触发刷新页(当前显示的页面)
            refreshPage: function () {
                M.Page.refreshPage(this.boxs);
            },

            printBill:function(){
                $("#printArea").printArea();
            },

            exportBill:function(){

                var billNo = $vue.$data.masterData.billNo;
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BILL.BILL_IN.EXPORT,{billNo:billNo},(ret) => {
                    IOT.hideOverlay();
                    if (ret.code === 200) {
                        IOT.tips('保存成功！', 'success', 1000 , function () {
                            M.Table.refresh.all();
                            M.Page.emitPrePage();
                        });

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },
            deleteBill:function(){

                var billNo = $vue.$data.masterData.billNo;
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BILL.BILL_IN.DELETE,{billNo:billNo},(ret) => {
                    IOT.hideOverlay();
                    if (ret.code === 200) {
                        IOT.tips('保存成功！', 'success', 1000 , function () {
                            M.Table.refresh.all();
                            M.Page.emitPrePage();
                        });

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },
            checkBill:function(){

                var billNo = $vue.$data.masterData.billNo;
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BILL.BILL_IN.CHECK,{billNo:billNo},(ret) => {
                    IOT.hideOverlay();
                    if (ret.code === 200) {
                        IOT.tips('保存成功！', 'success', 1000 , function () {
                            M.Table.refresh.all();
                            M.Page.emitPrePage();
                        });

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },
            okBill:function(){

                var billNo = $vue.$data.masterData.billNo;
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BILL.BILL_IN.OK,{billNo:billNo},(ret) => {
                    IOT.hideOverlay();
                    if (ret.code === 200) {
                        IOT.tips('保存成功！', 'success', 1000 , function () {
                            M.Table.refresh.all();
                            M.Page.emitPrePage();
                        });

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },


            updateDetail:function(){
                $("#updateModal").modal('hide');
                var detail = $vue.$data.rowData;
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BILL.BILL_DETAIL.UPDATE,detail,(ret) => {
                    IOT.hideOverlay();
                    if (ret.code === 200) {
                        IOT.tips('保存成功！', 'success', 1000 , function () {
                            M.Table.refresh.all();

                        });

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },

            acceptMaster:function(){
                $("#acceptMasterModal").modal('hide');
                var insertData = $vue.$data.insertData;
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BILL.BILL_IN.ACCEPT,insertData,(ret) => {
                    IOT.hideOverlay();
                    if (ret.code === 200) {
                        IOT.tips('保存成功！', 'success', 1000 , function () {
                            M.Table.refresh.all();

                        });

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },

            upAllModal:function(){
                $("#upAllModal").modal('show');
            },






        },
        mounted: function () {





            this.$nextTick(() => {

                var $accountBox = $('.client-detail-hook');


                let tableHookName = '.billDetail-allot-table-hook';




                var $tableHook = $accountBox.find(tableHookName).bootstrapTable({

                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url:URI.BILL.BILL_DETAIL.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',


                    onClickRow: function (row) {

                    },
                    customQueryParams: function (params) {

                        var queryParams ={billNo:$vue.$data.masterData.billNo};
                        return queryParams;
                    },
                    onLoadSuccess: function (data) {
                        console.log(data);
                    },
                    onLoadError: function (status, xhr) {
                    },
                    onCheckAll: function (rows) {

                    },


                    columns: [
                        {
                            field: 'itemName', title: '物料名', align: 'center', fixedLeft: true,tips:true
                        },
                        {
                            field: 'itemClass', title: '规格', align: 'center', fixedLeft: true,tips:true
                        },

                        {
                            field: 'quantity', title: '预约数量', align: 'center', fixedLeft: true,
                        },
                        {
                            field: 'wareName', title: '原始仓库', align: 'center', fixedLeft: true,
                        },
                        {
                            field: 'toWareName', title: '目标仓库', align: 'center', fixedLeft: true,
                        },

                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true,width:320,
                            events: {
                                'click .update': function (e, value, rowData, index) {
                                    $vue.$data.rowData = {};
                                    $vue.$data.rowData = $.extend({},   rowData);
                                    $("#updateModal").modal('show');
                                },

                                'click .delete': function (e, value, rowData, index) {

                                    layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认删除此行？', {
                                        btn: ['确定','取消']
                                    }, function(){
                                        IOT.showOverlay('保存中，请稍等...');
                                        var id = rowData.id;
                                        IOT.getServerData(URI.BILL.BILL_DETAIL.DELETE,{id:id},(ret) => {
                                            IOT.hideOverlay();
                                            if (ret.code === 200) {
                                                IOT.tips('删除成功！', 'success', 1000 , function () {
                                                    layer.closeAll();
                                                    M.Table.refresh.all();
                                                });

                                            } else {
                                                IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                                            }
                                        });
                                    }, function(){
                                        //取消
                                    });

                                },


                            },
                            formatter: function (value, row, index) {
                                let operate = [];
                                if(row.state ==1){


                                    operate.push(' <button style="" class="btn btn-blue update">修改</button>');
                                    operate.push(' <button class="btn btn-red delete">删除</button>');
                                }



                                return  operate.join(' ');
                            }
                        }


                    ]
                });

            });
        }
    });
})();









