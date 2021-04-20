/*
  List the UTXOs associated with the BCH address in the wallet.
*/

// Set NETWORK to either testnet or mainnet
const NETWORK = 'testnet'

// REST API servers.
const BCHN_MAINNET = 'https://bchn.fullstack.cash/v4/'
// const ABC_MAINNET = 'https://abc.fullstack.cash/v4/'
const TESTNET3 = 'https://testnet3.fullstack.cash/v4/'

// bch-js-examples require code from the main bch-js repo
const BCHJS = require('@psf/bch-js')

// Instantiate bch-js based on the network.
let bchjs
if (NETWORK === 'mainnet') bchjs = new BCHJS({ restURL: BCHN_MAINNET })
else bchjs = new BCHJS({ restURL: TESTNET3 })

// Open the wallet generated with create-wallet.
try {
  var walletInfo = {
    cashAddress: 'bchtest:qq2ckhgcz4fvna8jvlqdu692ujtrqsue8yarpm648v'
  }
} catch (err) {
  console.log(
    'Could not open wallet.json. Generate a wallet with create-wallet first.'
  )
  process.exit(0)
}

// Get the balance of the wallet.
async function listUtxos () {
  try {
    // first get BCH balance
    const utxos = await bchjs.Utxo.get(walletInfo.cashAddress)
       
    console.log(`UTXOs associated with ${walletInfo.cashAddress}:`)
    console.log(utxos)
  } catch (err) {
    console.error('Error in listUtxos: ', err)
    throw err
  }
}
listUtxos()
