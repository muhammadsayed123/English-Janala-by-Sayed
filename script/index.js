const loadLesson=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=>res.json())
    .then(info=>displayLesson(info.data))
}
function pronounceWord(wordss) {
  const utterance = new SpeechSynthesisUtterance(wordss);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const removeActive=()=>{
    const lessonButton=document.querySelectorAll(".lesson-btn")
    // console.log(lessonButton)
    lessonButton.forEach((btn)=>btn.classList.remove("active"))
}

const loadLevelWord=(id)=>{
    
    const url=`https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        
        removeActive()
        alert("অবশ্যই দাঁড়ি পাল্লায় ভোট টা দিবেন !!!")
        const clickBtn=document.getElementById(`lesson-btn-${id}`)
        // console.log(clickBtn)
        clickBtn.classList.add("active")
        displayLevelWord(data.data)
    })
}

const loadWordDetails=(id)=>{
    const url=`https://openapi.programming-hero.com/api/word/${id}`
    // console.log(url)
    fetch(url)
    .then(res=>res.json())
    .then(d=>displayWordDetails(d.data))
}
const displayWordDetails=(word)=>{
    console.log(word)
    const detailsContainer=document.getElementById("details-container")
    detailsContainer.innerHTML=`
    <div>
        <h2 class="text-2xl font-bold">${word.word}(<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
      </div>
      <div>
        <h2 class="font-bold">Meaning</h2>
        <p>${word.meaning}</p>
      </div>
      <div>
        <h2 class="font-bold">Example</h2>
        <p>${word.sentence}</p>
      </div>

    `
    document.getElementById("my_modal_5").showModal()
}



const displayLevelWord=(words)=>{    
    // 1.
    const wordContainer=document.getElementById("word-container")
    wordContainer.innerHTML="";

    // for lesson 4 & 7
    if(words.length === 0){
        // alert("word nai")
        wordContainer.innerHTML=`
        <div class="text-center font-bangla col-span-full space-y-4 py-10">
            <img src="./picture/alert-error.png" class="mx-auto">
            <p class="text-gray-500 text-xl">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-semibold text-4xl">নেক্সট Lesson এ যান</h2>
        </div>
        `
        return;
   }
    // 2.
    for(let word of words){
        // 3.
        const card=document.createElement("div")
        card.innerHTML=`
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="text-2xl font-medium font-bangla">"${word.meaning?word.meaning:"অর্থ পাওয়া যায়নি"}/${word.pronunciation?word.pronunciation:"Pronunciation পাওয়া যায়নি"}"</div>
            <div class="flex justify-between items-center">
                <button onClick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button onClick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        // 4.
        wordContainer.append(card)
    }
}

const displayLesson=(lessons)=>{
    // 1. get the container and empty the container
    const levelContainer=document.getElementById("level-container")
    // levelContainer.innerHTML="";

    // 2.get into every lesson
    for(let lesson of lessons){
        // console.log(lesson)
        // 3.create element
        const btnDiv=document.createElement("div");
        btnDiv.innerHTML=`
             <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
        `;
        // 4.append into container
            levelContainer.append(btnDiv);
    }
}

loadLesson()