(this["webpackJsonptic-tac-toe"]=this["webpackJsonptic-tac-toe"]||[]).push([[0],{14:function(e,t,a){},9:function(e,t,a){"use strict";a.r(t);var r=a(3),s=a(4),i=a(1),n=a(6),l=a(5),c=a(2),u=a.n(c),o=a(8),h=a.n(o),d=(a(14),a(0));function f(e){return Object(d.jsx)("button",{className:"square",onClick:e.onClick,children:e.value})}function j(e){for(var t=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],a=0;a<8;++a)if(e[t[a][0]]&&e[t[a][1]]===e[t[a][0]]&&e[t[a][2]]===e[t[a][0]])return e[t[a][0]];return 0}var b=function(e){Object(n.a)(a,e);var t=Object(l.a)(a);function a(e){var s;return Object(r.a)(this,a),(s=t.call(this,e)).state={firstplayer:s.props.firstplayer,difficulty:s.props.difficulty},s.handleplayerchange=s.handleplayerchange.bind(Object(i.a)(s)),s.handlediffchange=s.handlediffchange.bind(Object(i.a)(s)),s.handlesubmit=s.handlesubmit.bind(Object(i.a)(s)),s}return Object(s.a)(a,[{key:"handleplayerchange",value:function(e){this.setState({firstplayer:e.target.value})}},{key:"handlediffchange",value:function(e){this.setState({difficulty:e.target.value})}},{key:"handlesubmit",value:function(e){this.props.onstart(this.state.firstplayer,this.state.difficulty),e.preventDefault()}},{key:"render",value:function(){return Object(d.jsx)("div",{children:Object(d.jsxs)("form",{onSubmit:this.handlesubmit,children:[Object(d.jsxs)("label",{className:"firstplayer",children:["Choose first player:",Object(d.jsxs)("select",{value:this.state.firstplayer,onChange:this.handleplayerchange,children:[Object(d.jsx)("option",{value:1,children:"You"}),Object(d.jsx)("option",{value:2,children:"Computer"})]})]}),Object(d.jsxs)("label",{className:"difficulty",children:["Set difficulty:",Object(d.jsxs)("select",{value:this.state.difficulty,onChange:this.handlediffchange,children:[Object(d.jsx)("option",{value:.7,children:"Easy"}),Object(d.jsx)("option",{value:.85,children:"Medium"}),Object(d.jsx)("option",{value:1,children:"Hard"})]})]}),Object(d.jsx)("input",{className:"startbutton",type:"submit",value:"Start Game"})]})})}}]),a}(u.a.Component),v=function(e){Object(n.a)(a,e);var t=Object(l.a)(a);function a(e){var s;return Object(r.a)(this,a),(s=t.call(this,e)).state={squares:Array(9).fill(null),gamestate:null},s.compmove=s.compmove.bind(Object(i.a)(s)),s}return Object(s.a)(a,[{key:"compmove",value:function(e,t){for(var a=[],r=0,s=0;s<9;++s)0===e[s]&&(a.push(s),r++);if(Math.random()>this.props.difficulty){t[a[Math.floor(Math.random()*r)]]="O"}else{var i=O(e.slice(),2);i[0]>=0&&i[0]<9?t[i[0]]="O":this.setState({gamestate:i[1]>0?2:0===i[1]?0:1})}this.setState({squares:t});var n=j(t);(1===r||n)&&this.setState({gamestate:n})}},{key:"handleclick",value:function(e){for(var t=this.state.squares.slice(),a=Array(9).fill(0),r=0;r<9;r++)"X"===t[r]?a[r]=1:"O"===t[r]&&(a[r]=2);null!==t[e]||null!=this.state.gamestate?alert("illegal move"):(a[e]=1,t[e]="X",this.compmove(a,t))}},{key:"renderSquare",value:function(e){var t=this;return Object(d.jsx)(f,{value:this.state.squares[e],onClick:function(){return t.handleclick(e)}})}},{key:"render",value:function(){var e=null!==this.state.gamestate?0===this.state.gamestate?"Draw":"winner is "+this.state.gamestate:"Play";return this.props.reset&&(this.setState({squares:Array(9).fill(null),gamestate:null}),2==this.props.firstplayer&&this.compmove(Array(9).fill(0),Array(9).fill(null)),this.props.resetdone()),Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{className:"status",children:e}),Object(d.jsxs)("div",{className:"board-row",children:[this.renderSquare(0),this.renderSquare(1),this.renderSquare(2)]}),Object(d.jsxs)("div",{className:"board-row",children:[this.renderSquare(3),this.renderSquare(4),this.renderSquare(5)]}),Object(d.jsxs)("div",{className:"board-row",children:[this.renderSquare(6),this.renderSquare(7),this.renderSquare(8)]})]})}}]),a}(u.a.Component),p=function(e){Object(n.a)(a,e);var t=Object(l.a)(a);function a(e){var s;return Object(r.a)(this,a),(s=t.call(this,e)).state={firstplayer:1,difficulty:.7,reset:!1},s.startgame=s.startgame.bind(Object(i.a)(s)),s.resetdone=s.resetdone.bind(Object(i.a)(s)),s}return Object(s.a)(a,[{key:"startgame",value:function(e,t){this.setState({firstplayer:e,difficulty:t,reset:!0})}},{key:"resetdone",value:function(){this.setState({reset:!1})}},{key:"render",value:function(){return Object(d.jsxs)("div",{className:"game",children:[Object(d.jsx)("div",{className:"game-options",children:Object(d.jsx)(b,{firstplayer:this.state.firstplayer,difficulty:this.state.difficulty,onstart:this.startgame})}),Object(d.jsx)("div",{className:"game-board",children:Object(d.jsx)(v,{firstplayer:this.state.firstplayer,difficulty:this.state.difficulty,reset:this.state.reset,resetdone:this.resetdone})}),Object(d.jsxs)("div",{className:"game-info",children:[Object(d.jsx)("div",{}),Object(d.jsx)("ol",{})]})]})}}]),a}(u.a.Component),m={},y={};function O(e,t){for(var a=0,r=1,s=0;s<9;s++)a+=e[s]*r,r*=3;if(2===t&&a in m)return m[a];if(1===t&&a in y)return y[a];for(var i=[],n=0,l=0;l<9;++l)0===e[l]&&(i.push(l),++n);var c=j(e);if(0!==c)return 2===c?(m[a]=[-1,10+n],m[a]):(y[a]=[-1,-10-n],y[a]);if(0===n)return[-1,0];var u;u=2===t?[-1,-1/0]:[-1,1/0];for(var o=1===t?2:1,h=0;h<n;h++){e[i[h]]=t;var d=O(e,o);2===t?d[1]>u[1]&&(u=[i[h],d[1]]):d[1]<u[1]&&(u=[i[h],d[1]]),e[i[h]]=0}return 2===t?m[a]=u:y[a]=u,u}for(var g=0;g<9;++g){var x=Array(9).fill(0);x[g]=1,O(x,2)}h.a.render(Object(d.jsx)(p,{}),document.getElementById("root"))}},[[9,1,2]]]);
//# sourceMappingURL=main.811fe443.chunk.js.map