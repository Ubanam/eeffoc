//Setting mongoose
var mongoose = require('mongoose');
//connection path
var mURI = 
	  process.env.MONGOLAB_URI || 
	  'mongodb://localhost:27017/test';
//connect DB
db = mongoose.connect(mURI, function (err, res) {
	  if (err) { 
	    console.log ('ERROR connecting to: ' + mURI + '. ' + err);
	  } else {
	    console.log ('Succeeded connected to: ' + mURI); 
	  }
});


var CoffeeList = require('./coffeelist');
//Define Schema
/*
var MovieSchema = new mongoose.Schema({
	Id:Number,//作品Id
	Title:String, //タイトル
	Year:String, //公開年度
	Actor:String, //俳優
	Visor:String, //監督
	Link:String, //Amazon
	Rakuten:String, //楽天
	Yahoo:String, //Yahoo
	Recommends1:String,//関連情報1
	Rec1Text:String,//関連情報1
	Recommends2:String,//関連情報2
	Rec2Text:String,//関連情報2
	Meigen:String, //名言
	Story:String, //あらすじ
	Image:String, //画像イメージ
	ImgRef:String,//画像参照先
	Type:String, //名言タイプ
	Era:String, //時代
	Job:String, //職業
	Age:String, //年齢
	Gift:String, //特殊能力
	Origin:String, //発生元
	OWords:String, //原文
	Scene:String, //場面
	package:String, //パッケージ
	SadParam:Number, //泣けるパラメータ
	LaughParam:Number, //笑えるパラメータ
	HealParam:Number, //癒されるパラメータ
	MotivateParam:Number, //やる気パラメータ
	LoveParam:Number, //恋愛パラメータ
	Rate:Number,//評価レート
	Notice:String,//予告動画
	Tweet:String,//,ツイート情報
	Appeal:String//見どころ
});
*/

//mongoose.model('Movie',MovieSchema);
