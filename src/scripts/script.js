// import { hello } from "./sayHI";

function showHello() {
    alert("dsg")
}


const mybutton = document.getElementById('');


let str = "parirampumpum";
let cat = {
    countOfLife: 8,
    mew() {
        console.log("mewmew");
    }
};

// const button = document.getElementById('button-cat')

// button.addEventListener('click', () => {
//     cat.mew();
// });


function sum(a, b) {
    return a + b;
};

const sumator = (a, b) => a + b;

const inputA = document.getElementById('input-a');
const inputB = document.getElementById('input-b');
const output = document.getElementById('output');
const button = document.getElementById('button-sum');
button.addEventListener('click', () => {
    let a = parseFloat(inputA.value);
    let b = parseFloat(inputB.value);
    output.innerHTML += a + b;
})



// callback пример
function alpha() {
    console.log('alpha')
}
function beta() {
    console.log('beta')
}
function func(alpha, beta) {
    let isAlpha = confirm('Ты альфа?');
    if(isAlpha) {
        alpha();
    } else {
        beta();
    }
}
const buttonAlpha = document.getElementById('button-alpha');
buttonAlpha.addEventListener('click', () => {
    func(alpha(), beta());
})




const buttonTree = document.getElementById('button-tree');
buttonTree.addEventListener('click', () => {
    const p = document.createElement('p');
    p.innerText = "Mew";
    document.body.append(p);
})








// import {hello} from "sayHI";

// hello;