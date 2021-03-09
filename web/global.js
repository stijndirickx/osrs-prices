function importNav(string_id){
  var flip_li = '<li id="flip"><a href="../flip">Flip</a></li>';
  var tricks_li = '<li id="tricks"><a href="../tricks">Tricks</a></li>';
  var stringhtml = '<div id="nav"><ul>' + flip_li + tricks_li + '</ul></div>';
  $('body').prepend(stringhtml);
  setActive(string_id);
}

function setActive(string){
  $('#'+string).addClass('active');
  $('#'+string + ' a').removeAttr('href');
}

function searchItems(search){
  var result = items.filter(function(item){
    return item.name.toLowerCase().includes(search.toLowerCase())
  })
  return result;
}

function getItem(name){
  var f = items.find(function(e){
    return e.name === name;
  })
  return f;
}

function getAllItems(){
  var ts = new Date().getTime() - 63600;
  console.log(ts);
  var items = []; //id, name, link, img, high, low, diff, q(uantity)
  $.ajax({
    type: 'GET',
    url: 'https://cors-anywhere.herokuapp.com/https://rsbuddy.com/exchange/summary.json?ts='+ ts,
    success: function(json){
      for(i = 0; i < 30000; i++){
        if(json[i]){
          var highestPrice = (json[i].buy_average > json[i].sell_average)? json[i].buy_average : json[i].sell_average;
          var lowestPrice = (json[i].buy_average < json[i].sell_average)? json[i].buy_average : json[i].sell_average;
          var link = 'https://rsbuddy.com/exchange?id='+ json[i].id;
          var img = 'https://rsbuddy.com/items/'+json[i].id +'.png';
          var difference = highestPrice - lowestPrice;
          var margin = (difference == json[i].overall_average)? 0:difference / json[i].overall_average;
          var quantity = json[i].overall_quantity;
          var item = {id:json[i].id,name:json[i].name,link:link,img:img,high:highestPrice,
            low:lowestPrice,diff:difference,q:quantity,margin:margin};
          items.push(item);
        }
      }
      console.log(items)
    }
  });
  return items;
}
