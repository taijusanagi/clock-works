// eslint-disable-next-line @typescript-eslint/no-var-requires
const bs58 = require("bs58");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const IPFS = require("ipfs-mini");
const ipfs = new IPFS({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

const images = [
  "https://ipfs.io/ipfs/QmSM7AvqrwPTz9kBbJSM3246jGF5yYVmzcqf5BdTFxPN9o/nft.png",
  "https://ipfs.io/ipfs/QmSdCz67U7q78uZCpDWi7gXiqVhqKGYEx7NUAMYEgsmE7x/nft.png",
  "https://ipfs.io/ipfs/QmaaM21hikBRam95E2j4L9qTWA7qjvXL5um3JuEtEqZzys/nft.png",
  "https://ipfs.io/ipfs/Qmd27PNQUk9LVTPuRwCA715jLXDv3NWpMfhgtUxXoqcD4T/nft.png",
  "https://ipfs.io/ipfs/QmdePiGw5aT5SiZvyYj8R9pW1DMNztmzrVHR81deEa28wo/nft.png",
  "https://ipfs.io/ipfs/QmVhPsQa3osLZuUJt8yAYGKSXC19FRBmsWfX1E4pfXrmwT/nft.png",
  "https://ipfs.io/ipfs/QmahY8zKM9mREVhHgd4oLhp9UxHakwozP1zZ5vcGd4Ur2V/nft.png",
  "https://ipfs.io/ipfs/QmQ7MGEBdYSfrYZNJeQYcZkJNqRmmJFm3kjhPtEHBcWKd4/nft.png",
  "https://ipfs.io/ipfs/QmRqcMZ3YrVWfRo8SDgeYW5a4GfySV4J2rPY64XYa73GiR/nft.png",
  "https://ipfs.io/ipfs/QmdMCqD5W5reRwjBNEfirFYigXy27rPWiUfFYePBWzuesY/nft.png",
  "https://ipfs.io/ipfs/QmW3DnEnayrD4pXX46kGXrLngQfwayuuFYHdZ75fF8KVPk/nft.png",
  "https://ipfs.io/ipfs/QmYWKimUgdCaZj4qCTCcz1LcqWoBdhrpGXS5gCYwnmURyp/nft.png",
  "https://ipfs.io/ipfs/QmQhTm7DZV852E4cgzWFm6vbCh6neiHAbtv674caHAhLc2/nft.png",
  "https://ipfs.io/ipfs/QmdWMdh3f2MPDN7y6P4XjKee3TkZcRtsRdufF1ZnZrnmqb/nft.png",
  "https://ipfs.io/ipfs/Qmf2DoLndJ9aV8RZ3snyQPbi2k65wR7jKsKh7jZiujwfVv/nft.png",
  "https://ipfs.io/ipfs/Qme6fZtnAWbp5QX1onC6ThXXPgHiUDF5gmLNAK4pv297e6/nft.png",
  "https://ipfs.io/ipfs/QmcULcf8td6YC1q4NsMZ6BYyCdeS7cf4yADwmWVsthterK/nft.png",
  "https://ipfs.io/ipfs/Qma5VzFTXhWiWtsASfA4ZbPxhoUoTdaVS4a37JjSLGqknL/nft.png",
  "https://ipfs.io/ipfs/QmUDWJwwhx4b6kARcnansEzcJRgQuavoQx9Z2fdfSYbBzX/nft.png",
  "https://ipfs.io/ipfs/QmXyZqp2vXdZpjKPJsuSr7E6puWsPhtLBqDXYSSbU28at5/nft.png",
  "https://ipfs.io/ipfs/QmYkRXyQLysLaQQRApGuqRe5B1mN5piYTyCYtEJhGU5LAb/nft.png",
  "https://ipfs.io/ipfs/Qmb6Z4tbb9KPh6JUjLuSLzc5TSTysmQXGCsU3Mu7JbfXnw/nft.png",
  "https://ipfs.io/ipfs/QmR8RWc23SgWQExZD9PNPFUKxj9CmaDWmEFaH51oYGWY5Y/nft.png",
  "https://ipfs.io/ipfs/QmNv4rdkZDXRJWqkfRV3ueYYu22SRZmpcewmzWeUZgaPj1/nft.png",
  "https://ipfs.io/ipfs/QmTd2vAUrYDckdAipHMLoSg4fzD3DWZyfjBQDrtWna9Po6/nft.png",
  "https://ipfs.io/ipfs/QmQNwgLV5kNCHymjbhzndYCB3m7TeGAi3RnHHuxgoqByg6/nft.png",
  "https://ipfs.io/ipfs/QmVEbQLry2wnKry1JibwqKi1fvtN1JaXuzmBoPdUvfh6dJ/nft.png",
  "https://ipfs.io/ipfs/QmTSDUBVXA71uGbvRNwGttk6L8RLnttvmMfgWZBd9uQR7t/nft.png",
  "https://ipfs.io/ipfs/Qmc2ofgoYJxEHHgDkraPL6udDLFR1b2jy8XwtWr9ib5RtG/nft.png",
  "https://ipfs.io/ipfs/QmNRcAqguV1w3cubsvGuvxBAKTjNAL7W97ELoN9uyujHxX/nft.png",
  "https://ipfs.io/ipfs/QmY39GzxtJQZT4mynMQ4w2PUt7wPN85KASfHDQJurNTMxB/nft.png",
];

const metadataTemplate = {
  name: "A Clockwork Girl",
  description: `The doll-like girl in this painting is actually alive. The evidence of this is that her hair grows little by little. Of course, this picture is not a video file or GIF animation of the process of hair growth. It is an image data of a watercolor painting on paper, and yet the hair is growing on its own. This NFT art work is not a simple attachment of conventional image data or video files. Her hair has been programmed to grow automatically by a uniquely created NFT contract. It is a new challenge to integrate smart contracts and artworks in this work. We invite you to experience the eeriness of a girl who lives on the blockchain.
  この絵の中の人形のような少女は実は生きています。その証拠に彼女の髪の毛は少しずつ伸びていきます。もちろんこの絵は髪が伸びる過程を撮影した動画ファイルやGIFアニメではありません。紙に描かれた水彩画の画像データなのに勝手に髪が伸びているのです。このNFTアート作品は従来からある画像データや動画ファイルを添付しただけの単純なものではありません。独自に作成されたNFTコントラクトによって、彼女の髪は自動的に伸びるようプログラムされています。この作品ではスマートコントラクトとアート作品を一体化する新しい挑戦です。ブロックチェーン上で生きている少女の不気味さをぜひ体感してください。
  artwork creator: ©︎ 2021 Sam Sato, contract creator: ©︎ 2021 taijusanagi`,
};

const main = async () => {
  const cids: string[] = [];
  const ipfsHashes: string[] = [];
  for (let i = 0; i <= 30; i++) {
    const metadata = {
      ...metadataTemplate,
      image: images[i],
    };
    const cid = await ipfs.add(Buffer.from(JSON.stringify(metadata)));
    cids.push(cid);
    ipfsHashes.push(`0x${bs58.decode(cid.toString()).slice(2).toString("hex")}`);
  }
  console.log(cids);
  console.log(ipfsHashes);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
