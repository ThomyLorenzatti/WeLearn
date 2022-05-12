const sharp = require('sharp')
const axios = require("axios");
const fs = require('fs')
var FormData = require('form-data');
const starton = axios.create({
  baseURL: "https://api.starton.io/v2",
  headers: {
      "x-api-key": "BCyavFNFISpxz6F2QYvFFkjOHAsg2w0X",
  },
});

// const SMART_CONTRACT_NETWORK = "binance-testnet";
// const SMART_CONTRACT_ADDRESS = "0x7FA2dCA6bCE579eAA35217Ad5b2C883e029BD41E";
// const WALLET_IMPORTED_ON_STARTON = "0x22D901E22203673903263E363062e6759E0632C8";

const keyImage = async () => {
  await sharp ('./black.png')
  .composite([{input: './key.png', left: 350, top: 350}])
  .toFile(__dirname + '/result.jpg')
}

const checkImage = async () => {
  await sharp ('./black.png')
  .composite([{input: './check.png', left: 350, top: 350}])
  .toFile(__dirname + '/result.jpg')
}

const splitStr = (str, sizechar, width) => {
  const words = str.split(' ')
  let final = [""]
  linesize = 0;
  
  for (const word of words) {
    if (linesize + final[final.length - 1].length <= width) {
      final[final.length - 1] = final[final.length - 1] + word + " "
      linesize += (word.length + 1) * sizechar
    } else {
      final.push(word + " ")
      linesize = (word.length + 1) * sizechar
    }
  }
  return final
}

const calculateXStr = (str, sizechar, width) => {
  const size = width - (str.length * sizechar)
  return (size / 2)
}

const addText = async (text) => {
  const width = 900;
  const height = 250;
  const size = 50;
  const sizechar = size * 3 / 5
  const lines = splitStr(text, sizechar, width - 100);

  nbline = lines.length
  starty = 100

  if (nbline == 3) {
    starty = 50
  }

  let svgText = `
  <svg width="${width}" height="${height}">
  <style>
  .title { fill: white; font-size: ${size}; font-family: monospace}
  </style>
  <text x="0" y="0" dy="${starty}" class="title">`

  if (nbline == 1) {
    svgText += `<tspan x="${calculateXStr(lines[0], sizechar, width)}" dy="0">${lines[0]}</tspan>`
  } else if (nbline == 2) {
    svgText += `<tspan x="${calculateXStr(lines[0], sizechar, width)}" dy="0">${lines[0]}</tspan>`
    svgText += `<tspan x="${calculateXStr(lines[1], sizechar, width)}" dy="60">${lines[1]}</tspan>`
  } else if (nbline == 3) {
    svgText += `<tspan x="${calculateXStr(lines[0], sizechar, width)}" dy="0">${lines[0]}</tspan>`
    svgText += `<tspan x="${calculateXStr(lines[1], sizechar, width)}" dy="60">${lines[1]}</tspan>`
    svgText += `<tspan x="${calculateXStr(lines[2], sizechar, width)}" dy="60">${lines[2]}</tspan>`
  }
  svgText +=  `</text> </svg>`

  const svgBuffer = Buffer.from(svgText);

  await sharp ('./result.jpg')
  .composite([{input: svgBuffer, left: 0, top: 100}])
  .toFile(__dirname + '/result2.jpg')
}

const addTextKey = async (text) => {
  const width = 900;
  const height = 200;
  const size = 50;

  const svgText = `
  <svg width="${width}" height="${height}">
    <style>
      .title { fill: white; font-size: ${size}; font-family: monospace}
    </style>
    <text x="50%" y="40%" text-anchor="middle" class="title">${text}</text>
  </svg>`

  const svgBuffer = Buffer.from(svgText);
  await sharp ('./result2.jpg')
  .composite([{input: svgBuffer, left: 0, top: 600}])
  .toFile(__dirname + '/result3.jpg')
}

const addLogo = async () => {
  await sharp ('./result3.jpg')
  .composite([{input: './logo.png', left: 300, top: 700}])
  .toFile(__dirname + '/result4.jpg')
}

async function uploadImageOnIpfs(image, name) {
  let data = new FormData();
  data.append("file", image, name);
  data.append("isSync", "true");
  
  const ipfsImg = await starton.post("/pinning/content/file", data, {
      maxBodyLength: "Infinity",
      headers: { "Content-Type": `multipart/form-data; boundary=${data._boundary}` },
  });
  return ipfsImg.data;
}

async function uploadMetadataOnIpfs(imgCid) {
  const metadataJson = {
      name: `A Wonderful NFT`,
      description: `Probably the most awesome NFT ever created !`,
      image: `ipfs://ipfs/${imgCid}`,
      external_link: "ipfs://ipfs/",
      seller_fee_basis_points: 100,
      fee_recipient: "0x27D1ce56D9C8fdF5804d102b17531371BC5c81CC"
  };
  const ipfsMetadata = await starton.post("/pinning/content/json",
  {
      name: "My NFT metadata Json",
      content: metadataJson,
      isSync: true,
  });
  return ipfsMetadata.data;
}

// async function mintNft(receiverAddress, metadataCid) {
//   const nft = await starton.post(`/smart-contract/${SMART_CONTRACT_NETWORK}/${SMART_CONTRACT_ADDRESS}/call`,
//   {
//     functionName: "safeMint",
//     signerWallet: WALLET_IMPORTED_ON_STARTON,
//     speed: "low",
//     params: [receiverAddress, metadataCid],
//   });
//   return nft.data;
// }

async function createImageNFT(formationName, isKey) {
  let endName = " - key"

  if (isKey) {
    await keyImage()
  } else {
    endName = " - certificate"
    await checkImage()
  }
  await addText(formationName)
  if (isKey) {
    await addTextKey("FORMATION ACCESS")
  } else {
    await addTextKey("CERTIFICATE")
  }
  await addLogo()

  let path = __dirname + '/result4.jpg'
  const promise = fs.promises.readFile(path);
  let cid = ""
  Promise.resolve(promise).then(async function(buffer) {
    const RECEIVER_ADDRESS = "0x27D1ce56D9C8fdF5804d102b17531371BC5c81CC"
    const ipfsImg = await uploadImageOnIpfs(buffer, formationName + endName)
    const ipfsMetadata = await uploadMetadataOnIpfs(ipfsImg.pinStatus.pin.cid)
    cid = ipfsImg.pinStatus.pin.cid
    // const nft = await mintNft(RECEIVER_ADDRESS, ipfsMetadata.pinStatus.pin.cid)
  }).catch((err) => {
    console.log(err)
  });
  return cid;
}
