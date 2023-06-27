# Astral

Astral serves as your bridge in the vast expanse of the blockchain universe. Use Astral for smooth transfers, transparent provenance and powerful NFT tools in the next chapter of the NFT revolution.

### Seamless Interchain Transfers
No more being locked into one blockchain. With Astral, you can easily transfer NFTs across various blockchains including Stargaze, Osmosis, Juno, Uptick & Iris.

### Transparent Provenance
Trust in the authenticity of your NFTs. Astral prioritizes showing you the complete provable history of any NFT, increasing transparency and value in each marketplace.

### NFT Tools Powered by IBC
Astral offers user-friendly NFT tools, for easy management of ICS721 compatible NFTs, all powered by Cosmos-SDK Inter-Blockchain Communication (IBC).

----

## Hackathon

This project was a submission for the [Cosmos Game of NFTs - Interchain Hackathon 2023](https://dorahacks.io/hackathon/game-of-nfts). It was a blast to join forces with [Ravi](https://github.com/ravichain) and coach building CosmosSDK / ICS721 things. 

#### What was built?

We set out to build the simplest UI/UX for interchain NFT ownership. The goal was twofold:

1. Ownership Management
2. Transfer Ease

Ownership is currently fragmented across blockchains, so we needed to provide a simple view that showcased a persons NFT holdings without needing to filter or change networks. We did this by querying holdings on each chain and each chains bridge, then visualizing the network logo within the context of each NFT.

<figure class="relative mt-16">
  <img class="aspect-video rounded bg-slate-800 object-fit overflow-hidden" src="/images/astral/3.png" alt="Interchain Holdings View" /> 
  <figcaption style="font-size:12px">
    Interchain Holdings View
  </figcaption>
</figure>

Transferability has never been possible until the ICS721 standard. Prior to this hackathon, only CLI tools were available to move NFTs across chains. Astral was one of the first UI's allowing non-technical people to move their NFT assets across chains.

<figure class="relative mt-16">
  <img class="aspect-video rounded bg-slate-800 object-fit overflow-hidden" src="/images/astral/transfer_nft_ics721.gif" alt="Transfer animation, used during the 45 second window needed to transfer to any chain." /> 
  <figcaption style="font-size:12px">
    Transfer animation, used during the 45 second window needed to transfer to any chain.
  </figcaption>
</figure>
