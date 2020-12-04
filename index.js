require('dotenv').config()
const Tatum = require('@tatumio/tatum');
const bip39 = require('bip39')
const ScryptaCore = require('@scrypta/core');
const scrypta = new ScryptaCore

async function generate(testnet = false) {
    if(testnet){
        scrypta.testnet = true
    }
    let mnemonic = await scrypta.generateMnemonic('latin')
    let seed = await bip39.mnemonicToSeed(mnemonic)
    let wallet = await scrypta.returnXKeysFromSeed(seed)
    wallet.mnemonic = mnemonic
    console.log('GENERATED WALLET', wallet)
    /*
        // TEST GENERATING 3 DIFFERENT MNEMONICS
        const btcWallet = await Tatum.generateWallet(Tatum.Currency.BTC, testnet);
        const lyraWallet = await Tatum.generateWallet(Tatum.Currency.LYRA, testnet);
        const ethWallet = await Tatum.generateWallet(Tatum.Currency.ETH, testnet);
        console.log('BTC WALLET', btcWallet)
        console.log('LYRA WALLET', lyraWallet)
        console.log('ETH WALLET', ethWallet)
    */

    /*
        // GENERATE PUBLIC ADDRESS
        const btcAddress = Tatum.generateAddressFromXPub(Tatum.Currency.BTC, testnet, wallet.xpub, 0);
        const lyraAddress = Tatum.generateAddressFromXPub(Tatum.Currency.LYRA, testnet, wallet.xpub, 0);
        const ethAddress = Tatum.generateAddressFromXPub(Tatum.Currency.ETH, testnet, wallet.xpub, 0);
    */

    try{
        const btcPrivKey = await Tatum.generatePrivateKeyFromMnemonic(Tatum.Currency.BTC, testnet, mnemonic, 0);
        console.log('BTC PRIVKEY', btcPrivKey)
        const btcAddress = await Tatum.generateAddressFromPrivatekey(Tatum.Currency.BTC, testnet, btcPrivKey)    
        console.log('BTC ADDRESS', btcAddress)
    }catch(e){
        console.log('ERROR WHILE CREATING BTC ADDRESS')
    }
    
    try{
        const lyraPrivKey = await Tatum.generatePrivateKeyFromMnemonic(Tatum.Currency.LYRA, testnet, mnemonic, 0);
        console.log('LYRA PRIVKEY', lyraPrivKey)
        const lyraAddress = await Tatum.generateAddressFromPrivatekey(Tatum.Currency.LYRA, testnet, lyraPrivKey)    
        console.log('LYRA ADDRESS', lyraAddress)
    }catch(e){
        console.log('ERROR WHILE CREATING LYRA ADDRESS')
    }

    try{
        const ethPrivKey = await Tatum.generatePrivateKeyFromMnemonic(Tatum.Currency.ETH, testnet, mnemonic, 0);
        console.log('ETH PRIVKEY', ethPrivKey)
        const ethAddress = await Tatum.generateAddressFromPrivatekey(Tatum.Currency.ETH, testnet, ethPrivKey)    
        console.log('ETH ADDRESS', ethAddress)
    }catch(e){
        console.log(e)
        console.log('ERROR WHILE CREATING ETH ADDRESS')
    }
    
}

generate(false)