// IMPORTANT
// Import order here needs to be very explicit.
// In order for true source of random on react native we must import the rn library
// prior to the ether shims
import 'react-native-get-random-values';
import '@ethersproject/shims';

import { Wallet } from 'ethers';
import { NativeCodeWrapper } from './native_code_wrapper';

let _cachedWallet: Wallet | undefined;

export async function createAccount(overwrite?: boolean) {
  const existingWallet = await getWallet();

  if (existingWallet && !overwrite) {
    throw 'Account already exists';
  }

  console.log('Generating Wallet');

  const newWallet = Wallet.createRandom();

  console.log('Wallet Generated');

  console.log('Going to save wallet');
  const didSave = await NativeCodeWrapper.saveWalletMnemonic(
    newWallet.mnemonic.phrase
  );
  console.log('Wallet Saved');
  if (!didSave) {
    throw 'Unable to save wallet to secure device storage';
  }
  _cachedWallet = newWallet;

  return newWallet.address;
}

export async function getWallet() {
  if (_cachedWallet) {
    return _cachedWallet;
  }

  console.log('Calling native code to get wallet');
  const walletMnemonic = await NativeCodeWrapper.getWalletMnemonic();
  console.log('Native get wallet call returned');

  if (!walletMnemonic) {
    return;
  }

  const wallet = Wallet.fromMnemonic(walletMnemonic);
  _cachedWallet = wallet;
  return wallet;
}

export async function getAccount() {
  const wallet = await getWallet();

  return wallet?.address;
}

export async function getAccountPhrase() {
  const wallet = await getWallet();

  if (!wallet) {
    return;
  }

  return wallet.mnemonic.phrase;
}
