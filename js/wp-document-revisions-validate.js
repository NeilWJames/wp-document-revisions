function wpdr_valid_fix(a,b,c){var d=wpApiSettings.root+"wpdr/v1/correct/"+a+"/type/"+b+"/attach/"+c;jQuery.ajax({type:"PUT",url:d,beforeSend:function(a){a.setRequestHeader("X-WP-Nonce",nonce)},data:{userid:user},success:function(){clear_line(a)},error:function(a){alert(a.failureMessage)}})}function clear_line(a){var b=document.getElementById("Line"+a),c=b.getElementsByTagName("td");c[3].innerHTML=processed,c[4].innerHTML="",document.getElementById("on_"+a).style.display="none",document.getElementById("off"+a).style.display="block"}
