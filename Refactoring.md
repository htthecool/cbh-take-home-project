# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

### Refactoring reasoning

I tried to rename variables and abstract repeated code into a function. Also, i tried to break down the code into readable and logical unit.

The function takes an object and returns a SHA hash key if event is a valid object. Else, the function returns "0". Considering this simple explanation of the function, I made a few changes to the code.

1. I renamed the 'candidate' variable to 'partitionKey'. The function returns a partition key so it is easier to follow what it means.

2. If falsy value is passed as a parameter then the function always returns "0". So, I brought this logic in the if/else for the event check itself. It makes it easier to follow what happens if falsy param is supplied

3. From the first block you have a truthy value for partitionKey. From here onward, we check if the partitionKey is a valid string, if not we stringify it. After stringifying, if the length of partitionKey is greater than MAX_PARTITION_KEY_LENGTH, then we hash it using crypto function
