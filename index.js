const fs=require('fs');
const Big=require('big-integer')
class RSA{
    constructor(){
        this.millsNumber=1.30637788386308069046861492;
        this.p=null;
        this.q=null;
        this.e=null;
        this.d=null;
        this.n=null;
        this.phi=null;
        this.public=null;
        this.private=null;
    }
    modulo(divident, divisor) {
        let cDivident = '';
        let cRest = '';
      
        for (let i in divident) {
          let cChar = divident[i];
          let cOperator = cRest + '' + cDivident + '' + cChar;
      
          if (cOperator < parseInt(divisor)) {
            cDivident += '' + cChar;
          } else {
            cRest = cOperator % divisor;
            if (cRest == 0) {
              cRest = '';
            }
            cDivident = '';
          }
        }
        cRest += '' + cDivident;
        if (cRest == '') {
          cRest = 0;
        }
        return cRest;
      }
    modCheckValue(value,bound){
        if(value%bound < 0){return bound+(value%bound)}
        return value%bound
    }
    Euclid_gcd(a, b) {
        let bound=b;
        a = +a;
        b = +b;
        if (a !== a || b !== b) {
          return [NaN, NaN, NaN];
        }
        
        if (a === Infinity || a === -Infinity || b === Infinity || b === -Infinity) {
          return [Infinity, Infinity, Infinity];
        }
        // Checks if a or b are decimals
        if ((a % 1 !== 0) || (b % 1 !== 0)) {
          return false;
        }
        var signX = (a < 0) ? -1 : 1,
          signY = (b < 0) ? -1 : 1,
          x = 0,
          y = 1,
          u = 1,
          v = 0,
          q, r, m, n;
        a = Math.abs(a);
        b = Math.abs(b);
      
        while (a !== 0) {
          q = Math.floor(b / a);
          r = b % a;
          m = x - u * q;
          n = y - v * q;
          b = a;
          a = r;
          x = u;
          y = v;
          u = m;
          v = n;
        }
        return [b, this.modCheckValue(signX * x,bound), signY * y]
      }
    primeGenrator(n){
        //Using Mill's Primes
        return Math.floor(Math.pow(this.millsNumber,Math.pow(3,n)));
    }
    randFloatGenn(u,l,n){
        return (Math.random() * (u - l) + l).toFixed(n)
    }
    coprime(a, b) { 
        let r=Math.round(Math.sqrt(a))
        console.log(`r=${r} for a`)
        let tempAarr=[]
        for(let i=2;i<r;i++){
            if(a%i==0){
                tempAarr.push(i);
                tempAarr.push(a/i);
            }
        }   
        r=Math.round(Math.sqrt(b))
        console.log(`r=${r} for b`)
        for(let i=2;i<r;i++){
            if(b%i==0&&tempAarr.includes(i)){
                return false;
            }
        }
        return true;
    } 
    genrateKeys(){
        this.p=this.primeGenrator(this.randFloatGenn(3,3.5,6))
        while(this.q==null||this.p==this.q){
            this.q=this.primeGenrator(this.randFloatGenn(3,3.5,6))
        }
        this.n=this.p*this.q;
        this.phi=(this.p-1)*(this.q-1);
        this.e=this.primeGenrator(this.randFloatGenn(3,3.5,6));
        do{
            this.e=this.primeGenrator(this.randFloatGenn(3,3.5,6));
            console.log(Big.gcd(this.e,this.phi).toJSNumber())
        }while(Big.gcd(this.e,this.phi).notEquals(1)||this.e>=this.phi)
        //console.log('full con:',Big.gcd(this.e,this.phi).notEquals(1)&&this.e>=this.phi&&!this.coprime(this.e,this.phi),'con3:',!this.coprime(this.e,this.phi),'con2:',Big.gcd(this.e,this.phi).notEquals(1),'con1:',this.e>=this.phi,Big.gcd(this.e,this.phi).toJSNumber(),'out',);
        //console.log(Big(this.e).modInv(this.phi).toJSNumber())
        this.d=Big(this.e).modInv(this.phi).toJSNumber();
        console.log(this.p,this.q,this.e,this.d,this.phi);
        return [this.e,this.d,this.n]
    }
    encrypt(publicKey,msg,n){
        return Big(msg).modPow(publicKey,n).toJSNumber()
    }
    decrypt(privateKey,msg,n){
        return Big(msg).modPow(privateKey,n).toJSNumber()
    }
}

let cipher = new RSA();
let [pubkey,prikey,n]=cipher.genrateKeys();
let encryptedMsg=cipher.encrypt(pubkey,9726,n)
let decryptedMsg=cipher.decrypt(prikey,encryptedMsg,n)
console.log('decrypted msg:',decryptedMsg)
//console.log(Math.pow(3,7)%5)

