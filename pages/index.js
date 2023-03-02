import { useSession, signIn, signOut } from "next-auth/react";
import { GithubInsights } from "@mktcodelib/github-insights";
import { useEffect, useState } from "react";

export default function Component() {
  const { data: session } = useSession();
  const [insights, setInsights] = useState();

  useEffect(() => {
    if (session) {
      const accessToken = session.accessToken;
      const githubInsights = new GithubInsights({
        viewerToken: accessToken,
      });

      const {
        forkCount,
        followersForkCount,
        stargazerCount,
        followersStargazerCount,
        followersFollowerCount,
        mergedPullRequestCount,
        mergedPullRequestCount30d,
        mergedPullRequestCount365d,
      } = githubInsights.scanUser(session.user.email);

      console.log(
        forkCount,
        followersForkCount,
        stargazerCount,
        followersStargazerCount,
        followersFollowerCount,
        mergedPullRequestCount,
        mergedPullRequestCount30d,
        mergedPullRequestCount365d
      );
    }
  }, [session]);

  if (session) {
    return (
      <div className="flex flex-col justify-center pt-10">
        <div className="flex font-bold text-xl justify-center pb-3">
          gitscore
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex justify-center pb-3">
            Signed in as {session.user.email}
          </div>
          <div className="flex justify-center">
            <button className="border p-3" onClick={() => signOut()}>
              Sign out
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center pt-10">
      <div className="flex font-bold text-xl justify-center pb-3">gitscore</div>
      <div className="flex justify-center pb-3">Not signed in.</div>
      <div className="flex justify-center">
        <button className="border p-3" onClick={() => signIn()}>
          Sign in
        </button>
      </div>
    </div>
  );
}
