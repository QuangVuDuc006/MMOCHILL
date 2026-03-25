import { Wallet } from "lucide-react";

export default function WalletPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
        <Wallet className="w-8 h-8" />
      </div>
      <h2 className="text-xl font-bold mb-2">My Wallet</h2>
      <p className="text-muted-foreground text-sm max-w-[250px]">
        Withdraw to your bank or MoMo e-wallet. Withdrawal logic will be connected here.
      </p>
    </div>
  );
}
