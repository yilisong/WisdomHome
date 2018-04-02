<template>
  <div>
    <div id="areaTree">
      <div class="tree-box">
        <div class="zTreeDemoBackground left">
          <ul id="treeDemo" class="ztree"></ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: 'areaTree',
    components:{},
    data(){
      return{
        ztreeNot:-1,
        setting:{
          edit: {
            enable: true,
            drag: {
              isCopy: false,
              isMove: true,
              prev:true,
              inner:true,
              next:true
            },
          },
          callback:{
            beforeCheck:true,
            onClick:this.zTreeOnClick
          },
          view :{
            showIcon: false,
            fontCss: this.getFontCss
          }
        },
        zNodes:[
          { name: '新青浦家园', open: true,
            children: [
              { name: '全部抓拍',
                children: [
                  { name:"1"},
                  { name:"2"},
                  { name:"3"},
                  { name:"4"}
                ]},
              { 
                name:"人脸卡口",
                children: [
                  { name:"1"},
                  { name:"2"},
                  { name:"3"},
                  { name:"4"}
                ]
              },
              { 
                name:"摄像机",
                children: [
                  { name:"1"},
                  { name:"2"},
                  { name:"3"},
                  { name:"4"}
                ]
              },
              { 
                name:"门禁",
                children: [
                  { name:"1"},
                  { name:"2"},
                  { name:"3"},
                  { name:"4"}
                ]
              },
              { 
                name:"车辆卡口",
                children: [
                  { name:"1"},
                  { name:"2"},
                  { name:"3"},
                  { name:"4"}
                ]
              }
            ]
          }
        ]
      }
    },
    methods:{
      zTreeOnClick(event, treeId, treeNode) {
         console.log(treeNode.tId + ", " + treeNode.name,treeNode,treeNode.parentTId);
      },
      getFontCss(treeId, treeNode) {
        return (!!treeNode.highlight) ? {color: "#A60000", "font-weight": "bold"} : {
          color: "#333",
          "font-weight": "normal"
        };
        //return treeNode.level == 0 ? {color:"red"} : {};
      },
      /**
       * 收起树：只展开根节点下的一级节点
       * @param treeId
       */
      close_ztree(treeId) {
        var treeObj = $.fn.zTree.getZTreeObj(treeId);
        var nodes = treeObj.transformToArray(treeObj.getNodes());
        var nodeLength = nodes.length;
        for(var i = 0; i < nodeLength; i++) {
          if(nodes[i].id == '0') {
            //根节点：展开
            treeObj.expandNode(nodes[i], true, true, false);
          } else {
            //非根节点：收起
            treeObj.expandNode(nodes[i], false, true, false);
          }
        }
      },
      /**
       * 高亮显示并展示【指定节点s】
       * @param treeId
       * @param highlightNodes 需要高亮显示的节点数组
       * @param flag           需要高亮显示的节点标识
       */
      highlightAndExpand_ztree(treeId, highlightNodes, tx, flag) {
          var treeObj = $.fn.zTree.getZTreeObj(treeId);
          //<1>. 先把全部节点更新为普通样式
          var treeNodes = treeObj.transformToArray(treeObj.getNodes());
          for(var i = 0; i < treeNodes.length; i++) {
            treeNodes[i].highlight = false;
            treeObj.updateNode(treeNodes[i]);
          }
          //<2>.收起树, 只展开根节点下的一级节点
          this.close_ztree(treeId);
          //<3>.把指定节点的样式更新为高亮显示，并展开
          if(highlightNodes != null) {
            let expanNodes = []
            expanNodes = treeObj.getNodesByParamFuzzy("name", tx, null);
            this.ztreeNot+=1;
            console.log(this.ztreeNot)
            treeObj.selectNode(expanNodes[this.ztreeNot]);
            for(var i = 0; i < highlightNodes.length; i++) {
              if(flag != null && flag != "") {
                if(highlightNodes[i].flag == flag) {
                  //高亮显示节点，并展开
                  highlightNodes[i].highlight = true;
                  treeObj.updateNode(highlightNodes[i]);
                  //高亮显示节点的父节点的父节点....直到根节点，并展示
                  var parentNode = highlightNodes[i].getParentNode();
                  var parentNodes = this.getParentNodes_ztree(treeId, parentNode);
                  treeObj.expandNode(parentNodes, true, false, true);
                  treeObj.expandNode(parentNode, true, false, true);
                }
              } else {
                //高亮显示节点，并展开
                //  let t = highlightNodes[i].name;
                //  t = t.replace(eval("/" + tx + "/gi"), "<span style='background-color: yellow;color:red'>" + tx + "</span>");
                //  highlightNodes[i].name = t;

                let hight = highlightNodes[i].highlight = true;
                this.getFontCss(treeId,hight);
                treeObj.updateNode(highlightNodes[i]);
                //高亮显示节点的父节点的父节点....直到根节点，并展示
                var parentNode = highlightNodes[i].getParentNode();
                var parentNodes = this.getParentNodes_ztree(treeId, parentNode);
                treeObj.expandNode(parentNodes, true, false, true);
                treeObj.expandNode(parentNode, true, false, true);
              }
            }
          }
        },

      /**
       * 递归得到指定节点的父节点的父节点....直到根节点
       */
       getParentNodes_ztree(treeId, node) {
        if(node != null) {
          var treeObj = $.fn.zTree.getZTreeObj(treeId);
          var parentNode = node.getParentNode();
          return this.getParentNodes_ztree(treeId, parentNode);
        } else {
          return node;
        }
      },

      /**
       * 设置树节点字体样式
       */
       setFontCss_ztree(treeId, treeNode) {
            if(treeNode.id == 0) {
              //根节点
              return {
                color: "#333",
                "font-weight": "bold"
              };
            } else if(treeNode.isParent == false) {
              //叶子节点
              return(!!treeNode.highlight) ? {
                color: "#ff0000",
                "font-weight": "bold"
              } : {
                color: "#660099",
                "font-weight": "normal"
              };
            } else {
              //父节点
              return(!!treeNode.highlight) ? {
                color: "#ff0000",
                "font-weight": "bold"
              } : {
                color: "#333",
                "font-weight": "normal"
              };
            }
          }
        },
        mounted(){
          $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
          // let treeObj = $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
          // let nodes = treeObj.getNodes();
          // treeObj.moveNode(nodes[0], nodes[1], "inner");
        }
  }
</script>
<style>
  #areaTree{
    margin-bottom: 2px;
    border-radius: 4px;
    overflow: hidden;
    color: #fff!important;
  }
  .ztree li {
    padding: 0;
    margin: 15px 0;
    list-style: none;
    line-height: 14px;
    text-align: left;
    white-space: nowrap;
    outline: 0;
  }
  .ztree li span {
    line-height: 20px;
    margin-right: 2px;
  }
  .ztree li a {
    color: #fff!important;
  }
  .ztree li a.curSelectedNode {
    display: inline-block;
    height: 20px;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #104f90;
    color: #fff;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 0px 9px;
    font-size: 14px;
    border-radius: 16px;
    border-color: #409EFF;
    background-color: rgba(16, 79, 144, .5);
  }
  .ztree li span.button.edit, .ztree li span.button.remove {
    margin-right: 6px;
    margin-left: 10px;
    display: none!important;
  }
</style>
