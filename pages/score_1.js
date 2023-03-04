import { useSession, signIn, signOut } from "next-auth/react";
import { GithubInsights } from "@mktcodelib/github-insights";
import { useEffect, useState } from "react";

export default function Component() {
    const { data: session } = useSession();
    const [name, setName] = useState("");
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [issuesOpen, setIssuesOpen] = useState(0);
    const [issuesClosed, setIssuesClosed] = useState(0);
    const [organizations, setOrganizations] = useState(0);
    const [pinnedRepositories, setPinnedRepositories] = useState(0);
    const [pullOpen, setPullOpen] = useState(0);
    const [pullClosed, setPullClosed] = useState(0);
    const [pullMerged, setPullMerged] = useState(0);
    const [repositories, setRepositories] = useState(0);
    const [repositoriesContributedTo, setRepositoriesContributedTo] = useState(0);
    const [starredRepositories, setStarredRepositories] = useState(0);
    const [watching, setWatching] = useState(0);
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");
    const [company, setCompany] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");

    
    useEffect(() => {
      if (session) {
        const githubInsights = new GithubInsights({
          viewerToken: process.env.PAT,
        });
    
        const fetchData = async () => {
          const {
            followers,
            following,
            issuesOpen,
            issuesClosed,
            organizations,
            pinnedRepositories,
            pullOpen,
            pullClosed,
            pullMerged,
            repositories,
            repositoriesContributedTo,
            starredRepositories,
            watching,
            bio,
            location,
            company,
            createdAt,
            avatarUrl,
          } = await githubInsights.scanUser("rickkdev");
    
          setName("rickkdev");
          setFollowers(followers);
          setFollowing(following);
          setIssuesOpen(issuesOpen);
          setIssuesClosed(issuesClosed);
          setOrganizations(organizations);
          setPinnedRepositories(pinnedRepositories);
          setPullOpen(pullOpen);
          setPullClosed(pullClosed);
          setPullMerged(pullMerged);
          setRepositories(repositories);
          setRepositoriesContributedTo(repositoriesContributedTo);
          setStarredRepositories(starredRepositories);
          setWatching(watching);
          setBio(bio);
          setLocation(location);
          setCompany(company);
          setCreatedAt(createdAt);
          setAvatarUrl(avatarUrl);
        };
        fetchData();
      }
    }, [session]);
    
    function calc_user_rank(data, avg_user) {
      // name                           | x
      // followers                      | +
      // following                      | -
      // issuesOpen                     | +
      // issuesClosed                   | +
      // organizations                  | +
      // pinnedRepositories             | ++
      // pullOpen                       | ++
      // pullClosed                     | ++
      // pullMerged                     | +++
      // repositories                   | ++++
      // repositoriesContributedTo      | ++++
      // starredRepositories            | -
      // watching                       | -
      // bio                            | --
      // location                       | --
      // company                        |
      // createdAt                      |
      // avatarUrl                      | x
      // score                          | x
  
      // List of weights each component has on the rank
      const weights = [4/65, 2/65, 4/65, 4/65, 4/65, 5/65, 5/65, 5/65, 6/65, 7/65, 7/65, 2/65, 2/65, 1/65, 1/65, 3/65, 3/65];
      let score = 0;
      let idx = -1;
  
      for (let field in data) {
          // Skip unwanted params
          if (field == "name") {
              continue;
          }
          if (field == "avatarUrl") {
              break;
          }
  
          let param = null;
          // Parsing some of the params so that they can be used in the calc of the score
          if (field == "bio" || field == "company") {
              param = data[field] != "";
          }
          else if (field == "location") {
              param = data[field] != null;
          }
          else {
              param = data[field];
          }
  
          idx = idx + 1; // increment to get the next weights array offset
  
          // Depending on the type of variable the multiple params affect the score in different ways
          if (typeof(param) == "number") {
              if (param == 0) {
                  continue;
              }
  
              const avg_val = avg_user["avg_" + field] * 1.125;
  
              let par = param / avg_val;
  
              if (par > 1) {
                  par = 1;
              }
  
              score = score + (weights[idx] * par);
          }
          else if (typeof(param) == "boolean") {
              score = score + (param ? weights[idx] : 0);
          }
          else { // Date - str
              let val = Date.now() / 1000 | 0;
              try {
                  val = (new Date(param)).getTime() / 1000 | 0;
              }
              catch (err) {
              }
  
              const now = Date.now() / 1000 | 0;
  
              const t_diff = now - val;
  
              const avg_val = avg_user["avg_" + field];
              const t_diff_avg = now - avg_val;
  
              let par = t_diff / t_diff_avg;
  
              if (par > 1) {
                  par = 1;
              }
  
              score = score + (weights[idx] * par);
          }
      }
  
      return score;
  }

  if (session) {
    return (
      <div className="flex flex-col justify-center pt-10">
        <div className="flex font-bold text-2xl justify-center pb-3">
          gitscore
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex justify-center pb-3">
            Signed in as {session.user.email}
          </div>
          <div className="flex justify-center font-bold text-xl">
            Your score micro signals
          </div>
          <div className="flex flex-col justify-center items-center pb-5">
            <div>followers {followers}</div>
            <div>following {following}</div>
            <div>issuesOpen {issuesOpen}</div>
            <div>issuesClosed {issuesClosed}</div>
            <div>organizations {organizations}</div>
            <div>pinnedRepositories {pinnedRepositories}</div>
            <div>pullOpen {pullOpen}</div>
            <div>pullClosed {pullClosed}</div>
            <div>pullMerged {pullMerged}</div>
            <div>repositories {repositories}</div>
            <div>repositoriesContributedTo {repositoriesContributedTo}</div>
            <div>starredRepositories {starredRepositories}</div>
            <div>watching {watching}</div>
            <div>bio {bio}</div>
            <div>location {location}</div>
            <div>company {company}</div>
            <div>createdAt {createdAt}</div>
            <div>avatarUrl {avatarUrl}</div>
          </div>
          <div className="flex justify-center font-bold text-xl pb-5">
            Total {score()}
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
