
## TODO
Create a model for the marketplace. To reference Product model and the nft model.  

Questions to look into
- what if a product has been sold? How will you prevent it from being listed in the marketplace
- in the real world how would this make money? We charge platform fees. So, on-top of solana's fees, we add our own fess, say .0020$ 
- Do not a seller to be able to buy from himself
- work on the NFT Minting

# What This does
- allow anyone to post a product and sell it
- |ESCROW USAGE| when a product is sold and the buyer has paid, store the cash in the escrow and release it only when a user confirms that the product he ordered for is the one he  received (to prevent malicious actors since anyone can sell his product) and the product can be returned to the seller. 

## Errors encountered. 
- It took me a long time to find a way to autoremove an item from the marketplace after it has been purchased. First I used the service to get all the products and filter them in the jsx using curly braces. But this solutions isn't very efficient. We are making too many requests. What I did was always filter the fetched products once the buy button has been clicked and remove the one that was bought

- Using async in the useEffect callback functions. A nightmare I never want to go through again