var items = []; //id, name, link, img, high, low, diff, q(uantity)

$(document).ready(function (){
  importNav("flip");
  fillTable();
});

function toggleTable(){
  $("#flipTable").toggle();
}

function fillTable(){
  var count = 0;
  var htmlTable = "";
  $('#flipTable tbody').empty();$('#count').empty();toggleTable();
  items = getAllItems();
  setTimeout(function (){
    var minPrice = grabPrice("minPrice");
    var maxPrice = grabPrice("maxPrice");
    var filterZeros = $('#filterBox').prop("checked");
    var search = $("#search").val();

    items = searchItems(search);

    items.forEach(function(item){
      if(item.high > minPrice && item.high < maxPrice && (!filterZeros || (filterZeros && !(item.low == 0 || item.high == 0)))){
        count++;
        htmlTable += "<tr>" +
        "<td><img src='"+item.img+"'></td>" +
        "<td><a href='"+item.link+"'>"+item.name+"</a></td>"+
        "<td>"+numbro(item.low).format('0,0')+"</td>"+
        "<td>"+numbro(item.high).format('0,0')+"</td>"+
        "<td>"+numbro(item.diff).format('0,0')+"</td>"+
        "<td>"+numbro(item.margin).format('0.00%')+"</td>"+ //margin
        "<td>"+item.q+"</td>"+
        "</tr>"
      }
    })
    $('#flipTable').append(htmlTable);
    $('#count').append(count);
    toggleTable();
  }, 6000);
}

function grabPrice(element){
  var price = $("#"+element+"").val();

  if(price.includes("k")){
    price = price.substring(0, price.length-1) * 1000;
  }else if(price.includes("m")){
    price = price.substring(0, price.length-1) * 1000000;
  }else if(price.includes("b")){
    price = price.substring(0, price.length-1) * 1000000000;;
  }
  return price;
}
