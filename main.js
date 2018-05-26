
'use strict';

const data=[];
const items=[];

$.ajax({
  type: 'GET',
  url: 'http://prototype.carter-dev.net/fed-test/items.json',
  data: data,
  async: false,
  beforeSend: function (xhr) {
    if (xhr && xhr.overrideMimeType) {
      xhr.overrideMimeType('application/json;charset=utf-8');
    }
  },
  dataType: 'json',
  success: function (data) { 
  		$.each( data.items, function( i, item ) {
			items.push( item);
		  });
		console.log(items.length);
  }
});
	//first card
	function mainCard(item){
		if (item.id==1){$('.card').addClass('mastercard');} 
		}
	
	//check if document size is found	
	function checkPdf(item){
		let image="";
		if (item.documentSize)
		 {
			 image=`${Pdf(item)}<img class="arrow" width="20px" src="svg/arrow-down.svg">`
			}
		 else
		 {
			image=`<img class="arrow" width="20px" src="svg/arrow-right.svg">`
		 }
		 return image;
		}
	
	//after document size is found
	function Pdf(item){
		let image=`<div class="pdf"><img width="20px" src="svg/document.svg"> PDF (${item.documentSize})</div>`
		 return image;
		}
				
	//create card template for each card
	function cardTemplate(item) {
	  return `
			<li class="card">
					<a href="${item.link}" target="_blank">
						<div class="Cat">${item.category}</div>
						<h2>${item.title}</h2>
						<div class="meta"> ${item.description ? item.description : ""}</div>
						${checkPdf(item)}                    
					</a>
		   </li>`;
	}


//when document ready
$(document).ready(function() {
			$.each(items, function( i, item ) {
				document.getElementById("items").innerHTML += ` ${cardTemplate(item)}`;
				mainCard(item);
				})  
});
