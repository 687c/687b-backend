Team Name: N/A

Number of team members(if any): 1

Name of team members :
James Mutuku

Problem (SDG Relevant):

Description of codebase:

    - This is the codebase for the backend. 
    - The server.js file is where the http server is created.
    - the config.js is where `.env` files are imported
    - the app.js houses the express app where the routing middleware are defined
    - utils folder contains utility functions such as the one for uploading a file to pinata and getting the IPFS hash
    - the controllers and routes directory are where the controllers and routes are defined
    - the models contains the DB model definition for mongoose  


Languages/Frameworks:

    - Node
    - Express
    - Mongoose


Blockchain protocol used:
    - Solana

Instructions on how to run the code:
    Please visit this link to use the deployed site https://aqueous-ridge-26941.herokuapp.com/

To Run locally 
    - npm install && npm start
    - the live site will be started on localhost:3040

Link:

# Questions to look into
- what if a product has been sold? How will you prevent it from being listed in the marketplace
- in the real world how would this make money? We charge platform fees. So, on-top of solana's fees, we add our own fess, say .0020$ 
- Do not a seller to be able to buy from himself
- work on the NFT Minting

# What This does
- allow anyone to post a product and sell it
- |ESCROW USAGE| when a product is sold and the buyer has paid, store the cash in the escrow and release it only when a user confirms that the product he ordered for is the one he  received (to prevent malicious actors since anyone can sell his product) and the product can be returned to the seller. 

