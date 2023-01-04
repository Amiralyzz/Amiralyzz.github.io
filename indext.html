<!DOCTYPE html>
<html lang="En">
<head>
    
    <title>CBC - Lab Interpretator</title>
    
</head>
<body>
<style>
body {
    background-color: rgba(0, 0, 39, 0.815);
    font-size: 20px;
    color:white;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;

}

.tooltip {
  position: relative;
  display: inline-block;
  border: none;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 300px;
  background-color: rgb(70, 70, 70);
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 20px;
  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  opacity: 0;
  transition: opacity 0.2s;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

.tooltip .tooltiptext::after {
  content: " ";
  position: absolute;
  top: 100%; /* At the bottom of the tooltip */
  left: 5%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}


#logo {
    float: left;
    width: 50px;
    height: 50px;
    position:inherit;
    margin-top: 5px;
    margin-left: 8px;
}

h1 {
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    color: rgb(178, 173, 212);
    outline-color: black;
    outline-width: 10px;
    font-size:50px;
    letter-spacing:3px;
    margin-bottom: 0px;
    padding-bottom: 0px;
    margin-left: 0px;
    margin-top: 0px;
    text-align: left;
    display: inline-block;
}
#top {
    
    color:rgb(156, 156, 156);
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    text-align: left;
    font-size: 35px;
    display: inline;

}

table {
  vertical-align: middle;
  border-radius: 20px;
    border-color: darkslategray;
    border-width: 10px;
    border-style: solid;
    vertical-align: middle;
    font-size: 25px;
    text-align: center;
    margin: 10px 30px;
}
table.ident {
  border-color: rgb(54, 47, 79)
}
.space{
  width: 90%;
}
table.lab tr td:nth-child(3) {
  width: 10%;
}

tr:hover {
  background-color: darkslategray;
}
table.ident tr:hover {
  background-color: rgb(54, 47, 79);
}

tr.idee td {
  border: none;
}
td {
  
  border-top: 1px solid darkslategray;
}
h3 {
    color: white;
    font-size: 20px;
    display: inline;
}
h4 {
    color: white;
    font-size: 20px;
    display: inline;
}
.inp {
    background-color: transparent;
    color: white;
    border: transparent;
    font-size: 20px;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    width: 70px;
}

.max {
    color: white;
    display: inline;
    float: right;
}

header {
    /*border: 4px;
    border-style: solid;
    border-radius: 20px;
    border-color: cornflowerblue;
    background-color: rgb(27, 53, 53);
    */
    margin: 10px 10px;
    padding: auto;

}

.range_inpn {
    background-color: transparent;
    color: white;
    border: transparent;
    font-size: 20px;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    width: 50px;
}
.range_inpx {
    background-color: transparent;
    color: white;
    border: transparent;
    font-size: 20px;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    width: 50px;
    text-align: right;

}

.gend {
  background-color: transparent;
    border-color: transparent;
    margin-right: 10px;
}
.reseet {
    background-color: transparent;
    border-color: transparent;
    margin-right: 10px;
    cursor: pointer;
}

#res_lft {
    transition: transform .2s;
}
#res_lft:hover {
    transform: scale(2);
}
#res_lft:active {
  transform: scale(0.9);
}



fieldset {
    border-radius: 30px;
    border-color: darkslategray;
    border-width: 10px;
    border-style: solid;
    vertical-align: middle;
    
  }

#gen_icon {

    height:34px; 
    width:34px;
    padding-left: 5px;
    transition: transform .2s;
    cursor: pointer;
  }

#gen_icon:hover {
    transform: scale(1.5);
}

#gen_icon:active {
    transform: scale(0.9) ;
    
}
#preg {
    margin-left: 50px;
    font-size: 20px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    background-color: transparent;
    color: white;
    border: transparent;
    cursor: pointer;
}

option {
    color: darkslategray;
    background-color: white;
    cursor: pointer;
}

option::selection {
    color: white;
    background-color: darkslategray;
    cursor: pointer;
}

.maxminicon {
  height:15px; 
  width:15px;
  display: inline-block;
  vertical-align:middle;
}

#res_lft {
  height:30px; 
  width:30px;
  vertical-align: top;
}


</style>
    <script>
function    gender() {
    var maleicon = "https://cdn-icons-png.flaticon.com/512/2404/2404544.png";
    var femaleicon = "https://cdn-icons-png.flaticon.com/512/2404/2404482.png";
    if (document.getElementById("gen_icon").src == maleicon) {
        window.setTimeout(function() { document.getElementById("gen_icon").src = femaleicon;
        document.getElementById("preg").style.display = "inline";} , 150)
       
    }
    else {
        window.setTimeout(function() {document.getElementById("gen_icon").src = maleicon;
        document.getElementById("preg").style.display = "none";},150)
    }
}

function check_range(id,minn,maxx,out) {
    if (minn!=0) check_range_validity(minn,maxx);
    if (id=="bild" || id=="bilt") bili_check();
    var xs = document.getElementById(id).value;
    if (xs==0) document.getElementById(out).innerHTML = "";
    var y = "Normal";
    var c = "white";
    if (minn!=0) var mins = document.getElementById(minn).value;
    var maxs = document.getElementById(maxx).value;
    var x = Number(xs);
    if (minn!=0) var min = Number(mins);
    var max = Number(maxs);
    if (minn!=0) {
        if (x>max) {
            y = "Increased";
            c = "lightpink";
        }
        else if (x<min) {
            y = "Decreased";
            c = "lightgreen";
            }
        else {
            y = "Normal";
            c = "white";
            }   
            
    } else {
        if (x>max) {
            y = "Increased";
            c = "lightpink";
        }
        else {
            y = "Normal";
            c = "white";
            }   
    }
    document.getElementById(out).style.color = c;
    if(xs!="") document.getElementById(out).innerHTML = y;
}

function    check_range_validity(minn,maxx) {
    var mins = document.getElementById(minn).value;
    var maxs = document.getElementById(maxx).value;
    var min = Number(mins);
    var max = Number(maxs);
    if(min>max) {
        document.getElementById(minn).value = max;
        document.getElementById(maxx).value = max;
    }
}

function    reset_ranges(minn,maxx,min,max,id,out) {
    if (minn!=0)    document.getElementById(minn).value = min;
    document.getElementById(maxx).value = max;
    check_range(id,minn,maxx,out);
}

function    bili_check() {
    var bildd = document.getElementById("bild").value;
    var biltt = document.getElementById("bilt").value;
    var mins = document.getElementById("bild_rx").value;
    var maxs = document.getElementById("bilt_rx").value;
    var bild = Number(bildd);
    var bilt = Number(biltt);
    var min = Number(mins);
    var max = Number(maxs);
    if(bild>bilt) {
        document.getElementById("bild").value = bilt;
        document.getElementById("bilt").value = bilt;
    }
    if(min>max) {
        document.getElementById("bild_rx").value = max;
        document.getElementById("bilt_rx").value = max;
    }
}

</script>
    <!---                           --->
    <header>
        <img src="https://cdn-icons-png.flaticon.com/512/8045/8045916.png" id="logo">
        <h1>CBC</h1>
        <div id="top"><em>Lab Interpretator</em></div> 
    </header>
    <main>
        <table class="ident" cellspacing="0" cellpadding="0" >
                <tr style="background-color:rgb(54, 47, 79); ">
                    <th></th>
                    <th colspan="6" style="text-align:left ;">Patient Info</th>
                </tr>
                <tr class="idee">
                    <td><label for="age">Age</label></td>
                    <td><input type="number" id="age" min="0" class="inp" value="40" autofocus></td>
                <!--    <td >
                    <label class="switch">
                        <input type="checkbox" onchange="gender()" id="gen_chck" checked>
                        <span class="slider round"></span>
                    </label>
                </td>  -->
                <td>
                    <button type="button" class="gend" onclick="gender()"> <img src="https://cdn-icons-png.flaticon.com/512/2404/2404544.png" id="gen_icon"></button>
                </td>
                <td>
                    <select name="preg" id="preg" style="display:none;">
                        <option value="preg1" selected>Not pregnant</option>
                        <option value="preg2">First trimester</option>
                        <option value="preg3">Second trimester</option>
                        <option value="preg3">Third trimester</option>
                    </select> 
                </td>                                 
                 
                <td style="width:100% ;"></td>   
                </tr>   
                </table>
        <table class="lab" cellspacing="0" cellpadding="0">    
            
                <tr style="background-color:darkslategray; ">
                    <th> 
                        <img src="https://cdn-icons-png.flaticon.com/512/655/655285.png" style=" height:30px; width:30px; padding-left: 5px;"> </th>
                        <th style="text-align: left;" colspan="9">Liver Function Tests </th> 
                    
                    </tr>       
                    
                    <tr>
                    <td><label for="ast"><div class="tooltip">AST
                        <span class="tooltiptext">Aspartate transaminase or SGOT</span>
                      </div></label></td>
                    <td><input type="number" placeholder="Enter" id="ast" class="inp" onchange="check_range('ast', 0,'ast_rx','ast_a')" onkeyup="check_range('ast',0,'ast_rx','ast_a')"> </td>
                    <td><h3 id="ast_a">    </h3> </td>
                    <td class="space"></td>
                    <td></td>
                    <td></td>
                    <td>    <input type="number" maxlength="3" min="0" value="40" id="ast_rx"  class="range_inpx"
                        onchange="check_range('ast', 0,'ast_rx','ast_a',)" onkeyup="check_range('ast',0,'ast_rx','ast_a')"> </td>
                    <td><label for="ast_rx"><img src="https://cdn-icons-png.flaticon.com/512/1634/1634156.png" alt="max" class="maxminicon"></label> </td>
                    <td><small>IU/L</small></td>
                    <td><button onclick="reset_ranges(0,'ast_rx',0,40,'ast','ast_a')" class="reseet" type="button" >
                            <img src="https://cdn-icons-png.flaticon.com/512/5307/5307941.png" id="res_lft" >
                        </button> </td>
                    
                    </tr>
                    <!--- ast_rx = ast range max
                    ast_a = ast analysis-->

                    <tr>
                        <td><label for="alt"><div class="tooltip">ALT
                            <span class="tooltiptext">Alanine transaminase or SGPT</span>
                          </div> </label></td>
                        <td><input type="number" placeholder="Enter" id="alt" class="inp" onchange="check_range('alt', 0,'alt_rx','alt_a')" onkeyup="check_range('alt',0,'alt_rx','alt_a')"> </td>
                        <td><h3 id="alt_a">    </h3> </td>
                        <td class="space"></td>
                        <td></td>
                        <td></td>
                        <td>    <input type="number" maxlength="3" min="0" value="40" id="alt_rx"  class="range_inpx"
                            onchange="check_range('alt', 0,'alt_rx','alt_a',)" onkeyup="check_range('alt',0,'alt_rx','alt_a')"> </td>
                        <td><label for="alt_rx"><img src="https://cdn-icons-png.flaticon.com/512/1634/1634156.png" alt="max" class="maxminicon"></label> </td>
                        <td><small>IU/L</small></td>
                        <td><button onclick="reset_ranges(0,'alt_rx',0,40,'alt','alt_a')" class="reseet" type="button" >
                                <img src="https://cdn-icons-png.flaticon.com/512/5307/5307941.png" id="res_lft" >
                            </button> </td>
                        
                        </tr>

                    <!------------------------------>
                     

                    <tr>
                        <td><label for="alp"><div class="tooltip">ALP
                            <span class="tooltiptext" >Alkaline Phosphatase</span>
                          </div> </label></td>
                        <td><input type="number" placeholder="Enter" id="alp" class="inp" onchange="check_range('alp', 'alp_rn','alp_rx','alp_a')" onkeyup="check_range('alp','alp_rn','alp_rx','alp_a')"> </td>
                        <td><h3 id="alp_a">    </h3> </td>
                        <td class="space"></td>
                        <td><label for="alp_rn"><img src="https://cdn-icons-png.flaticon.com/512/1634/1634155.png" alp="min" class="maxminicon"></label></td>
                        <td><input type="number" maxlength="3" value="80" min="0" id="alp_rn"  onchange="check_range('alp','alp_rn','alp_rx','alp_a')"   class="range_inpn"></td>
                        <td>    <input type="number" maxlength="3" min="0" value="306" id="alp_rx"  class="range_inpx"
                            onchange="check_range('alp', 'alp_rn','alp_rx','alp_a',)" onkeyup="check_range('alp','alp_rn','alp_rx','alp_a')"> </td>
                        <td><label for="alp_rx"><img src="https://cdn-icons-png.flaticon.com/512/1634/1634156.png" alp="max" class="maxminicon"></label> </td>
                        <td><small>IU/L</small></td>
                        <td><button onclick="reset_ranges('alp_rn','alp_rx',80,306,'alp','alp_a')" class="reseet" type="button" >
                                <img src="https://cdn-icons-png.flaticon.com/512/5307/5307941.png" id="res_lft" >
                            </button> </td>
                        
                    </tr>

                    <!------------------------------>

                    <tr>
                        <td><label for="bilt"><div class="tooltip">Bil(T)
                            <span class="tooltiptext">Total Bilirubin</span>
                          </div> </label></td>
                        <td><input type="number" placeholder="Enter" step="0.1" id="bilt" class="inp" onchange="check_range('bilt', 'bilt_rn','bilt_rx','bilt_a')" > </td>
                        <td><h3 id="bilt_a">    </h3> </td>
                        <td class="space"></td>
                        <td><label for="bilt_rn"><img src="https://cdn-icons-png.flaticon.com/512/1634/1634155.png" bilt="min" class="maxminicon"></label></td>
                        <td><input type="number" maxlength="3" value="0.1" min="0" id="bilt_rn"  onchange="check_range('bilt','bilt_rn','bilt_rx','bilt_a')"
                             step="0.1"  class="range_inpn"></td>
                        <td>    <input type="number" maxlength="3" step="0.1" min="0" value="1.2" id="bilt_rx"  class="range_inpx"
                            onchange="check_range('bilt',  'bilt_rn','bilt_rx','bilt_a',)" > </td>
                        <td><label for="bilt_rx"><img src="https://cdn-icons-png.flaticon.com/512/1634/1634156.png" bilt="max" class="maxminicon"></label> </td>
                        <td><small>mg/dL</small></td>
                        <td><button onclick="reset_ranges('bilt_rn','bilt_rx',0.1,1.2,'bilt','bilt_a')" class="reseet" type="button" >
                                <img src="https://cdn-icons-png.flaticon.com/512/5307/5307941.png" id="res_lft" >
                            </button> </td>
                        
                    </tr>

                    <!------------------------------>

                    <tr>
                        <td><label for="bild"><div class="tooltip">Bil(D)
                            <span class="tooltiptext">Direct Bilirubin</span>
                          </div> </label></td>
                        <td><input type="number" step="0.1" placeholder="Enter" id="bild" class="inp" onchange="check_range('bild', 0,'bild_rx','bild_a')"> </td>
                        <td><h3 id="bild_a">    </h3> </td>
                        <td class="space"></td>
                        <td></td>
                        <td></td>
                        <td>    <input type="number" step="0.1" maxlength="3" min="0" value="0.3" id="bild_rx"  class="range_inpx"
                            onchange="check_range('bild', 0,'bild_rx','bild_a',)" > </td>
                        <td><label for="bild_rx"><img src="https://cdn-icons-png.flaticon.com/512/1634/1634156.png" alt="max" class="maxminicon"></label> </td>
                        <td><small>mg/dL</small></td>
                        <td><button onclick="reset_ranges(0,'bild_rx',0,0.3,'bild','bild_a')" class="reseet" type="button" >
                                <img src="https://cdn-icons-png.flaticon.com/512/5307/5307941.png" id="res_lft" >
                            </button> </td>
                        
                    </tr>
                
            
        </table> 
    </main>
</body>
</html>
