# Merge Function Bug Fix

### Description
Most merges write over properties and values, from the source object to the target object. This algorithm moves keys and values to the target object, but keeps every value. It also checks for a __proto__key to prevent prototype pollutions, and filters out anyother unwanted keys.

#### Bug Description
This algorithm produced an unexpected result it pushed undefined into the array instead of combining values. Inside the broken algo.js file

```
arr.push(target[key], source[key])

```

![output](images/1.%20unexpected%20output.png)

#### Unit test setup
I isolated the part of the code that was giving me the error, where target[key] was undefined and ran the debugger. The debugger doesn't say why its happening only what the value is. So because target[key] is undefined, that means a property doesn't exist. So it can't access the value, therefore, uses the undefined value in the push. 
The debugger shows the block scope, key="a", and target["a"] clearly doesn't exist. 

![unit test debug](images/2.%20debugger%20on%20unit%20test.png)

#### Unit test solution
The solution to the unit test, is to create a case that handles non-existent properties. We move all the undefined properties to the last case where we can assign and create a new property.

```
target[key] = source[key]

```

Now the algo skips the broken point of the algo, and moves to the last code block, and the output works as expected: 

![unit test solution](images/3.%20debugger%20on%20test%20solution.png)

The unit test solution removed the undefined pushes and produced an acceptable result: 

![](images/4.%20test%20solution%20output.png)

### Final solution
I refactored some code, left the assignment in the last else{} case, added a return target, as good practice. And got the result I wanted, a nice merge that preserves every value, into a given target object.

![final result](images/5.%20final%20algo%20output.png)
