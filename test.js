
console.log(new Date().toLocaleDateString('zh-cn',{hour12:false}))
var test = '星期' + '日一二三四五六'.charAt(new Date().getDay())
console.log(test);