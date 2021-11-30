(function(a,b,c,d,e,f){const{registerBlockType:g,createBlock:h}=wp.blocks,{createElement:k}=wp.element,{InspectorControls:l}=wp.blockEditor,{PanelBody:m,RadioControl:n,RangeControl:o,TextControl:p,TextareaControl:q,ToggleControl:r}=wp.components,{__:s}=wp.i18n;g("wp-document-revisions/documents-shortcode",{title:s("Documents List","wp-document-revisions"),description:s("Display a list of documents.","wp-document-revisions"),category:"wpdr-category",icon:"editor-ul",attributes:{header:{type:"string",default:""},taxonomy_0:{type:"string",default:""},term_0:{type:"number",default:0},taxonomy_1:{type:"string",default:""},term_1:{type:"number",default:0},taxonomy_2:{type:"string",default:""},term_2:{type:"number",default:0},numberposts:{type:"number",default:5},orderby:{type:"string"},order:{type:"string",default:"ASC"},show_edit:{type:"string",default:""},show_thumb:{type:"boolean",default:!1},show_descr:{type:"boolean",default:!0},new_tab:{type:"boolean",default:!0},freeform:{type:"string",default:""},align:{type:"string"},backgroundColor:{type:"string"},linkColor:{type:"string"},textColor:{type:"string"},gradient:{type:"string"},fontSize:{type:"string"},style:{type:"object"}},supports:{align:!0,color:{gradients:!0,link:!0},spacing:{margin:!0,padding:!0},typography:{fontSize:!0,lineHeight:!0}},edit(a){function b(a,b,c){for(i=0;i<wpdr_data.stmax;i++)if(i!=a&&b===g[i].query){var d=g[i].terms;for(j=0,lenj=d.length;j<lenj;j++)if(c===d[j][0])return b+"=\""+d[j][2]+"\"";return b+"=\"??\""}return b+"=\"???\""}function c(a){var b=g[a].terms,c=[];for(j=0,lenj=b.length;j<lenj;j++)c.push({label:b[j][1],value:b[j][0]});return 0==a?(e({taxonomy_0:g[0].query}),k(m,{title:s("Taxonomy: ","wp-document-revisions")+g[0].label,initialOpen:!1},[k(n,{label:g[0].label,selected:d.term_0,options:c,onChange:function(a){e({term_0:parseInt(a)})}})])):1==a?(e({taxonomy_1:g[1].query}),k(m,{title:s("Taxonomy: ","wp-document-revisions")+g[1].label,initialOpen:!1},[k(n,{label:g[1].label,selected:d.term_1,options:c,onChange:function(a){e({term_1:parseInt(a)})}})])):2==a?(e({taxonomy_2:g[2].query}),k(m,{title:s("Taxonomy: ","wp-document-revisions")+g[2].label,initialOpen:!1},[k(n,{label:g[2].label,selected:d.term_2,options:c,onChange:function(a){e({term_2:parseInt(a)})}})])):void 0}const d=a.attributes,e=a.setAttributes;var g=wpdr_data.taxos;return 0<wpdr_data.stmax&&""!==d.taxonomy_0&&d.taxonomy_0!==g[0].query&&(e({freeform:d.freeform+" "+b(0,d.taxonomy_0,d.term_0)}),e({taxonomy_0:g[0].query}),e({term_0:0})),1<wpdr_data.stmax&&""!==d.taxonomy_1&&d.taxonomy_1!==g[1].query&&(e({freeform:d.freeform+" "+b(1,d.taxonomy_1,d.term_1)}),e({taxonomy_1:g[1].query}),e({term_1:0})),2<wpdr_data.stmax&&""!==d.taxonomy_2&&d.taxonomy_2!==g[2].query&&(e({freeform:d.freeform+" "+b(2,d.taxonomy_2,d.term_2)}),e({taxonomy_2:g[2].query}),e({term_2:0})),k("div",{},[k(f,{block:"wp-document-revisions/documents-shortcode",attributes:d}),k(l,{},[k(p,{type:"string",value:d.header,label:s("Block Heading","wp-document-revisions"),onChange:function(a){e({header:a})}}),function(){if(0==wpdr_data.stmax)return k("p",{},s("There are no taxonomies defined.","wp-document-revisions"));for(var a=[],b=0;b<wpdr_data.stmax;b++)a.push(c(b));return a}(),k(m,{title:s("Display Settings","wp-document-revisions"),initialOpen:!1},[k(o,{value:d.numberposts,label:s("Number of documents to display","wp-document-revisions"),onChange:function(a){e({numberposts:parseInt(a)})},min:1,step:1}),k(p,{type:"string",value:d.orderby,label:s("List ordering Field","wp-document-revisions"),help:s("Example fields are post_title, post_date and post_modified.","wp-document-revisions"),onChange:function(a){e({orderby:a})}}),k(n,{label:s("Order sequence"),selected:d.order,options:[{label:s("Ascending","wp-document-revisions"),value:"ASC"},{label:s("Descending","wp-document-revisions"),value:"DESC"}],onChange:function(a){e({order:a})}}),k(n,{label:s("Show Edit link","wp-document-revisions"),help:s("Show Edit link allows the list to have a link to the Edit function. A choice made here will over-ride the system-configured settings. Links will only appear if the user can edit the document.","wp-document-revisions"),selected:d.show_edit,options:[{label:s("Default","wp-document-revisions"),value:""},{label:s("No Edit link","wp-document-revisions"),value:"0"},{label:s("Edit link","wp-document-revisions"),value:"1"}],onChange:function(a){e({show_edit:a})}}),k(r,{type:"boolean",checked:d.show_thumb,label:s("Show featured image?","wp-document-revisions"),onChange:function(a){e({show_thumb:a})}}),k(r,{type:"boolean",checked:d.show_descr,label:s("Show document description?","wp-document-revisions"),onChange:function(a){e({show_descr:a})}}),k(r,{type:"boolean",checked:d.new_tab,label:s("Open documents in new tab?","wp-document-revisions"),help:s("Setting this on will open the document in a new tab. This should be set on whilst editing the page using this block as clicking on a link whilst editing will force the current page to be left.","wp-document-revisions"),onChange:function(a){e({new_tab:a})}})]),k(m,{title:s("Free Form Settings","wp-document-revisions"),initialOpen:!1},[k(q,{type:"string",rows:8,value:d.freeform,label:s("Free-form parameters","wp-document-revisions"),help:s("The query parameters can be very extensive. enter any other parameters required here.","wp-document-revisions"),onChange:function(a){e({freeform:a})}})])])])},save(){return null},transforms:{from:[{type:"block",blocks:["core/shortcode"],isMatch:function({text:a}){return /^\[?documents\b\s*/.test(a)},transform:({text:a})=>{function b(a,b){var c=w[a].terms,d=b.replace(/_/g,"-");for(j=0,lenj=c.length;j<lenj;j++)if(b===c[j][2]||d===c[j][2])return c[j][0];return 0}var c="",d=0,e="",f=0,g="",k=0,l=5,m="",n="",o="",p=!1,q=!0,r=!0,s="",t=a.toLowerCase();0==t.indexOf("[")&&(t=t.slice(1,t.length-1));var u=t.split(" ");u.shift();var v,w=wpdr_data.taxos,x=wpdr_data.wf_efpp;for(v of u)if(0!==v.length){var y=!1,z=v.split("=");1<z.length&&(0===z[1].indexOf("'")||0===z[1].indexOf("\""))&&(z[1]=z[1].slice(1,z[1].length-1)),"1"===x&&"workflow_state"===z[0]&&(z[0]="post_status"),0<wpdr_data.stmax&&z[0]===w[0].query&&(c=z[0],d=b(0,z[1]),y=!0),1<wpdr_data.stmax&&z[0]===w[1].query&&(e=z[0],f=b(1,z[1]),y=!0),2<wpdr_data.stmax&&z[0]===w[2].query&&(g=z[0],k=b(2,z[1]),y=!0),"number"===z[0]&&(l=+z[1],y=!0),"numberposts"===z[0]&&(l=+z[1],y=!0),"orderby"===z[0]&&(m=z[1],y=!0),"order"===z[0]&&(n=z[1].toUpperCase(),y=!0),"show_edit"===z[0]&&(o=z[1],y=!0),"show_thumb"===z[0]&&((1===z.length||"true"===z[1])&&(p=!0),y=!0),"show_descr"===z[0]&&(2===z.length&&"false"===z[1]&&(q=!1),y=!0),"new_tab"===z[0]&&(2===z.length&&"false"===z[1]&&(r=!1),y=!0),!1==y&&(s+=" "+v)}return h("wp-document-revisions/documents-shortcode",{header:"",taxonomy_0:c,term_0:d,taxonomy_1:e,term_1:f,taxonomy_2:g,term_2:k,numberposts:l,orderby:m,order:n,show_edit:o,show_thumb:p,show_descr:q,new_tab:r,freeform:s.trim()})}}],to:[{type:"block",blocks:["core/shortcode"],transform:a=>{function b(a,b){var c=d[a].terms;for(j=0,lenj=c.length;j<lenj;j++)if(b===c[j][0])return"\""+c[j][2]+"\"";return"??"}function c(a,c){if(""!==a&&0!=c){for(var f in[0,1,2])if(a===d[f].query)return void(e+=" "+a+"="+b(f,c));e+=" "+a+"="+c}}var d=wpdr_data.taxos,e="[documents ";return c(a.taxonomy_0,a.term_0),c(a.taxonomy_1,a.term_1),c(a.taxonomy_2,a.term_2),""!==a.numberposts&&(e+=" numberposts=\""+a.numberposts+"\""),void 0!==a.orderby&&""!==a.orderby&&(e+=" orderby=\""+a.orderby+"\""),""!==a.order&&void 0!==a.orderby&&""!==a.orderby&&(e+=" order=\""+a.order+"\""),""!==a.show_edit&&(e+=" show_edit=\""+a.show_edit+"\""),a.show_thumb&&(e+=" show_thumb"),a.show_descr&&(e+=" show_descr"),a.new_tab&&(e+=" new_tab"),""!==a.freeform&&void 0!==a.freeform&&(e+=" "+a.freeform),e+=" ]",h("core/shortcode",{text:e})}}]}})})(window.wp.blocks,window.wp.element,window.wp.blockEditor,window.wp.components,window.wp.compose,window.wp.serverSideRender,window.wp.i18n);