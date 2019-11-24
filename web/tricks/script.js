var items = []; //id, name, link, img, high, low, diff, q(uantity)

$(document).ready(function (){

  importNav("tricks");
  toggleCrush();toggleZulrah();toggleZenyte();togglePotion();
  items = getAllItems();

  setTimeout(function (){
    crushSection();//toggleCrush();
    zulrahSection();//toggleZulrah();
    zenyteSection();//toggleZenyte();
    potionSection();//togglePotion();
  }, 500);
});


function crushSection(){
  var htmlTable = "";
  $('#crushTable tbody').empty();
  var ingredients = ["Bird nest", "Unicorn horn", "Chocolate bar", "Desert goat horn", "Blue dragon scale"];
  var crushedItems = ["Crushed nest", "Unicorn horn dust", "Chocolate dust", "Goat horn dust", "Dragon scale dust"];

  for(i = 0; i < ingredients.length; i++){
    var ingredient = getItem(ingredients[i]);
    var crushedItem = getItem(crushedItems[i]);
    var minProfit = crushedItem.low - ingredient.high - 50;
    var maxProfit = crushedItem.high - ingredient.low - 50;
    htmlTable += "<tr>"+
                      "<td><img src='"+ingredient.img+"'></td>" +
                      "<td>"+ingredient.name+"</td>"+
                      "<td>"+numbro(minProfit).format('0,0')+"</td>"+
                      "<td>"+numbro(maxProfit).format('0,0')+"</td>"+
                      "<td><a href='"+ingredient.link+"'>"+ingredient.low+"-"+ingredient.high+"</a></td>"+
                      "<td><a href='"+crushedItem.link+"'>"+crushedItem.low+"-"+crushedItem.high+"</a></td>"+
                      "<td>"+ingredient.q + " | "+ crushedItem.q+"</td>"+
                    "</tr>";
  }
  $('#crushTable').append(htmlTable);
}

function zulrahSection(){
  var htmlTable = "";
  $('#zulrahTable tbody').empty();
  var scales = getItem("Zulrah's scales");scales.high *= 20000;scales.low *= 20000;
  var tentacles = getItem("Kraken tentacle");tentacles.high *= 10;tentacles.low *= 10;
  var serpHelm = getItem("Serpentine helm (uncharged)");
  var serpVis= getItem("Serpentine visage");
  var blowpipe = getItem("Toxic blowpipe (empty)");
  var tanzFang = getItem("Tanzanite fang");
  var trident = getItem("Uncharged trident");
  var toxicTrident = getItem("Uncharged toxic trident");
  var toxicTridentE = getItem("Uncharged toxic trident (e)");
  var magicFang = getItem("Magic fang");

  var ingredients = [serpHelm, serpVis, blowpipe, tanzFang, toxicTrident, magicFang, toxicTrident];
  var results = [scales, serpHelm, scales, blowpipe, scales, toxicTrident, toxicTridentE];

  for(i = 0; i < ingredients.length; i++){
    var extraIngredient = {id:0,name:"",link:"",img:"",high:0,low:0,diff:0,q:0};
    var extraResult = {id:0,name:"",link:"",img:"",high:0,low:0,diff:0,q:0};

    //change this to extra ingredient/result
    if(ingredients[i].name=="Uncharged toxic trident"){
      if(results[i].name=="Zulrah's scales"){
        extraResult = trident;
      }
      else{ //making trident (e)
        extraIngredient = tentacles;
      }
    }else if(ingredients[i].name=="Magic fang"){
      extraIngredient = trident
    }

    var minProfit = results[i].low - ingredients[i].high - extraIngredient.high + extraResult.low;
    var maxProfit = results[i].high - ingredients[i].low - extraIngredient.low + extraResult.high;

    var extraIngredientHtml = (extraIngredient.id == 0)? "":"</br><a href='"+extraIngredient.link+"'>"+numbro(extraIngredient.low).format('0,0')+" - "+numbro(extraIngredient.high).format('0,0')+"</a>";
    var extraResultHtml = (extraResult.id == 0)? "":"</br><a href='"+extraResult.link+"'>"+numbro(extraResult.low).format('0,0')+" - "+numbro(extraResult.high).format('0,0')+"</a>";
    htmlTable += "<tr>"+
    "<td><img src='"+ingredients[i].img+"'><img src='"+extraIngredient.img+"'> --> <img src='"+results[i].img+"'><img src='"+extraResult.img+"'>" +
    "<td>"+ingredients[i].name+"</td>"+
    "<td>"+numbro(minProfit).format('0,0')+"</td>"+
    "<td>"+numbro(maxProfit).format('0,0')+"</td>"+
    "<td><a href='"+ingredients[i].link+"'>"+numbro(ingredients[i].low).format('0,0')+" - "+numbro(ingredients[i].high).format('0,0')+"</a>"+ extraIngredientHtml +"</td>"+
    "<td><a href='"+results[i].link+"'>"+numbro(results[i].low).format('0,0')+" - "+numbro(results[i].high).format('0,0')+"</a>"+ extraResultHtml +"</td>"+
    "</tr>";
  }
  $('#zulrahTable').append(htmlTable);
}

function zenyteSection(){
  var htmlTable = "";
  var onyx = getItem("Uncut onyx");
  var shard = getItem("Zenyte shard");
  var bloodR = getItem("Blood rune"); bloodR.low *= 20; bloodR.high *= 20;
  var soulR = getItem("Soul rune"); soulR.low *= 20; soulR.high *= 20;
  var ros = getItem("Ring of suffering");
  var tort = getItem("Amulet of torture");
  var torm = getItem("Tormented bracelet");
  var anguish = getItem("Necklace of anguish");

  var results = [ros, tort, torm, anguish];
  for(i=0; i<results.length; i++){
    var minProfit = results[i].low - (onyx.high + shard.high + bloodR.high + soulR.high);
    var maxProfit = results[i].high - (onyx.low + shard.low + bloodR.low + soulR.low);

    htmlTable += "<tr>"+
    "<td><img src='"+results[i].img+"'>" +
    "<td>"+results[i].name+"</td>"+
    "<td>"+numbro(minProfit).format('0,0')+"</td>"+
    "<td>"+numbro(maxProfit).format('0,0')+"</td>"+
    "<td><a href='"+onyx.link+"'>"+numbro(onyx.low).format('0,0')+" - "+numbro(onyx.high).format('0,0')+"</a>"+
    "</br><a href='"+shard.link+"'>"+numbro(shard.low).format('0,0')+" - "+numbro(shard.high).format('0,0')+"</a></td>"+
    "<td><a href='"+results[i].link+"'>"+numbro(results[i].low).format('0,0')+" - "+numbro(results[i].high).format('0,0')+"</a></td>"+
    "</tr>";
  }
  $('#zenyteTable').append(htmlTable);
}

function potionSection(){
  var htmlTable = "";
  var pot3 = searchItems("(3)");
  var pot4 = searchItems("(4)");

  pot4.forEach(function(p4){
    p4.name = p4.name.substring(0, p4.name.length-3);
  })
  pot3.forEach(function(p3){
    p3.name = p3.name.substring(0, p3.name.length-3);
    pot4.forEach(function(p4){
      if(p3.name == p4.name && p3.q > 1000){
        var minProfit = p4.low*0.75 - p3.high;
        var maxProfit = p4.high*0.75 - p3.low;
        htmlTable +="<tr>"+
        "<td><img src='"+p4.img+"'>" +
        "<td>"+p4.name+"</td>"+
        "<td>"+numbro(minProfit).format('0,0')+"</td>"+
        "<td>"+numbro(maxProfit).format('0,0')+"</td>"+
        "<td><a href='"+p3.link+"'>"+numbro(p3.low).format('0,0')+" - "+numbro(p3.high).format('0,0')+"</a></td>"+
        "<td><a href='"+p4.link+"'>"+numbro(p4.low).format('0,0')+" - "+numbro(p4.high).format('0,0')+"</a></td>"+
        "</tr>";
      }
    })
  })
  $('#potionTable').append(htmlTable);
}

function toggleCrush(){
  $("#crushTable").toggle();
}
function toggleZulrah(){
  $("#zulrahTable").toggle();
}
function toggleZenyte(){
  $("#zenyteTable").toggle();
}
function togglePotion(){
  $("#potionTable").toggle();
}
