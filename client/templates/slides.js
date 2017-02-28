Template.slides.onCreated(function () {
	var self = this;

	self.autorun(function () {
		self.subscribe('slides');
	});
});

Template.slides.helpers({
	slides: function () {
		return Slides.find();
	}
});

Template.slides.onRendered( function () {
	var mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    
    // If we need pagination
    pagination: '.swiper-pagination',
    
   
  }) 
});