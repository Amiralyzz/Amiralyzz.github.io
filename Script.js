var min=[], max=[], in_id=[], out_id=[], namee=[], valuee=[], statuss=[];

function filterByType(item,typee) {
    if (item.type == typee) {
      return true;
    }
}
function    change_table(tab_id,test_cat)  {
    document.getElementById("table_shown").innerHTML ="";
    var tab_selected = document.getElementById(tab_id);
    var tabs = document.getElementsByClassName("tab");
    for (const tab of tabs) {
        tab.style.opacity = 0.4;
    }
    tab_selected.style.opacity = 1;
    

    var searchVal = test_cat;
    
    for (i=0;i<mydata.length;i++)
    {
        if (mydata[i]["type"] == searchVal)    {
            var entry = mydata[i];
            var new_div = document.createElement("div");
            new_div.className = "entry";
            new_div.style.display= "flex";
            new_div.style.position = "relative";
            new_div.style.flexWrap = "nowrap";
            new_div.style.width = "30%";
            new_div.style.minWidth = "310px";
            new_div.style.flexGrow = "1";
            new_div.style.height= "50px";
            new_div.style.padding= "10px";
            new_div.style.margin = "5px 5px";
            new_div.style.border= "none";
            new_div.style.borderRadius= "25px";
            new_div.style.background =entry.color;
            new_div.style.color = "white";
            new_div.style.fontSize = "20px"
            new_div.style.justifyContent = "space-between";
            document.getElementById("table_shown").appendChild(new_div);
            var new_label = document.createElement("label");
            new_div.appendChild(new_label);
            new_label.innerHTML = entry.name + "<br>" + entry.min + " - " + entry.max;
            new_label.style.width="150px";
            

            var new_output = document.createElement("div");
            new_output.id = entry.output_id;
            new_output.style.display = "flex";
            new_output.style.position = "relative";
            new_output.style.width = "80px";
            new_output.style.height = "34px";
            new_output.style.padding = "5px";
            new_output.style.fontSize = "20px";
            if(entry.status != 0) new_output.innerHTML = entry.status.toFixed(2);
            new_div.appendChild(new_output);

            
            var new_input = document.createElement("input");
            new_input.type = "number"
            new_input.style.display = "flex";
            new_input.style.position = "relative";
            new_input.style.width = "80px";
            new_input.style.height = "34px";
            new_input.style.padding = "5px";
            new_input.style.fontSize = "20px";
            new_input.style.color = "white";
            new_input.style.background = "rgb(19, 19, 19)";
            new_input.style.border = "none";
            new_input.value = entry.value;
            new_input.step = entry.step;
            
            namee[i] = entry.name;
            valuee[i] = entry.value;
            min[i] = entry.min;
            max[i] = entry.max;
            out_id[i] = entry.output_id;
            in_id[i] = entry.input_id;
            new_input.id = entry.input_id;
            new_input.onchange = check_range;
            new_input.onkeyup = check_range;
            //check_range.apply(new_input,Number(new_input.value),min,max,out_id,i);
            new_div.appendChild(new_input);
        }
        //console.log(min);
    }
    
    
    
}

function  gender() {

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

function check_range() {
    //if (id=="bild" || id=="bilt") bili_check();
    //console.log(min,max,out,i);
    x= Number(this.value);
    id= this.id;
    for(var j=0;j<mydata.length;j++) {
        if(id==mydata[j].input_id) {
            if (x==0) document.getElementById(out_id[j]).innerHTML = "";      
    
            if (x>max[j]) y = x/max[j];
            else if (x<min[j]) y= x/min[j];
            else y=0;
            mydata[j].value = x;
            mydata[j].status = y;
            if(x!="") document.getElementById(out_id[j]).innerHTML = y.toFixed(2);
            break;
        }
    }
    
    console.log(mydata[j].status);
   

   // document.getElementById(out).style.color = c;
    
}




var mydata = [
    {
        "name" : "WBC" ,
        "tooltip" : "White Blood Cells" ,
        "type" : "hemato" ,
        "value" : 0 ,
        "min": 4400 ,
        "max": 11000 ,
        "step": 100 ,
        "status": 0 ,
        "color" : "darkslateblue"  ,
        "input_id" : "inp_wbc"  ,
        "output_id" : "out_wbc"
    },
    {
        "name" : "RBC" ,
        "tooltip" : "Red Blood Cells" ,
        "type" : "hemato" ,
        "value" : 0 ,
        "min": 4.5 ,
        "max": 5.9 ,
        "step": 0.1 ,
        "status": 0 ,
        "color" : "darkslateblue" ,
        "input_id" : "inp_rbc" ,
        "output_id" : "out_rbc"
    },
    {
        "name" : "Hb" ,
        "tooltip" : "Hemoglobin" ,
        "type" : "hemato" ,
        "value" : 0 ,
        "min": 13.5 ,
        "max": 18 ,
        "step": 1 ,
        "status": 0 ,
        "color" : "darkslateblue" ,
        "input_id" : "inp_hb" ,
        "output_id" : "out_hb"
    },
    {
        "name" : "Hct" ,
        "tooltip" : "Hematocrit" ,
        "type" : "hemato" ,
        "value" : 0 ,
        "min": 40 ,
        "max": 54 ,
        "step": 1 ,
        "status": 0 ,
        "color" : "darkslateblue" ,
        "input_id" : "inp_hct" ,
        "output_id" : "out_hct"
    } ,

    {
        "name" : "AST" ,
        "tooltip" : "SGOT" ,
        "type" : "lft" ,
        "value" : 0 ,
        "min": 0 ,
        "max": 40 ,
        "step": 1 ,
        "status": 0 ,
        "color" : "darkslategrey"  ,
        "input_id" : "inp_ast"  ,
        "output_id" : "out_ast"
    },
    {
        "name" : "TSH" ,
        "tooltip" : "Thyroid" ,
        "type" : "tft" ,
        "value" : 0 ,
        "min": 0.5 ,
        "max": 5 ,
        "step": 0.1 ,
        "status": 0 ,
        "color" : "rgb(65, 87, 65)" ,
        "input_id" : "inp_tsh" ,
        "output_id" : "out_tsh"
    }
];
