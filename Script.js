function    gender() {
   
    var malelogo= "https://cdn-icons-png.flaticon.com/512/3001/3001764.png";
    var femalelogo = "https://cdn-icons-png.flaticon.com/512/2922/2922561.png" ;

    if (document.getElementById("gen_logo").src == malelogo) {
        window.setTimeout(function() { 
        document.getElementById("preg").style.color = "white";
        document.getElementById("preg").disabled = false;
        document.getElementById("gender").value = "female";
        document.getElementById("gen_logo").src = femalelogo;
        document.getElementById("gen_logo").alt="female";
    } , 150)
       
    }
    else {
        window.setTimeout(function() {
        document.getElementById("preg").style.color = "transparent";
        document.getElementById("preg").disabled = true;
        document.getElementById("gender").value = "male";
        document.getElementById("gen_logo").src = malelogo;
        document.getElementById("gen_logo").alt="male";
    },150)    
    }

}

function    change_table(tab_id,table_id)  {
    var tab_selected = document.getElementById(tab_id);
    var table_selected = document.getElementById(table_id);
    var tabs = document.getElementsByClassName("tab");
    var tables = document.getElementsByClassName("lab");
    for (const tab of tabs) {
        tab.style.opacity = 0.4;
    }
    for (const table of tables) {
        table.style.display = "none";
    }
    table_selected.style.display = "table";
    tab_selected.style.opacity = 1;

}

function    expand(rows_id,button_id)    {
    var extra_rows = document.getElementsByClassName(rows_id);
    var button = document.getElementById(button_id);
    if (button.innerHTML=="<em>more</em>") {
        for (const rows_id of extra_rows) {
        rows_id.style.display = "table-row";
        button.innerHTML="<em>less</em>";
        }
    }
    else {
        for (const rows_id of extra_rows) {
            rows_id.style.display = "none";
            button.innerHTML="<em>more</em>";
            }
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
    document.getElementById(id).style.color = c;
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
