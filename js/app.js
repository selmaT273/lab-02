'use strict';

function Pic(pic) {
  this.image_url = pic.image_url;
  this.title = pic.title;
  this.description = pic.description;
  this.keyword = pic.keyword;
  this.horns = pic.horns;
}

Pic.prototype.render = function(container) {
  let $container = $(container);
  let $template = $container.find('.photo-template');

  let $pic = $template.clone();
  $pic.removeClass('photo-template');
  $pic.find('.pic-title').text(this.title);
  $pic.find('img.pic-image').attr('src', this.image_url);
  $container.append($pic);
};

const ajaxSettings = {
  method: 'get',
  dataType: 'json'
};

$.ajax('../data/page-1.json', ajaxSettings)
  .then(function (data) {
    console.log(data);

    data.forEach(pic => {
      console.log(pic.title);

      let actualPic = new Pic(pic);
      actualPic.render('main section');
    });
  });
