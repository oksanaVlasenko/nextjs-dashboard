import SignInDiscord from "./signin-discord";
import SignInGithub from "./signin-github";
import SignInGoogle from "./signin-google";

export default function SocialSignIn() {
  return (
    <div className='flex flex-row justify-between'>
      <SignInGoogle />

      <SignInGithub />

      <SignInDiscord />
    </div>
  )
}