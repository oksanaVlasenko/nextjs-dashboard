import SignInDiscord from "@/app/ui/sign-in/signin-discord";
import SignInGithub from "@/app/ui/sign-in/signin-github";
import SignInGoogle from "@/app/ui/sign-in/signin-google";

export default function SocialSignIn() {
  return (
    <div>
      <SignInGoogle />

      <SignInGithub />

      <SignInDiscord />
    </div>
  )
}