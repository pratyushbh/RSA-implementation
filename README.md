INSTALLATION:
->clone the repo using "git clone 'link of the repo'"
->run "npm install" in terminal 
->run "node index.js" in terminal

Description:
RSA is a public-key cryptosystem, one of the oldest widely used for secure data transmission. The initialism "RSA" comes from the surnames of Ron Rivest, Adi Shamir and Leonard Adleman, who publicly described the algorithm in 1977

Working:
-> Using mill's prime number to generate p and q
-> taking n=p*q
-> calculating euler's totient (phi)=(p-1)(q-1)
-> generating public key (e) using mill's prime number until gcd(e,phi)=1
-> generating private key (d) by calculating multiplicative inverse of e in Zphi.
-> encode the message (M) to cipher(c) using c=(M^e)mod(phi)
-> decode the cipher (c) to message (M) using M=(c^d)mod(phi)
