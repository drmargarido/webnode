import Encryption from "./encryption";
import Sidechain from "./sidechain";

const encryptionTestCases = [
  {
    key: "64dc1ce4655554f514a4ce83e08c1d08372fdf02bd8c9b6dbecfc74b783d39d1",
    secret: "0000000000000000000000000000000000000000000000000000000000000001",
    nonce: "948791aa5dfd8f71405da35c637ad58cc9f5fec7424dba3e97630921e130c5b6",
    result:
      "592d93e3bb89f8835c9949460a2b0195e8ea915e724a35b3c713a6201ce94002ae94b5546647db1ffa94a3002f500897"
  },
  {
    key: "99577b266e77d07e364d0b87bf1bcef44c78e3668dfdc3881969b375c09d4fcd",
    secret: "1004444400000006780000000000000000000000000012345000000765430001",
    nonce: "23384a8eabc4a4ba091cfdbcb3dbacdc27000c03e318fd52accb8e2380f11320",
    result:
      "73fb51882b7fdd04d1f92146fed5b198e820ea08d00dd7bb65cde4f8a0b0e00cfedb93317ef05d7d149371b4b6b2c272"
  },
  {
    key: "7fb4ca9cc0032bafc2ebd0fda018a41f5adfcf441123de22ab736a42207933f7",
    secret: "7777777774444444777777744444447777777444444777777744444777777744",
    nonce: "0d412fa10c9027b7163302e38c96a5c0904b1b04cb55c66162296d0be2e3caa2",
    result:
      "8a859e9a265f28d36153c5d3849f5e1ec7574431fb1af68b0bc74d928772edcce1ae50fae6c4634bdcc876eef85679a9"
  }
];

test("encrypt should produce the expected results", done => {
  for (let i = 0; i < encryptionTestCases.length; i++) {
    let result = Encryption.encrypt(
      encryptionTestCases[i].key,
      encryptionTestCases[i].secret,
      encryptionTestCases[i].nonce
    );
    expect(result).toEqual(encryptionTestCases[i].result);
  }
  done();
});

test("decrypt should produce the expected results", done => {
  for (let i = 0; i < encryptionTestCases.length; i++) {
    let result = Encryption.decrypt(
      encryptionTestCases[i].key,
      encryptionTestCases[i].result,
      encryptionTestCases[i].nonce
    );
    expect(result).toEqual(encryptionTestCases[i].secret);
  }
  done();
});

test("decryptTreasure should decrypt a treasure", done => {
  // these values came from a real upload
  const sha256 =
    "06273d8075c59a45f3b0962ff307763d049b843ada1b5948509274b5e3b8ffd9";
  const signatureMessageFragment =
    "GCQGZHZGGFNDYFJDQEGINABB9AABJDR9XEP99FTEK9FBFFBBFC9BKAEHAAB9FHB9CIAGGAM9EFXHEDMCCBMCWCREFFBGSHUAOHKDQAXEGBMBX9QEHBZBRS9FLIKDBMEXAPSLADGQSRZVDDDGI9FHMMNTPMIQMAYGSXEJVBXPQDRNQIVJKALJLLMQYTV9CK9MTFEV9EYGHAJJHWDXFV9PFGKYZENYIIWRTCZVOLIXNIZZUOIFQOQ9UHEIJHEYVQYSBPEFMSFMOYHKSXQMIYQMBPTSMQUBGWPZIZUJWWJPUVIWRUFSVBXALECIIMSZGRVTPUZLHEYYGYRRDRTXQVWGHJRQLEQIKYEWJJP9SEWQJREWNVNYLUPIYUOC9QBFGQEHVEODEXBUAGISIQG9QVHVFTUTPBPSMSWKCENEBBLPYOYAAPJJZLKROFFOHUDXECHKO9BMOUXSQUWTNQZUWYBWWXNSEFYCAUMLKRVYPMKXOLQMFAPJKQTWNOATYGPYZXDXF9ONIECEKVYXXNQFVDXNGQUIWLQDCYBFPFBLONOWTVESAIMPWNWJBDFXXAZBBHWIAIMLLUVXY9QBMUNMUDSBJEEUEVHGTCBNNWLARTXMVNTNWZHAXCWVUOIDBSXRFYNEPV9GPZUERMQIGRHRFQLHWQCSH9YJOXOROBXFVQJV9FIWAYTMZCCSZONLCZRNFGC9BAGYVXPAT9DHLJOTRXPJVE9ZARYYWSN99EJS9TNV9UQCHURKARZYATGPZXCDOTIXXF9DZLTRYPUGHJGDNHKPZVVRYWLRYXQ9BAOXHEYBJVLN9XVXAQVYSPMOAXTOQMQFTVJ9LLBIGWPIQ9NMMHJGIFSUVSZAT9MPCOJUKFHUSNFQT9FAATZCRKAJDPEAZMYR9RNTRDETOLEPMMFZXBMMMIHSRZLXQCLNAVRTNJEZR9GSQHJUMKZFFCGKQQEJKWJDMPDLMKFMTHKUJTVOKGKFHZPESLFLNRGKOFBKGYZBG9JWECTTKX9FMKMCYPMSLUFUQPLR9MYUUXNDTYDYYHXEJFARACN9ZFJLUQVOKXOBLUQ9HXHBYENLJLYTYIOBYCYWOWDA9SBQPSJPFVXAMCSXOMVPPWVDGKMJNAWSABKDFIFLDZGITPCRLEODVZGZOVFLGTEOGGHUUJYF9BSJULRQYMBRKNCWXIVHIJDNWXWWSYBNSDFVGJNBOHEJUPWALTKMGOMQOSQSN9UAJIMGHJKYPWDXVF9RINN9KKOQUCEXSIJNTLICQQNYQZGHSUJNJTVYKITLWLFMZXBCRFXEXIHAFCOBTL9UALOV9FGISPHJRF99ZC9AIZQGUAXFI9IMTVMIWXYCEXHNNOAMWPN9NDUEJWIAOSXNJETJHBHRJYTUFKSTOCPASYRLDMUZQS9EZJZJZXCLXKXZPWMHL9SGBSGNTIKJGDOPIQHMFDBCR9VIOPXULAVHESFNUPRGOROKOUIYKFTYHWRMMQFQBSUBWGGDBQBKYTAJCXPCYLTRRVFTZPWCDOMKSMNQOCVMWTW9FEO9YIKQHWOOX9BAVTDYYJP9OTWMTDHN9QZKKQJVLMPX9EW9CLAOS9AEYXVPKMRCGGDEXAZXVISTWHXDFCDYFXCKOGQWCAHMGCJTP9WJGHRSNCMGBCSRSUHHX9PVMIAHOODJHCNRIHOVJGSXBHMXDMIMXKDVXDY99KXXTWTHGK99CGTVKWHJENRRPMPLUZUTFZLYYB9HEUIYPVTTKLCCODNFTXQMAUPVBHTBVBKNAJ9MVWPRLVHKDERGETMQGCMJLOMWJWQKC9OD9ZHDULQWJMAOZBVJDUBOVWVKMAQUIVLKMOESWCNXJKE9GQ9ADPLENFBB9WGLHSUCOVPAPFJVV9ZQMBFLNGWGYAAPH9IPXJUPTEEOHTYXSXACMKZAUOMCTFOHNPTPXVZGQCY9AOQCYYKXTVCNWIJMTPFJKBFD9VYH9ZQVQCKLBCACTEAOIPVS9TGEMBVQPZXLMCHZXKATXQCDKOUZFFQTDKKC9GE9FQLVJDRRVVELVSPUWLJHQZLZXIYDDFIZWQBQWUMZKXLSDQZKPVGDWPJMZC9ASD9YAFEI9Z9DWFYSSIVSK9FZDCYYELFBJSCWLNZZRPTEUQRUOCBKOSFRX9WVFDFYUWRXBBQDLQHHQR999NPNYJXDTRSUVHTIDCICESIOWQO";
  const expectedResult =
    "9999999999999999999999999999999999999999999999999999999999999999";
  const sideChain = Sidechain.generate(sha256);

  let matchesFound = {
    count: 0,
    payload: ""
  };

  for (let i = 0; i < sideChain.length; i++) {
    let result = Encryption.decryptTreasure(
      sideChain[i],
      signatureMessageFragment,
      sha256
    );
    if (result) {
      matchesFound.count++;
      matchesFound.payload = result;
    }
  }

  expect(matchesFound.payload).toEqual(expectedResult);
  expect(matchesFound.count).toEqual(1);

  done();
});
