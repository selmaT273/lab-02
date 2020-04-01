'use strict';

const pics = [];
let keywords = [];

function Pic(url, title, description, keyword, horns) {
  this.url = url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}



// Pic.prototype.render = function(container) {
//   let $container = $(container);
//   let $template = $container.find('#photo-template');
//   let $pic = $template.clone();
//   //   $pic.removeClass('photo-template');
//   $pic.find('.pic-title').text(this.title);
//   $pic.find('.pic-image').attr('src', this.url);
//   $container.append($pic);
// };


//     console.log(data);
//     // let $section = $('<section>').attr('photo-template');
//     // let $title = $('<h2>').text(title);
//     // let $img = $('<img>').attr('src', url);
//     // let $description = $('<p>').text(description);
//     // $section.append($title, $img, $description);
//     // $('main').append($section);

//     data.forEach(pic => {
//       console.log(pic.title);

//       let actualPic = new Pic(this.url);
//       actualPic.render('#photo-template');
//     });
//   });



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
    });
    pics.forEach(function(element){
      renderimage(element.url, element.title, element.description, element.horns, element.keyword);
    });
    keywords = new Set(keywords);
    keywords.forEach(function(element){
      createList(element);
    });
    $('select').change(hideElement);
  });

function renderimage(url, title, description, horns, keyword) {
  let $section = $('<section>').attr('data-keyword', keyword);
  let $title = $('<h2>').text(title);
  let $img = $('<img>').attr('src', url).attr('alt', description);
  let $text = $('<p>').text(`Image description: ${description}`);
  $section.append($title, $img, $text);
  $('main').append($section);
}

function createList(keyword) {
  let $option = $('<option>').text(keyword).attr('value', keyword);
  $('select').append($option);
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
