const target = {
    c:{
        d:5,
        e:6,
        f:7,
        //g:[9,10,11] //if this is gone, [13,14,15] still created
    },
}

const source ={
    c: {
        a:1,
        b:2,
        c:3,
        g:[13,14,15]
    },
}

function merge(target, source, index){

    for (let key in source){

            if(typeof source[key] === 'object' && typeof target[key] === 'object'  && !Array.isArray(target[key]) && !Array.isArray(source[key]) ){

                merge(target[key], source[key]);

            }

            //case if both props exist on source and object target, but properties must exist with key

            else if(typeof source[key] !== 'object' && typeof target[key] !== 'object' && target[key] !== undefined){

                console.log(target[key], source[key], "target[key] lost");

                const arr = [];

                arr.push(source[key], target[key]);

                target[key] = arr;

            }


            else if(target[key] === undefined){

                //create the property and assign the source value to it

                target[key] = source[key];

            }


    }


}

merge(target, source)

console.log(target)