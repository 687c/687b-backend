const {
    clusterApiUrl,
    Connection,
    PublicKey,
    Transaction,
} = require('@solana/web3.js');
const { BigNumber } = require('bignumber.js');
const { createTransferCheckedInstruction, getAssociatedTokenAddress, getMint } = require("@solana/spl-token");

const Product = require('../models/product'); //for finding the product using id

const buyProduct = async (req, res) => {
    const { body } = req;

    const product = await Product.findById(body.id);

    const buyerAddress = body.buyerPublicKey; //FRONT END CHANGES TOO

    // product not found
    if (product === null) {
        res.status(404).send({ message: "Product Not Found" });
        return;
    }

    //CHECK IF THE BUYER ADDRESS HAS BEEN SENT
    if (!buyerAddress) {
        res.status(404).send({ message: "Buyer Public key not found" });
        return;
    }

    try {
        //GET THE SELLER AND BUYER ADDRESS
        const usdcAddress = new PublicKey("Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr"); //token account for usdc
        const buyerPublicKey = new PublicKey(buyerAddress);
        const sellerAddress = product.sellerAddress.toString();
        const sellerPublicKey = new PublicKey(sellerAddress);
        const bigAmount = BigNumber(product.price);
        const orderId = new PublicKey(body.orderId);

        // const network = WalletAdapterNetwork.Devnet;
        const network = 'devnet';
        const endpoint = clusterApiUrl(network);
        const connection = new Connection(endpoint);

        const buyerUsdcAddress = await getAssociatedTokenAddress(usdcAddress, buyerPublicKey);
        const shopUsdcAddress = await getAssociatedTokenAddress(usdcAddress, sellerPublicKey);

        const { blockhash } = await connection.getLatestBlockhash("finalized");

        // This is new, we're getting the mint address of the token we want to transfer
        const usdcMint = await getMint(connection, usdcAddress);

        const tx = new Transaction({
            recentBlockhash: blockhash,
            feePayer: buyerPublicKey,
        });

        // Here we're creating a different type of transfer instruction
        const transferInstruction = createTransferCheckedInstruction(
            buyerUsdcAddress,
            usdcAddress,     // This is the address of the token we want to transfer
            shopUsdcAddress,
            buyerPublicKey,
            bigAmount.toNumber() * 10 ** (await usdcMint).decimals,
            usdcMint.decimals // The token could have any number of decimals
        );

        transferInstruction.keys.push({
            pubkey: orderId, //make it easier to find the tx
            isSigner: false,
            isWritable: false,
        });

        tx.add(transferInstruction);

        const serializedTransaction = tx.serialize({
            requireAllSignatures: false,
        });

        const base64 = serializedTransaction.toString("base64");

        res.status(200).json({
            transaction: base64,
        });
    } catch (err) {
        console.error("error buying the product ->", err);
        res.status(500).json({ error: "error creating tx" });
        return
    }
}

const confirmPaid = async (req, res) => {
    const { body } = req;
    // const product = await Product.findById(body.id);
    const purchasedProduct = await Product.findByIdAndUpdate(body.id, { paid: true }, { new: true });

    console.log("purchased, product", purchasedProduct);
    res.json(purchasedProduct);
}

/*   TODO 
    * Enable the user to cancel a transaction. useTimeout() of say 10mins  
    * see all transactions that a uer has made GET transactions -mongo size limit-
*/


module.exports = { buyProduct, confirmPaid }