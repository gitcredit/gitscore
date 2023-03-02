import { useSession, signIn, signOut } from "next-auth/react";
import { GithubInsights } from "@mktcodelib/github-insights";
import { useEffect, useState } from "react";

export default function Component() {
  const { data: session } = useSession();
  console.log("data: ", session);
  const [insights, setInsights] = useState();
  const [forkCount, setForkCount] = useState();
  const [followersForkCount, setFollowersForkCount] = useState();
  const [stargazerCount, setStargazerCount] = useState();
  const [followersStargazerCount, setFollowersStargazerCount] = useState();
  const [followersFollowerCount, setFollowersFollowerCount] = useState();
  const [mergedPullRequestCount, setMergedPullRequestCount] = useState();
  const [mergedPullRequestCount30d, setMergedPullRequestCount30d] = useState();
  const [mergedPullRequestCount365d, setMergedPullRequestCount365d] =
    useState();

  useEffect(() => {
    if (session) {
      const githubInsights = new GithubInsights({
        viewerToken: "",
      });

      /* console.log("process.env.PAT: ", process.env.PAT);
       */

      const fetchData = async () => {
        const {
          forkCount,
          followersForkCount,
          stargazerCount,
          followersStargazerCount,
          followersFollowerCount,
          mergedPullRequestCount,
          mergedPullRequestCount30d,
          mergedPullRequestCount365d,
        } = await githubInsights.scanUser("rickkdev");
      };
      fetchData();

      setForkCount(forkCount);
    }
  }, [session]);

  if (session) {
    console.log("forkCount: ", forkCount);

    return (
      <div className="flex flex-col justify-center pt-10">
        <div className="flex font-bold text-xl justify-center pb-3">
          gitscore
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex justify-center pb-3">
            Signed in as {session.user.email}
          </div>

          <div>{forkCount}</div>
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
