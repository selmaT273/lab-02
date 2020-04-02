'use strict';

const pics = [];
const keywords = [];
// let horns = [];

function Pic(pic) {
  this.image_url = pic.image_url;
  this.title = pic.title;
  this.description = pic.description;
  this.keyword = pic.keyword;
  this.horns = pic.horns;
  pics.push(this);
}

Pic.prototype.render = function (container) {
  let $container = $(container);
  let $template = $('#photo-template');
  let $pic = $template.clone();
  $pic.removeAttr('id');
  $pic.find('h2.pic-name').text(this.title);
  $pic.find('img.pic-display').attr('src', this.image_url);
  $pic.find('p').text(this.description);
  $container.append($pic);
};

function filterPics(pic){
  let $filter = $('.filter');
  let $makeFilter = $('<option>');
  $makeFilter.text(pic.keyword);
  $makeFilter.val(pic.keyword);

  if (!keywords.includes(pic.keyword)) {
    keywords.push(pic.keyword);
    $filter.append($makeFilter);
  }
}
const ajaxSettings = {
  method: 'get',
  dataType: 'json'
};

let imgs = null;
$.ajax('data/page-1.json', ajaxSettings).then(function(data) {
  imgs = data;
  renderElement('default');
  imgs.forEach(pic => filterPics(pic));

});

function renderElement(filter) {
  $('main').empty();
  imgs.forEach((pic) => {
    let displayPic = new Pic(pic);
    if (displayPic.keyword === filter) {
      displayPic.render('main');
    } else if (filter === 'default') {
      displayPic.render('main');
    }
  });
}

$('.filter').on('change', function() {
  let $this = $(this),
    filterValue = $this.val();

  renderElement(filterValue);
});

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


//   $data.forEach(function(pic){
//     pics.push(new Pic(pic));
//     keywords.push(pic.keyword);
//     horns.push(pic.horns);
//   });
//   pics.forEach(function(object){
//     renderimage(object.url, object.title, object.description, object.horns, object.keyword);
//   });
//   keywords = new Set(keywords);
//   keywords.forEach(function(object){
//     filterByKeyword(object);
//   });
//   horns = new Set(horns);
//   horns.forEach(function(object){
//     filterByHorns(object);
//   });
//   $('select').change(hideElement);
// $('select').change(hideHorns);




// function filterByKeyword(keyword) {
//   let $option = $('<option>').text(keyword).attr('value', keyword);
//   $('.keyword-filter').append($option);
// }

// function filterByHorns(horns) {
//   let $option = $('<option>').text(horns).attr('value', horns);
//   $('.horns-filter').append($option);

// }
// $('.horns-filter').on('change,', function() {
//     let $this = $(this),
//     filterValue = $this.val();
//     console.log(filterValue);
// })

// function hideElement() {
//   let value = $(this).val();
//   if(value !== 'default'){
//     $('section').hide();
//     $(`section[data-keyword=${value}]`).slideDown(900);
//   } else {
//     $('section').fadeIn(800);
//   }
// }

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
