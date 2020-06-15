var myDatabase = [
    {name: 'Tony Stark', email:'IronMan@gmail.com',age: 48},
    {name: 'Steve Rogers', email:'America@gmail.com',age: 57},
    {name: 'Steven Strange', email:'DrStrange@gmail.com',age: 42},
];

(function Cards(db){
    var init = function(){
        generateList();
        enterUser();
    }

    var generateList = function(){
        var parent = document.querySelector('#parent_avatars');
        var template = '';
        
        for(var i = 0;i < db.length; i++){
                       
            template +='    <div class="col-sm-4">';
            template +='            <div class="card">';
            template +='                <div class="card-delete" data-card="'+i+'">X</div>';
            template +='                <div class="card-block">';
            template +='                    <h3 class="card-title">'+db[i].name+'</h3>';
            template +='                    <p class="card-text">';
            template +='                        <strong>Email</strong>:<span>'+db[i].email+'</span>';
            template +='                   </p>';
            template +='                    <p class="card-text">';
            template +='                        <strong>Age</strong>:<span>'+db[i].age+'</span>';
            template +='                    </p>';
            template +='                </div>';
            template +='            </div>';
            template +='    </div>';
        } 
        parent.innerHTML=''; //this deletes the content of the #parent_avatars, if not used it accumulates the content and repets every user when runned.
        parent.insertAdjacentHTML('afterbegin',template);
        deleteCard();
    }
    var enterUser = function (){

        function grabUser(){
            var name = document.querySelector('#user_name').value;//the .value grabs the data inside the field
            var email = document.querySelector('#user_email').value;
            var age = document.querySelector('#user_age').value;

            var elements = [name,email,age];

            if(validateUser(elements)){
                document.querySelector('#myForm').reset(); //sets the name, email and age fields fo the page to blanc.
                db.push({name:name,email:email,age:age}) //adds the card
                generateList();
                 
                
                
            }else{//the validateUser function returns false, at least 1 field is empty
                document.querySelector('#error').style.display = 'block'; //shows the error message
                setTimeout(function(){
                    document.querySelector('#error').style.display = 'none';//hides the error message after 4sec
                },5000);
            }
        }

        document.querySelector('#myForm').addEventListener("submit",function(event){//when we push the Add user button
            event.preventDefault();//prevents the page from reloading, an old function of js
            grabUser();
        })
    }

    var validateUser = function(inputs){//checks if any field is empty
        for(var i=0; i<inputs.length; i++){
            if(inputs[i] == ""){
                return false //the "return" kills the loop.
            }
        }
        return true
    }

    var deleteCard = function (){
        var buttons = document.querySelectorAll('.card-delete'); // card-delete is the class of the X buttons
        
        function deleteThis(inputs){
            var dataCard = parseInt(inputs.getAttribute('data-card'));//getAttribute returns the value of an attribute, in this case the data-card class value.
            db.splice(dataCard,1);
            generateList();
        }

        for(var i=0;i<buttons.length;i++){
            buttons[i].addEventListener('click',function(){
                deleteThis(this); //the "this" keyword references the i inside the event listener...
            })
        }
    }

    init();
}(myDatabase))
