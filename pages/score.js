
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import {
  BarsArrowUpIcon,
  CheckBadgeIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  RectangleStackIcon,
  StarIcon,
} from '@heroicons/react/20/solid'
import { Bars3CenterLeftIcon, XMarkIcon } from '@heroicons/react/24/outline'


import { useSession, signIn, signOut } from "next-auth/react";
import { GithubInsights } from "@mktcodelib/github-insights";
import { useEffect, useState } from "react";

const steps = [
  { id: 'Step 1', name: 'Connect Github', href: '#', status: 'complete' },
  { id: 'Step 2', name: 'Connect your Wallet', href: '#', status: 'current' },
  { id: 'Step 3', name: 'Submit Application', href: '#', status: 'upcoming' },
]


const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Domains', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]
const projects = [
  {
    name: 'Workcation',
    href: '#',
    siteHref: '#',
    repoHref: '#',
    repo: 'debbielewis/workcation',
    tech: 'Laravel',
    lastDeploy: '3h ago',
    location: 'United states',
    starred: true,
    active: true,
  },
  // More projects...
]
const activityItems = [
  { project: 'Workcation', commit: '2d89f0c8', environment: 'production', time: '1h' },
  // More items...
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const calcScore = () => {
  const score =
    mergedPullRequestCount365d +
    mergedPullRequestCount30d +
    mergedPullRequestCount / 4 +
    stargazerCount * 4 +
    forkCount;
  return score + 455;
};

export default function Score() {

  const { data: session } = useSession();
  const [forkCount, setForkCount] = useState();
  const [followersForkCount, setFollowersForkCount] = useState();
  const [stargazerCount, setStargazerCount] = useState();
  const [followersStargazerCount, setFollowersStargazerCount] = useState();
  const [followersFollowerCount, setFollowersFollowerCount] = useState();
  const [mergedPullRequestCount, setMergedPullRequestCount] = useState();
  const [mergedPullRequestCount30d, setMergedPullRequestCount30d] = useState();
  const [mergedPullRequestCount365d, setMergedPullRequestCount365d] =
  useState();
  const [githubRepos, setGithubRepos] = useState(null)
  const [isLoading, setLoading] = useState(false)
  console.log("SESSION_",session);
  console.log("SESSION_login",session?.profile?.login);
  //setGithubUsername(session?.profile?.login);
const githubUsername = session?.profile?.login;
console.log("githubUsername___",githubUsername);



  useEffect(() => {
    if (session){
    console.log("SESSION_login_inside",session?.profile?.login);

    setLoading(true)
    fetch('https://api.github.com/users/'+githubUsername+'/repos')
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA",data);
        setGithubRepos(data)
        setLoading(false)
      })
    }
  }, [session])
 if (!loading){
  console.log("githubRepos",githubRepos);
 }



/*
  const calculatedscore = calc_user_rank(session?.profile,60);
  console.log("SCOREEE",calculatedscore);
  */

  return (
    <>

      {/* Background color split screen for large screens */}
   



<div class="flex">
  <div class="flex-initial ">
  
<a href="#" className="group block flex-shrink-0">
      <div className="flex items-center">
        <div>
          <img
            className="inline-block h-9 w-9 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Tom Cook</p>
          <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
        </div>
      </div>
    </a>
  </div>
  <div class="flex">
  
<nav aria-label="Progress">
      <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
        {steps.map((step) => (
          <li key={step.name} className="md:flex-1">
            {step.status === 'complete' ? (
              <a
                href={step.href}
                className="group flex flex-col border-l-4 border-indigo-600 py-2 pl-4 hover:border-indigo-800 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
              >
                <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-800">{step.id}</span>
                <span className="text-sm font-medium">{step.name}</span>
              </a>
            ) : step.status === 'current' ? (
              <a
                href={step.href}
                className="flex flex-col border-l-4 border-indigo-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
                aria-current="step"
              >
                <span className="text-sm font-medium text-indigo-600">{step.id}</span>
                <span className="text-sm font-medium">{step.name}</span>
              </a>
            ) : (
              <a
                href={step.href}
                className="group flex flex-col border-l-4 border-gray-200 py-2 pl-4 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
              >
                <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">{step.id}</span>
                <span className="text-sm font-medium">{step.name}</span>
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  </div>

</div>









      <div className="relative flex min-h-full flex-col">
        {/* Navbar */}
      
            {/* Projects List */}
            <div className="bg-white lg:min-w-0 lg:flex-1">
              <div className="border-b border-t border-gray-200 pl-4 pr-6 pt-4 pb-4 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-6">
                <div className="flex items-center">
                  <h1 className="flex-1 text-lg font-medium">Projects</h1>
                  <Menu as="div" className="relative">
                    <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <BarsArrowUpIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                      Sort
                      <ChevronDownIcon className="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Name
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Date modified
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Date created
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Menu>
                </div>
              </div>
              <ul role="list" className="divide-y divide-gray-200 border-b border-gray-200">
                {projects.map((project) => (
                  <li
                    key={project.repo}
                    className="relative py-5 pl-4 pr-6 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6"
                  >
                    <div className="flex items-center justify-between space-x-4">
                      {/* Repo name and link */}
                      <div className="min-w-0 space-y-3">
                        <div className="flex items-center space-x-3">
                          <span
                            className={classNames(
                              project.active ? 'bg-green-100' : 'bg-gray-100',
                              'h-4 w-4 rounded-full flex items-center justify-center'
                            )}
                            aria-hidden="true"
                          >
                            <span
                              className={classNames(
                                project.active ? 'bg-green-400' : 'bg-gray-400',
                                'h-2 w-2 rounded-full'
                              )}
                            />
                          </span>

                          <h2 className="text-sm font-medium">
                            <a href={project.href}>
                              <span className="absolute inset-0" aria-hidden="true" />
                              {project.name}{' '}
                              <span className="sr-only">{project.active ? 'Running' : 'Not running'}</span>
                            </a>
                          </h2>
                        </div>
                        <a href={project.repoHref} className="group relative flex items-center space-x-2.5">
                          <svg
                            className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8.99917 0C4.02996 0 0 4.02545 0 8.99143C0 12.9639 2.57853 16.3336 6.15489 17.5225C6.60518 17.6053 6.76927 17.3277 6.76927 17.0892C6.76927 16.8762 6.76153 16.3104 6.75711 15.5603C4.25372 16.1034 3.72553 14.3548 3.72553 14.3548C3.31612 13.316 2.72605 13.0395 2.72605 13.0395C1.9089 12.482 2.78793 12.4931 2.78793 12.4931C3.69127 12.5565 4.16643 13.4198 4.16643 13.4198C4.96921 14.7936 6.27312 14.3968 6.78584 14.1666C6.86761 13.5859 7.10022 13.1896 7.35713 12.965C5.35873 12.7381 3.25756 11.9665 3.25756 8.52116C3.25756 7.53978 3.6084 6.73667 4.18411 6.10854C4.09129 5.88114 3.78244 4.96654 4.27251 3.72904C4.27251 3.72904 5.02778 3.48728 6.74717 4.65082C7.46487 4.45101 8.23506 4.35165 9.00028 4.34779C9.76494 4.35165 10.5346 4.45101 11.2534 4.65082C12.9717 3.48728 13.7258 3.72904 13.7258 3.72904C14.217 4.96654 13.9082 5.88114 13.8159 6.10854C14.3927 6.73667 14.7408 7.53978 14.7408 8.52116C14.7408 11.9753 12.6363 12.7354 10.6318 12.9578C10.9545 13.2355 11.2423 13.7841 11.2423 14.6231C11.2423 15.8247 11.2313 16.7945 11.2313 17.0892C11.2313 17.3299 11.3937 17.6097 11.8501 17.522C15.4237 16.3303 18 12.9628 18 8.99143C18 4.02545 13.97 0 8.99917 0Z"
                              fill="currentcolor"
                            />
                          </svg>
                          <span className="truncate text-sm font-medium text-gray-500 group-hover:text-gray-900">
                            {project.repo}
                          </span>
                        </a>
                      </div>
                      <div className="sm:hidden">
                        <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      {/* Repo meta info */}
                      <div className="hidden flex-shrink-0 flex-col items-end space-y-3 sm:flex">
                        <p className="flex items-center space-x-4">
                          <a
                            href={project.siteHref}
                            className="relative text-sm font-medium text-gray-500 hover:text-gray-900"
                          >
                            Visit site
                          </a>
                          <button
                            type="button"
                            className="relative rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            <span className="sr-only">
                              {project.starred ? 'Add to favorites' : 'Remove from favorites'}
                            </span>
                            <StarIcon
                              className={classNames(
                                project.starred
                                  ? 'text-yellow-300 hover:text-yellow-400'
                                  : 'text-gray-300 hover:text-gray-400',
                                'h-5 w-5'
                              )}
                              aria-hidden="true"
                            />
                          </button>
                        </p>
                        <p className="flex space-x-2 text-sm text-gray-500">
                          <span>{project.tech}</span>
                          <span aria-hidden="true">&middot;</span>
                          <span>Last deploy {project.lastDeploy}</span>
                          <span aria-hidden="true">&middot;</span>
                          <span>{project.location}</span>
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Activity feed */}
          <div className="bg-gray-50 pr-4 sm:pr-6 lg:flex-shrink-0 lg:border-l lg:border-gray-200 lg:pr-8 xl:pr-0">
            <div className="pl-6 lg:w-80">
              <div className="pt-6 pb-2">
                <h2 className="text-sm font-semibold">Activity</h2>
              </div>
              <div>
                <ul role="list" className="divide-y divide-gray-200">
                  {activityItems.map((item) => (
                    <li key={item.commit} className="py-4">
                      <div className="flex space-x-3">
                        <img
                          className="h-6 w-6 rounded-full"
                          src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                          alt=""
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">You</h3>
                            <p className="text-sm text-gray-500">{item.time}</p>
                          </div>
                          <p className="text-sm text-gray-500">
                            Deployed {item.project} ({item.commit} in master) to {item.environment}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-gray-200 py-4 text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-900">
                    View all activity
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </div>


          <div class="py-12 px-4">
      <div class="lg:max-w-[356px] md:max-w-[516px] max-w-[343px] mx-auto">
        <div class="mx-auto bg-white px-3 py-4 rounded">
          <div>
            <img
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/Group%20813077.png"
              class="mx-auto"
            />
          </div>
          <div class="lg:block hidden">
            <div class="flex justify-between items-center gap-x-4 px-8">
              <div aria-label="one">
                <div class="flex gap-2 items-center">
                  <svg
                    width="20"
                    height="8"
                    viewBox="0 0 20 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="20" height="8" rx="4" fill="#EF4444" />
                  </svg>
                  <p class="text-xs font-medium leading-3 text-gray-800">
                    Poor
                  </p>
                </div>
                <div class="flex items-center gap-2 mt-3">
                  <svg
                    width="20"
                    height="8"
                    viewBox="0 0 20 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="20" height="8" rx="4" fill="#FACC15" />
                  </svg>

                  <p class="text-xs font-medium leading-3 text-gray-800">
                    Fair
                  </p>
                </div>
                <div class="flex items-center gap-2 mt-3">
                  <svg
                    width="20"
                    height="8"
                    viewBox="0 0 20 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="20" height="8" rx="4" fill="#BEF264" />
                  </svg>

                  <p class="text-xs font-medium leading-3 text-gray-800">
                    Satisfactory
                  </p>
                </div>
              </div>
              <div aria-label="two">
                <div class="flex items-center gap-2">
                  <svg
                    width="20"
                    height="8"
                    viewBox="0 0 20 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="20" height="8" rx="4" fill="#14B8A6" />
                  </svg>
                  <p class="text-xs font-medium leading-3 text-gray-800">
                    Good
                  </p>
                </div>
                <div class="flex items-center gap-2 mt-3">
                  <svg
                    width="20"
                    height="8"
                    viewBox="0 0 20 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="20" height="8" rx="4" fill="#22C55E" />
                  </svg>
                  <p class="text-xs font-medium leading-3 text-gray-800">
                    Better
                  </p>
                </div>
                <div class="flex items-center gap-2 mt-3">
                  <svg
                    width="20"
                    height="8"
                    viewBox="0 0 20 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="20" height="8" rx="4" fill="#15803D" />
                  </svg>
                  <p class="text-xs font-medium leading-3 text-gray-800">
                    Exceptional
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="lg:hidden block">
            <div class="flex flex-wrap justify-between gap-3 items-center px-8">
              <div class="flex gap-2 items-center">
                <svg
                  width="20"
                  height="8"
                  viewBox="0 0 20 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="20" height="8" rx="4" fill="#EF4444" />
                </svg>
                <p class="text-xs font-medium leading-3 text-gray-800">Poor</p>
              </div>
              <div class="flex items-center gap-2">
                <svg
                  width="20"
                  height="8"
                  viewBox="0 0 20 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="20" height="8" rx="4" fill="#FACC15" />
                </svg>

                <p class="text-xs font-medium leading-3 text-gray-800">Fair</p>
              </div>
              <div class="flex items-center gap-2">
                <svg
                  width="20"
                  height="8"
                  viewBox="0 0 20 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="20" height="8" rx="4" fill="#BEF264" />
                </svg>

                <p class="text-xs font-medium leading-3 text-gray-800">
                  Satisfactory
                </p>
              </div>
              <div class="flex items-center gap-2">
                <svg
                  width="20"
                  height="8"
                  viewBox="0 0 20 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="20" height="8" rx="4" fill="#14B8A6" />
                </svg>
                <p class="text-xs font-medium leading-3 text-gray-800">Good</p>
              </div>
              <div class="flex items-center gap-2">
                <svg
                  width="20"
                  height="8"
                  viewBox="0 0 20 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="20" height="8" rx="4" fill="#22C55E" />
                </svg>
                <p class="text-xs font-medium leading-3 text-gray-800">
                  Better
                </p>
              </div>
              <div class="flex items-center gap-2">
                <svg
                  width="20"
                  height="8"
                  viewBox="0 0 20 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="20" height="8" rx="4" fill="#15803D" />
                </svg>
                <p class="text-xs font-medium leading-3 text-gray-800">
                  Exceptional
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    </>
  )
}
