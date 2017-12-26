# chumm-uffa-interface
A Node.js module that encapsulate the communication interface to the chumm-uffa backend 

## Installation 
```sh
npm install @pepe.black/chumm-uffa-interface  --save
yarn add @pepe.black/chumm-uffa-interface 
bower install @pepe.black/chumm-uffa-interface  --save
```

## Usage
### TypeScript
```typescript
import { createLoginRequest } from 'chumm-uffa-interface';
console.log(createLoginRequest("my@email.ch", "password"))
```
```sh
Output should be '{email: my@email.ch, password: password}'
```


## Test 
```sh
npm run test