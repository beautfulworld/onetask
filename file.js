var fs = require("fs");
var mysql = require("mysql");

getdataBase("loverus");


function getdataBase(database){
let connection = mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'518218',
   port: '3306',   
   database:database
})
//遍历数据库中的表
connection.connect();
let sqlBase = "select table_name from information_schema.tables where table_schema='"+database+"'";
connection.query(sqlBase,function(err,result){
   for(var index in result){
      writeSql(connection,result[index].TABLE_NAME);
   }
})
}

//读取数据库中的字段
function writeSql(connection,table){
let sql = "select column_name,DATA_TYPE from information_schema.columns where table_name = '"+table+"'"
let list ="";
let first = true;
connection.query(sql,function(err,result){
   console.log(err);
   console.log(result)
 result.forEach((item,index)=>{

  if(item.COLUMN_NAME.indexOf("id") != -1&&first){
     item.DATA_TYPE="{type: 'serial', key: true}";
     first = false;
  }

    if(item.DATA_TYPE.indexOf("int") != -1||item.DATA_TYPE==="decimal"){
        item.DATA_TYPE="Number";
    }else if(item.DATA_TYPE.indexOf("char") != -1||item.DATA_TYPE==="text"){
         item.DATA_TYPE = "String";
    }else if(item.DATA_TYPE.indexOf("time") != -1||item.DATA_TYPE.indexOf("date") != -1){
        item.DATA_TYPE = "Date"
    }else if(item.DATA_TYPE==="enum"){
        item.DATA_TYPE = "[0,1]"
    }


    let column = "\n\t"+item.COLUMN_NAME+" : "+item.DATA_TYPE+",";
     list+=column;
 })
 getColumn(table,list);
})
}

//将参数写出到文件
function getColumn(table,columns){

  let content = "module.exports = function(db,callback){"+
  "\n"+"db.define('"+table.replace(/_/g,'')+"Models',{"+
     columns+
  "\n"+"},{"+
  "\n"+"table : '"+table+"'"+
  "\n"+"});"+
  "\n"+"return callback();"+
  "\n"+"}";

  fs.mkdirSync("models",{ recursive: true });
  fs.writeFile("models/"+table.replace(/_/g,'')+"Models.js", content,  function(err) {
   if (err) {
     return console.error(err);
  }
   console.log('写入成功')
});
}

