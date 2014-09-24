"use strict";

var mongoose = require ('mongoose'),
	Schema = mongoose.Schema; // 

mongoose.connect('mongodb://127.0.0.1:27017/node');

mongoose.connection.on('connected', function (){
	console.log('Connected !!!');
})

mongoose.connection.on('error', function (){
	console.log('Error !!!');
})

mongoose.connection.on('disconnect', function (){
	console.log('Disconnect !!!');
})


var blogSchema = new Schema({
	title: {type: String, required: true, set: function (value){
		return value.toLowerCase();
	}},
	content: {type: String, required: true},
	post_time: {type: Date, default: Date.now}
});

blogSchema.methods.displayTitle = function (){
	console.log('displayTitle', this.title);
};

blogSchema.statics.findByTitle = function (title, callback){
	console.log(title);
}


var Blogs = mongoose.model('Blogs', blogSchema);
// Su dung function tinh~
Blogs.findByTitle('Hello');

var newPosts  = new Blogs({
	title: 'POST abc',
	content: 'Hello hihihihi !!!!'
});

// Su dung function dong.
newPosts.displayTitle();




/*Blogs.create({
	title: 'POST 1',
	content: 'Hello world'
}, function (err, data){
	if(err) {
		console.log('Err : ', err);
	}else {
		console.log(data);
	}
});*/

/*Blogs.find({title: 'post 1'}, {title: 1}, function (err, data){
	if(err) {
		console.log('Err : ', err);
	}else {
		console.log(data);
	}
});
*/
/*var query = Blogs.find({});

query.where('title', 'post 1');
query.sort('-post_time');
query.limit(2);
query.skip(1);
query.exec(function (err, data){
	if(err) {
		console.log('Err : ', err);
	}else {
		console.log('Use where',data);
	}
})*/

Blogs.update({title: 'post 1'}, {title: 'Post 2345'}, {multi: true}, function (err, data){
	if(err) {
		console.log('Err : ', err);
	}else {
		console.log('Update',data);
	}
})




