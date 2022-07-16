const {
    clusterApiUrl,
    Connection,
    PublicKey,
    Transaction,
    SystemProgram,
    LAMPORTS_PER_SOL
} = require('@solana/web3.js');
const { BigNumber } = require('bignumber.js');
const { createTransferCheckedInstruction, getAssociatedTokenAddress, getMint } = require("@solana/spl-token");

const Product = require('../models/product'); //for finding the product using id

// const buyProduct = async (req, res) => {
//     //the body contains the data we need to make a transaction
//     const { body } = req;

//     console.log("tis the body", body);

//     //find the product using the id
//     const product = await Product.findById(body.id);
//     console.log("this is the prod found", product);

//     //get the buyer public key from the body
//     const buyerAddress = body.buyerPublicKey;

//     // product not found
//     if (product === null) {
//         res.status(404).send({ message: "Product Not Found" });
//         return;
//     }
//     // console.log(product); //CHECK IF THE PRODUCT HAS BEEN FOUND

//     //CHECK IF THE BUYER ADDRESS HAS BEEN SENT
//     if (!buyerAddress) {
//         res.status(404).send({ message: "Buyer Public key not found" });
//         return;
//     }

//     try {
//         //GET SELLER AND BUYER DATA
//         const sellerPublicKey = new PublicKey(product.sellerAddress);
//         const buyerPublickey = new PublicKey(buyerAddress);

//         //GET DATA FROM THE PRODUCT
//         const bigAmount = BigNumber(product.price);
//         const endpoint = clusterApiUrl('devnet');
//         const connection = new Connection(endpoint);

//         //get the latest blockhash
//         const { blockhash } = await connection.getLatestBlockhash("finalized");

//         //SHOW ME THE MONEY(THE ONE WHO WILL PAY FOR THE SOL TX)
//         const tx = new Transaction({
//             recentBlockhash: blockhash,
//             feePayer: buyerPublickey
//         });

//         //transfer solana to the seller of the product
//         const transferInstruction = SystemProgram.transfer({
//             fromPubkey: buyerPublickey,
//             lamports: bigAmount.multipliedBy(LAMPORTS_PER_SOL).toNumber(),
//             toPubkey: sellerPublicKey
//         });

//         //this will make it easier to find this transaction later
//         transferInstruction.keys.push({
//             pubkey: new PublicKey(body.orderId),
//             isSigner: false,
//             isWritable: false
//         });

//         tx.add(transferInstruction);

//         //format our tx
//         const serializedTransaction = tx.serialize({
//             requireAllSignatures: false,
//         });
//         const base64 = serializedTransaction.toString("base64");
//         console.log("the tx", base64);


//         res.status(200).json({
//             transaction: base64
//         });
//     } catch (err) {
//         console.error("error buying the product ->", err);
//         res.status(500).json({error: "error creating tx"});
//         return
//     }
// }





























const usdcAddress = new PublicKey("Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr");
const sellerAddress = "B1aLAAe4vW8nSQCetXnYqJfRxzTjnbooczwkUJAr7yMS";
const sellerPublicKey = new PublicKey(sellerAddress);



const buyProduct = async (req, res) => {

    const products = [
        {
            "id": 1,
            "name": "OG Emoji pack",
            "price": "0.09",
            "description": "Get this fire emoji pack for only $0.09! Includes 3 hot emojis: Forreal, Flooshed, and Sheesh!",
            "image_url": "https://i.imgur.com/rVD8bjt.png",
            "filename": "Emojis.zip",
            "hash": "QmWWH69mTL66r3H8P4wUn24t1L5pvdTJGUTKBqT11KCHS5"
        }
    ];

    try {
        const { buyer, orderID, itemID } = req.body;
        if (!buyer) {
            res.status(400).json({
                message: "Missing buyer address",
            });
        }

        if (!orderID) {
            res.status(400).json({
                message: "Missing order ID",
            });
        }

        const itemPrice = products.find((item) => item.id === itemID).price;

        if (!itemPrice) {
            res.status(404).json({
                message: "Item not found. please check item ID",
            });
        }

        const bigAmount = BigNumber(itemPrice);
        const buyerPublicKey = new PublicKey(buyer);

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

        // The rest remains the same :)
        transferInstruction.keys.push({
            pubkey: new PublicKey(orderID),
            isSigner: false,
            isWritable: false,
        });

        tx.add(transferInstruction);

        const serializedTransaction = tx.serialize({
            requireAllSignatures: false,
        });

        const base64 = serializedTransaction.toString("base64");

        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).json({
            transaction: base64,
        });
    } catch (err) {
        console.error(err);

        res.status(500).json({ error: "error creating transaction" });
        return;
    }
}











/*   TODO 
    * Enable the user to cancel a transaction. useTimeout() of say 10mins  
    * see all transactions that a uer has made GET transactions -mongo size limit-
*/


module.exports = { buyProduct }