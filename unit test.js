
//this unit tests takes a smaller section of code and runs it in the debugger

const target = {
    c:{
        d:5,
        e:6,
        f:7,
    },
}

const source ={
    c: {
        a:1,
        b:2,
        c:3
    },
}


function merge(target, source){

    for (let key in source){

            if(typeof source[key] === 'object' && typeof target[key] === 'object'
            && !Array.isArray(target[key]) && !Array.isArray(source[key]) ){

                merge(target[key], source[key]);

            }

/*a breakpoint here shows target[key] is undefined, and we see in the block scope, key ="a",
we plug "a" as key in target, notice it doesn't exist, so it returns undefined and pushes to the array

Solution: make a case where property doesn't exist, and add to if() that property does exist
*/

            else if(typeof source[key] !== 'object'
            && typeof target[key] !== 'object'){

                console.log(target[key], source[key], "target[key] undefined");

                const arr = [];

                arr.push(source[key], target[key]); //pushes undefined value into new array

                target[key] = arr;
            }


    }
}

merge(target, source)

console.log(target)