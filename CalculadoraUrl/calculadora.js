module.exports = {
    
    somar: function(n1, n2) {
        return n1 + n2;
    },

    subtrair: function(n1, n2) {
        return n1 - n2;
    },

    multiplicar: function (n3, n4) {
        return n3 * n4;
    },

    dividir: function (n3, n4) {
        return n3 / n4;
    },

    fatorial: function (n4) {
        if(n4 === 1) {
            return 1;
        }
        return n4 * this.fatorial(n4 - 1);
    },

}