let arr = []
let arrDone = []
let arrTrash = []
let card = document.getElementById('card')
let carDone = document.getElementById('carddone')
let cardTrash = document.getElementById('trashcards')
let cardH3 = document.getElementById('cardh3')
let carddoneh3 = document.getElementById('carddoneh3')

window.addEventListener('load',()=>{

    if (localStorage.arr){
        arr = JSON.parse(localStorage.getItem("arr"))
        arr.map((ar)=>{
        const{index,value}= ar
        const class2 = new Card(index,value)
        return class2.generateCard().getCard()
    })      
    } 
    if(localStorage.arrDone){
        arrDone = JSON.parse(localStorage.getItem("arrDone"))
        arrDone.map((arDone)=>{
        const {index,value} = arDone
        const class3 =new Card(index,value)
        return class3.generateDoneCard().getCard()
        })
    }
    if(localStorage.arrTrash){
        arrTrash = JSON.parse(localStorage.getItem("arrTrash"))
    }
    cardH3.textContent = `U have ${arr.length} tasks left.`
    carddoneh3.textContent = `U have ${arrDone.length} finished tasks.` 
    console.log('Page was loaded')
})



document.getElementById('input').addEventListener('keypress', function(e) {
	if (e.key === 'Enter') {
		let input=document.getElementById('input')
		let inputValue = input.value
	
		if(!inputValue){
			alert('U need to fill list ')
		}else{ 
			let index = 0   
            localStorage.getItem("taskIndex")? index= parseInt(localStorage.getItem("taskIndex")):0;
            const object ={index:index++,value:inputValue} 
            localStorage.setItem("taskIndex",index) 
            arr.push(object)
            setCard(object)   
            cardH3.textContent = `U have ${arr.length} tasks left.`
			 
		}
	}     
});  


class Card {
    constructor(index,value){
        this._index = index
        this._value = value
        this.card = null
	}
	generateCard(){
        //div
        let div1 = document.createElement('div')
        div1.id = this._index
        div1.className = "cardstyle"
        card.appendChild(div1)
        //p
        let card1 = document.createElement('p')
        card1.textContent = this._value
        card1.className = "paragraphstyle"
        div1.appendChild(card1)
        //btn-doneCard
        let btn1 = document.createElement('button')
        btn1.textContent = "Done Tasks"
        btn1.className = "buttonstyle"
        btn1.addEventListener('click',()=>{ 
            const object2 ={index:this._index,value:this._value}
            arrDone.push(object2)
            this.generateDoneCard(object2)
            carddoneh3.textContent = `U have ${arrDone.length} finished tasks.`
            arr=deleteteForAll(this._index,arr,card,"arr")
            cardH3.textContent = `U have ${arr.length} tasks left.`
        })
        div1.appendChild(btn1)
         //btn-delete
        let btn2 = document.createElement('button')
        btn2.textContent = "Delete Task"
        btn2.className = "buttonstyle"
        btn2.addEventListener('click',()=>{
            arr=deleteteForAll(this._index,arr,card,"arr")
             cardH3.textContent = `U have ${arr.length} tasks left.`
        })
       div1.appendChild(btn2)
       this.card = div1
       return this
           
    }
    generateDoneCard(){
        let div2=document.createElement('div')
        div2.id = this._index
        div2.className = "cardstyle1"
        carDone.appendChild(div2)
        //p
        let card2 = document.createElement('p') 
        card2.textContent = this._value
        card2.className = "paragraphstyle"
        div2.appendChild(card2)
        //check box
        let checkBox = document.createElement("INPUT")
        checkBox.setAttribute("type", "checkbox")
        checkBox.className = "chechboxstyle"
        div2.appendChild(checkBox)
        //btn-delete
        let btn2 = document.createElement('button')
        btn2.textContent = "Delete Task"
        btn2.className = "buttonstyle"
        btn2.addEventListener('click',()=>{
           if(checkBox.checked){   
                const object3 = {index:this._index,value:this._value}
                arrTrash.push(object3)
                this.generateDeletedCards(object3)
                arrDone = deleteteForAll(this._index,arrDone,carDone,"arrDone")
                carddoneh3.textContent = `U have ${arrDone.length} finished tasks.`
            }else{
                alert('Please mark check box if u realy want to delete this item.')
            } 
        }) 
        div2.appendChild(btn2)
        this.card = div2
        return this
    }
    generateDeletedCards(){
        let div3 = document.createElement('div')
        div3.id = this._index
        div3.className = "cardstyle"
        cardTrash.appendChild(div3)
        //p
        let card3 = document.createElement('p')
        card3.textContent = this._value
        card3.className = "paragraphstyle"
        div3.appendChild(card3)
        //Btn return to Taks
        let btn3a = document.createElement('button')
        btn3a.textContent = "Return To Done Task"
        btn3a.className = "buttonstyle"
        btn3a.addEventListener('click',()=>{
            const object2 ={index:this._index,value:this._value}
            arrDone.push(object2)
           arrTrash = deleteteForAll(this._index,arrTrash,cardTrash,"arrTrash")
            this.generateDoneCard(object2)
            carddoneh3.textContent = `U have ${arrDone.length} finished tasks.`
            
        })
        div3.appendChild(btn3a)
        //Btn to delete Totaly
        let btn3b = document.createElement('button')
        btn3b.textContent = "Delete Totaly"
        btn3b.className = "buttonstyle"
        btn3b.addEventListener('click',()=>{
           arrTrash = deleteteForAll(this._index,arrTrash,cardTrash,"arrTrash")
        })
        div3.appendChild(btn3b)
        this.card = div3
        return this
    }
    getCard(){
        return this.card
    }
}
    let retriveCards = document.getElementById('retrevecards')
    retriveCards.addEventListener('click',function(){
        arrTrash = JSON.parse(localStorage.getItem("arrTrash"))
        arrTrash.map((arTrash)=>{
            const {index,value}=arTrash
            const class4 =new Card(index,value);
            return class4.generateDeletedCards().getCard()
        })
        
    })
    function deleteteForAll(indexx,arrAll,cardAll,arrName){ 
        let a = document.getElementById(indexx)
        cardAll.removeChild(a)
        const newArrAll = arrAll.filter(arAll => arAll.index !== indexx) 
        localStorage.setItem("arrTrash",JSON.stringify(arrTrash));
        localStorage.setItem("arrDone",JSON.stringify(arrDone)); 
        localStorage.setItem(arrName,JSON.stringify(newArrAll));      
        return newArrAll;

    }

    function setCard({index,value}){
    const class1 = new Card(index,value)
    const myCard = class1.generateCard().getCard()
    card.appendChild(myCard)
    localStorage.setItem("arr",JSON.stringify(arr))
    input.value = ''  
    }


