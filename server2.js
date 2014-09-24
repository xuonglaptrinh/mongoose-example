"use strict";

var mongoose = require ('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = mongoose.Schema.Types.ObjectId; // 

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

var categorySchema = new Schema({
	name: {type:String, required: true}
});

var blogSchema = new Schema({
	title: {type: String, required: true, set: function (value){
		return value.toLowerCase();
	}},
	category: {type: ObjectId, required: true, ref:'Categories' },
	comment: {type: ObjectId, required: true, ref:'Categories' },
	like: {type: ObjectId, required: true, ref:'Categories' },
	content: {type: String, required: true},
	post_time: {type: Date, default: Date.now}
});

var Blogs = mongoose.model('Blogs', blogSchema);
var Categories = mongoose.model('Categories', categorySchema);


Categories.create({
	name: 'Tin the gioi'
}, function (err, data){
	if(err) throw err;
	console.log('Save category success',data);

	Blogs.create({
		title: 'Post category ' + data.name,
		category: data._id,
		content: 'Hello world'
	}, function (err, resp){
		if(err) throw err;
		console.log('Save posts success',resp);
	})
});

var query = Blogs.find({});
query.populate('category', 'name');
query.populate('comment', 'name');
query.populate('like', 'name');
query.exec(function (err, data){
	if(err) throw err;
	console.log('find use populate OK', data);
});

