

//this is an algorithm that's meant to preserve values in an array when merging, rather then overwriting the target object

const target = {
    a:1,
    b:2,
    c:{
        d:5,
        e:6,
        f:7,
    },
    d:[7, 8, 9],
    e:[9],
    f:1,
}

const source ={
    a:[2,3,4],
    b:20,
    c: {
        a:1,
        b:2,
        c:3
    },
    d:[3,4,5],
    e:10,
    f:[20]
}


const allowedKeys = ["a", "b", "c", "d", "e", "f", "g"];

function merge(target, source){

    for (let key in source){



        /*if(key === "__proto" || !(key === "a" || key === "b" || key === "c"|| key === "d" || key === "e" || key === "f")){

            console.log("WARNING: foreign key detected")

            continue;



        }*/


        if(key === "__proto__" || ! allowedKeys.includes(key)){


            console.log("WARNING: foreign key detected", key) //this is probably because of the merge

            continue;
        }


        if(Object.prototype.hasOwnProperty.call(source, key)){



            //case for if both values are objects, and are NOT arrays

            if(typeof source[key] === 'object' && typeof target[key] === 'object'
                && !Array.isArray(target[key]) && !Array.isArray(source[key])
            ){


                merge(target[key], source[key]);


            }



            //case where values are both primitives

            else if(typeof source[key] !== 'object' && typeof target[key] !== 'object' ){



                //issues that target[key] is undefined, which means the property doesn't exist, and undefined gets pushed into array

                console.log("undefined target[key]", target[key]);

                const arr = [];

                arr.push(target[key], source[key]); // [undefined, 1] gets pushed in

                target[key] = arr;  //[undefined 1] gets set as target[key]



            }


            //case where property values are both arrays

            else if (Array.isArray(target[key]) && Array.isArray(source[key])){

                target[key] = source[key].concat(target[key]);

            }


            //case where one is an array and the other is not


            else {

                if(Array.isArray(source[key])){

                    source[key].push(target[key]);

                    target[key] = source[key];
                }
                else{
                    target[key].push(source[key]);
                }



            }

        }





        }






}

merge(target, source)

console.log(target)


