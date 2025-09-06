

/*this algo preserves values in a merge, rather than overwrites them

the recursive function has no return statement since we're mutating target[key] the entire way, and the loop terminates

*/

const target = {
    a:1,
    b:2,
    c:{
        d:5,
        e:6,
        f:7,
        h:8,
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
        c:3,
        g:[8,9,10],
        i:[12,13,14],
        j:10,
        k:{
            a:1,
            b:2,
            c:{
                d:1,
            }
        }
    },
    d:[3,4,5],
    e:10,
    f:[20]
}


const allowedKeys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"];

function merge(target, source){

    for (let key in source){


        /*

        Refactored

        if(key === "__proto" || !(key === "a" || key === "b" || key === "c"|| key === "d" || key === "e" || key === "f")){

            console.log("WARNING: foreign key detected")

            continue;



        }*/


        if(key === "__proto__" || ! allowedKeys.includes(key)){


            console.log("WARNING: foreign key detected", key)

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

            else if(typeof source[key] !== 'object' && typeof target[key]
                !== 'object' && target[key] !== undefined){


                const arr = [];

                arr.push(target[key], source[key]);

                target[key] = arr;



            }


            //case where property values are both arrays

            else if (Array.isArray(target[key]) && Array.isArray(source[key])){

                target[key] = source[key].concat(target[key]);

            }


            //case where one is an array and the other is not, but property must exist
            //parenthesis added so it evaluates first, then evaluates if property exists

            else if((Array.isArray(source[key]) || Array.isArray(target[key]))  && target[key]!==undefined){


                if(Array.isArray(source[key])){

                    source[key].push(target[key]);

                    target[key] = source[key];

                }

                else{
                    target[key].push(source[key]);
                }


            }

            //case where the property doesn't exist, create the new property

            /* refactored from else if( target[key] === undefined )*/

            else {

                target[key] = source[key];
            }

        }

        }


    return target;

}

const merged = merge(target, source)

console.log(merged)

console.log(merged.c.k.c.d, "the algorithm works!")


