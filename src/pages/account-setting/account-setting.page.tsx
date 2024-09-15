import { Badge } from "@/components/ui/badge";
import ChangePasswordForm from "./components/change-password-form";
import ProfileForm from "./components/profile-form.component";

const AccountSettingPage: React.FC = () => {
  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8 mt-4 mb-5">
      <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-2xl font-semibold tracking-tight sm:grow-0">
            Profile Settings
          </h1>
          <Badge variant="destructive" className="ml-auto sm:ml-0">
            Owner
          </Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8">
          <ProfileForm />
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
};

export default AccountSettingPage;
