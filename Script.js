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
