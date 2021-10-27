// 1. Функция sum принимает параметром целые положительные
// числа (неопределённое кол-во) и возвращает их сумму (rest).




export function sum( ...nums: Array<any>) {
    let a:number = nums.reduce(function (acc,el) {
     return acc+el
    },0)
    return a
}


// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника.
// Функция должна возвращать:
//  - "10", если треугольник равносторонний,
//  - "01", если треугольник равнобедренный,
//  - "11", если треугольник обычный,
//  - "00", если такого треугольника не существует.

export function getTriangleType(a: number,b: number,c: number): string {
     let d = Math.pow(a,2)+Math.pow(c,2);
    if((a<b+c)&&(b<a+c)&&(c<a+b)) {
        if (a === c && a === b) {
            return '10'
        }
        if (Math.pow(b, 2) === d) {
            return '11'
        }
        if (Math.pow(b, 2) < d) {
            return '01'
        }
    }
    return '00'
}


// 3. Функция getSum принимает параметром целое число и возвращает
// сумму цифр этого числа

export function getSum(number: number): number{
   let a = Array.from(String(number), Number);
 let b = 0;
 for( let i=0 ; i< a.length; i++ ){
     b += a[i];
 }
    return b
}


// 4. Функция принимает isEvenIndexSumGreater параметром массив чисел.
// Если сумма чисел с чётными ИНДЕКСАМИ!!! (0 как чётный индекс) больше
// суммы чисел с нечётными ИНДЕКСАМИ!!!, то функция возвращает true.
// В противном случае - false.

export const isEvenIndexSumGreater = (arr: Array<number>): boolean => {
   let arr2 = arr.filter((t,c)=>c%2===0 )
   let arr3 = arr.filter((t,c)=>c%2!==0 )
    let a = 0
    let b =0
    for(let i = 0; i< arr2.length; i++){
        a +=arr2[i];
   }
    for(let i = 0; i< arr3.length; i++){
        b +=arr3[i];
    }
    if(a < b){
        return false
    }
    return true
}


// 5. Функция isSquareGreater принимает два параметра: площадь круга и
// площадь квадрата. Функция должна возвращать true если круг не будет выступать за пределы
// квадрата и false в противном случае. Центры фигур совпадают.

export function isSquareGreater(areaCr: number, areaSq: number): boolean {
    let a=1;
    areaCr=areaCr*Math.pow(a,2)
    areaSq=areaSq*Math.pow(a,2)
    if ( areaCr< areaSq){
        return true
    }
    return false
}


// 6. Функция-банкомат принимает параметром целое натуральное число (сумму).
// Возвращает массив с наименьшим количеством купюр, которыми можно выдать эту
// сумму. Доступны банкноты следующих номиналов:
// const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1].
// Считаем, что количество банкнот каждого номинала не ограничено

// Д.З.:
export function getBanknoteList(amountOfMoney: number): Array<number> {
    const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1]
    let result2500 = [];
  for( let i = 0; i < banknotes.length; i++){
      if (amountOfMoney/banknotes[i]>=1){
          let times = Math.floor(amountOfMoney/banknotes[i])
          let sum = times*banknotes[i];
          amountOfMoney=amountOfMoney-sum
          for(let k = 0; k < times ; k++) {
              result2500.push(banknotes[i])
          }
      }
  }
    return result2500
}

