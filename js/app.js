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
    $data.forEach(function(object){
      pics.push(new Pic(object.image_url, object.title, object.description, object.keyword, object.horns));
      keywords.push(object.keyword);
      horns.push(object.horns);
    });
    pics.forEach(function(object){
      renderimage(object.url, object.title, object.description, object.horns, object.keyword);
    });
    keywords = new Set(keywords);
    keywords.forEach(function(object){
      filterByKeyword(object);
    });
    horns = new Set(horns);
    horns.forEach(function(object){
      filterByHorns(object);
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
    $(`section[data-keyword=${value}]`).slideDown(900);
  } else {
    $('section').fadeIn(800);
  }
}

function reloadPage(){
  location.reload(true);
}

function sortAlphabetical(a, b) {
  const picTitleA = a.title;
  const picTitleB = b.title;
  let comparison = 0;
  if (picTitleA > picTitleB) {
    comparison = 1;
  } else if (picTitleA < picTitleB) {
    comparison = -1;
  }
  return comparison;
}

// pics.sort(sortAlphabetical);
// $('.sort').on('click',(function(){
//   pics.sort(sortAlphabetical);
// }));




// function hideHorns() {
//   let value = $(this).val();
//   if(value !== 'default'){
//     $('section').hide();
//     $(`section[data-horns=${value}]`).slideDown(888);
//   } else {
//     $('section').fadeIn(750);
//   }
//
