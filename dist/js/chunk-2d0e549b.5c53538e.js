(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e549b"],{"949c":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"overflow-wrapper"},[a("RouterView"),a("VanTabbar",{attrs:{"active-color":"#FFBC00"},on:{change:e.handleTabChange},model:{value:e.active,callback:function(t){e.active=t},expression:"active"}},[a("VanTabbarItem",{attrs:{icon:"records"}},[e._v("\n      课程记录\n    ")]),a("VanTabbarItem",{attrs:{icon:"user-circle-o"}},[e._v("\n      我\n    ")])],1)],1)},c=[],i={"/class_list":0,"/mine":1},s={name:"App",data:function(){return{active:0,isAdmin:!0,routes:{0:"/class_list",1:"/mine"}}},created:function(){this.active=i[this.$route.path]},methods:{handleTabChange:function(e){this.$router.push({path:this.routes[e]})}}},r=s,o=a("2877"),l=Object(o["a"])(r,n,c,!1,null,null,null);t["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2d0e549b.5c53538e.js.map