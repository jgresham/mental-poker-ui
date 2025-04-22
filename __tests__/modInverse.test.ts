import * as bigintModArith from "bigint-mod-arith";
import { test, expect } from "vitest";
import { p2048 } from "../src/lib/elgamal-commutative-node-1chunk";
test("bigint-arith modInv", () => {
  const a = BigInt(2);
  const m = BigInt(5);
  const result = bigintModArith.modInv(a, m);
  console.log("result", result);
  expect(result).toBe(3n);
});

test("bigint-arith modInv large numbers", () => {
  const a = BigInt(
    "0x9eb6f0b80fa24b9747c6a64e78df2066709e07b12118e7564d599ed79eb51c531b4f793502f8f7ba2c0eb5c54545a16c93b2c040eb56ff6994bef2da10eb0d1c1829c2766bb99de877c1af413ed9d4eeab05e4047d99ccb4addb8870c2d2c5c63d69529820335116fb2eafe59a29f14f7f75680a1a4bb7d5348a9bde85976f2555b32fd93ca9595a863ff73b73dddb530b7f909f8b5372fb7ba438554b221cd53440141e7dc77c843b202ceca57828546aadb94ed86cfa9115452f76dde43b5b404673c70180d6cefa5a0e52cbba4292460abc2b405ea997b2e0d6080561a97f6351042d8ca3535d892501719a4f0bda7973d1595b760b28cbf9709f73c1222b",
  );
  const m = p2048;
  const result = bigintModArith.modInv(a, m);
  console.log("result", result);
  expect(result).toBe(
    BigInt(
      "0x1c96f75802e2e6def1a70c0761bbdb6bed5d5f8061947cde6f181a59a32b3800671234ec6e01b30a13dcfb41f13b89f7a70c96a771bbeaf47125e344df45c2a7be3f5c264b2dbaa04cd43d13f1f03ffc5be54cca4502810e9f9db97e23a788d01189366b3a2dd4ba427c2ce076ffd5af9f890387a378f5602a17e6010328e83447731b3203c12341456a902225f3ad01f42834311bda7c2c47062289287b8a4cc0e0441b923aa6ece4a069879c395eaca28c20934ef745a890410ef94c054b2198ec5af94ba12b133c7cc197e42ca8d6347ed632ee64a7e6f249f9b02b473e942e43382bcf1b63ffede8d2c924a9712619d7a5ab75f19a678486315c4ba04709",
    ),
  );
});
