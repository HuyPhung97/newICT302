
    var countQuestion = 0;
    var countOption = 1;
    var check = 0;
    var test = [];

     function applyCss()
     {
        
         document.getElementById("theLeftBackground").style.height = document.getElementById("theRightBackground").offsetHeight;
         document.getElementById("theLeftBackground").style.backgroundColor="#cccccc";
     }

    // function check
    function checkQuestion()
    {
        if(countQuestion <= 0)
        {
            alert("You have not created any question yet!!!!");
            return false;
        }
        else 
        {
            return true;
        }            
    }

    // create new Question 
    function createNewQuestion()
    {
        countQuestion++;
       
        var newQuestion = document.getElementById("containQuestion");
        // id for question 
        var idQuestion = "question" + countQuestion;

        // id for category 
        var idCategory = "cate" + countQuestion + idQuestion;

        //var idOption = "category"+newQuestion + "option";
        var idOption = "category" + countQuestion +"option";

        // var for contain question
        var idTest = "test"+ countQuestion;

        let containInput =      
            `<div id="`+idTest+`">
            <div id="questionContain">
                 <div id="`+idQuestion+`"> 
                     <input  placeholder="Question `+countQuestion+`" name="question" type="text" required/>
                     <select id="`+idCategory+`" value="MC" name="category" onclick="displayOption(this ,\'`+ idOption +`\')" required>
                        <option value="">None</option>
                        <option value="MC" > Mutiple Choose </option>
                        <option value="Answer"> Answer </option>
                    </select>
                <div id="`+idOption+`"> </div>
                 <div class="removeQuestion"> <button id="btn`+countQuestion+`"type="button" onclick="removeQuestion(\'`+ idQuestion +`\' ,  \'`+ idTest +`\')"> Deleted <i class="fa fa-trash"> </i> </button> </div>
            </div></div></div> `;
       // document.getElementById(idTest).style.backgroundColor = "red"; 
        newQuestion.insertAdjacentHTML("beforeend" , containInput);
        document.getElementById(idTest).style.backgroundColor = "white"; 
        document.getElementById(idTest).style.padding="1%";
        document.getElementById(idTest).style.marginBottom = "1%";
        document.getElementById(idTest).style.marginTop = "1%";
        applyCss();
    }

    //Display option 
    function displayOption(id , option)
    {
        check = 1;
        countOption = 1;
       var checkOption = document.getElementById(id.id).value;
       var option = document.getElementById(option);
       // creat id option 
       var idOption = option.id + countOption;

       // create id button
       var buttonId = idOption + "btn" + countOption;
      // console.log(idOption);
 
  
        if(checkOption == "MC")
         {
             var displayOption = `<div id="Answer">
             <div id="`+idOption+`">
             <p  id="optionWithButton" > <input id="`+idOption + countOption+`"type="text" placeholder="Option `+countOption+`" name="option`+countQuestion+`">
                <button id="`+buttonId+`" type="button" onclick="removeOption(this.id , \'`+ idOption +`1\')" ><i class="fa fa-trash"></i></button>
             </p> </div>
             <input type="text" placeholder="New Option" onclick="addNewOption(\'`+ idOption + `\' )" />
              </div>`;

              option.innerHTML =displayOption;
                 
         }
         else if(checkOption == "Answer")
        {
            var displayOption = `<div id="Answer"> <input type="text"  placeholder="Answer" readonly="readonly"  name="option`+countQuestion+`"> </div>`;
             option.innerHTML =displayOption;
         }
         applyCss();
    }

    //function add new Option
    function addNewOption(id )
    {
        var test123 = parseInt(countOption)-1;
        countOption++;
        var idOp = id + countOption;
        var buttonId = id+ "btn" + countOption;
        var newOption = document.getElementById(id);
        var displayOption = `<p  id="optionWithButton" > <input id="`+idOp+`"type="text" placeholder="Option `+countOption+`" name="option`+countQuestion+`">
            <button id="`+buttonId+`" type="button" onclick="removeOption(this.id, \'`+ idOp +`\')"><i class="fa fa-trash" ></i></button>   </p>`;

        newOption.insertAdjacentHTML("beforeend" , displayOption);
        document.getElementById(idOp).focus();
        applyCss();
    }

    // remove each option
    function removeOption(idInput , idBtn)
    {
        console.log(idInput + " " + idBtn);
       document.getElementById(idInput).remove();
       document.getElementById(idBtn).remove();
       applyCss();
    }

    // remove question 
    function removeQuestion(id , idTest)
    {
        document.getElementById(id).remove();
        // document.getElementById(buttonID.id).remove();
        // document.getElementById(idTest).remove();
        document.getElementById(idTest).style.display  = "none";
        applyCss();
    }

    // function reset
    function reset123()
    {
        document.getElementById("surveyForm").reset();
        for(var i = 1 ; i <= countQuestion ; i++)
        {
            var ab = "test"+ i;
            document.getElementById(ab).remove();
        }
       applyCss();
        countQuestion = 0;
    }
