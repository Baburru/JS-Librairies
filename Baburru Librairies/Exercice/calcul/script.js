

let Calcul = function (a,b) {
    
    this.a = a
    this.b = b

    this.somme = () => {
        return this.a + this.b
    }
}


let Calcul2 = new Calcul (4,10)
let Calcul3 = new Calcul (14,110)

Calcul.prototype.multiplier =  function() {
    return this.a * this.b
}
console.log(Calcul2.multiplier())

