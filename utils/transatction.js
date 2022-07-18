const {
    clusterApiUrl,
    Connection,
    PublicKey,
    Transaction,
    SystemProgram,
    LAMPORTS_PER_SOL
} = require('@solana/web3.js');
const { BigNumber } = require('bignumber.js');

const createTransaction = async (sellerAddress, publicKey, buyerAddress, orderId, itemId) => {
    //get the seller address from the product posted on mongo
    const sellerPublicKey = new PublicKey(sellerAddress);

    //if something is missing from the body return an error()

}