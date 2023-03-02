import { useSession, signIn, signOut } from "next-auth/react";
import { GithubInsights } from "@mktcodelib/github-insights";
import { useEffect, useState } from "react";

export default function Component() {
  const { data: session } = useSession();
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

        setForkCount(forkCount);
        setFollowersForkCount(followersForkCount);
        setStargazerCount(stargazerCount);
        setFollowersStargazerCount(followersStargazerCount);
        setFollowersFollowerCount(followersFollowerCount);
        setMergedPullRequestCount(mergedPullRequestCount);
        setMergedPullRequestCount30d(mergedPullRequestCount30d);
        setMergedPullRequestCount365d(mergedPullRequestCount365d);
      };
      fetchData();
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
