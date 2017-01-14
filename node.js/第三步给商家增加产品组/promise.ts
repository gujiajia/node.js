var isSucessPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('我成功了');

    }, 5000);

});


async function testPromise() {

    var result = await isSucessPromise;
    console.log(result);

}
testPromise();