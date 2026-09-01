import React from 'react';
import { 
    FaCircleCheck, 
    FaStar, 
    FaTrophy, 
    FaBoxOpen, 
    FaFire,
    FaGlobe
  } from 'react-icons/fa6';
  
  import { 
    FaGithub, 
    FaLinkedin 
  } from 'react-icons/fa';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import { FiFolder, FiBriefcase } from 'react-icons/fi';
import { SiJavascript, SiRust, SiTypescript } from 'react-icons/si';

// Dummy user data
const dummyUserData = {
  name: "Alex Johnson",
  title: "Senior Full-Stack Engineer",
  reputation: 12450,
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
  banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
  stats: {
    followers: "1.2k",
    following: "342",
    posts: "89",
    repositories: "45"
  },
  about: "Passionate Full-Stack Engineer with 8+ years of experience building scalable distributed systems and beautiful user interfaces. I specialize in the React ecosystem on the frontend and Rust/Node.js on the backend. Always exploring new cloud architectures and contributing to open-source developer tooling.",
  skills: ["React", "TypeScript", "Rust", "Node.js", "AWS", "GraphQL", "PostgreSQL", "Docker"],
  badges: [
    { id: 1, title: "Question Master", subtitle: "Top 1% answers this year", type: "trophy" },
    { id: 2, title: "Open Source Contributor", subtitle: "100+ merged PRs", type: "box" },
    { id: 3, title: "Hot Streak", subtitle: "30 days coding streak", type: "fire" }
  ],
  connectedAccounts: [
    { type: "github", handle: "github.com/alexjohnson", url: "https://github.com/alexjohnson" },
    { type: "linkedin", handle: "linkedin.com/in/alexj", url: "https://linkedin.com/in/alexj" },
    { type: "website", handle: "alexjohnson.dev", url: "https://alexjohnson.dev" }
  ],
  featuredProjects: [
    {
      id: 1,
      name: "DevDash",
      description: "A customizable developer dashboard for tracking GitHub metrics, CI/CD pipelines, and project updates.",
      stars: "1.2k",
      language: "TypeScript"
    },
    {
      id: 2,
      name: "Rusty CLI",
      description: "Blazing fast command-line interface utilities for managing local docker containers efficiently.",
      stars: "856",
      language: "Rust"
    }
  ]
};

// Helper components for React-Icons dynamic rendering
const RenderBadgeIcon = ({ type }) => {
  switch (type) {
    case 'trophy': return <FaTrophy className="text-amber-500 w-4 h-4" />;
    case 'box': return <FaBoxOpen className="text-blue-500 w-4 h-4" />;
    case 'fire': return <FaFire className="text-orange-500 w-4 h-4" />;
    default: return <FaTrophy className="text-indigo-500 w-4 h-4" />;
  }
};

const RenderAccountIcon = ({ type }) => {
  switch (type) {
    case 'github': return <FaGithub className="w-4 h-4 text-slate-700" />;
    case 'linkedin': return <FaLinkedin className="w-4 h-4 text-blue-600" />;
    default: return <FaGlobe className="w-4 h-4 text-slate-500" />;
  }
};

const RenderLangIcon = ({ language }) => {
  switch (language?.toLowerCase()) {
    case 'typescript': return <SiTypescript className="w-3.5 h-3.5 text-blue-500" />;
    case 'rust': return <SiRust className="w-3.5 h-3.5 text-orange-600" />;
    default: return <SiJavascript className="w-3.5 h-3.5 text-yellow-500" />;
  }
};

export default function ProfileView({ user = dummyUserData }) {
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[300px] text-slate-500 font-medium">
        No profile data available.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 min-h-screen text-slate-800 ">
      
      {/* Header Profile Card */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm mb-6">
        {/* Banner */}
        <div className="h-44 md:h-56 w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 relative overflow-hidden">
          {user?.banner && (
            <img 
              src={user.banner} 
              alt="Profile Banner" 
              className="w-full h-full object-cover opacity-80" 
            />
          )}
        </div>

        {/* Profile Details Row */}
        <div className="px-6 relative pb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end -mt-11 gap-4 mb-4">
            
            {/* Avatar & User Info */}
            <div className="flex flex-col md:flex-row items-center md:items-end gap-4 text-center md:text-left">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-white overflow-hidden shadow-md bg-slate-200 flex-shrink-0">
                <img 
                  src={user?.avatar || "https://via.placeholder.com/150"} 
                  alt={user?.name || "User Avatar"} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="mb-2">
                <h1 className="text-2xl font-bold text-slate-900 flex items-center justify-center md:justify-start gap-1.5">
                  {user?.name || "Anonymous User"}
                  <FaCircleCheck className="w-4 h-4 text-blue-600 inline" />
                </h1>
                <p className="text-slate-500 text-sm font-medium">{user?.title || "Member"}</p>
                <div className="flex items-center justify-center md:justify-start gap-1 text-xs text-indigo-600 mt-1 font-semibold">
                  <span className="inline-block w-2 h-2 rounded-full bg-indigo-600"></span>
                  {(user?.reputation ?? 0).toLocaleString()} Rep
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 self-center md:self-end">
              <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-lg transition-colors shadow-sm">
                Follow
              </button>
              <button className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg transition-colors">
                <HiEllipsisHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-slate-100 text-center">
            <div>
              <div className="text-lg font-bold text-slate-900">{user?.stats?.followers ?? "0"}</div>
              <div className="text-xs text-slate-400">Followers</div>
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900">{user?.stats?.following ?? "0"}</div>
              <div className="text-xs text-slate-400">Following</div>
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900">{user?.stats?.posts ?? "0"}</div>
              <div className="text-xs text-slate-400">Posts</div>
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900">{user?.stats?.repositories ?? "0"}</div>
              <div className="text-xs text-slate-400">Repositories</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-t border-slate-100 flex gap-6 overflow-x-auto text-sm font-medium text-slate-500">
          <button className="py-3 text-indigo-600 border-b-2 border-indigo-600 font-semibold">Overview</button>
          <button className="py-3 hover:text-slate-800">Posts</button>
          <button className="py-3 hover:text-slate-800">Questions</button>
          <button className="py-3 hover:text-slate-800">Repositories</button>
          <button className="py-3 hover:text-slate-800">Activity</button>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Grid Area */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* About */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-3">About</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {user?.about || "No bio description provided."}
            </p>
          </div>

          {/* Skills */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-3">Skills</h2>
            {user?.skills && user.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-md border border-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400 italic">No skills listed.</p>
            )}
          </div>

          {/* Featured Projects */}
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-3">Featured Projects</h2>
            {user?.featuredProjects && user.featuredProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user.featuredProjects.map((project, idx) => (
                  <div key={project.id || idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <FiFolder className="text-indigo-600 w-4 h-4" />
                          <span className="font-semibold text-slate-900 text-sm">{project.name}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                          <FaStar className="text-amber-400 w-3 h-3" />
                          <span>{project.stars}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mb-4 line-clamp-2">{project.description}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                      <RenderLangIcon language={project.language} />
                      {project.language}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-sm text-slate-400 italic">
                No featured projects available.
              </div>
            )}
          </div>
        </div>

        {/* Right Grid Area Sidebar */}
        <div className="space-y-6">
          
          {/* Badges */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-4">Badges</h2>
            {user?.badges && user.badges.length > 0 ? (
              <div className="space-y-4">
                {user.badges.map((badge, idx) => (
                  <div key={badge.id || idx} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <RenderBadgeIcon type={badge.type} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">{badge.title}</div>
                      <div className="text-[11px] text-slate-400">{badge.subtitle}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400 italic">No badges earned yet.</p>
            )}
          </div>

          {/* Connected Accounts */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-4">Connected Accounts</h2>
            {user?.connectedAccounts && user.connectedAccounts.length > 0 ? (
              <div className="space-y-3">
                {user.connectedAccounts.map((account, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                    <RenderAccountIcon type={account.type} />
                    <a 
                      href={account.url || "#"} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="hover:underline hover:text-indigo-600 truncate"
                    >
                      {account.handle}
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400 italic">No connected accounts.</p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
