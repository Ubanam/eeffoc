var mongoose = require( 'mongoose');
var Coffee = mongoose.model( 'CoffeeList');

//Select All
exports.allData = function(req, res){
	console.log('getALl is called!');
	// movieモデルのfindメソッドで一覧を取得
	Coffee.find({}, function(err, coffee) {
		if(!err){
			res.json(coffee)
			};
		}
	).sort({'Id':1});
};

/*
exports.selectData = function(req, res){
  console.log('getSelected is called!')
  // movieモデルのfindメソッドで一覧を取得
  Movie.find({Id:req.params.id} ,function(err, movies) {
    if(!err){
      res.json(movies);
    }else{
	  console.log('error occured at selectedData()');
	};
  });
};
//データの更新（レートのみ）
exports.addRate = function(req, res){
	var movie = req.body;
	console.log('add Rate ↓');
	console.log(movie);
	Movie.update({ _id: movie._id },
			{ $set: { 
				Rate: movie.Rate, //評価レート
				SadParam:movie.SadParam, //泣けるパラメータ
				LaughParam:movie.LaughParam, //笑えるパラメータ
				HealParam:movie.HealParam, //癒されるパラメータ
				MotivateParam:movie.MotivateParam, //やる気パラメータ
				LoveParam:movie.LoveParam //恋愛パラメータ
				} 
			}, 
			function (err) {
				if(err){
					console.log('error:' + err);
				}		
		res.json(movie);
	});
}
//データの更新（全更新）
exports.updateData = function(req, res){
	var movie = req.body;
	console.log('Update Data ↓');
	console.log(movie);
	Movie.update({ _id: movie._id },
			{ $set: { 
				Id:movie.Id, //作品ID
				Title: movie.Title, //タイトル
				Year: movie.Year,   //公開年度
				Actor: movie.Actor, //俳優
				Visor: movie.Visor, //監督
				Meigen: movie.Meigen, //名言
				Story: movie.Story,  //あらすじ
				Image: movie.Image,  //画像
				ImgRef:movie.ImgRef,//画像参照先
				Type: movie.Type,  //種類
				Era:movie.Era, //時代
				Job:movie.Job, //職業
				Age:movie.Age, //年齢
				Gift:movie.Gift, //特殊能力
				Origin:movie.Origin, //派生元
				OWords:movie.OWords, //原文
				Scene:movie.Scene, //場面
				Link: movie.Link,   //作品リストに利用するURL
				Rakuten:movie.Rakuten,//楽天
				Yahoo:movie.Yahoo,//yahoo
				package:movie.package,//パッケージ
				Recommends1:movie.Recommends1,//関連情報１
				Rec1Text:movie.Rec1Text,//関連情報１
				Recommends2:movie.Recommends2, //関連情報2
				Rec2Text:movie.Rec2Text,//関連情報2
				SadParam:movie.SadParam, //泣けるパラメータ
				LaughParam:movie.LaughParam, //笑えるパラメータ
				HealParam:movie.HealParam, //癒されるパラメータ
				MotivateParam:movie.MotivateParam, //やる気パラメータ
				LoveParam:movie.LoveParam, //恋愛パラメータ
				Rate:movie.Rate,//評価レート
				Notice:movie.Notice,//予告動画
				Tweet:movie.Tweet,//ツイート情報
				Appeal:movie.Appeal//見どころ
				} 
			}, 
			function (err) {
				if(err){
					console.log('error:' + err);
				}		
		res.json(movie);
	});
}
*/
//データの追加
exports.addData = function(req, res){
	console.log('addData is called');
	var coffee = new Coffee(req.body);
	console.log(coffee);
	//console.log('req.params.Meigen:' + req.params.Meigen);
	coffee.save();
	res.json(req.body);
	
}