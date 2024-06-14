const quizData = [
    {
      question: "What is HTML stands for",
      a: " Home Tool Markup Language",
      b: "HyperLinks and text markup language",
      c: "Hyper text markup lanuage",
      d: "Hyper tool marup language",
      crt: "c",
    },
    {
      question: "Which programming language is known as the 'language of the web'?",
      a: "Java",
      b: "Python",
      c: "JavaScript",
      d: "C++",
      crt: "c",
    },
    {
      question: "What does CSS stand for?",
      a: "Counter Style Sheets",
      b: "Computer Style Sheets",
      c: "Creative Style Sheets",
      d: "Cascading Style Sheets",
      crt: "d",
    },
    {
      question: "Which company developed the JavaScript programming language?",
      a: "Microsoft",
      b: "Google",
      c: "Netscape",
      d: "Apple",
      crt: "c",
    },
    {
      question: "What is the purpose of the 'alt' attribute in an HTML image tag?",
      a: "Alignment",
      b: "Alternate text for the image",
      c: "Animation",
      d: "Attribute",
      crt: "b",
    },
  ];
  const quiz=document.getElementById("quiz");
  const ansEle= document.querySelectorAll(".ans");
  const labelEle=document.querySelectorAll("op_label");
  const q=document.getElementById('ques');
  const a_text=document.getElementById("a_text");
  const b_text=document.getElementById("b_text");
  const c_text=document.getElementById("c_text");
  const d_text=document.getElementById("d_text");
  const prev=document.getElementById("prev");
  const next=document.getElementById("next");
  const submit=document.getElementById("submit");
  const result=document.getElementById("result");
const scoreEle=document.getElementById("score");
const showAns=document.getElementById("show");
const reload=document.getElementById('reload')
  let currentQn=0;
  let answered=0;
  let userSelected={}
  let submitted=false

  loadQuiz()
  function loadQuiz(){
    q.innerText=quizData[currentQn].question;
    a_text.innerText=quizData[currentQn].a;
    b_text.innerText=quizData[currentQn].b;
    c_text.innerText=quizData[currentQn].c;
    d_text.innerText=quizData[currentQn].d;
    deselectAns()


    if(userSelected[currentQn]){
        let selected=userSelected[currentQn];
        document.getElementById(selected).checked=true
    }
    if(currentQn==quizData.length-1){
        
        next.style.display="none";
        if(submitted){
            submit.style.display="none"
            reload.style.display="block"
        }
        else{
            submit.style.display="block";
            reload.style.display="none"
        }
    }

    if(submitted){
        let actalAns=quizData[currentQn].crt;
        let userSelected=userSelected[currentQn];

        labelEle.forEach(
            (e)=>{
                e.classList.remove('correct');
                e.classList.remove('wrong');
            }
        )

        if(actalAns==userSelected){
            let op=actalAns+"_text";
            document.getElementById(op).classList.add('correct');
        }
        else{
            let Crt_op=actalAns+"_text";
            document.getElementById(Crt_op).classList.add('correct');
            let User_op=userSelected+"_text";
            document.getElementById(User_op).classList.add('wrong');
        }
    }
  }

  function deselectAns(){
    ansEle.forEach(
        (e)=>{
            e.checked=false
            
        }
     )
  }
  
next.addEventListener(
    'click',()=>{
        let answer=getSelected();
        if(!submitted){
            if(answer)
            {
            if(answer==quizData[currentQn].crt){
                answered++;
            }
            currentQn++;
            if(currentQn<quizData.length){
                loadQuiz()
            }
            }
        }
        else{
            currentQn++;
            loadQuiz();
        }
    }
)

function getSelected(){
     let  ans;
     ansEle.forEach(
        (e)=>{
            if(e.checked){
                ans=e.id
                userSelected[currentQn]=ans
            }
        }
     )
     return ans;
}

prev.addEventListener(
    'click',()=>{
        if(currentQn>0){
            currentQn--;
            loadQuiz();
            
        }
    }
)

submit.addEventListener(
    'click',()=>{
        if(getSelected()){
        submitted=true;
        quiz.style.display="none";
        result.style.display="block";
        scoreEle.innerHTML=answered+"/"+quizData.length+" questions answered correctely"
        }
    }
)

function loadAns(){
    currentQn=0;
    quiz.style.display="block";
    result.style.display="none";
    ansEle.forEach(
        (e)=>{
           e.disabled=true;
        }
     )
     submit.style.display="none"
     next.style.display="block"
     loadQuiz()
}