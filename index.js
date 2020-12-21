require('dotenv').config()
const Tatum = require('@tatumio/tatum');
const bip39 = require('bip39')
const ScryptaCore = require('@scrypta/core');
const scrypta = new ScryptaCore

async function generate(testnet = false) {
    if(testnet){
        scrypta.testnet = true
    }
    const mnemonic = "celo spumam custodi fugent metuo pudicitiam nota crystallum martius bigas motricium quia dato senior inventa evolvo ferro auca magna accusatis terricula iudicatus otiosum perfectus"

    /*try{
        const btcPrivKey = await Tatum.generatePrivateKeyFromMnemonic(Tatum.Currency.BTC, testnet, mnemonic, 0);
        console.log('BTC PRIVKEY', btcPrivKey)
        const btcAddress = await Tatum.generateAddressFromPrivatekey(Tatum.Currency.BTC, testnet, btcPrivKey)    
        console.log('BTC ADDRESS', btcAddress)
    }catch(e){
        console.log('ERROR WHILE CREATING BTC ADDRESS')
    }*/
    
    try{
        const lyraPrivKey = await Tatum.generatePrivateKeyFromMnemonic(Tatum.Currency.LYRA, testnet, mnemonic, 0);
        console.log('LYRA PRIVKEY', lyraPrivKey)
        const lyraAddress = await Tatum.generateAddressFromPrivatekey(Tatum.Currency.LYRA, testnet, lyraPrivKey)    
        console.log('LYRA ADDRESS', lyraAddress)
        
        // FETCHING UNSPENTS
        const unspent = await Tatum.scryptaGetUnspentForAccount(lyraAddress)
        let balance = 0
        for(let k in unspent){
            balance += unspent[k].amount
        }
        console.log('BALANCE IS ' + balance + ' LYRA')
        const value = balance - 0.001
        const tx = {
            fromAddress: [{
                address: lyraAddress,
                privateKey: lyraPrivKey
            }],
            to: [{
                    address: lyraAddress,
                    value: value
            }]
        }
        console.log(tx)
        
        const rawtransaction = await Tatum.prepareScryptaSignedTransaction(false, tx);
        console.log(rawtransaction)

        /*const txid = await Tatum.scryptaBroadcast(rawtransaction)
        console.log(txid)*/
        const txid = await scrypta.sendRawTransaction(rawtransaction)
        console.log(txid)
    }catch(e){
        console.log(e)
        console.log('ERROR WHILE PROCESSING LYRA')
    }

    /*try{
        const ethPrivKey = await Tatum.generatePrivateKeyFromMnemonic(Tatum.Currency.ETH, testnet, mnemonic, 0);
        console.log('ETH PRIVKEY', ethPrivKey)
        const ethAddress = await Tatum.generateAddressFromPrivatekey(Tatum.Currency.ETH, testnet, ethPrivKey)    
        console.log('ETH ADDRESS', ethAddress)
    }catch(e){
        console.log(e)
        console.log('ERROR WHILE CREATING ETH ADDRESS')
    }*/
    
}

generate(false)