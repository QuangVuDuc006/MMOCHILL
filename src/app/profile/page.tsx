import { User } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
        <User className="w-8 h-8" />
      </div>
      <h2 className="text-xl font-bold mb-2">User Profile</h2>
      <p className="text-muted-foreground text-sm max-w-[250px]">
        Manage your account, view referral links, and configure settings.
      </p>
    </div>
  );
}
