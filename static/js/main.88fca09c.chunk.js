(this["webpackJsonpreact-sheets"]=this["webpackJsonpreact-sheets"]||[]).push([[0],{39:function(e,t,l){e.exports=l(50)},50:function(e,t,l){"use strict";l.r(t);var n,a=l(0),r=l.n(a),c=l(20),o=l.n(c),i=l(16),s=l(31),u=l(12),m=l(8),h=l(9),p=l(17),d=l(18),f=function(e){Object(d.a)(l,e);var t=Object(p.a)(l);function l(){var e;Object(m.a)(this,l);for(var n=arguments.length,a=new Array(n),r=0;r<n;r++)a[r]=arguments[r];return(e=t.call.apply(t,[this].concat(a))).onChange=function(t){e.props.updateEditingCell(t.target.value)},e.onEditCell=function(t){e.props.editCell(e.props.name,!0)},e.onSelectCell=function(t){e.props.selectCell(e.props.name,!0)},e.onEditingKeyDown=function(t){9===t.which?e.nextElement("Column",t,!1,!0):13===t.which?e.nextElement("Row",t,!1,!0):37===t.which?e.nextElement("Column",t,!0,!0):38===t.which?e.nextElement("Row",t,!0,!0):39===t.which?e.nextElement("Column",t,!1,!0):40===t.which?e.nextElement("Row",t,!1,!0):27===t.which&&e.props.selectCell(e.props.name,!0)},e.onSelectedKeyDown=function(t){113===t.which||13===t.which?(t.preventDefault(),e.props.editCell(e.props.name,!0)):9===t.which?e.nextElement("Column",t):37===t.which?e.nextElement("Column",t,!0):38===t.which?e.nextElement("Row",t,!0):39===t.which?e.nextElement("Column",t):40===t.which?e.nextElement("Row",t):e.printableKey(t.which)&&(t.preventDefault(),e.props.editCell(e.props.name,!0,e.printableKey(t.which)))},e.nextElement=function(t,l){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=arguments.length>3&&void 0!==arguments[3]&&arguments[3];l.preventDefault();var r=n?"previous":"next";a&&e.props.updateCell(e.props.name,l.target.value),e.props["".concat(r).concat(t)]()},e.onBlur=function(t){e.props.updateCell(e.props.name,t.target.value)},e}return Object(h.a)(l,[{key:"componentDidMount",value:function(){this.field&&this.field.focus()}},{key:"componentDidUpdate",value:function(){this.field&&this.field.focus()}},{key:"printableKey",value:function(e){return e>=48&&e<=90?String.fromCharCode(e):e>=96&&e<=105?String.fromCharCode(e-48):187===e&&"="}},{key:"render",value:function(){var e=this;return this.props.selected?this.props.editing?r.a.createElement("div",{className:"cell selected"},r.a.createElement("input",{onKeyDown:this.onEditingKeyDown,onChange:this.onChange,onBlur:this.onBlur,type:"text",value:this.props.selectedCell.tempFormula,autoFocus:!0})):r.a.createElement("div",{ref:function(t){return e.field=t},className:"cell selected",onClick:this.onSelectCell,onDoubleClick:this.onEditCell,onKeyDown:this.onSelectedKeyDown,tabIndex:"0"},r.a.createElement("div",null,this.props.cell.value||"\xa0")):r.a.createElement("div",{className:"cell",onClick:this.onSelectCell,onDoubleClick:this.onEditCell},r.a.createElement("div",null,this.props.cell.value||"\xa0"))}}]),l}(r.a.Component),v=(n=Object(i.b)((function(e,t){var l=e.sheet.sheet.findCell(t.name);return{selectedCell:e.sheet.selectedCell,cell:l}}),{updateCell:function(e,t){return{type:"UPDATE_CELL",payload:{cellName:e,formula:t}}},updateEditingCell:function(e){return{type:"UPDATE_EDITING_CELL",payload:e}},editCell:function(e,t,l){return{type:"EDIT_CELL",payload:{name:e,selected:t,value:l}}},selectCell:function(e,t){return{type:"SELECT_CELL",payload:{name:e,selected:t}}},nextColumn:function(){return{type:"NEXT_COLUMN"}},nextRow:function(){return{type:"NEXT_ROW"}},previousColumn:function(){return{type:"PREVIOUS_COLUMN"}},previousRow:function(){return{type:"PREVIOUS_ROW"}}})(f),function(e){Object(d.a)(l,e);var t=Object(p.a)(l);function l(){return Object(m.a)(this,l),t.apply(this,arguments)}return Object(h.a)(l,[{key:"showSquare",value:function(){if(this.props.selected&&!this.props.editing)return r.a.createElement("div",{className:"cell-square"})}},{key:"render",value:function(){return r.a.createElement("td",{className:this.props.selected?"selected":""},r.a.createElement("div",{className:"cell-wrapper"},r.a.createElement(n,Object.assign({},this.props,{selected:this.props.selected,editing:this.props.editing})),this.showSquare()))}}]),l}(a.Component)),E=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],C=function(e){return E[e]},y=function(e){return e+1},w=function(e,t){return"".concat(C(t)).concat(y(e))},g=function(e){return{row:(l=e[1],parseInt(l)-1),column:(t=e[0],E.indexOf(t.toUpperCase()))};var t,l},b=function(e){Object(d.a)(l,e);var t=Object(p.a)(l);function l(){return Object(m.a)(this,l),t.apply(this,arguments)}return Object(h.a)(l,[{key:"renderCells",value:function(){var e=this;return r.a.createElement("table",{className:"sheet-table"},r.a.createElement("thead",{style:{textAlign:"right"}},r.a.createElement("tr",null,r.a.createElement("th",{className:"column-header"}),this.props.cells[0].map((function(t,l){var n,a,c;return r.a.createElement("th",{key:"c".concat(l),className:"column-header ".concat((a=null===(n=e.props.selectedCell)||void 0===n?void 0:n.name,c=t.getName(),a&&c&&g(a).column===g(c).column?"selected":""))},r.a.createElement("div",null,C(l)))})))),r.a.createElement("tbody",null,this.props.cells.map((function(t,l){return r.a.createElement("tr",{key:l},t.map((function(t,n){var c,o,i,s,u;return r.a.createElement(a.Fragment,{key:n},0===n?r.a.createElement("th",{className:"row-header ".concat((s=null===(c=e.props.selectedCell)||void 0===c?void 0:c.name,u=t.getName(),s&&u&&g(s).row===g(u).row?"selected":""))},r.a.createElement("div",null,y(l))):r.a.createElement(r.a.Fragment,null),r.a.createElement(v,{name:t.getName(),selected:(null===(o=e.props.selectedCell)||void 0===o?void 0:o.name)===t.getName(),editing:(null===(i=e.props.selectedCell)||void 0===i?void 0:i.name)===t.getName()&&e.props.selectedCell.editing}))})))}))))}},{key:"render",value:function(){return r.a.createElement("div",null,this.renderCells())}}]),l}(r.a.Component),O=Object(i.b)((function(e){return{cells:e.sheet.sheet.cells,selectedCell:e.sheet.selectedCell}}),{})(b),k=l(5),N=Object(k.a)(),j=function(){return r.a.createElement("div",{className:"help"},r.a.createElement("p",null,"This app is a work in progress by"," ",r.a.createElement("a",{href:"https://www.linkedin.com/in/diegostiehl",rel:"noopener noreferrer",target:"_blank"},"Diego Stiehl"),". You can see its code here:"," ",r.a.createElement("a",{href:"https://github.com/seccomiro/react-sheets",rel:"noopener noreferrer",target:"_blank"},"https://github.com/seccomiro/react-sheets"),"."),r.a.createElement("p",null,"At this point in time you can:"),r.a.createElement("ul",null,r.a.createElement("li",null,"Navigate through cells (enabling editing of them) using ",r.a.createElement("em",null,"TAB"),","," ",r.a.createElement("em",null,"ENTER"),", ",r.a.createElement("em",null,"arrows")," and ",r.a.createElement("em",null,"mouse"),"."),r.a.createElement("li",null,"Edit cells using ",r.a.createElement("em",null,"F2")," and ",r.a.createElement("em",null,"ENTER"),"."),r.a.createElement("li",null,"Cancel editing using ",r.a.createElement("em",null,"ESC"),"."),r.a.createElement("li",null,"Type numeric values, like ",r.a.createElement("em",null,"10")," or ",r.a.createElement("em",null,"99.56")," at any available cell."),r.a.createElement("li",null,"Type simple math formulas using the cells, like:"," ",r.a.createElement("em",null,"=A1+(B2/C3)*D5-10")," (try to avoid circular references because it's not solved yet)."),r.a.createElement("li",null,"Edit the values of cells yout pointed on any formula and watch the"," ",r.a.createElement("em",null,"automatic recalculation")," of the entire spreadsheet.",r.a.createElement("ul",null,r.a.createElement("li",null,"Tip: Try to write a formula that depends on two cells that have formulas that depends on other cells that have regular numbers and, after that, change these regular numbers.")))))},_=function(){return r.a.createElement("div",null,r.a.createElement(s.a,{history:N,basename:"/react-sheets"},r.a.createElement(u.c,null,r.a.createElement(u.a,{path:"/",exact:!0,component:O}))),r.a.createElement(j,null))},D=l(11),L=l(33),x=l(7),S=l(34),T=l.n(S),R=l(37),U=l(52),F=/([+,*,/,=,\-,(,)])/g,I=function(e){return!P(e)&&""!==e&&"="!==e&&!e.match(F)},P=function(e){return!isNaN(e)},A=function(){function e(t){var l=t.sheet,n=t.formula,a=void 0===n?"0":n,r=t.value,c=void 0===r?"0":r;Object(m.a)(this,e),this.sheet=l,this.formula=a,this.value=c,this.listeners=new Set,this.pointedCells={}}return Object(h.a)(e,[{key:"setFormula",value:function(e){this.formula=e;var t=function(e){var t=e.split(F).filter((function(e){return I(e.trim())}));return Object(R.a)(new Set(t))}(e);this.pointedCells=this.sheet.register(this,t),this.evaluate()}},{key:"registerListener",value:function(e){this.listeners.add(e)}},{key:"getName",value:function(){return this.sheet.getCellName(this)}},{key:"evaluate",value:function(){var e,t;this.formula.startsWith("=")?this.value=(e=this.formula.substring(1,this.formula.length),t=this.pointedCellParams(),Object(U.a)(e,t)):this.value=this.formula,this.listeners.forEach((function(e){return e.evaluate()}))}},{key:"pointedCellParams",value:function(){var e=this,t={};return Object.keys(this.pointedCells).forEach((function(l){return t[l]=e.pointedCells[l].value})),t}}]),e}(),K={sheet:new(function(){function e(t){var l=t.rows,n=t.columns,a=t.name;Object(m.a)(this,e),this.cellNames=new Map,this.cells=this.createCells(l,n),this.name=a}return Object(h.a)(e,[{key:"register",value:function(e,t){var l=this;return t.map((function(e){return l.findCell(e)})).forEach((function(t){return t.registerListener(e)})),this.cellMap(t)}},{key:"cellMap",value:function(e){var t=this,l={};return e.forEach((function(e){var n=t.findCell(e);l[e]=n})),l}},{key:"findCell",value:function(e){var t=g(e);return this.cells[t.row][t.column]}},{key:"updateCell",value:function(e,t){this.findCell(e).setFormula(t)}},{key:"createCells",value:function(e,t){for(var l=[],n=0;n<e;n++){l[n]=[];for(var a=0;a<t;a++){var r=new A({sheet:this,formula:"",value:""});l[n][a]=r,this.cellNames.set(r,w(n,a))}}return l}},{key:"getCellName",value:function(e){return this.cellNames.get(e)}},{key:"size",value:function(){return{rows:this.rows(),columns:this.columns()}}},{key:"rows",value:function(){return this.cells.length}},{key:"columns",value:function(){return this.cells[0].length}},{key:"nextRow",value:function(e){var t=g(e),l=t.row===this.rows()-1?0:t.row+1;return w(l,t.column)}},{key:"nextColumn",value:function(e){var t=g(e),l=t.column===this.columns()-1?0:t.column+1;return w(t.row,l)}},{key:"previousRow",value:function(e){var t=g(e),l=0===t.row?this.rows()-1:t.row-1;return w(l,t.column)}},{key:"previousColumn",value:function(e){var t=g(e),l=0===t.column?this.columns()-1:t.column-1;return w(t.row,l)}}]),e}())({rows:9,columns:26,name:"Sheet 1"}),selectedCell:{name:"A1",editing:!1,tempFormula:""}},M=Object(D.c)({sheet:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:K,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_EDITING_CELL":return T()(e,{selectedCell:{tempFormula:{$set:t.payload.toUpperCase()}}});case"UPDATE_CELL":var l=t.payload,n=l.cellName,a=l.formula;return e.sheet.updateCell(n,a),e;case"SELECT_CELL":return Object(x.a)({},e,{selectedCell:t.payload.selected?{name:t.payload.name,tempFormula:e.sheet.findCell(t.payload.name).formula,editing:!1}:void 0});case"EDIT_CELL":return Object(x.a)({},e,{selectedCell:t.payload.selected?{name:t.payload.name,tempFormula:t.payload.value||e.sheet.findCell(t.payload.name).formula,editing:!0}:void 0});case"NEXT_COLUMN":var r=e.sheet.nextColumn(e.selectedCell.name),c=e.sheet.findCell(r).formula;return Object(x.a)({},e,{selectedCell:Object(x.a)({},e.selectedCell,{name:r,tempFormula:c,editing:!1})});case"NEXT_ROW":var o=e.sheet.nextRow(e.selectedCell.name),i=e.sheet.findCell(o).formula;return Object(x.a)({},e,{selectedCell:Object(x.a)({},e.selectedCell,{name:o,tempFormula:i,editing:!1})});case"PREVIOUS_COLUMN":var s=e.sheet.previousColumn(e.selectedCell.name),u=e.sheet.findCell(s).formula;return Object(x.a)({},e,{selectedCell:Object(x.a)({},e.selectedCell,{name:s,tempFormula:u,editing:!1})});case"PREVIOUS_ROW":var m=e.sheet.previousRow(e.selectedCell.name),h=e.sheet.findCell(m).formula;return Object(x.a)({},e,{selectedCell:Object(x.a)({},e.selectedCell,{name:m,tempFormula:h,editing:!1})});default:return e}}}),X=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||D.d,B=Object(D.e)(M,X(Object(D.a)(L.a)));o.a.render(r.a.createElement(i.a,{store:B},r.a.createElement(_,null)),document.querySelector("#root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.88fca09c.chunk.js.map