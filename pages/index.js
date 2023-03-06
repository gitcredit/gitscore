/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  const colors = require('tailwindcss/colors')
  
  module.exports = {
    // ...
    theme: {
      extend: {
        colors: {
          teal: colors.teal,
          cyan: colors.cyan,
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  CloudArrowUpIcon,
  CogIcon,
  LockClosedIcon,
  ServerIcon,
  ShieldCheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ArrowTopRightOnSquareIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useSession, signIn, signOut } from "next-auth/react";

/* This example requires Tailwind CSS v3.0+ */
import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: "What is GitCredit?",
    answer:
      "GitCredit is a lending platform that uses your GitHub activity to generate a credit score and offer loans. By connecting your GitHub account and crypto wallet, you can apply for a loan based on your GitHub repo activity, and lenders can fund lending pools associated with specific repos.",
  },
  {
    question: "How does GitCredit use my GitHub activity to generate a credit score?",
    answer:
      "GitCredit analyzes your GitHub activity, including commits, pull requests, and issues, to assess the quality and frequency of your contributions. This information is used to generate a credit score that reflects your coding skills and contributions to the open-source community.",
  },
  {
    question: "What types of loans are available on GitCredit?",
    answer:
      "GitCredit offers loans to developers and other GitHub users who are seeking financing for open-source projects, personal coding projects, and other coding-related expenses.",
  },
  {
    question: "What are the repayment terms for GitCredit loans?",
    answer:
      "Repayment terms vary depending on the specific loan and borrower. Generally, loans are repaid in regular installments over a period of months or years, with interest rates determined by the lender and borrower.",
  },
  {
    question: "How does GitCredit ensure the security of my personal and financial information?",
    answer:
      "GitCredit uses blockchain technology and smart contracts to securely store and manage user data and transactions. Your personal and financial information is encrypted and protected at all times, and all transactions are verified and processed through the blockchain.",
  },
  {
    question: "How can I get started with GitCredit?",
    answer:
      "To get started with GitCredit, simply visit our homepage and click 'Sign up'. From there, you can connect your GitHub account and crypto wallet to generate a credit score, browse lending pools associated with specific GitHub repos, and apply for a loan. Lenders can also sign up to browse and fund lending pools.",
  }

  // More questions...
];

    





const navigation = [
  { name: 'Home', href: '#' },
  { name: 'How it works?', href: '#' },
  { name: 'Borrow', href: '#' },
  { name: 'Lend', href: '#' },
]
const features = [
  {
    name: 'Push to Deploy',
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi vitae lobortis.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'SSL Certificates',
    description: 'Qui aut temporibus nesciunt vitae dicta repellat sit dolores pariatur. Temporibus qui illum aut.',
    icon: LockClosedIcon,
  },
  {
    name: 'Simple Queues',
    description: 'Rerum quas incidunt deleniti quaerat suscipit mollitia. Amet repellendus ut odit dolores qui.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Advanced Security',
    description: 'Ullam laboriosam est voluptatem maxime ut mollitia commodi. Et dignissimos suscipit perspiciatis.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Powerful API',
    description:
      'Ab a facere voluptatem in quia corrupti veritatis aliquam. Veritatis labore quaerat ipsum quaerat id.',
    icon: CogIcon,
  },
  {
    name: 'Database Backups',
    description: 'Quia qui et est officia cupiditate qui consectetur. Ratione similique et impedit ea ipsum et.',
    icon: ServerIcon,
  },
]
const blogPosts = [
  {
    id: 1,
    title: 'Boost your conversion rate',
    href: '#',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { name: 'Article', href: '#' },
    imageUrl:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    preview:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.',
    author: {
      name: 'Roel Aufderehar',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    readingLength: '6 min',
  },
  {
    id: 2,
    title: 'How to use search engine optimization to drive sales',
    href: '#',
    date: 'Mar 10, 2020',
    datetime: '2020-03-10',
    category: { name: 'Video', href: '#' },
    imageUrl:
      'https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    preview:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.',
    author: {
      name: 'Brenna Goyette',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    readingLength: '4 min',
  },
  {
    id: 3,
    title: 'Improve your customer experience',
    href: '#',
    date: 'Feb 12, 2020',
    datetime: '2020-02-12',
    category: { name: 'Case Study', href: '#' },
    imageUrl:
      'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    preview:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.',
    author: {
      name: 'Daniela Metz',
      imageUrl:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    readingLength: '11 min',
  },
]

const footerNavigation = {
  solutions: [
    { name: 'footer', href: '#' },

  ],
  support: [

    { name: 'footer', href: '#' },
  ],
  company: [
    { name: 'footer', href: '#' },

  ],
  legal: [
    { name: 'footer', href: '#' },

  ],
  social: [
    {
      name: 'Twitter',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },

  ],
}

export default function Homer() {
  return (
    <div className="bg-white">
      <div className="relative overflow-hidden">
        <Popover as="header" className="relative">
          <div className="pt-6" style={{backgroundColor:"#7642bd"}}>
            <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6" aria-label="Global">
              <div className="flex flex-1 items-center">
                <div className="flex w-full items-center justify-between md:w-auto">
                  <a href="#">
                    <span className="sr-only">gitcredit</span>
                    <img
                      className="h-8 w-auto sm:h-10"
                      src="/gitcredit.svg"
                      alt=""
                    />
                  </a>
                  <div className="-mr-2 flex items-center md:hidden">
                    <Popover.Button className="focus-ring-inset inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white" style={{backgroundColor:"#7642bd"}}>
                      <span className="sr-only">Open main menu</span>
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="hidden space-x-8 md:ml-10 md:flex">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-base font-medium text-white hover:text-gray-300"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="hidden md:flex md:items-center md:space-x-6">
              
                <a
                  href="#"

  onClick={() => {
    signIn("github", {
      callbackUrl: 'https://gitscore.vercel.app/score',
    });
  }}


                 
                  className="inline-flex items-center rounded-md border border-transparent bg-white px-4 py-2 text-base font-medium text-black hover:bg-gray-700"
                >
                  Connect Github 
                </a>
              </div>
            </nav>
          </div>

          <Transition
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel focus className="absolute inset-x-0 top-0 origin-top transform p-2 transition md:hidden">
              <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
                <div className="flex items-center justify-between px-5 pt-4">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?from-color=teal&from-shade=500&to-color=cyan&to-shade=600&toShade=600"
                      alt=""
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-600">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="pt-5 pb-6">
                  <div className="space-y-1 px-2">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="mt-6 px-5">
                  <a
                  href="#"

  onClick={() => {
    signIn("github", {
      callbackUrl: 'https://gitscore.vercel.app/score',
    });
  }}


                 
                  className="inline-flex items-center rounded-md border border-transparent bg-white px-4 py-2 text-base font-medium text-black hover:bg-gray-700"
                >
                     Login with Github
                    </a>
                  </div>
                  <div className="mt-6 px-5">
                    <p className="text-center text-base font-medium text-gray-500">
                      Existing customer?{' '}
                      <a href="#" className="text-gray-900 hover:underline">
                        Login
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
        <main>
          <div className=" pt-10 sm:pt-16 lg:overflow-hidden lg:pt-8 lg:pb-14" style={{backgroundColor:"#7642bd"}}>
            <div className="mx-auto max-w-7xl lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="mx-auto max-w-md px-6 sm:max-w-2xl sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
                  <div className="lg:py-24">
      
                    <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                      <span className="block">Financing </span>
                      <span className="block bg-gradient-to-r from-teal-200 to-cyan-400 bg-clip-text pb-3 text-transparent sm:pb-5">
                      open source innovation.
                      </span>
                    </h1>
                    <p className="text-base text-gray-300 sm:text-xl lg:text-lg xl:text-xl">
                    GitCredit allows borrowers to generate a credit score based on their GitHub activity and receive loans funded by lenders from a pool associated with their GitHub repos, with all transactions secured and recorded on the blockchain for transparency and security.

                    </p>
                    <div className="mt-10 sm:mt-12">
                      <form action="#" className="sm:mx-auto sm:max-w-xl lg:mx-0">
                        <div className="sm:flex">
             
                          <div className="mt-3 sm:mt-0 sm:ml-3 ">
                            <div
                              className="flex flex-row  block w-full rounded-md bg-gradient-to-r from-green  py-3 px-4 font-medium  shadow hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                            >
                              <p>Get your Credit Report</p>
                              <ChevronRightIcon className="ml-2 h-5 w-5 text-gray-500 pt-2" aria-hidden="true" />

                            </div>
                          </div>
                        </div>
           
                      </form>
                    </div>
                  </div>
                </div>
                <div className="mt-12 -mb-16 sm:-mb-48 lg:relative lg:m-0">
                  <div className="mx-auto max-w-md px-6 sm:max-w-2xl lg:max-w-none lg:px-0">
                    <img
                      className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                      src="/hero.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>



 {/* Feature section with screenshot */}
 <div className=" bg-gray-50 ">
            <div className="mx-auto max-w-md px-6 text-center sm:max-w-3xl lg:max-w-7xl lg:px-8 flex">
  
              <div className=" sm:-mb-24 lg:-mb-80 w-1/2 ">
                <img
                  src="/how.png"
                  alt=""
                />
              </div>

              <div className="sm:-mb-24 lg:-mb-80 w-1/2 ">
              <h2 className='mt-32 text-3xl	font-bold	 '>How it works?</h2>
              <p className='text-xl'>GitCredit allows borrowers to generate a credit score based on their GitHub activity and receive loans funded by lenders from a pool associated with their GitHub repos, with all transactions secured and recorded on the blockchain for transparency and security.</p>
               
              </div>
            </div>
          </div>

          <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40 lg:px-8">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          ) : (
                            <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>


         

      


          {/* CTA Section */}
          <div className="relative">
            <div className="relative h-56  sm:h-72 md:absolute md:left-0 md:h-full md:w-full">


<div style={{backgroundColor: "#FFFD01"}}>
Try credit now!
</div>


              <img
                className="h-full w-full object-cover"
                src="/footer_hero.png"
                alt=""
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600 mix-blend-multiply"
              />
            </div>
            <div className="relative mx-auto max-w-md py-12 px-6 sm:max-w-7xl sm:py-20 md:py-28 lg:px-8 lg:py-32">
              <div className="md:ml-auto md:w-1/2 md:pl-10">
                <h2 className="text-lg font-semibold text-gray-300">Award winning support</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">We’re here to help</p>
                <p className="mt-3 text-lg text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas tempus tellus etiam sed. Quam a
                  scelerisque amet ullamcorper eu enim et fermentum, augue. Aliquet amet volutpat quisque ut interdum
                  tincidunt duis.
                </p>
                <div className="mt-8">
                  <div className="inline-flex rounded-md shadow">
                    <a
                      href="#"
                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-gray-900 hover:bg-gray-50"
                    >
                      Visit the help center
                      <ArrowTopRightOnSquareIcon className="-mr-1 ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="bg-gray-50" aria-labelledby="footer-heading">
          <h2 id="footer-heading" className="sr-only">
            Footer
          </h2>
          <div className="mx-auto max-w-md px-6 pt-12 sm:max-w-7xl lg:px-8 lg:pt-16">
            <div className="xl:grid xl:grid-cols-3 xl:gap-8">
              <div className="space-y-8 xl:col-span-1">
                <img
                  className="h-10"
                  src="/gitcredit.svg"
                  alt="Company name"
                />
                <p className="text-base text-gray-500">
                  Financing open-source innovation.
                </p>
                <div className="flex space-x-6">
                  {footerNavigation.social.map((item) => (
                    <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
                      <span className="sr-only">{item.name}</span>
                      <item.icon className="h-6 w-6" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                <div className="md:grid md:grid-cols-2 md:gap-8">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Solutions</h3>
                    <ul role="list" className="mt-4 space-y-4">
                      {footerNavigation.solutions.map((item) => (
                        <li key={item.name}>
                          <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-12 md:mt-0">
                    <h3 className="text-base font-medium text-gray-900">Support</h3>
                    <ul role="list" className="mt-4 space-y-4">
                      {footerNavigation.support.map((item) => (
                        <li key={item.name}>
                          <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="md:grid md:grid-cols-2 md:gap-8">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Company</h3>
                    <ul role="list" className="mt-4 space-y-4">
                      {footerNavigation.company.map((item) => (
                        <li key={item.name}>
                          <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-12 md:mt-0">
                    <h3 className="text-base font-medium text-gray-900">Legal</h3>
                    <ul role="list" className="mt-4 space-y-4">
                      {footerNavigation.legal.map((item) => (
                        <li key={item.name}>
                          <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 border-t border-gray-200 py-8">
              <p className="text-base text-gray-400 xl:text-center">
                &copy; 2023 gitcredit, Inc. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
