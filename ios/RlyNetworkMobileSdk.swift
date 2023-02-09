import Foundation
@objc(RlyNetworkMobileSdk)
class RlyNetworkMobileSdk: NSObject {
  var walletKey: String?  = nil

  @objc
  public func hello(
    _ resolve: RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
  ) -> Void {
    resolve("Hello World")
  }

  @objc
  public func getBundleId(
    _ resolve: RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
  ) -> Void {
    resolve(Bundle.main.bundleIdentifier!)
  }

  @objc
  public func getWalletMnemonic(
    _ resolve: RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
  ) -> Void {
    resolve(walletKey)
  }

  @objc
  public func saveWalletMnemonic(
    _ mnemonic: String,
    resolver resolve: RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
  ) -> Void {
    walletKey = mnemonic
    resolve(true)
  }

}
