var express = require('express');
var router = express.Router();
var mysql=require('mysql')

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'forminsert'
});
 
connection.connect(function(err){
  if(!err)
  {
    console.log("database connection is done")
  }
  else
  {
    console.log("database connection is not done")
  }
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/form', function(req, res, next) {
  res.render('add-form');
});

router.post('/form',function(req,res){
console.log(req.body);
const mybodydata={
  user_name:req.body.user_name,
  user_email:req.body.user_email,
  user_mobile:req.body.user_phonenumber
}
connection.query("insert into tbl_insert set?",mybodydata,function(err,result){
  if(err) throw err;
  res.redirect('/form')
})
})

router.get('/display',function(req,res,next){
  connection.query("select * from tbl_insert",function(err,db_rows){
    if(err) throw err;
    console.log(db_rows)
    res.render('display-table',{db_rows_array:db_rows})
  })
  })

router.get('/delete/:id',function(req,res){
  var deleteid = req.params.id;
  console.log("Delete id is " + deleteid);
  connection.query("delete from tbl_insert where user_id = ?",
  [deleteid],function(err,db_rows)
  {
    if(err) throw err;
    console.log(db_rows)
    console.log("Record Deleted")
    res.redirect('/display');
  })
})

router.get('/show/:id',function(req,res){
  var showid=req.params.id;
  console.log("Show id is " +showid)

  connection.query("select * from tbl_insert where user_id= ?",[showid],
  function(err,db_rows)
  {
    console.log(db_rows);
    if(err) throw err;
    res.render("show",{db_rows_array:db_rows});
  })
})

router.get('/edit/:id',function(req,res){
  console.log("Edit id is :",req.params.id)
  var user_id=req.params.id;
  connection.query("select * from tbl_insert where user_id = ?",[user_id],function(err,db_rows){
    if(err) throw err;
    console.log(db_rows)
    res.render('edit-form',{db_rows_array:db_rows});
    
  })
});

router.post('/edit/:id', function(req,res){
  console.log("Edit id is ",+req.params.id);

  var user_id=req.params.id;
  
  var user_name=req.body.user_name;
  var user_email=req.body.user_email;
  var user_mobile=req.body.user_mobile;
  
  connection.query("update tbl_insert set user_name=?,user_email =?,user_mobile=? where user_id=?",
  [user_name,user_email,user_mobile,user_id],function(err,respond){
    if(err) throw err;
    res.redirect('/display');
  });
});

module.exports = router;                                                                   