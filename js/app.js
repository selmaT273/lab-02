'use strict';

const pics = [];
let keywords = [];
let horns = [];

function Pic(url, title, description, keyword, horns) {
  this.url = url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}


const ajaxSettings = {
  method: 'get',
  dataType: 'json'
};

$.ajax('data/page-1.json', ajaxSettings)
  .then(function(data) {
    let $data = data;
    $data.forEach(function(element){
      pics.push(new Pic(element.image_url, element.title, element.description, element.keyword, element.horns));
      keywords.push(element.keyword);
      horns.push(element.horns);
    });
    pics.forEach(function(element){
      renderimage(element.url, element.title, element.description, element.horns, element.keyword);
    });
    keywords = new Set(keywords);
    keywords.forEach(function(element){
      filterByKeyword(element);
    });
    horns = new Set(horns);
    horns.forEach(function(element){
      filterByHorns(element);
    });
    $('select').change(hideElement);
    // $('select').change(hideHorns);
  });

function renderimage(url, title, description, horns, keyword) {
  let $section = $('<section>').attr('data-keyword', keyword);
  let $title = $('<h2>').text(title);
  let $img = $('<img>').attr('src', url).attr('alt', description);
  let $text = $('<p>').text(`Image description: ${description}`);
  let $horns = $('<p>').text(`# of Horns: ${horns}`).attr('data-keyword', horns);
  $section.append($title, $img, $text, $horns);
  $('main').append($section);
}

function filterByKeyword(keyword) {
  let $option = $('<option>').text(keyword).attr('value', keyword);
  $('.keyword-filter').append($option);
}

function filterByHorns(horns) {
  let $option = $('<option>').text(horns).attr('value', horns);
  $('.horns-filter').append($option);

}

function hideElement() {
  let value = $(this).val();
  if(value !== 'default'){
    $('section').hide();
    $(`section[data-keyword=${value}]`).slideDown(888);
  } else {
    $('section').fadeIn(750);
  }
}

function reloadPage(){
  location.reload(true);
}



// function hideHorns() {
//   let value = $(this).val();
//   if(value !== 'default'){
//     $('section').hide();
//     $(`section[data-horns=${value}]`).slideDown(888);
//   } else {
//     $('section').fadeIn(750);
//   }
// }
