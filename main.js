const express = require('express');
const path = require('path');
const fs = require('fs')
const ejs = require('ejs');
//handle POST data method
var bodyParser = require("body-parser");
const app = express();
// handle upload file 
const uploadFile = require("express-fileupload");
//handle database 
var mongoose = require('mongoose');

// id : ict302Assignment
// pwd : passexam
const  URLdatabase = "mongodb+srv://ICT302_UC:passexam@cluster0-zbjzo.mongodb.net/account_UC?retryWrites=true&w=majority";

//handle connection database 
mongoose.connect(URLdatabase, {
    useNewUrlParser : true,
    useUnifiedTopology : true
});

mongoose.connection.on('connected' , function(err)
{
    if(err)
    {
        console.log("Fail to connect mongodb");
    }else 
    {
        console.log("Connect mongodb successful");
    }

})

app.use(bodyParser());
app.use(uploadFile());

app.use(express.static(path.join(__dirname , 'mainServer')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


//student database name
const dataStudent = mongoose.Schema;
const studentRecord = new dataStudent(
    {
        PersonId : String,
        Surname : String,
        Title : String,
        Givenames : String,
        teachPeriod : String,
        UnitCode : String,
        teamdID : String,
        email : String,
        status : String
    }
)

// upload file  
app.get('/upload' , function(req, res)
{
    res.render(path.join(__dirname , 'mainServer' , 'uploadFile.html') ,{check : checkUpload});
    checkUpload="";
});

// handle upload 
var  data ="";
var unitCode="";
var teamID="";
var teachPer="";
var checkUpload="";

app.post('/upload', function (req , res)
{   
   if(req.files)
   {

       var parseData = req.files.file.data.toString();
          
       var dataOfEach = parseData.split('\r\n');
    
       var title = req.body.title;
     
      for(var i = 1; i < dataOfEach.length - 1 ; i++)
      {
        data = data + dataOfEach[i] +";";
            var dataPer = dataOfEach[i].split(",");  
            unitCode = unitCode + dataPer[5] +",";  
            teamID = teamID + dataPer[6] + ",";
            teachPer = teachPer + dataPer[4] + ",";

                const studentData =
                {
                    PersonId : dataPer[0],
                    Surname : dataPer[1],
                    Title : dataPer[2],
                    Givenames : dataPer[3],
                    teachPeriod : dataPer[4],
                    UnitCode : dataPer[5],
                    teamdID : dataPer[6],
                    email : dataPer[7],
                    status : 'No'
                }   
          const formPesy = mongoose.model('students', studentRecord );
          const insertData = new formPesy(studentData);
          insertData.save( function (err)
          {
            if(err)
            {
                 console.log("fail to upload " + dataOfEach[i]);
            }
          });    
      }

    //   res.render(path.join(__dirname , 'mainServer' , 'uploadFile.html') , 
    //                                 {name : ab  , hello : "Hello world"});

    res.redirect('/data%20upload');
   }
  
});

app.get('/data%20upload' , function(req ,res)
{
    res.render(path.join(__dirname , 'mainServer' , 'dataUpload.html') , 
                                 { name : data});
    data="";
})

app.post('/data%20upload' , function(req ,res)
{
    res.redirect('/createForm');
})

// main site 
app.get('/' , function(req ,res)
{
    res.sendFile(path.join(__dirname , 'mainServer' , 'main.html'));
   
});


var id = [];
var title1 =[];
var unitCode1 =[];
var teamdID1 =[];
var teachPer1 =[];
var deadline =[];
// handle display form
app.get('/formcreated' , function(req, res)
{
    res.render(path.join(__dirname , 'mainServer', 'displayForm.html') );
//     var Comment = mongoose.model('formStudent', studentRecord);
//     Comment.find(function(error, comments) 
//     {
//         if(!error)
//         {
//             length = comments.length;
//             for(var i = 0 ; i < comments.length ; i++)
//             {
//                  title1.push(comments[i].toObject().title);
//                  id.push(comments[i].id);
//             }
//         }
//     });

   
//     res.render(path.join(__dirname , 'mainServer', 'displayForm.html') ,
//  {title : title1 , id : id });
 
//   title1 =[];
//   id=[];
});

 app.post('/formcreated' , function(req , res)
 {
    //console.log("Hello world");
    console.log(req.body);
    res.end();
 });


// UC site 
app.get('/UC' , function (req , res)
{
    var Comment = mongoose.model('formStudent', studentRecord);
    Comment.find(function(error, comments) 
    {
    });
    
   
    res.render(path.join(__dirname , 'mainServer', 'UCsite.html') , { length : "Hello world"});
})

//create form
app.get('/createForm' , function(req ,res)
{
    res.render(path.join(__dirname , 'mainServer' , 'createForm.html') , 
         {unitCode : unitCode , teamID : teamID , teachPer : teachPer });

    unitCode="";
    teamID="";
    teachPer="";

});

//handle get data from form 
app.post('/createForm' , function(req , res)
{
    var data = req.body;
    var question = "question";
   
    //console.log(req.body);
    var containQuestion = [];
  
    // chech one is object 
    if(typeof (data[question]) == "object" )
    {
        // get option of each question
        for(var i = 0 ; i < data[question].length ; i++)
        {
        var e = i + 1;
        var option = "option" + e;
        var ob = {
            question : data[question][i],
            category : data.category[i],
            option : data[option].toString()       
            } 
            // push into array
             containQuestion.push(ob);
        }
    }// one is string 
    else if(typeof (data[question]) == "string")
    {
        var option ="option1";
        var ob = {
            question : data[question],
            category : data.category,      
            option : data[option]
            }     
        containQuestion.push(ob);
    }

    //create schema for database  
        const schema = mongoose.Schema;
        const fomrRecord = new schema(
         {
            id : String,
            name : String,
            email : String,
            title : String,
            unitCode : String,
            teamdID : String,
            teachPer : String,
            deadline : String,
            question : Object
        }
    )

     
    const form_pesy =
    {
        id : req.body.idNumber,
        name : req.body.nameCreater,
        email : req.body.email,
        title : req.body.title,
        unitCode : req.body.unitCode,
        teamdID : req.body.teamID,
        teachPer : req.body.teachPer,
        deadline : req.body.deadline,
        question : containQuestion
    }
     
    const formPesy = mongoose.model('formStudent' , fomrRecord );
    const insertData = new formPesy(form_pesy);
    insertData.save( function (err)
    {
        if(err)
        {
            checkUpload ="0";
            res.redirect('/upload');
            console.log("faile to  upload form");
        }
        else
        {
            res.redirect('/upload'); 
            checkUpload = "1";
            console.log("Upload successfull");
        }
    });

});

// about site 
app.get('/ABOUT%20US' , function(req ,res)
{
    res.sendFile(path.join(__dirname , 'mainServer' , 'aboutUS.html'));
});

//student site 
app.get('/student' , function(req ,res)
{
    res.sendFile(path.join(__dirname , 'mainServer' , 'studentSite.html'));
});

// handle student site 
app.post('/student',  function(req ,res)
{
    res.sendFile(path.join(__dirname , 'mainServer' , 'studentSite.html'));
    console.log(JSON.stringify(req.body.name));
});

//start server 
app.listen(3000 , function(req, res)
{
    console.log("Server stated at " + 3000);
})
