import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BigNumbers
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const bigNumbersAbi = [
  {
    type: 'function',
    inputs: [
      {
        name: 'bn',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'bits', internalType: 'uint256', type: 'uint256' },
    ],
    name: '_shr',
    outputs: [
      {
        name: '',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'a',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'b',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'add',
    outputs: [
      {
        name: 'r',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'a',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'bitLength',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'a', internalType: 'bytes', type: 'bytes' }],
    name: 'bitLength',
    outputs: [{ name: 'r', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'a', internalType: 'uint256', type: 'uint256' }],
    name: 'bitLength',
    outputs: [{ name: 'r', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'a',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'b',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'signed', internalType: 'bool', type: 'bool' },
    ],
    name: 'cmp',
    outputs: [{ name: '', internalType: 'int256', type: 'int256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'a',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'b',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'div',
    outputs: [
      {
        name: 'r',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'a',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'b',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'r',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'divVerify',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'a',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'b',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'eq',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'a',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'b',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'gt',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'a',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'b',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'gte',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'a',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'hash',
    outputs: [{ name: 'h', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'val', internalType: 'uint256', type: 'uint256' },
      { name: 'neg', internalType: 'bool', type: 'bool' },
    ],
    name: 'init',
    outputs: [
      {
        name: '',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'val', internalType: 'bytes', type: 'bytes' },
      { name: 'neg', internalType: 'bool', type: 'bool' },
      { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'init',
    outputs: [
      {
        name: '',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'val', internalType: 'bytes', type: 'bytes' },
      { name: 'neg', internalType: 'bool', type: 'bool' },
    ],
    name: 'init',
    outputs: [
      {
        name: '',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'a',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'isOdd',
    outputs: [{ name: 'r', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'a',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'isZero',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'a', internalType: 'bytes', type: 'bytes' }],
    name: 'isZero',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'a',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'b',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'lt',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'a',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'b',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'lte',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'a',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'n',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'mod',
    outputs: [
      {
        name: '',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'a',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'n',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'modInverse',
    outputs: [
      {
        name: '',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'a',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'e',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'n',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'modexp',
    outputs: [
      {
        name: '',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'a',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'ai',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'e',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'n',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'modexp',
    outputs: [
      {
        name: '',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'a',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'n',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'r',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'modinvVerify',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'a',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'b',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'n',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'modmul',
    outputs: [
      {
        name: '',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'a',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'b',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'mul',
    outputs: [
      {
        name: 'r',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'one',
    outputs: [
      {
        name: '',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'a',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'e', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'pow',
    outputs: [
      {
        name: '',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'max', internalType: 'bytes', type: 'bytes' },
      { name: 'min', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'privSub',
    outputs: [
      { name: '', internalType: 'bytes', type: 'bytes' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'a',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'bits', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'pubShr',
    outputs: [
      {
        name: '',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'a',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'bits', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'shl',
    outputs: [
      {
        name: '',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'a',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'b',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'sub',
    outputs: [
      {
        name: 'r',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'two',
    outputs: [
      {
        name: '',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'bn',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'verify',
    outputs: [],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'zero',
    outputs: [
      {
        name: '',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'pure',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CryptoUtils
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const cryptoUtilsAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [],
    name: 'EMPTY_SEAT',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_PLAYERS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'message',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'decodeBigintMessage',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'message',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'publicKey', internalType: 'uint256', type: 'uint256' },
      { name: 'r', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'encryptMessageBigint',
    outputs: [
      {
        name: '',
        internalType: 'struct CryptoUtils.EncryptedCard',
        type: 'tuple',
        components: [
          {
            name: 'c1',
            internalType: 'struct BigNumber',
            type: 'tuple',
            components: [
              { name: 'val', internalType: 'bytes', type: 'bytes' },
              { name: 'neg', internalType: 'bool', type: 'bool' },
              { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'c2',
            internalType: 'struct BigNumber',
            type: 'tuple',
            components: [
              { name: 'val', internalType: 'bytes', type: 'bytes' },
              { name: 'neg', internalType: 'bool', type: 'bool' },
              { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'a', internalType: 'string', type: 'string' },
      { name: 'b', internalType: 'string', type: 'string' },
    ],
    name: 'strEq',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'encryptedCard',
        internalType: 'struct CryptoUtils.EncryptedCard',
        type: 'tuple',
        components: [
          {
            name: 'c1',
            internalType: 'struct BigNumber',
            type: 'tuple',
            components: [
              { name: 'val', internalType: 'bytes', type: 'bytes' },
              { name: 'neg', internalType: 'bool', type: 'bool' },
              { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'c2',
            internalType: 'struct BigNumber',
            type: 'tuple',
            components: [
              { name: 'val', internalType: 'bytes', type: 'bytes' },
              { name: 'neg', internalType: 'bool', type: 'bool' },
              { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
      {
        name: 'privateKey',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'c1InversePowPrivateKey',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'verifyDecryptCard',
    outputs: [
      {
        name: '',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'message',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'CULog',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DeckHandler
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6)
 */
export const deckHandlerAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_texasHoldemRoom', internalType: 'address', type: 'address' },
      { name: '_cryptoUtils', internalType: 'address', type: 'address' },
      { name: '_handEvaluator', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'communityCards',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'cryptoUtils',
    outputs: [
      { name: '', internalType: 'contract CryptoUtils', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'encryptedDeck',
    outputs: [
      { name: 'val', internalType: 'bytes', type: 'bytes' },
      { name: 'neg', internalType: 'bool', type: 'bool' },
      { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBulkRoomData',
    outputs: [
      {
        name: '',
        internalType: 'struct DeckHandler.BulkRoomData',
        type: 'tuple',
        components: [
          { name: 'roundNumber', internalType: 'uint256', type: 'uint256' },
          {
            name: 'stage',
            internalType: 'enum TexasHoldemRoom.GameStage',
            type: 'uint8',
          },
          { name: 'smallBlind', internalType: 'uint256', type: 'uint256' },
          { name: 'bigBlind', internalType: 'uint256', type: 'uint256' },
          { name: 'dealerPosition', internalType: 'uint8', type: 'uint8' },
          { name: 'currentPlayerIndex', internalType: 'uint8', type: 'uint8' },
          { name: 'lastRaiseIndex', internalType: 'uint8', type: 'uint8' },
          { name: 'pot', internalType: 'uint256', type: 'uint256' },
          { name: 'currentStageBet', internalType: 'uint256', type: 'uint256' },
          { name: 'numPlayers', internalType: 'uint8', type: 'uint8' },
          { name: 'isPrivate', internalType: 'bool', type: 'bool' },
          {
            name: 'communityCards',
            internalType: 'string[5]',
            type: 'string[5]',
          },
          { name: 'encryptedDeck', internalType: 'bytes[]', type: 'bytes[]' },
          {
            name: 'lastActionTimestamp',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCommunityCards',
    outputs: [{ name: '', internalType: 'string[5]', type: 'string[5]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'cardIndex', internalType: 'uint256', type: 'uint256' }],
    name: 'getEncrypedCard',
    outputs: [
      {
        name: '',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getEncryptedDeck',
    outputs: [{ name: '', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'handEvaluator',
    outputs: [
      {
        name: '',
        internalType: 'contract PokerHandEvaluatorv2',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'resetDeck',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'c1', internalType: 'bytes', type: 'bytes' },
      { name: 'privateKey', internalType: 'bytes', type: 'bytes' },
      { name: 'c1InversePowPrivateKey', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'revealMyCards',
    outputs: [
      { name: 'card1', internalType: 'string', type: 'string' },
      { name: 'card2', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'cardIndexes', internalType: 'uint8[]', type: 'uint8[]' },
      { name: 'decryptionValues', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'submitDecryptionValues',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'encryptedShuffle', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'submitEncryptedShuffle',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'texasHoldemRoom',
    outputs: [
      { name: '', internalType: 'contract TexasHoldemRoom', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'player',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'cardIndexes',
        internalType: 'uint8[]',
        type: 'uint8[]',
        indexed: false,
      },
      {
        name: 'decryptionValues',
        internalType: 'bytes[]',
        type: 'bytes[]',
        indexed: false,
      },
    ],
    name: 'DecryptionValuesSubmitted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'player',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'encryptedShuffle',
        internalType: 'bytes[]',
        type: 'bytes[]',
        indexed: false,
      },
    ],
    name: 'EncryptedShuffleSubmitted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'card1', internalType: 'string', type: 'string', indexed: false },
      { name: 'card2', internalType: 'string', type: 'string', indexed: false },
      { name: 'card3', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'FlopRevealed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'player',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'card1', internalType: 'string', type: 'string', indexed: false },
      { name: 'card2', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'rank',
        internalType: 'enum PokerHandEvaluatorv2.HandRank',
        type: 'uint8',
        indexed: false,
      },
      {
        name: 'handScore',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PlayerCardsRevealed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'player',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'c1', internalType: 'bytes', type: 'bytes', indexed: false },
      {
        name: 'privateKey',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
      {
        name: 'c1InversePowPrivateKey',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'PlayerRevealingCards',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'card1', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'RiverRevealed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'card1', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'TurnRevealed',
  },
] as const

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6)
 */
export const deckHandlerAddress = {
  8453: '0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9',
  31337: '0x3Aa5ebB10DC797CAC828524e59A333d0A371443c',
  84532: '0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6',
} as const

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6)
 */
export const deckHandlerConfig = {
  address: deckHandlerAddress,
  abi: deckHandlerAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMulticall3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMulticall3Abi = [
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'returnData', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3Value[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3Value',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'blockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBasefee',
    outputs: [{ name: 'basefee', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'blockNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'getBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBlockNumber',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getChainId',
    outputs: [{ name: 'chainid', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockCoinbase',
    outputs: [{ name: 'coinbase', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockDifficulty',
    outputs: [{ name: 'difficulty', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockGasLimit',
    outputs: [{ name: 'gaslimit', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockTimestamp',
    outputs: [{ name: 'timestamp', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'getEthBalance',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLastBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryAggregate',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryBlockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PokerHandEvaluatorv2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pokerHandEvaluatorv2Abi = [
  {
    type: 'function',
    inputs: [
      {
        name: 'holeCards',
        internalType: 'struct PokerHandEvaluatorv2.Card[2]',
        type: 'tuple[2]',
        components: [
          { name: 'rank', internalType: 'uint8', type: 'uint8' },
          { name: 'suit', internalType: 'uint8', type: 'uint8' },
        ],
      },
      {
        name: 'communityCards',
        internalType: 'struct PokerHandEvaluatorv2.Card[5]',
        type: 'tuple[5]',
        components: [
          { name: 'rank', internalType: 'uint8', type: 'uint8' },
          { name: 'suit', internalType: 'uint8', type: 'uint8' },
        ],
      },
    ],
    name: 'evaluateHand',
    outputs: [
      {
        name: '',
        internalType: 'struct PokerHandEvaluatorv2.Hand',
        type: 'tuple',
        components: [
          {
            name: 'rank',
            internalType: 'enum PokerHandEvaluatorv2.HandRank',
            type: 'uint8',
          },
          { name: 'score', internalType: 'uint256', type: 'uint256' },
          {
            name: 'bestHand',
            internalType: 'struct PokerHandEvaluatorv2.Card[5]',
            type: 'tuple[5]',
            components: [
              { name: 'rank', internalType: 'uint8', type: 'uint8' },
              { name: 'suit', internalType: 'uint8', type: 'uint8' },
            ],
          },
        ],
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'cards', internalType: 'string[7]', type: 'string[7]' }],
    name: 'findBestHandExternal',
    outputs: [
      {
        name: '',
        internalType: 'struct PokerHandEvaluatorv2.Hand',
        type: 'tuple',
        components: [
          {
            name: 'rank',
            internalType: 'enum PokerHandEvaluatorv2.HandRank',
            type: 'uint8',
          },
          { name: 'score', internalType: 'uint256', type: 'uint256' },
          {
            name: 'bestHand',
            internalType: 'struct PokerHandEvaluatorv2.Card[5]',
            type: 'tuple[5]',
            components: [
              { name: 'rank', internalType: 'uint8', type: 'uint8' },
              { name: 'suit', internalType: 'uint8', type: 'uint8' },
            ],
          },
        ],
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'cards', internalType: 'string[7]', type: 'string[7]' }],
    name: 'findBestHandExternal2',
    outputs: [
      {
        name: '',
        internalType: 'struct PokerHandEvaluatorv2.Hand',
        type: 'tuple',
        components: [
          {
            name: 'rank',
            internalType: 'enum PokerHandEvaluatorv2.HandRank',
            type: 'uint8',
          },
          { name: 'score', internalType: 'uint256', type: 'uint256' },
          {
            name: 'bestHand',
            internalType: 'struct PokerHandEvaluatorv2.Card[5]',
            type: 'tuple[5]',
            components: [
              { name: 'rank', internalType: 'uint8', type: 'uint8' },
              { name: 'suit', internalType: 'uint8', type: 'uint8' },
            ],
          },
        ],
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'cardStr', internalType: 'string', type: 'string' }],
    name: 'humanReadableToCard',
    outputs: [
      {
        name: '',
        internalType: 'struct PokerHandEvaluatorv2.Card',
        type: 'tuple',
        components: [
          { name: 'rank', internalType: 'uint8', type: 'uint8' },
          { name: 'suit', internalType: 'uint8', type: 'uint8' },
        ],
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 's', internalType: 'string', type: 'string' }],
    name: 'parseInt',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'a', internalType: 'string', type: 'string' },
      { name: 'b', internalType: 'string', type: 'string' },
    ],
    name: 'strEq',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'cardStr', internalType: 'string', type: 'string' }],
    name: 'stringToCard',
    outputs: [
      {
        name: '',
        internalType: 'struct PokerHandEvaluatorv2.Card',
        type: 'tuple',
        components: [
          { name: 'rank', internalType: 'uint8', type: 'uint8' },
          { name: 'suit', internalType: 'uint8', type: 'uint8' },
        ],
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'cardStr', internalType: 'string', type: 'string' }],
    name: 'stringToHumanReadable',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'value', internalType: 'uint8', type: 'uint8' }],
    name: 'uintToString',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'pure',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'message',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'PHE_Log',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ReportIdlePlayerFirstShuffleTest
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const reportIdlePlayerFirstShuffleTestAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'IS_TEST',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'args',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'cryptoUtils',
    outputs: [
      { name: '', internalType: 'contract CryptoUtils', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'deckHandler',
    outputs: [
      { name: '', internalType: 'contract DeckHandler', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'excludeArtifacts',
    outputs: [
      {
        name: 'excludedArtifacts_',
        internalType: 'string[]',
        type: 'string[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'excludeContracts',
    outputs: [
      {
        name: 'excludedContracts_',
        internalType: 'address[]',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'excludeSelectors',
    outputs: [
      {
        name: 'excludedSelectors_',
        internalType: 'struct StdInvariant.FuzzSelector[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'selectors', internalType: 'bytes4[]', type: 'bytes4[]' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'excludeSenders',
    outputs: [
      {
        name: 'excludedSenders_',
        internalType: 'address[]',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'failed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'handEvaluator',
    outputs: [
      {
        name: '',
        internalType: 'contract PokerHandEvaluatorv2',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'player1',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'player2',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'player3',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'room',
    outputs: [
      { name: '', internalType: 'contract TexasHoldemRoom', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'setUp',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetArtifactSelectors',
    outputs: [
      {
        name: 'targetedArtifactSelectors_',
        internalType: 'struct StdInvariant.FuzzArtifactSelector[]',
        type: 'tuple[]',
        components: [
          { name: 'artifact', internalType: 'string', type: 'string' },
          { name: 'selectors', internalType: 'bytes4[]', type: 'bytes4[]' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetArtifacts',
    outputs: [
      {
        name: 'targetedArtifacts_',
        internalType: 'string[]',
        type: 'string[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetContracts',
    outputs: [
      {
        name: 'targetedContracts_',
        internalType: 'address[]',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetInterfaces',
    outputs: [
      {
        name: 'targetedInterfaces_',
        internalType: 'struct StdInvariant.FuzzInterface[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'artifacts', internalType: 'string[]', type: 'string[]' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetSelectors',
    outputs: [
      {
        name: 'targetedSelectors_',
        internalType: 'struct StdInvariant.FuzzSelector[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'selectors', internalType: 'bytes4[]', type: 'bytes4[]' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetSenders',
    outputs: [
      {
        name: 'targetedSenders_',
        internalType: 'address[]',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'test_reportIdlePlayer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'addressReporting',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'playerReported',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'timeElapsed',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'IdlePlayerKicked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'log',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'log_address',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'val',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'val',
        internalType: 'int256[]',
        type: 'int256[]',
        indexed: false,
      },
    ],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'val',
        internalType: 'address[]',
        type: 'address[]',
        indexed: false,
      },
    ],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'log_bytes',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'bytes32', type: 'bytes32', indexed: false },
    ],
    name: 'log_bytes32',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'int256', type: 'int256', indexed: false },
    ],
    name: 'log_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'log_named_address',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'val',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'val',
        internalType: 'int256[]',
        type: 'int256[]',
        indexed: false,
      },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'val',
        internalType: 'address[]',
        type: 'address[]',
        indexed: false,
      },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'log_named_bytes',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'bytes32', type: 'bytes32', indexed: false },
    ],
    name: 'log_named_bytes32',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'int256', type: 'int256', indexed: false },
      {
        name: 'decimals',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'log_named_decimal_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'decimals',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'log_named_decimal_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'int256', type: 'int256', indexed: false },
    ],
    name: 'log_named_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'log_named_string',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'log_named_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'log_string',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'log_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'logs',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// StringExtensions
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const stringExtensionsAbi = [
  {
    type: 'function',
    inputs: [{ name: 'hexStr', internalType: 'string', type: 'string' }],
    name: 'fromHexString',
    outputs: [
      {
        name: '',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'decimalStr', internalType: 'string', type: 'string' }],
    name: 'fromString',
    outputs: [
      {
        name: '',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'bn',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'toHexString',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'bn',
        internalType: 'struct BigNumber',
        type: 'tuple',
        components: [
          { name: 'val', internalType: 'bytes', type: 'bytes' },
          { name: 'neg', internalType: 'bool', type: 'bool' },
          { name: 'bitlen', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'toString',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TexasHoldemRoom
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const texasHoldemRoomAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_cryptoUtils', internalType: 'address', type: 'address' },
      { name: '_smallBlind', internalType: 'uint256', type: 'uint256' },
      { name: '_isPrivate', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'EMPTY_SEAT',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_PLAYERS',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_PLAYERS',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'STARTING_CHIPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'bigBlind',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'countActivePlayers',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'countOfHandsRevealed',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'countPlayersAtRoundStart',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'cryptoUtils',
    outputs: [
      { name: '', internalType: 'contract CryptoUtils', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'currentPlayerIndex',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'currentStageBet',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'dealerPosition',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'deckHandler',
    outputs: [
      { name: '', internalType: 'contract DeckHandler', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'requireActive', internalType: 'bool', type: 'bool' }],
    name: 'getNextActivePlayer',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'playerIndex', internalType: 'uint8', type: 'uint8' }],
    name: 'getPlayer',
    outputs: [
      {
        name: '',
        internalType: 'struct TexasHoldemRoom.Player',
        type: 'tuple',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'chips', internalType: 'uint256', type: 'uint256' },
          { name: 'currentStageBet', internalType: 'uint256', type: 'uint256' },
          { name: 'totalRoundBet', internalType: 'uint256', type: 'uint256' },
          { name: 'hasFolded', internalType: 'bool', type: 'bool' },
          { name: 'isAllIn', internalType: 'bool', type: 'bool' },
          { name: 'hasChecked', internalType: 'bool', type: 'bool' },
          { name: 'cards', internalType: 'string[2]', type: 'string[2]' },
          { name: 'seatPosition', internalType: 'uint8', type: 'uint8' },
          { name: 'handScore', internalType: 'uint256', type: 'uint256' },
          {
            name: 'joinedAndWaitingForNextRound',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'leavingAfterRoundEnds', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'getPlayerIndexFromAddr',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPlayers',
    outputs: [
      {
        name: '',
        internalType: 'struct TexasHoldemRoom.Player[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'chips', internalType: 'uint256', type: 'uint256' },
          { name: 'currentStageBet', internalType: 'uint256', type: 'uint256' },
          { name: 'totalRoundBet', internalType: 'uint256', type: 'uint256' },
          { name: 'hasFolded', internalType: 'bool', type: 'bool' },
          { name: 'isAllIn', internalType: 'bool', type: 'bool' },
          { name: 'hasChecked', internalType: 'bool', type: 'bool' },
          { name: 'cards', internalType: 'string[2]', type: 'string[2]' },
          { name: 'seatPosition', internalType: 'uint8', type: 'uint8' },
          { name: 'handScore', internalType: 'uint256', type: 'uint256' },
          {
            name: 'joinedAndWaitingForNextRound',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'leavingAfterRoundEnds', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'playerIndex', internalType: 'uint8', type: 'uint8' }],
    name: 'getPlayersCardIndexes',
    outputs: [
      { name: 'playerCardIndexes', internalType: 'uint8[2]', type: 'uint8[2]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isPrivate',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'joinGame',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastActionTimestamp',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastRaiseIndex',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'leaveGame',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'numPlayers',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'players',
    outputs: [
      { name: 'addr', internalType: 'address', type: 'address' },
      { name: 'chips', internalType: 'uint256', type: 'uint256' },
      { name: 'currentStageBet', internalType: 'uint256', type: 'uint256' },
      { name: 'totalRoundBet', internalType: 'uint256', type: 'uint256' },
      { name: 'hasFolded', internalType: 'bool', type: 'bool' },
      { name: 'isAllIn', internalType: 'bool', type: 'bool' },
      { name: 'hasChecked', internalType: 'bool', type: 'bool' },
      { name: 'seatPosition', internalType: 'uint8', type: 'uint8' },
      { name: 'handScore', internalType: 'uint256', type: 'uint256' },
      {
        name: 'joinedAndWaitingForNextRound',
        internalType: 'bool',
        type: 'bool',
      },
      { name: 'leavingAfterRoundEnds', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pot',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'progressGame',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'reportIdlePlayer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'reportInvalidCards',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'resetRound',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'roundNumber',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'seatPositionToPlayerIndex',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_deckHandler', internalType: 'address', type: 'address' },
    ],
    name: 'setDeckHandler',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'playerIndex', internalType: 'uint8', type: 'uint8' },
      { name: 'handScore', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setPlayerHandScore',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'smallBlind',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'stage',
    outputs: [
      {
        name: '',
        internalType: 'enum TexasHoldemRoom.GameStage',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'action',
        internalType: 'enum TexasHoldemRoom.Action',
        type: 'uint8',
      },
      { name: 'raiseAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'submitAction',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'dealerPosition',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'GameStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'addressReporting',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'playerReported',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'timeElapsed',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'IdlePlayerKicked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'player',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'InvalidCardsReported',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'stage',
        internalType: 'enum TexasHoldemRoom.GameStage',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'NewStage',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'player',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'playerIndex',
        internalType: 'uint8',
        type: 'uint8',
        indexed: true,
      },
      {
        name: 'seatPosition',
        internalType: 'uint8',
        type: 'uint8',
        indexed: true,
      },
    ],
    name: 'PlayerJoined',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'player',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'playerIndex',
        internalType: 'uint8',
        type: 'uint8',
        indexed: true,
      },
      {
        name: 'seatPosition',
        internalType: 'uint8',
        type: 'uint8',
        indexed: true,
      },
    ],
    name: 'PlayerLeft',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'player',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'action',
        internalType: 'enum TexasHoldemRoom.Action',
        type: 'uint8',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PlayerMoved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'winners',
        internalType: 'address[]',
        type: 'address[]',
        indexed: false,
      },
      {
        name: 'winnerPlayerIndexes',
        internalType: 'uint8[]',
        type: 'uint8[]',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PotWon',
  },
] as const

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const texasHoldemRoomAddress = {
  8453: '0xf34890f942220f48391BA33Ff053f64Aa8979956',
  31337: '0x68B1D87F95878fE05B998F19b66F4baba5De1aed',
  84532: '0xb1d348bbf62A46EDE1bafC6647947c89632120d8',
} as const

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const texasHoldemRoomConfig = {
  address: texasHoldemRoomAddress,
  abi: texasHoldemRoomAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TexasHoldemRoomRealKeysNoShuffleTest
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const texasHoldemRoomRealKeysNoShuffleTestAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'IS_TEST',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'args',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'cryptoUtils',
    outputs: [
      { name: '', internalType: 'contract CryptoUtils', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'deckHandler',
    outputs: [
      { name: '', internalType: 'contract DeckHandler', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'excludeArtifacts',
    outputs: [
      {
        name: 'excludedArtifacts_',
        internalType: 'string[]',
        type: 'string[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'excludeContracts',
    outputs: [
      {
        name: 'excludedContracts_',
        internalType: 'address[]',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'excludeSelectors',
    outputs: [
      {
        name: 'excludedSelectors_',
        internalType: 'struct StdInvariant.FuzzSelector[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'selectors', internalType: 'bytes4[]', type: 'bytes4[]' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'excludeSenders',
    outputs: [
      {
        name: 'excludedSenders_',
        internalType: 'address[]',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'failed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'handEvaluator',
    outputs: [
      {
        name: '',
        internalType: 'contract PokerHandEvaluatorv2',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'player1',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'player2',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'player3',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'room',
    outputs: [
      { name: '', internalType: 'contract TexasHoldemRoom', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'setUp',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetArtifactSelectors',
    outputs: [
      {
        name: 'targetedArtifactSelectors_',
        internalType: 'struct StdInvariant.FuzzArtifactSelector[]',
        type: 'tuple[]',
        components: [
          { name: 'artifact', internalType: 'string', type: 'string' },
          { name: 'selectors', internalType: 'bytes4[]', type: 'bytes4[]' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetArtifacts',
    outputs: [
      {
        name: 'targetedArtifacts_',
        internalType: 'string[]',
        type: 'string[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetContracts',
    outputs: [
      {
        name: 'targetedContracts_',
        internalType: 'address[]',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetInterfaces',
    outputs: [
      {
        name: 'targetedInterfaces_',
        internalType: 'struct StdInvariant.FuzzInterface[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'artifacts', internalType: 'string[]', type: 'string[]' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetSelectors',
    outputs: [
      {
        name: 'targetedSelectors_',
        internalType: 'struct StdInvariant.FuzzSelector[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'selectors', internalType: 'bytes4[]', type: 'bytes4[]' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetSenders',
    outputs: [
      {
        name: 'targetedSenders_',
        internalType: 'address[]',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'log',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'log_address',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'val',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'val',
        internalType: 'int256[]',
        type: 'int256[]',
        indexed: false,
      },
    ],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'val',
        internalType: 'address[]',
        type: 'address[]',
        indexed: false,
      },
    ],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'log_bytes',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'bytes32', type: 'bytes32', indexed: false },
    ],
    name: 'log_bytes32',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'int256', type: 'int256', indexed: false },
    ],
    name: 'log_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'log_named_address',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'val',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'val',
        internalType: 'int256[]',
        type: 'int256[]',
        indexed: false,
      },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'val',
        internalType: 'address[]',
        type: 'address[]',
        indexed: false,
      },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'log_named_bytes',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'bytes32', type: 'bytes32', indexed: false },
    ],
    name: 'log_named_bytes32',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'int256', type: 'int256', indexed: false },
      {
        name: 'decimals',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'log_named_decimal_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'decimals',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'log_named_decimal_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'int256', type: 'int256', indexed: false },
    ],
    name: 'log_named_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'log_named_string',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'log_named_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'log_string',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'log_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'logs',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bigNumbersAbi}__
 */
export const useReadBigNumbers = /*#__PURE__*/ createUseReadContract({
  abi: bigNumbersAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bigNumbersAbi}__ and `functionName` set to `"_shr"`
 */
export const useReadBigNumbersShr = /*#__PURE__*/ createUseReadContract({
  abi: bigNumbersAbi,
  functionName: '_shr',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bigNumbersAbi}__ and `functionName` set to `"add"`
 */
export const useReadBigNumbersAdd = /*#__PURE__*/ createUseReadContract({
  abi: bigNumbersAbi,
  functionName: 'add',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bigNumbersAbi}__ and `functionName` set to `"bitLength"`
 */
export const useReadBigNumbersBitLength = /*#__PURE__*/ createUseReadContract({
  abi: bigNumbersAbi,
  functionName: 'bitLength',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bigNumbersAbi}__ and `functionName` set to `"cmp"`
 */
export const useReadBigNumbersCmp = /*#__PURE__*/ createUseReadContract({
  abi: bigNumbersAbi,
  functionName: 'cmp',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bigNumbersAbi}__ and `functionName` set to `"div"`
 */
export const useReadBigNumbersDiv = /*#__PURE__*/ createUseReadContract({
  abi: bigNumbersAbi,
  functionName: 'div',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bigNumbersAbi}__ and `functionName` set to `"divVerify"`
 */
export const useReadBigNumbersDivVerify = /*#__PURE__*/ createUseReadContract({
  abi: bigNumbersAbi,
  functionName: 'divVerify',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bigNumbersAbi}__ and `functionName` set to `"eq"`
 */
export const useReadBigNumbersEq = /*#__PURE__*/ createUseReadContract({
  abi: bigNumbersAbi,
  functionName: 'eq',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bigNumbersAbi}__ and `functionName` set to `"gt"`
 */
export const useReadBigNumbersGt = /*#__PURE__*/ createUseReadContract({
  abi: bigNumbersAbi,
  functionName: 'gt',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bigNumbersAbi}__ and `functionName` set to `"gte"`
 */
export const useReadBigNumbersGte = /*#__PURE__*/ createUseReadContract({
  abi: bigNumbersAbi,
  functionName: 'gte',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bigNumbersAbi}__ and `functionName` set to `"hash"`
 */
export const useReadBigNumbersHash = /*#__PURE__*/ createUseReadContract({
  abi: bigNumbersAbi,
  functionName: 'hash',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bigNumbersAbi}__ and `functionName` set to `"init"`
 */
export const useReadBigNumbersInit = /*#__PURE__*/ createUseReadContract({
  abi: bigNumbersAbi,
  functionName: 'init',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bigNumbersAbi}__ and `functionName` set to `"isOdd"`
 */
export const useReadBigNumbersIsOdd = /*#__PURE__*/ createUseReadContract({
  abi: bigNumbersAbi,
  functionName: 'isOdd',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bigNumbersAbi}__ and `functionName` set to `"isZero"`
 */
export const useReadBigNumbersIsZero = /*#__PURE__*/ createUseReadContract({
  abi: bigNumbersAbi,
  functionName: 'isZero',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bigNumbersAbi}__ and `functionName` set to `"lt"`
 */
export const useReadBigNumbersLt = /*#__PURE__*/ createUseReadContract({
  abi: bigNumbersAbi,
  functionName: 'lt',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bigNumbersAbi}__ and `functionName` set to `"lte"`
 */
export const useReadBigNumbersLte = /*#__PURE__*/ createUseReadContract({
  abi: bigNumbersAbi,
  functionName: 'lte',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bigNumbersAbi}__ and `functionName` set to `"mod"`
 */
export const useReadBigNumbersMod = /*#__PURE__*/ createUseReadContract({
  abi: bigNumbersAbi,
  functionName: 'mod',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bigNumbersAbi}__ and `functionName` set to `"modInverse"`
 */
export const useReadBigNumbersModInverse = /*#__PURE__*/ createUseReadContract({
  abi: bigNumbersAbi,
  functionName: 'modInverse',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bigNumbersAbi}__ and `functionName` set to `"modexp"`
 */
export const useReadBigNumbersModexp = /*#__PURE__*/ createUseReadContract({
  abi: bigNumbersAbi,
  functionName: 'modexp',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bigNumbersAbi}__ and `functionName` set to `"modinvVerify"`
 */
export const useReadBigNumbersModinvVerify =
  /*#__PURE__*/ createUseReadContract({
    abi: bigNumbersAbi,
    functionName: 'modinvVerify',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bigNumbersAbi}__ and `functionName` set to `"modmul"`
 */
export const useReadBigNumbersModmul = /*#__PURE__*/ createUseReadContract({
  abi: bigNumbersAbi,
  functionName: 'modmul',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bigNumbersAbi}__ and `functionName` set to `"mul"`
 */
export const useReadBigNumbersMul = /*#__PURE__*/ createUseReadContract({
  abi: bigNumbersAbi,
  functionName: 'mul',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bigNumbersAbi}__ and `functionName` set to `"one"`
 */
export const useReadBigNumbersOne = /*#__PURE__*/ createUseReadContract({
  abi: bigNumbersAbi,
  functionName: 'one',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bigNumbersAbi}__ and `functionName` set to `"pow"`
 */
export const useReadBigNumbersPow = /*#__PURE__*/ createUseReadContract({
  abi: bigNumbersAbi,
  functionName: 'pow',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bigNumbersAbi}__ and `functionName` set to `"privSub"`
 */
export const useReadBigNumbersPrivSub = /*#__PURE__*/ createUseReadContract({
  abi: bigNumbersAbi,
  functionName: 'privSub',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bigNumbersAbi}__ and `functionName` set to `"pubShr"`
 */
export const useReadBigNumbersPubShr = /*#__PURE__*/ createUseReadContract({
  abi: bigNumbersAbi,
  functionName: 'pubShr',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bigNumbersAbi}__ and `functionName` set to `"shl"`
 */
export const useReadBigNumbersShl = /*#__PURE__*/ createUseReadContract({
  abi: bigNumbersAbi,
  functionName: 'shl',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bigNumbersAbi}__ and `functionName` set to `"sub"`
 */
export const useReadBigNumbersSub = /*#__PURE__*/ createUseReadContract({
  abi: bigNumbersAbi,
  functionName: 'sub',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bigNumbersAbi}__ and `functionName` set to `"two"`
 */
export const useReadBigNumbersTwo = /*#__PURE__*/ createUseReadContract({
  abi: bigNumbersAbi,
  functionName: 'two',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bigNumbersAbi}__ and `functionName` set to `"verify"`
 */
export const useReadBigNumbersVerify = /*#__PURE__*/ createUseReadContract({
  abi: bigNumbersAbi,
  functionName: 'verify',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bigNumbersAbi}__ and `functionName` set to `"zero"`
 */
export const useReadBigNumbersZero = /*#__PURE__*/ createUseReadContract({
  abi: bigNumbersAbi,
  functionName: 'zero',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cryptoUtilsAbi}__
 */
export const useReadCryptoUtils = /*#__PURE__*/ createUseReadContract({
  abi: cryptoUtilsAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cryptoUtilsAbi}__ and `functionName` set to `"EMPTY_SEAT"`
 */
export const useReadCryptoUtilsEmptySeat = /*#__PURE__*/ createUseReadContract({
  abi: cryptoUtilsAbi,
  functionName: 'EMPTY_SEAT',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cryptoUtilsAbi}__ and `functionName` set to `"MAX_PLAYERS"`
 */
export const useReadCryptoUtilsMaxPlayers = /*#__PURE__*/ createUseReadContract(
  { abi: cryptoUtilsAbi, functionName: 'MAX_PLAYERS' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cryptoUtilsAbi}__ and `functionName` set to `"decodeBigintMessage"`
 */
export const useReadCryptoUtilsDecodeBigintMessage =
  /*#__PURE__*/ createUseReadContract({
    abi: cryptoUtilsAbi,
    functionName: 'decodeBigintMessage',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cryptoUtilsAbi}__ and `functionName` set to `"encryptMessageBigint"`
 */
export const useReadCryptoUtilsEncryptMessageBigint =
  /*#__PURE__*/ createUseReadContract({
    abi: cryptoUtilsAbi,
    functionName: 'encryptMessageBigint',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cryptoUtilsAbi}__ and `functionName` set to `"strEq"`
 */
export const useReadCryptoUtilsStrEq = /*#__PURE__*/ createUseReadContract({
  abi: cryptoUtilsAbi,
  functionName: 'strEq',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cryptoUtilsAbi}__
 */
export const useWriteCryptoUtils = /*#__PURE__*/ createUseWriteContract({
  abi: cryptoUtilsAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cryptoUtilsAbi}__ and `functionName` set to `"verifyDecryptCard"`
 */
export const useWriteCryptoUtilsVerifyDecryptCard =
  /*#__PURE__*/ createUseWriteContract({
    abi: cryptoUtilsAbi,
    functionName: 'verifyDecryptCard',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cryptoUtilsAbi}__
 */
export const useSimulateCryptoUtils = /*#__PURE__*/ createUseSimulateContract({
  abi: cryptoUtilsAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cryptoUtilsAbi}__ and `functionName` set to `"verifyDecryptCard"`
 */
export const useSimulateCryptoUtilsVerifyDecryptCard =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cryptoUtilsAbi,
    functionName: 'verifyDecryptCard',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cryptoUtilsAbi}__
 */
export const useWatchCryptoUtilsEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: cryptoUtilsAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cryptoUtilsAbi}__ and `eventName` set to `"CULog"`
 */
export const useWatchCryptoUtilsCuLogEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: cryptoUtilsAbi,
    eventName: 'CULog',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link deckHandlerAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6)
 */
export const useReadDeckHandler = /*#__PURE__*/ createUseReadContract({
  abi: deckHandlerAbi,
  address: deckHandlerAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link deckHandlerAbi}__ and `functionName` set to `"communityCards"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6)
 */
export const useReadDeckHandlerCommunityCards =
  /*#__PURE__*/ createUseReadContract({
    abi: deckHandlerAbi,
    address: deckHandlerAddress,
    functionName: 'communityCards',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link deckHandlerAbi}__ and `functionName` set to `"cryptoUtils"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6)
 */
export const useReadDeckHandlerCryptoUtils =
  /*#__PURE__*/ createUseReadContract({
    abi: deckHandlerAbi,
    address: deckHandlerAddress,
    functionName: 'cryptoUtils',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link deckHandlerAbi}__ and `functionName` set to `"encryptedDeck"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6)
 */
export const useReadDeckHandlerEncryptedDeck =
  /*#__PURE__*/ createUseReadContract({
    abi: deckHandlerAbi,
    address: deckHandlerAddress,
    functionName: 'encryptedDeck',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link deckHandlerAbi}__ and `functionName` set to `"getBulkRoomData"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6)
 */
export const useReadDeckHandlerGetBulkRoomData =
  /*#__PURE__*/ createUseReadContract({
    abi: deckHandlerAbi,
    address: deckHandlerAddress,
    functionName: 'getBulkRoomData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link deckHandlerAbi}__ and `functionName` set to `"getCommunityCards"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6)
 */
export const useReadDeckHandlerGetCommunityCards =
  /*#__PURE__*/ createUseReadContract({
    abi: deckHandlerAbi,
    address: deckHandlerAddress,
    functionName: 'getCommunityCards',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link deckHandlerAbi}__ and `functionName` set to `"getEncrypedCard"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6)
 */
export const useReadDeckHandlerGetEncrypedCard =
  /*#__PURE__*/ createUseReadContract({
    abi: deckHandlerAbi,
    address: deckHandlerAddress,
    functionName: 'getEncrypedCard',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link deckHandlerAbi}__ and `functionName` set to `"getEncryptedDeck"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6)
 */
export const useReadDeckHandlerGetEncryptedDeck =
  /*#__PURE__*/ createUseReadContract({
    abi: deckHandlerAbi,
    address: deckHandlerAddress,
    functionName: 'getEncryptedDeck',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link deckHandlerAbi}__ and `functionName` set to `"handEvaluator"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6)
 */
export const useReadDeckHandlerHandEvaluator =
  /*#__PURE__*/ createUseReadContract({
    abi: deckHandlerAbi,
    address: deckHandlerAddress,
    functionName: 'handEvaluator',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link deckHandlerAbi}__ and `functionName` set to `"texasHoldemRoom"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6)
 */
export const useReadDeckHandlerTexasHoldemRoom =
  /*#__PURE__*/ createUseReadContract({
    abi: deckHandlerAbi,
    address: deckHandlerAddress,
    functionName: 'texasHoldemRoom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link deckHandlerAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6)
 */
export const useWriteDeckHandler = /*#__PURE__*/ createUseWriteContract({
  abi: deckHandlerAbi,
  address: deckHandlerAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link deckHandlerAbi}__ and `functionName` set to `"resetDeck"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6)
 */
export const useWriteDeckHandlerResetDeck =
  /*#__PURE__*/ createUseWriteContract({
    abi: deckHandlerAbi,
    address: deckHandlerAddress,
    functionName: 'resetDeck',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link deckHandlerAbi}__ and `functionName` set to `"revealMyCards"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6)
 */
export const useWriteDeckHandlerRevealMyCards =
  /*#__PURE__*/ createUseWriteContract({
    abi: deckHandlerAbi,
    address: deckHandlerAddress,
    functionName: 'revealMyCards',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link deckHandlerAbi}__ and `functionName` set to `"submitDecryptionValues"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6)
 */
export const useWriteDeckHandlerSubmitDecryptionValues =
  /*#__PURE__*/ createUseWriteContract({
    abi: deckHandlerAbi,
    address: deckHandlerAddress,
    functionName: 'submitDecryptionValues',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link deckHandlerAbi}__ and `functionName` set to `"submitEncryptedShuffle"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6)
 */
export const useWriteDeckHandlerSubmitEncryptedShuffle =
  /*#__PURE__*/ createUseWriteContract({
    abi: deckHandlerAbi,
    address: deckHandlerAddress,
    functionName: 'submitEncryptedShuffle',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link deckHandlerAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6)
 */
export const useSimulateDeckHandler = /*#__PURE__*/ createUseSimulateContract({
  abi: deckHandlerAbi,
  address: deckHandlerAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link deckHandlerAbi}__ and `functionName` set to `"resetDeck"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6)
 */
export const useSimulateDeckHandlerResetDeck =
  /*#__PURE__*/ createUseSimulateContract({
    abi: deckHandlerAbi,
    address: deckHandlerAddress,
    functionName: 'resetDeck',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link deckHandlerAbi}__ and `functionName` set to `"revealMyCards"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6)
 */
export const useSimulateDeckHandlerRevealMyCards =
  /*#__PURE__*/ createUseSimulateContract({
    abi: deckHandlerAbi,
    address: deckHandlerAddress,
    functionName: 'revealMyCards',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link deckHandlerAbi}__ and `functionName` set to `"submitDecryptionValues"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6)
 */
export const useSimulateDeckHandlerSubmitDecryptionValues =
  /*#__PURE__*/ createUseSimulateContract({
    abi: deckHandlerAbi,
    address: deckHandlerAddress,
    functionName: 'submitDecryptionValues',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link deckHandlerAbi}__ and `functionName` set to `"submitEncryptedShuffle"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6)
 */
export const useSimulateDeckHandlerSubmitEncryptedShuffle =
  /*#__PURE__*/ createUseSimulateContract({
    abi: deckHandlerAbi,
    address: deckHandlerAddress,
    functionName: 'submitEncryptedShuffle',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link deckHandlerAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6)
 */
export const useWatchDeckHandlerEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: deckHandlerAbi,
    address: deckHandlerAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link deckHandlerAbi}__ and `eventName` set to `"DecryptionValuesSubmitted"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6)
 */
export const useWatchDeckHandlerDecryptionValuesSubmittedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: deckHandlerAbi,
    address: deckHandlerAddress,
    eventName: 'DecryptionValuesSubmitted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link deckHandlerAbi}__ and `eventName` set to `"EncryptedShuffleSubmitted"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6)
 */
export const useWatchDeckHandlerEncryptedShuffleSubmittedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: deckHandlerAbi,
    address: deckHandlerAddress,
    eventName: 'EncryptedShuffleSubmitted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link deckHandlerAbi}__ and `eventName` set to `"FlopRevealed"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6)
 */
export const useWatchDeckHandlerFlopRevealedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: deckHandlerAbi,
    address: deckHandlerAddress,
    eventName: 'FlopRevealed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link deckHandlerAbi}__ and `eventName` set to `"PlayerCardsRevealed"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6)
 */
export const useWatchDeckHandlerPlayerCardsRevealedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: deckHandlerAbi,
    address: deckHandlerAddress,
    eventName: 'PlayerCardsRevealed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link deckHandlerAbi}__ and `eventName` set to `"PlayerRevealingCards"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6)
 */
export const useWatchDeckHandlerPlayerRevealingCardsEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: deckHandlerAbi,
    address: deckHandlerAddress,
    eventName: 'PlayerRevealingCards',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link deckHandlerAbi}__ and `eventName` set to `"RiverRevealed"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6)
 */
export const useWatchDeckHandlerRiverRevealedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: deckHandlerAbi,
    address: deckHandlerAddress,
    eventName: 'RiverRevealed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link deckHandlerAbi}__ and `eventName` set to `"TurnRevealed"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6)
 */
export const useWatchDeckHandlerTurnRevealedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: deckHandlerAbi,
    address: deckHandlerAddress,
    eventName: 'TurnRevealed',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useReadIMulticall3 = /*#__PURE__*/ createUseReadContract({
  abi: iMulticall3Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBasefee"`
 */
export const useReadIMulticall3GetBasefee = /*#__PURE__*/ createUseReadContract(
  { abi: iMulticall3Abi, functionName: 'getBasefee' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBlockHash"`
 */
export const useReadIMulticall3GetBlockHash =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getBlockHash',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBlockNumber"`
 */
export const useReadIMulticall3GetBlockNumber =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getBlockNumber',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getChainId"`
 */
export const useReadIMulticall3GetChainId = /*#__PURE__*/ createUseReadContract(
  { abi: iMulticall3Abi, functionName: 'getChainId' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockCoinbase"`
 */
export const useReadIMulticall3GetCurrentBlockCoinbase =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockCoinbase',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockDifficulty"`
 */
export const useReadIMulticall3GetCurrentBlockDifficulty =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockDifficulty',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockGasLimit"`
 */
export const useReadIMulticall3GetCurrentBlockGasLimit =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockGasLimit',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockTimestamp"`
 */
export const useReadIMulticall3GetCurrentBlockTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockTimestamp',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getEthBalance"`
 */
export const useReadIMulticall3GetEthBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getEthBalance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getLastBlockHash"`
 */
export const useReadIMulticall3GetLastBlockHash =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getLastBlockHash',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useWriteIMulticall3 = /*#__PURE__*/ createUseWriteContract({
  abi: iMulticall3Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const useWriteIMulticall3Aggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const useWriteIMulticall3Aggregate3 =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const useWriteIMulticall3Aggregate3Value =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3Value',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const useWriteIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'blockAndAggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const useWriteIMulticall3TryAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'tryAggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const useWriteIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'tryBlockAndAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useSimulateIMulticall3 = /*#__PURE__*/ createUseSimulateContract({
  abi: iMulticall3Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const useSimulateIMulticall3Aggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const useSimulateIMulticall3Aggregate3 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const useSimulateIMulticall3Aggregate3Value =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3Value',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const useSimulateIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'blockAndAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const useSimulateIMulticall3TryAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'tryAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const useSimulateIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'tryBlockAndAggregate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pokerHandEvaluatorv2Abi}__
 */
export const useReadPokerHandEvaluatorv2 = /*#__PURE__*/ createUseReadContract({
  abi: pokerHandEvaluatorv2Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pokerHandEvaluatorv2Abi}__ and `functionName` set to `"evaluateHand"`
 */
export const useReadPokerHandEvaluatorv2EvaluateHand =
  /*#__PURE__*/ createUseReadContract({
    abi: pokerHandEvaluatorv2Abi,
    functionName: 'evaluateHand',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pokerHandEvaluatorv2Abi}__ and `functionName` set to `"findBestHandExternal"`
 */
export const useReadPokerHandEvaluatorv2FindBestHandExternal =
  /*#__PURE__*/ createUseReadContract({
    abi: pokerHandEvaluatorv2Abi,
    functionName: 'findBestHandExternal',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pokerHandEvaluatorv2Abi}__ and `functionName` set to `"findBestHandExternal2"`
 */
export const useReadPokerHandEvaluatorv2FindBestHandExternal2 =
  /*#__PURE__*/ createUseReadContract({
    abi: pokerHandEvaluatorv2Abi,
    functionName: 'findBestHandExternal2',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pokerHandEvaluatorv2Abi}__ and `functionName` set to `"humanReadableToCard"`
 */
export const useReadPokerHandEvaluatorv2HumanReadableToCard =
  /*#__PURE__*/ createUseReadContract({
    abi: pokerHandEvaluatorv2Abi,
    functionName: 'humanReadableToCard',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pokerHandEvaluatorv2Abi}__ and `functionName` set to `"parseInt"`
 */
export const useReadPokerHandEvaluatorv2ParseInt =
  /*#__PURE__*/ createUseReadContract({
    abi: pokerHandEvaluatorv2Abi,
    functionName: 'parseInt',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pokerHandEvaluatorv2Abi}__ and `functionName` set to `"strEq"`
 */
export const useReadPokerHandEvaluatorv2StrEq =
  /*#__PURE__*/ createUseReadContract({
    abi: pokerHandEvaluatorv2Abi,
    functionName: 'strEq',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pokerHandEvaluatorv2Abi}__ and `functionName` set to `"stringToCard"`
 */
export const useReadPokerHandEvaluatorv2StringToCard =
  /*#__PURE__*/ createUseReadContract({
    abi: pokerHandEvaluatorv2Abi,
    functionName: 'stringToCard',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pokerHandEvaluatorv2Abi}__ and `functionName` set to `"stringToHumanReadable"`
 */
export const useReadPokerHandEvaluatorv2StringToHumanReadable =
  /*#__PURE__*/ createUseReadContract({
    abi: pokerHandEvaluatorv2Abi,
    functionName: 'stringToHumanReadable',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pokerHandEvaluatorv2Abi}__ and `functionName` set to `"uintToString"`
 */
export const useReadPokerHandEvaluatorv2UintToString =
  /*#__PURE__*/ createUseReadContract({
    abi: pokerHandEvaluatorv2Abi,
    functionName: 'uintToString',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pokerHandEvaluatorv2Abi}__
 */
export const useWatchPokerHandEvaluatorv2Event =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: pokerHandEvaluatorv2Abi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pokerHandEvaluatorv2Abi}__ and `eventName` set to `"PHE_Log"`
 */
export const useWatchPokerHandEvaluatorv2PheLogEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pokerHandEvaluatorv2Abi,
    eventName: 'PHE_Log',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__
 */
export const useReadReportIdlePlayerFirstShuffleTest =
  /*#__PURE__*/ createUseReadContract({
    abi: reportIdlePlayerFirstShuffleTestAbi,
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `functionName` set to `"IS_TEST"`
 */
export const useReadReportIdlePlayerFirstShuffleTestIsTest =
  /*#__PURE__*/ createUseReadContract({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    functionName: 'IS_TEST',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `functionName` set to `"args"`
 */
export const useReadReportIdlePlayerFirstShuffleTestArgs =
  /*#__PURE__*/ createUseReadContract({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    functionName: 'args',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `functionName` set to `"cryptoUtils"`
 */
export const useReadReportIdlePlayerFirstShuffleTestCryptoUtils =
  /*#__PURE__*/ createUseReadContract({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    functionName: 'cryptoUtils',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `functionName` set to `"deckHandler"`
 */
export const useReadReportIdlePlayerFirstShuffleTestDeckHandler =
  /*#__PURE__*/ createUseReadContract({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    functionName: 'deckHandler',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `functionName` set to `"excludeArtifacts"`
 */
export const useReadReportIdlePlayerFirstShuffleTestExcludeArtifacts =
  /*#__PURE__*/ createUseReadContract({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    functionName: 'excludeArtifacts',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `functionName` set to `"excludeContracts"`
 */
export const useReadReportIdlePlayerFirstShuffleTestExcludeContracts =
  /*#__PURE__*/ createUseReadContract({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    functionName: 'excludeContracts',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `functionName` set to `"excludeSelectors"`
 */
export const useReadReportIdlePlayerFirstShuffleTestExcludeSelectors =
  /*#__PURE__*/ createUseReadContract({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    functionName: 'excludeSelectors',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `functionName` set to `"excludeSenders"`
 */
export const useReadReportIdlePlayerFirstShuffleTestExcludeSenders =
  /*#__PURE__*/ createUseReadContract({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    functionName: 'excludeSenders',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `functionName` set to `"failed"`
 */
export const useReadReportIdlePlayerFirstShuffleTestFailed =
  /*#__PURE__*/ createUseReadContract({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    functionName: 'failed',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `functionName` set to `"handEvaluator"`
 */
export const useReadReportIdlePlayerFirstShuffleTestHandEvaluator =
  /*#__PURE__*/ createUseReadContract({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    functionName: 'handEvaluator',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `functionName` set to `"player1"`
 */
export const useReadReportIdlePlayerFirstShuffleTestPlayer1 =
  /*#__PURE__*/ createUseReadContract({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    functionName: 'player1',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `functionName` set to `"player2"`
 */
export const useReadReportIdlePlayerFirstShuffleTestPlayer2 =
  /*#__PURE__*/ createUseReadContract({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    functionName: 'player2',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `functionName` set to `"player3"`
 */
export const useReadReportIdlePlayerFirstShuffleTestPlayer3 =
  /*#__PURE__*/ createUseReadContract({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    functionName: 'player3',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `functionName` set to `"room"`
 */
export const useReadReportIdlePlayerFirstShuffleTestRoom =
  /*#__PURE__*/ createUseReadContract({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    functionName: 'room',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `functionName` set to `"targetArtifactSelectors"`
 */
export const useReadReportIdlePlayerFirstShuffleTestTargetArtifactSelectors =
  /*#__PURE__*/ createUseReadContract({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    functionName: 'targetArtifactSelectors',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `functionName` set to `"targetArtifacts"`
 */
export const useReadReportIdlePlayerFirstShuffleTestTargetArtifacts =
  /*#__PURE__*/ createUseReadContract({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    functionName: 'targetArtifacts',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `functionName` set to `"targetContracts"`
 */
export const useReadReportIdlePlayerFirstShuffleTestTargetContracts =
  /*#__PURE__*/ createUseReadContract({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    functionName: 'targetContracts',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `functionName` set to `"targetInterfaces"`
 */
export const useReadReportIdlePlayerFirstShuffleTestTargetInterfaces =
  /*#__PURE__*/ createUseReadContract({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    functionName: 'targetInterfaces',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `functionName` set to `"targetSelectors"`
 */
export const useReadReportIdlePlayerFirstShuffleTestTargetSelectors =
  /*#__PURE__*/ createUseReadContract({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    functionName: 'targetSelectors',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `functionName` set to `"targetSenders"`
 */
export const useReadReportIdlePlayerFirstShuffleTestTargetSenders =
  /*#__PURE__*/ createUseReadContract({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    functionName: 'targetSenders',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__
 */
export const useWriteReportIdlePlayerFirstShuffleTest =
  /*#__PURE__*/ createUseWriteContract({
    abi: reportIdlePlayerFirstShuffleTestAbi,
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `functionName` set to `"setUp"`
 */
export const useWriteReportIdlePlayerFirstShuffleTestSetUp =
  /*#__PURE__*/ createUseWriteContract({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    functionName: 'setUp',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `functionName` set to `"test_reportIdlePlayer"`
 */
export const useWriteReportIdlePlayerFirstShuffleTestTestReportIdlePlayer =
  /*#__PURE__*/ createUseWriteContract({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    functionName: 'test_reportIdlePlayer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__
 */
export const useSimulateReportIdlePlayerFirstShuffleTest =
  /*#__PURE__*/ createUseSimulateContract({
    abi: reportIdlePlayerFirstShuffleTestAbi,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `functionName` set to `"setUp"`
 */
export const useSimulateReportIdlePlayerFirstShuffleTestSetUp =
  /*#__PURE__*/ createUseSimulateContract({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    functionName: 'setUp',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `functionName` set to `"test_reportIdlePlayer"`
 */
export const useSimulateReportIdlePlayerFirstShuffleTestTestReportIdlePlayer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    functionName: 'test_reportIdlePlayer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__
 */
export const useWatchReportIdlePlayerFirstShuffleTestEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: reportIdlePlayerFirstShuffleTestAbi,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `eventName` set to `"IdlePlayerKicked"`
 */
export const useWatchReportIdlePlayerFirstShuffleTestIdlePlayerKickedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    eventName: 'IdlePlayerKicked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `eventName` set to `"log"`
 */
export const useWatchReportIdlePlayerFirstShuffleTestLogEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    eventName: 'log',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `eventName` set to `"log_address"`
 */
export const useWatchReportIdlePlayerFirstShuffleTestLogAddressEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    eventName: 'log_address',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `eventName` set to `"log_array"`
 */
export const useWatchReportIdlePlayerFirstShuffleTestLogArrayEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    eventName: 'log_array',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `eventName` set to `"log_bytes"`
 */
export const useWatchReportIdlePlayerFirstShuffleTestLogBytesEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    eventName: 'log_bytes',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `eventName` set to `"log_bytes32"`
 */
export const useWatchReportIdlePlayerFirstShuffleTestLogBytes32Event =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    eventName: 'log_bytes32',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `eventName` set to `"log_int"`
 */
export const useWatchReportIdlePlayerFirstShuffleTestLogIntEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    eventName: 'log_int',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `eventName` set to `"log_named_address"`
 */
export const useWatchReportIdlePlayerFirstShuffleTestLogNamedAddressEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    eventName: 'log_named_address',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `eventName` set to `"log_named_array"`
 */
export const useWatchReportIdlePlayerFirstShuffleTestLogNamedArrayEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    eventName: 'log_named_array',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `eventName` set to `"log_named_bytes"`
 */
export const useWatchReportIdlePlayerFirstShuffleTestLogNamedBytesEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    eventName: 'log_named_bytes',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `eventName` set to `"log_named_bytes32"`
 */
export const useWatchReportIdlePlayerFirstShuffleTestLogNamedBytes32Event =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    eventName: 'log_named_bytes32',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `eventName` set to `"log_named_decimal_int"`
 */
export const useWatchReportIdlePlayerFirstShuffleTestLogNamedDecimalIntEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    eventName: 'log_named_decimal_int',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `eventName` set to `"log_named_decimal_uint"`
 */
export const useWatchReportIdlePlayerFirstShuffleTestLogNamedDecimalUintEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    eventName: 'log_named_decimal_uint',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `eventName` set to `"log_named_int"`
 */
export const useWatchReportIdlePlayerFirstShuffleTestLogNamedIntEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    eventName: 'log_named_int',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `eventName` set to `"log_named_string"`
 */
export const useWatchReportIdlePlayerFirstShuffleTestLogNamedStringEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    eventName: 'log_named_string',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `eventName` set to `"log_named_uint"`
 */
export const useWatchReportIdlePlayerFirstShuffleTestLogNamedUintEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    eventName: 'log_named_uint',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `eventName` set to `"log_string"`
 */
export const useWatchReportIdlePlayerFirstShuffleTestLogStringEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    eventName: 'log_string',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `eventName` set to `"log_uint"`
 */
export const useWatchReportIdlePlayerFirstShuffleTestLogUintEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    eventName: 'log_uint',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link reportIdlePlayerFirstShuffleTestAbi}__ and `eventName` set to `"logs"`
 */
export const useWatchReportIdlePlayerFirstShuffleTestLogsEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: reportIdlePlayerFirstShuffleTestAbi,
    eventName: 'logs',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stringExtensionsAbi}__
 */
export const useReadStringExtensions = /*#__PURE__*/ createUseReadContract({
  abi: stringExtensionsAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stringExtensionsAbi}__ and `functionName` set to `"fromHexString"`
 */
export const useReadStringExtensionsFromHexString =
  /*#__PURE__*/ createUseReadContract({
    abi: stringExtensionsAbi,
    functionName: 'fromHexString',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stringExtensionsAbi}__ and `functionName` set to `"fromString"`
 */
export const useReadStringExtensionsFromString =
  /*#__PURE__*/ createUseReadContract({
    abi: stringExtensionsAbi,
    functionName: 'fromString',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stringExtensionsAbi}__ and `functionName` set to `"toHexString"`
 */
export const useReadStringExtensionsToHexString =
  /*#__PURE__*/ createUseReadContract({
    abi: stringExtensionsAbi,
    functionName: 'toHexString',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stringExtensionsAbi}__ and `functionName` set to `"toString"`
 */
export const useReadStringExtensionsToString =
  /*#__PURE__*/ createUseReadContract({
    abi: stringExtensionsAbi,
    functionName: 'toString',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useReadTexasHoldemRoom = /*#__PURE__*/ createUseReadContract({
  abi: texasHoldemRoomAbi,
  address: texasHoldemRoomAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"EMPTY_SEAT"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useReadTexasHoldemRoomEmptySeat =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'EMPTY_SEAT',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"MAX_PLAYERS"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useReadTexasHoldemRoomMaxPlayers =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'MAX_PLAYERS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"MIN_PLAYERS"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useReadTexasHoldemRoomMinPlayers =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'MIN_PLAYERS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"STARTING_CHIPS"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useReadTexasHoldemRoomStartingChips =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'STARTING_CHIPS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"bigBlind"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useReadTexasHoldemRoomBigBlind =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'bigBlind',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"countActivePlayers"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useReadTexasHoldemRoomCountActivePlayers =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'countActivePlayers',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"countOfHandsRevealed"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useReadTexasHoldemRoomCountOfHandsRevealed =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'countOfHandsRevealed',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"countPlayersAtRoundStart"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useReadTexasHoldemRoomCountPlayersAtRoundStart =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'countPlayersAtRoundStart',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"cryptoUtils"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useReadTexasHoldemRoomCryptoUtils =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'cryptoUtils',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"currentPlayerIndex"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useReadTexasHoldemRoomCurrentPlayerIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'currentPlayerIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"currentStageBet"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useReadTexasHoldemRoomCurrentStageBet =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'currentStageBet',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"dealerPosition"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useReadTexasHoldemRoomDealerPosition =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'dealerPosition',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"deckHandler"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useReadTexasHoldemRoomDeckHandler =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'deckHandler',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"getNextActivePlayer"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useReadTexasHoldemRoomGetNextActivePlayer =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'getNextActivePlayer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"getPlayer"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useReadTexasHoldemRoomGetPlayer =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'getPlayer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"getPlayerIndexFromAddr"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useReadTexasHoldemRoomGetPlayerIndexFromAddr =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'getPlayerIndexFromAddr',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"getPlayers"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useReadTexasHoldemRoomGetPlayers =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'getPlayers',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"getPlayersCardIndexes"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useReadTexasHoldemRoomGetPlayersCardIndexes =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'getPlayersCardIndexes',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"isPrivate"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useReadTexasHoldemRoomIsPrivate =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'isPrivate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"lastActionTimestamp"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useReadTexasHoldemRoomLastActionTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'lastActionTimestamp',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"lastRaiseIndex"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useReadTexasHoldemRoomLastRaiseIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'lastRaiseIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"numPlayers"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useReadTexasHoldemRoomNumPlayers =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'numPlayers',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"players"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useReadTexasHoldemRoomPlayers =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'players',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"pot"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useReadTexasHoldemRoomPot = /*#__PURE__*/ createUseReadContract({
  abi: texasHoldemRoomAbi,
  address: texasHoldemRoomAddress,
  functionName: 'pot',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"roundNumber"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useReadTexasHoldemRoomRoundNumber =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'roundNumber',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"seatPositionToPlayerIndex"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useReadTexasHoldemRoomSeatPositionToPlayerIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'seatPositionToPlayerIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"smallBlind"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useReadTexasHoldemRoomSmallBlind =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'smallBlind',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"stage"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useReadTexasHoldemRoomStage = /*#__PURE__*/ createUseReadContract({
  abi: texasHoldemRoomAbi,
  address: texasHoldemRoomAddress,
  functionName: 'stage',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useWriteTexasHoldemRoom = /*#__PURE__*/ createUseWriteContract({
  abi: texasHoldemRoomAbi,
  address: texasHoldemRoomAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"joinGame"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useWriteTexasHoldemRoomJoinGame =
  /*#__PURE__*/ createUseWriteContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'joinGame',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"leaveGame"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useWriteTexasHoldemRoomLeaveGame =
  /*#__PURE__*/ createUseWriteContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'leaveGame',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"progressGame"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useWriteTexasHoldemRoomProgressGame =
  /*#__PURE__*/ createUseWriteContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'progressGame',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"reportIdlePlayer"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useWriteTexasHoldemRoomReportIdlePlayer =
  /*#__PURE__*/ createUseWriteContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'reportIdlePlayer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"reportInvalidCards"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useWriteTexasHoldemRoomReportInvalidCards =
  /*#__PURE__*/ createUseWriteContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'reportInvalidCards',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"resetRound"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useWriteTexasHoldemRoomResetRound =
  /*#__PURE__*/ createUseWriteContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'resetRound',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"setDeckHandler"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useWriteTexasHoldemRoomSetDeckHandler =
  /*#__PURE__*/ createUseWriteContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'setDeckHandler',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"setPlayerHandScore"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useWriteTexasHoldemRoomSetPlayerHandScore =
  /*#__PURE__*/ createUseWriteContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'setPlayerHandScore',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"submitAction"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useWriteTexasHoldemRoomSubmitAction =
  /*#__PURE__*/ createUseWriteContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'submitAction',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useSimulateTexasHoldemRoom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"joinGame"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useSimulateTexasHoldemRoomJoinGame =
  /*#__PURE__*/ createUseSimulateContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'joinGame',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"leaveGame"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useSimulateTexasHoldemRoomLeaveGame =
  /*#__PURE__*/ createUseSimulateContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'leaveGame',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"progressGame"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useSimulateTexasHoldemRoomProgressGame =
  /*#__PURE__*/ createUseSimulateContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'progressGame',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"reportIdlePlayer"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useSimulateTexasHoldemRoomReportIdlePlayer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'reportIdlePlayer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"reportInvalidCards"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useSimulateTexasHoldemRoomReportInvalidCards =
  /*#__PURE__*/ createUseSimulateContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'reportInvalidCards',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"resetRound"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useSimulateTexasHoldemRoomResetRound =
  /*#__PURE__*/ createUseSimulateContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'resetRound',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"setDeckHandler"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useSimulateTexasHoldemRoomSetDeckHandler =
  /*#__PURE__*/ createUseSimulateContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'setDeckHandler',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"setPlayerHandScore"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useSimulateTexasHoldemRoomSetPlayerHandScore =
  /*#__PURE__*/ createUseSimulateContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'setPlayerHandScore',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `functionName` set to `"submitAction"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useSimulateTexasHoldemRoomSubmitAction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    functionName: 'submitAction',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link texasHoldemRoomAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useWatchTexasHoldemRoomEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `eventName` set to `"GameStarted"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useWatchTexasHoldemRoomGameStartedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    eventName: 'GameStarted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `eventName` set to `"IdlePlayerKicked"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useWatchTexasHoldemRoomIdlePlayerKickedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    eventName: 'IdlePlayerKicked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `eventName` set to `"InvalidCardsReported"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useWatchTexasHoldemRoomInvalidCardsReportedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    eventName: 'InvalidCardsReported',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `eventName` set to `"NewStage"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useWatchTexasHoldemRoomNewStageEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    eventName: 'NewStage',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `eventName` set to `"PlayerJoined"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useWatchTexasHoldemRoomPlayerJoinedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    eventName: 'PlayerJoined',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `eventName` set to `"PlayerLeft"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useWatchTexasHoldemRoomPlayerLeftEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    eventName: 'PlayerLeft',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `eventName` set to `"PlayerMoved"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useWatchTexasHoldemRoomPlayerMovedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    eventName: 'PlayerMoved',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link texasHoldemRoomAbi}__ and `eventName` set to `"PotWon"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956)
 * -
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xb1d348bbf62A46EDE1bafC6647947c89632120d8)
 */
export const useWatchTexasHoldemRoomPotWonEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: texasHoldemRoomAbi,
    address: texasHoldemRoomAddress,
    eventName: 'PotWon',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__
 */
export const useReadTexasHoldemRoomRealKeysNoShuffleTest =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `functionName` set to `"IS_TEST"`
 */
export const useReadTexasHoldemRoomRealKeysNoShuffleTestIsTest =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    functionName: 'IS_TEST',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `functionName` set to `"args"`
 */
export const useReadTexasHoldemRoomRealKeysNoShuffleTestArgs =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    functionName: 'args',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `functionName` set to `"cryptoUtils"`
 */
export const useReadTexasHoldemRoomRealKeysNoShuffleTestCryptoUtils =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    functionName: 'cryptoUtils',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `functionName` set to `"deckHandler"`
 */
export const useReadTexasHoldemRoomRealKeysNoShuffleTestDeckHandler =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    functionName: 'deckHandler',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `functionName` set to `"excludeArtifacts"`
 */
export const useReadTexasHoldemRoomRealKeysNoShuffleTestExcludeArtifacts =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    functionName: 'excludeArtifacts',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `functionName` set to `"excludeContracts"`
 */
export const useReadTexasHoldemRoomRealKeysNoShuffleTestExcludeContracts =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    functionName: 'excludeContracts',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `functionName` set to `"excludeSelectors"`
 */
export const useReadTexasHoldemRoomRealKeysNoShuffleTestExcludeSelectors =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    functionName: 'excludeSelectors',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `functionName` set to `"excludeSenders"`
 */
export const useReadTexasHoldemRoomRealKeysNoShuffleTestExcludeSenders =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    functionName: 'excludeSenders',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `functionName` set to `"failed"`
 */
export const useReadTexasHoldemRoomRealKeysNoShuffleTestFailed =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    functionName: 'failed',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `functionName` set to `"handEvaluator"`
 */
export const useReadTexasHoldemRoomRealKeysNoShuffleTestHandEvaluator =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    functionName: 'handEvaluator',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `functionName` set to `"player1"`
 */
export const useReadTexasHoldemRoomRealKeysNoShuffleTestPlayer1 =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    functionName: 'player1',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `functionName` set to `"player2"`
 */
export const useReadTexasHoldemRoomRealKeysNoShuffleTestPlayer2 =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    functionName: 'player2',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `functionName` set to `"player3"`
 */
export const useReadTexasHoldemRoomRealKeysNoShuffleTestPlayer3 =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    functionName: 'player3',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `functionName` set to `"room"`
 */
export const useReadTexasHoldemRoomRealKeysNoShuffleTestRoom =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    functionName: 'room',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `functionName` set to `"targetArtifactSelectors"`
 */
export const useReadTexasHoldemRoomRealKeysNoShuffleTestTargetArtifactSelectors =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    functionName: 'targetArtifactSelectors',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `functionName` set to `"targetArtifacts"`
 */
export const useReadTexasHoldemRoomRealKeysNoShuffleTestTargetArtifacts =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    functionName: 'targetArtifacts',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `functionName` set to `"targetContracts"`
 */
export const useReadTexasHoldemRoomRealKeysNoShuffleTestTargetContracts =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    functionName: 'targetContracts',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `functionName` set to `"targetInterfaces"`
 */
export const useReadTexasHoldemRoomRealKeysNoShuffleTestTargetInterfaces =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    functionName: 'targetInterfaces',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `functionName` set to `"targetSelectors"`
 */
export const useReadTexasHoldemRoomRealKeysNoShuffleTestTargetSelectors =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    functionName: 'targetSelectors',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `functionName` set to `"targetSenders"`
 */
export const useReadTexasHoldemRoomRealKeysNoShuffleTestTargetSenders =
  /*#__PURE__*/ createUseReadContract({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    functionName: 'targetSenders',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__
 */
export const useWriteTexasHoldemRoomRealKeysNoShuffleTest =
  /*#__PURE__*/ createUseWriteContract({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `functionName` set to `"setUp"`
 */
export const useWriteTexasHoldemRoomRealKeysNoShuffleTestSetUp =
  /*#__PURE__*/ createUseWriteContract({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    functionName: 'setUp',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__
 */
export const useSimulateTexasHoldemRoomRealKeysNoShuffleTest =
  /*#__PURE__*/ createUseSimulateContract({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `functionName` set to `"setUp"`
 */
export const useSimulateTexasHoldemRoomRealKeysNoShuffleTestSetUp =
  /*#__PURE__*/ createUseSimulateContract({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    functionName: 'setUp',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__
 */
export const useWatchTexasHoldemRoomRealKeysNoShuffleTestEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `eventName` set to `"log"`
 */
export const useWatchTexasHoldemRoomRealKeysNoShuffleTestLogEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    eventName: 'log',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `eventName` set to `"log_address"`
 */
export const useWatchTexasHoldemRoomRealKeysNoShuffleTestLogAddressEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    eventName: 'log_address',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `eventName` set to `"log_array"`
 */
export const useWatchTexasHoldemRoomRealKeysNoShuffleTestLogArrayEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    eventName: 'log_array',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `eventName` set to `"log_bytes"`
 */
export const useWatchTexasHoldemRoomRealKeysNoShuffleTestLogBytesEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    eventName: 'log_bytes',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `eventName` set to `"log_bytes32"`
 */
export const useWatchTexasHoldemRoomRealKeysNoShuffleTestLogBytes32Event =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    eventName: 'log_bytes32',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `eventName` set to `"log_int"`
 */
export const useWatchTexasHoldemRoomRealKeysNoShuffleTestLogIntEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    eventName: 'log_int',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `eventName` set to `"log_named_address"`
 */
export const useWatchTexasHoldemRoomRealKeysNoShuffleTestLogNamedAddressEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    eventName: 'log_named_address',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `eventName` set to `"log_named_array"`
 */
export const useWatchTexasHoldemRoomRealKeysNoShuffleTestLogNamedArrayEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    eventName: 'log_named_array',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `eventName` set to `"log_named_bytes"`
 */
export const useWatchTexasHoldemRoomRealKeysNoShuffleTestLogNamedBytesEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    eventName: 'log_named_bytes',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `eventName` set to `"log_named_bytes32"`
 */
export const useWatchTexasHoldemRoomRealKeysNoShuffleTestLogNamedBytes32Event =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    eventName: 'log_named_bytes32',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `eventName` set to `"log_named_decimal_int"`
 */
export const useWatchTexasHoldemRoomRealKeysNoShuffleTestLogNamedDecimalIntEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    eventName: 'log_named_decimal_int',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `eventName` set to `"log_named_decimal_uint"`
 */
export const useWatchTexasHoldemRoomRealKeysNoShuffleTestLogNamedDecimalUintEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    eventName: 'log_named_decimal_uint',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `eventName` set to `"log_named_int"`
 */
export const useWatchTexasHoldemRoomRealKeysNoShuffleTestLogNamedIntEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    eventName: 'log_named_int',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `eventName` set to `"log_named_string"`
 */
export const useWatchTexasHoldemRoomRealKeysNoShuffleTestLogNamedStringEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    eventName: 'log_named_string',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `eventName` set to `"log_named_uint"`
 */
export const useWatchTexasHoldemRoomRealKeysNoShuffleTestLogNamedUintEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    eventName: 'log_named_uint',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `eventName` set to `"log_string"`
 */
export const useWatchTexasHoldemRoomRealKeysNoShuffleTestLogStringEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    eventName: 'log_string',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `eventName` set to `"log_uint"`
 */
export const useWatchTexasHoldemRoomRealKeysNoShuffleTestLogUintEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    eventName: 'log_uint',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link texasHoldemRoomRealKeysNoShuffleTestAbi}__ and `eventName` set to `"logs"`
 */
export const useWatchTexasHoldemRoomRealKeysNoShuffleTestLogsEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: texasHoldemRoomRealKeysNoShuffleTestAbi,
    eventName: 'logs',
  })
