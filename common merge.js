const target = {
    a:4,
    b:5,
}

const source ={
    a:1,
    b:{
        c:3,
        b:4,
        d:[1,2,4],
        e: {
            f:8,
            g:9,
            g:10
        }
    }
}

//writes over target object

function commonMerge(target, source) {

    for(let key in source){

        if(Object.prototype.hasOwnProperty.call(target, key)){


            if(typeof source[key] === "object" && typeof target[key] === "object"){

                commonMerge(target[key], source[key]);

            }
            else{
                target[key] = source[key];
            }
        }
    }
}

commonMerge(target, source);

console.log(target);