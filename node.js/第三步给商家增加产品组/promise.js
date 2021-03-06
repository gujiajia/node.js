var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var isSucessPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('我成功了');
    }, 5000);
});
function testPromise() {
    return __awaiter(this, void 0, void 0, function* () {
        var result = yield isSucessPromise;
        console.log(result);
    });
}
testPromise();
//# sourceMappingURL=promise.js.map